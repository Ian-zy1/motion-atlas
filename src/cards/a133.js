// @card {"id": "a133", "name": "动态排版", "en": "Kinetic Typography", "group": "突出重点", "seconds": 5.8, "dims": [720, 400], "desc": "同一字族的 LOUD 砸落，O 的字孔揭开 QUIET；收尾顺着 Q 的字孔翻回开场。", "prompt": "让[第一句标题]按[口播重音]逐字落拍。单个英文词不拆断，同行字母同字族同基线。选[带内孔的字形]，放大字孔揭出[下一句标题]。字孔尚小时只露底色，等下一句能完整容纳再显字。若标题没有闭合字孔，就用与字形风格一致的独立遮罩。", "tags": ["文字", "节拍", "有重量的开场", "开场标题", "跟着口播重音动", "文字撞进来", "让大字跟着节奏进来"], "slug": "kinetic-typography", "category": "动态示意", "note": "原创标题演示 · 依据 VFX Atlas 手法", "beats": [["重音落下", 0.157], ["字孔揭幕", 0.49], ["留白一拍", 0.78], ["字孔回环", 0.897]], "poster": 0.49}
// @part draw
// 133 / One typeface, one baseline. The actual O and Q counters are the transition mattes.
// Vector outlines from DejaVu Sans Bold (DejaVu project, derived from Bitstream Vera).
const atlasType={"glyph":{"L":{"svg":"M188 1493H573V291H1249V0H188Z","box":[188,0,1249,1493],"advance":1305},"O":{"svg":"M870 1241Q694 1241 597.0 1111.0Q500 981 500 745Q500 510 597.0 380.0Q694 250 870 250Q1047 250 1144.0 380.0Q1241 510 1241 745Q1241 981 1144.0 1111.0Q1047 1241 870 1241ZM870 1520Q1230 1520 1434.0 1314.0Q1638 1108 1638 745Q1638 383 1434.0 177.0Q1230 -29 870 -29Q511 -29 306.5 177.0Q102 383 102 745Q102 1108 306.5 1314.0Q511 1520 870 1520Z","box":[102,-29,1638,1520],"advance":1741,"hole":"M870 1241Q694 1241 597.0 1111.0Q500 981 500 745Q500 510 597.0 380.0Q694 250 870 250Q1047 250 1144.0 380.0Q1241 510 1241 745Q1241 981 1144.0 1111.0Q1047 1241 870 1241Z"},"U":{"svg":"M188 1493H573V598Q573 413 633.5 333.5Q694 254 831 254Q969 254 1029.5 333.5Q1090 413 1090 598V1493H1475V598Q1475 281 1316.0 126.0Q1157 -29 831 -29Q506 -29 347.0 126.0Q188 281 188 598Z","box":[188,-29,1475,1493],"advance":1663},"D":{"svg":"M573 1202V291H711Q947 291 1071.5 408.0Q1196 525 1196 748Q1196 970 1072.0 1086.0Q948 1202 711 1202ZM188 1493H594Q934 1493 1100.5 1444.5Q1267 1396 1386 1280Q1491 1179 1542.0 1047.0Q1593 915 1593 748Q1593 579 1542.0 446.5Q1491 314 1386 213Q1266 97 1098.0 48.5Q930 0 594 0H188Z","box":[188,0,1593,1493],"advance":1700},"Q":{"svg":"M911 -27H881Q512 -27 307.0 177.0Q102 381 102 745Q102 1108 306.5 1314.0Q511 1520 870 1520Q1233 1520 1435.5 1316.0Q1638 1112 1638 745Q1638 493 1530.5 311.0Q1423 129 1221 37L1522 -299H1155ZM870 1241Q694 1241 597.0 1111.0Q500 981 500 745Q500 505 595.0 377.5Q690 250 870 250Q1047 250 1144.0 380.0Q1241 510 1241 745Q1241 981 1144.0 1111.0Q1047 1241 870 1241Z","box":[102,-299,1638,1520],"advance":1741,"hole":"M870 1241Q694 1241 597.0 1111.0Q500 981 500 745Q500 505 595.0 377.5Q690 250 870 250Q1047 250 1144.0 380.0Q1241 510 1241 745Q1241 981 1144.0 1111.0Q1047 1241 870 1241Z"},"I":{"svg":"M188 1493H573V0H188Z","box":[188,0,573,1493],"advance":762},"E":{"svg":"M188 1493H1227V1202H573V924H1188V633H573V291H1249V0H188Z","box":[188,0,1249,1493],"advance":1399},"T":{"svg":"M10 1493H1386V1202H891V0H506V1202H10Z","box":[10,0,1386,1493],"advance":1397}},"kern":{"LO":-73,"OU":0,"UD":0,"QU":0,"UI":0,"IE":0,"ET":0}};
const atlasGlyphs=Object.fromEntries(Object.entries(atlasType.glyph).map(([ch,g])=>[ch,{...g,path:new Path2D(g.svg),counter:g.hole?new Path2D(g.hole):null}]));
const atlasFontScale=.089;
function atlasWord(text, tracking){
 let x=0;
 const letters=[...text].map((ch,i)=>{
  if(i)x+=(atlasType.kern[text[i-1]+ch]??0)+tracking;
  const g=atlasGlyphs[ch], v={g,x};x+=g.advance;return v;
 });
 const lo=letters[0].g.box[0], hi=letters.at(-1).x+letters.at(-1).g.box[2], offset=360-atlasFontScale*(lo+hi)/2;
 return letters.map(({g,x})=>({g,x:offset+x*atlasFontScale}));
}
const atlasLoud=atlasWord('LOUD',68), atlasQuiet=atlasWord('QUIET',72);
function atlas133Details(k,first){
 const ink=first?'#252f2a':'#efe5cc', dim=first?'#68675a':'#a9b9ac', rule=first?'#aba38b':'#5e796d', accent=first?'#a9442f':'#f3b37e';
 line(k,[[38,73],[681,73]],rule);line(k,[[38,306],[681,306]],rule);
 label(k,first?'01 / ACCENT':'02 / REST',40,56,ink,13);
 label(k,'TYPE STUDY',597,56,dim,12);
 word(k,first?'重音落下':'留出一拍',40,348,28,ink,700,'"PingFang SC","Noto Sans CJK SC",sans-serif');
 [594,613,632,651,670].forEach((x,i)=>line(k,[[x,350],[x,350-(first?[8,14,31,14,8]:[6,9,13,9,6])[i]]],i===2?accent:rule,2));
}
function atlas133Paper(k,first,marks=1){
 k.fillStyle=grad(k,0,0,720,400,first?[[0,'#f5eace'],[1,'#e8d5ac']]:[[0,'#152c2a'],[1,'#23453d']]);
 k.fillRect(0,0,720,400);
 if(marks>0){k.save();k.globalAlpha*=marks;atlas133Details(k,first);k.restore();}
}
function atlas133Ink(k,g,x,y,sx,sy,ink){
 k.save();k.translate(x,y);k.scale(atlasFontScale*sx,-atlasFontScale*sy);
 k.fillStyle=ink;k.fill(g.path,'evenodd');k.restore();
}
function atlas133Center(g,baseX,baseY){
 return [baseX+(g.box[0]+g.box[2])*atlasFontScale*.5,baseY-(g.box[1]+g.box[3])*atlasFontScale*.5];
}
function atlas133Portal(k,letter,phase,ink,target){
 const {g,x}=letter,[cx,cy]=atlas133Center(g,x,275),s=1+17.4*phase;
 const ox=mix(cx,360,phase),oy=mix(cy,195,phase);
 const tx=ox-(cx-x)*s,ty=oy-(cy-275)*s;
 atlas133Ink(k,g,tx,ty,s,s,ink);
 k.save();k.translate(tx,ty);k.scale(atlasFontScale*s,-atlasFontScale*s);
 k.clip(g.counter);k.setTransform(1,0,0,1,0,0);target(ox,oy);k.restore();
}
// Rightmost letters leave first. A shared travel distance keeps every pair in order.
function atlas133Exit(i,exit){
 const stagger=(4-i)*.063;
 return 550*flow(.025+stagger,.75+stagger,exit);
}
function atlas133ReturnTint(exit){
 const p=flow(.035,.45,exit), target=[207,138,108];
 return 'rgb('+target.map((v,i)=>Math.round(mix([246,233,204][i],v,p))).join(',')+')';
}
feature.a133=(k,w,h,t)=>{
 const z=t/5.8;
 const quick=(v)=>1-(1-clamp(v))**3;
 const loudColor='#29352d',oColor='#a44633', quietColor='#f6e9cc';
 const opening=()=>atlas133Paper(k,true);
 const rest=(reveal=1,x=360,y=195,exit=0,rawQ=true,marks=1,typeAlpha=1)=>{
  atlas133Paper(k,false,marks);
  const scale=.22+.78*reveal;
  k.save();k.globalAlpha*=typeAlpha;k.translate(x,y);k.scale(scale,scale);k.translate(-360,-208);
  atlasQuiet.forEach(({g,x},i)=>{
   if(i===0&&!rawQ)return;
   const drift=atlas133Exit(i,exit);
   const grain=1-reveal; 
   atlas133Ink(k,g,x+(i-2)*-9*grain+drift,288+12*grain-drift*.047,1,1,i===2?'#f2b181':quietColor);
  });k.restore();
 };
 if(z>=.98||z===0){opening();return;}
 if(z>=.835){
  const exit=(z-.835)/.145, aperture=flow(.27,1,exit);
  if(aperture>=.999999){opening();return;}
  rest(1,360,195,exit,false);
  atlas133Portal(k,atlasQuiet[0],aperture,atlas133ReturnTint(exit),()=>{
   k.globalAlpha=flow(.08,.34,exit);opening();
  });
  return;
 }
 if(z>=.625){rest();return;}
 opening();
 if(z<.425){
  k.save();k.beginPath();k.rect(38,75,644,230);k.clip();
  atlasLoud.forEach(({g,x},i)=>{
   if(i===1&&z>=.395)return;
   const hit=.102+i*.013, fall=quick((z-(hit-.055))/.055);
   if(fall<=0)return;
   const squash=flow(hit,hit+.021,z)-flow(hit+.022,hit+.075,z);
   const kick=flow(hit,hit+.028,z)-flow(hit+.034,hit+.122,z);
   const leave=flow(.365+i*.004,.425,z);
   atlas133Ink(k,g,x+(i-1.6)*17*kick+ (i<1?-210:240)*leave,275-240*(1-fall)-265*leave,1+.095*squash,1-.19*squash,i===1?oColor:loudColor);
  });k.restore();
 }
 if(z>=.395){
  const aperture=flow(.395,.625,z);
  atlas133Portal(k,atlasLoud[1],aperture,oColor,(ox,oy)=>{
   const unfold=flow(.455,.62,z);
   k.globalAlpha=flow(.398,.43,z);rest(unfold,mix(ox,360,unfold),mix(oy,195,unfold),0,true,flow(.515,.618,z),flow(.445,.478,z));
  });
 }
};

