import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const src = new URL('./src/', import.meta.url);
const read = path => readFileSync(new URL(path, src), 'utf8');
const check = (condition, message) => { if (!condition) throw Error(message); };
const ids = JSON.parse(read('catalog.json'));
const cardPattern = /^[a-z0-9]+$/;
check(Array.isArray(ids) && ids.length > 0 && ids.every(x => typeof x === 'string' && cardPattern.test(x))
  && new Set(ids).size === ids.length, 'Invalid or duplicate IDs in catalog.json');
const files = readdirSync(new URL('cards/', src)).filter(name => name.endsWith('.js')).sort();
check(JSON.stringify(files) === JSON.stringify(ids.map(id => id + '.js').sort()), 'catalog.json and cards/*.js must list the same cards');

const snippets = new Map();
const counts = { all: ids.length, studies: 0, featured: 0, base: 0 };
const records = ids.map(id => {
  const raw = read('cards/' + id + '.js');
  const top = /^\/\/ @card (\{[^\n]+\})\n/.exec(raw);
  check(top && JSON.parse(top[1]).id === id, 'Bad card header: ' + id);
  const spec = JSON.parse(top[1]);
  counts[spec.study ? 'studies' : spec.slug ? 'featured' : 'base']++;
  const parts = raw.slice(top[0].length).split(/^\/\/ @part ([a-z][a-z0-9-]*)\n/gm);
  check(parts.length >= 3 && parts[0] === '', 'Missing card parts: ' + id);
  for (let i = 1; i < parts.length; i += 2) {
    const name = 'card/' + id + '.' + parts[i];
    check(!snippets.has(name) && parts[i + 1].trim(), 'Invalid or duplicate part: ' + name);
    check(!/<\/script/i.test(parts[i + 1]), 'Unescaped closing script tag: ' + name);
    snippets.set(name, parts[i + 1]);
  }
  check(snippets.has('card/' + id + '.draw'), 'Missing draw part: ' + id);
  return top[1];
});
check(records.every(x => !/<\/script/i.test(x)), 'Unescaped closing script tag in card metadata');
const used = new Set();
const html = read('page.html').replace(/\{\{([\w./-]+)\}\}/g, (_, name) => {
  if (name === 'catalog.cards') return records.join(', ');
  if (name.startsWith('count.')) {
    const key = name.slice(6);
    check(Object.hasOwn(counts, key), 'Unknown count: ' + name);
    return String(counts[key]);
  }
  if (['catalog.renderers', 'catalog.camera', 'catalog.motion'].includes(name)) {
    // Legacy placeholders keep their original interleaving and pack scopes.
    // Newly registered custom cards are emitted at this slot in catalog order.
    return ids.map(id => {
      const prefix = 'card/' + id + '.';
      const parts = [...snippets.keys()].filter(x => x.startsWith(prefix) && !used.has(x));
      if (!parts.length) return '';
      const card = JSON.parse(records[ids.indexOf(id)]);
      const slot = card.study || card.slug ? 'catalog.renderers' : 'catalog.' + card.pack;
      if (name !== slot) return '';
      check(parts.includes(prefix + 'draw'), 'Unplaced card helper: ' + id);
      for (const part of parts) used.add(part);
      return parts.map(part => snippets.get(part)).join('');
    }).join('');
  }
  if (name === 'gallery.css' || /^shared\/[a-z0-9-]+\.(js|txt)$/.test(name)) return read(name);
  check(snippets.has(name) && !used.has(name), 'Unknown or repeated card part: ' + name);
  used.add(name);
  return snippets.get(name);
});
check(used.size === snippets.size, 'Unreferenced card parts: ' + [...snippets.keys()].filter(x => !used.has(x)).join(', '));
writeFileSync(new URL('./index.html', import.meta.url), html, 'utf8');
console.log('index.html | ' + ids.length + ' cards | ' + Buffer.byteLength(html) + ' bytes | sha256 ' + createHash('sha256').update(html).digest('hex'));
