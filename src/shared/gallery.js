const $ = s => document.querySelector(s);
const cards = JSON.parse($('#cards').textContent);
const transparentCopy = $('#transparent-copy');
const transparentProtocol = $('#transparent-protocol').textContent.trim();
// This is an opt-in for this page load only.
transparentCopy.checked = false;
function copyText(card) {
  return transparentCopy.checked ? card.prompt + '\n\n' + transparentProtocol : card.prompt;
}
const key='motion-atlas:favorites:v1';
let starred=new Set();
try { const saved=JSON.parse(localStorage.getItem(key)||'[]'); if(Array.isArray(saved)) starred=new Set(saved); } catch {}
let shelf='studies', group='全部', onlyStar=false, active=null, raf=0, last=0, noteTimer;
const normalize=s=>s.normalize('NFKC').toLowerCase().replace(/[\p{P}\p{Z}\s]+/gu,'');
function match(c, query) {
  const terms=[c.name,c.en,c.id,c.group,c.desc,c.prompt,...c.tags].map(normalize);
  const n=normalize(query);
  if(!n||terms.some(t=>t.includes(n))) return true;
  const words=query.trim().toLowerCase().split(/\s+/).map(normalize).filter(Boolean);
  if(words.length>1&&words.every(w=>terms.some(t=>t.includes(w)))) return true;
  // Prefer close phrasing in the curated Chinese intention tags, without a network model.
  if(!/^\p{Script=Han}{5,}$/u.test(n)) return false;
  const grams=[...new Set(Array.from({length:n.length-1},(_,i)=>n.slice(i,i+2)))];
  const found=grams.filter(g=>c.tags.some(t=>normalize(t).includes(g))).length;
  return found>=2&&found/grams.length>=0.34;
}
function node(tag,cls='',content='') {
  const el=document.createElement(tag); if(cls)el.className=cls; if(content)el.textContent=content; return el;
}
function notify(message) {
  const toast=$('#toast'); toast.textContent=message; toast.hidden=false; clearTimeout(noteTimer);
  noteTimer=setTimeout(()=>toast.hidden=true,1900);
}
async function clipboard(message) {
  try { await navigator.clipboard.writeText(message); return true; } catch {}
  const box=node('textarea'); box.value=message; box.style.cssText='position:fixed;left:-1000px;top:0'; document.body.append(box);
  const focus=document.activeElement; box.select(); let ok=false;
  try { ok=document.execCommand('copy'); } catch {}
  box.remove(); focus?.focus(); return ok;
}
const shelfFor=c=>c.study?'studies':c.slug?'featured':'base';
const custom=c=>c.study||c.slug;
const views=cards.map(c=>{
  const article=node('article','card'); article.dataset.id=c.id;
  const stage=node('div','stage'), canvas=node('canvas'), meter=node('div','meter');
  [canvas.width,canvas.height]=c.dims||[539,208]; if(custom(c))article.classList.add('featured'); if(c.study)article.classList.add('study');canvas.setAttribute('role','img');canvas.setAttribute('aria-label',c.name+'效果画面');
  if(!custom(c))article.classList.add('base');
  const preview=node('button','preview','▶ 播放');preview.type='button';preview.setAttribute('aria-label',c.name+'：播放预览');
  stage.append(canvas,meter,preview);
  const meta=node('div','meta'), index=node('span','index','#'+c.id), label=node('span','',c.group);
  if(custom(c)){index.textContent='#'+c.id.slice(1);label.className='featuretag';label.textContent=c.category;}else{label.className='featuretag';label.textContent='原理白模';}
  const fav=node('button','fav'); fav.type='button';
  function paintStar(){const s=starred.has(c.id);fav.textContent=s?'★':'☆';fav.setAttribute('aria-pressed',s);fav.setAttribute('aria-label',(s?'取消收藏':'收藏')+c.name);}
  paintStar();
  fav.onclick=()=>{if(starred.has(c.id))starred.delete(c.id);else starred.add(c.id);try{localStorage.setItem(key,JSON.stringify([...starred]));}catch{}paintStar();render();};
  meta.append(index,label,fav);
  const body=node('div','body'); body.append(node('h2','',c.name),node('p','en',c.en),node('p','description',c.desc));
  if(c.note)body.append(node('div','credit',c.note));else body.append(node('div','source-note','保留原版画面，供辨认动作原理。'));
  const links=node('div','links'), copy=node('button','','复制通用模板'), source=node('a','','看原版 ↗');
  if(c.study){source.removeAttribute('href');source.textContent='原创演示';}else if(c.slug){source.href='https://atlas.letz.ai/effect/'+c.slug;source.textContent='Atlas 原文 ↗';}else source.href='https://showheyohtaki.github.io/motion-prompt/#'+c.id; source.target='_blank';source.rel='noopener noreferrer';
  copy.onclick=async()=>{const text=copyText(c);if(await clipboard(text)){copy.textContent='已复制';setTimeout(()=>copy.textContent='复制通用模板',1250);notify('已复制模板，替换方括号中的内容即可');}else window.prompt('浏览器没有开放剪贴板，请手动复制：',text);};
  links.append(copy,source);
  const v={c,article,stage,canvas,meter,ctx:canvas.getContext('2d'),time:0,preview,beatButtons:[]};
  const template=node('details','template');template.append(node('summary','','查看通用模板'),node('p','',c.prompt));
  article.append(stage,meta,body,template);
  preview.onclick=()=>active===v?stop(v):play(v);
  if(c.beats){
    const strip=node('div','beats');
    for(const [name,at] of c.beats){
      const b=node('button','',name);
      b.setAttribute('aria-label',c.name+'：'+name);b.setAttribute('aria-pressed','false');
      b.onclick=()=>{if(active)stop(active);for(const it of views)clearBeats(it);v.time=at*c.seconds;draw(v,v.time);b.setAttribute('aria-pressed','true');};
      v.beatButtons.push(b);strip.append(b);
    }
    article.append(strip);
  }
  article.append(links);$('.grid').append(article);
  return v;
});
const watcher=new IntersectionObserver(entries=>{for(const e of entries){if(active?.stage===e.target&&!e.isIntersecting)stop(active);}},{threshold:0});
function draw(v, time) {
  const {ctx,canvas,c,meter}=v,w=canvas.width,h=canvas.height;
  ctx.save();try {ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,w,h);(custom(c)?feature[c.id]:demos[c.pack][c.index])(ctx,w,h,time);}finally{ctx.restore();}
  meter.style.transform='scaleX('+Math.min(1,time/playDuration(v))+')';
}
views.forEach(v=>{v.time=v.c.poster*v.c.seconds;draw(v,v.time);watcher.observe(v.stage);});
function setPlayLabel(v,text,label){
 v.preview.textContent=text;v.preview.setAttribute('aria-label',v.c.name+'：'+label);
}
function playDuration(v){return v.c.seconds*(v.c.playUntil??1);}
function stop(v,finished=false){
 if(active!==v)return;
 active=null;cancelAnimationFrame(raf);raf=0;v.stage.classList.remove('is-playing');
 if(finished&&v.c.id==='005'){v.time=v.c.poster*v.c.seconds;draw(v,v.time);}
 setPlayLabel(v,finished?'↻ 重播':'▶ 播放','播放预览');
}
function play(v){
 if(active)stop(active);
 active=v;v.stage.classList.add('is-playing');clearBeats(v);v.time=0;last=performance.now();draw(v,0);
 setPlayLabel(v,'■ 停止','停止预览');raf=requestAnimationFrame(frame);
}
function frame(now){
 const v=active;if(!v)return;
 if(document.hidden||v.article.hidden){stop(v);return;}
 const end=playDuration(v);
 v.time=Math.min(end,v.time+Math.min(.06,(now-last)/1000)*(v.c.rate??1));last=now;draw(v,v.time>=end&&!custom(v.c)?end-1/60:v.time);
 if(v.time>=end)stop(v,true);else raf=requestAnimationFrame(frame);
}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&active)stop(active);});
const filters=['全部',...new Set(cards.map(c=>c.group))].map(g=>{const el=node('button','',g);el.onclick=()=>{group=g;render();};$('.filters').append(el);return [g,el];});
function render(){
  let n=0;
  for(const v of views){const inShelf=shelf==='all'||onlyStar||$('#q').value.trim()!==''||shelfFor(v.c)===shelf;v.article.hidden=!(inShelf&&match(v.c,$('#q').value)&&(group==='全部'||v.c.group===group)&&(!onlyStar||starred.has(v.c.id)));if(!v.article.hidden)n++;}
  if(active?.article.hidden)stop(active);
  for(const [g,e] of filters){e.setAttribute('aria-pressed',g===group);e.hidden=g!=='全部'&&!cards.some(c=>c.group===g&&(shelf==='all'||onlyStar||$('#q').value.trim()!==''||shelfFor(c)===shelf));}
  for(const e of document.querySelectorAll('[data-shelf]')) e.setAttribute('aria-pressed',e.dataset.shelf===shelf&&!onlyStar&&!$('#q').value.trim());
  $('#rail-note').textContent=$('#q').value.trim()?'正在搜索全部参考':onlyStar?'浏览器本地收藏':shelf==='studies'?'点播看动作，点关键帧看细节':shelf==='featured'?'VFX Atlas 手法 · 原创动态示意':shelf==='base'?'Motion Prompt 原理白模 · 点播一轮':'代表帧总览 · 每次只播放一张';
  $('#favorites').setAttribute('aria-pressed',onlyStar);
  $('#count').textContent=String(n).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0')+' 张参考';
  $('.empty').hidden=n>0;
}
function clearBeats(v){for(const b of v.beatButtons)b.setAttribute('aria-pressed','false');}
$('#favorites').onclick=()=>{onlyStar=!onlyStar;render();};
$('#q').addEventListener('input',()=>{group='全部';render();});
for(const e of document.querySelectorAll('[data-shelf]'))e.onclick=()=>{shelf=e.dataset.shelf;group='全部';onlyStar=false;$('#q').value='';render();};
$('#reset').onclick=()=>{$('#q').value='';onlyStar=false;group='全部';render();$('#q').focus();};
render();

