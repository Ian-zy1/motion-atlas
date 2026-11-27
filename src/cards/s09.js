// @card {"id": "s09", "name": "定格拼贴", "en": "Freeze-frame Collage", "study": true, "group": "突出重点", "seconds": 5.4, "dims": [720, 400], "desc": "滑手跃到半空突然定格，人物脱离原背景。网点、报纸条、手绘箭头分三拍变成一张海报。", "prompt": "在[主体动作]达到[动作峰值]的一帧停格，把[主体]从[原场景]抠出。让[拼贴底图]扫过主体时才出现轮廓；随后按节拍加入[纸片或纹理]和[手绘标记]。让停格、底图、点缀是三个可读的节奏。", "tags": ["停格", "人物抠出", "滑板腾空", "漫画感", "报纸拼贴", "在最有张力的一帧停住"], "category": "节拍 · 定格 / 叠层", "note": "奶油白边只在拼贴扫过的位置出现。", "beats": [["踩板尾", 0.197], ["腾空定住", 0.42], ["拼贴完成", 0.77]], "rate": 1, "poster": 0.65}
// @part newspaper
function newspaper(k,x,y,w,h,r,mark){
 k.save();k.translate(x,y);k.rotate(r);
 k.shadowColor='#2e242046';k.shadowBlur=6;k.shadowOffsetX=3;k.shadowOffsetY=4;
 shape(k,[[0,3],[w-3,0],[w,h-3],[w*.67,h],[w*.3,h-3],[0,h]],'#f8e8bc');
 k.shadowColor='transparent';
 if(mark)word(k,mark,10,24,18,'#293e39',850,'serif');
 for(let i=0;i<4;i++)line(k,[[11,32+i*5],[w-15-noise(i)*16,32+i*5]],'#6d645988',1);
 k.restore();
}







// @part skater
const skaterCut=(()=>{const figure=document.createElement('canvas'),mask=document.createElement('canvas');figure.width=mask.width=250;figure.height=mask.height=245;return {figure,mask};})();
function drawSkater(k,px,y,rot,pop,crouch,outline){
 const {figure,mask}=skaterCut, c=figure.getContext('2d'), m=mask.getContext('2d');
 c.clearRect(0,0,250,245);c.save();c.translate(125,204);
 const legs=grad(c,-34,-90,36,-12,[[0,'#859184'],[.63,'#4b6966'],[1,'#2c4549']]);
 const coat=grad(c,-28,-130,37,-79,[[0,'#ecad7d'],[.53,'#ca7359'],[1,'#965849']]);
 function path(fill,fn){c.beginPath();fn(c);c.closePath();c.fillStyle=fill;c.fill();}
 c.save();c.rotate(rot);
 // Skateboard tail makes contact first, then re-levels near the jump apex.
 c.save();c.rotate(-.29*pop);
 path('#5b3f32',p=>{p.moveTo(-65,-11);p.quadraticCurveTo(-53,-1,-37,-1);p.lineTo(45,-1);p.quadraticCurveTo(59,-1,68,-12);p.quadraticCurveTo(50,-7,42,-8);p.lineTo(-38,-8);p.quadraticCurveTo(-51,-8,-65,-11);});
 line(c,[[-49,-4],[48,-4]],'#c09969',1.4);
 for(const xx of [-44,43]){
   rr(c,xx-6,-1,13,6,2,'#52605d');dot(c,xx,7,6.1,'#d0a863');
   const angle=px/6.1;for(let j=0;j<3;j++){const a=angle+j*2.094;line(c,[[xx,7],[xx+Math.cos(a)*4.8,7+Math.sin(a)*4.8]],'#9e764f',.9);}
   dot(c,xx,7,2,'#a57951');
 }
 c.restore();

 const d=crouch, angle=-.29*pop;
 const turn=(x,y)=>[x*Math.cos(angle)-y*Math.sin(angle), x*Math.sin(angle)+y*Math.cos(angle)];
 const left=turn(-39,-14), right=turn(23,-14);
 path('#344b4d',p=>{
   p.moveTo(-4+d*.28,-87+d);p.bezierCurveTo(19+d*.35,-80+d,37+d*.22,-57+d*.36,43,-45+d*.23);
   p.quadraticCurveTo(47,-34+d*.17,right[0]+8,right[1]+1);
   p.lineTo(right[0]-7,right[1]+1);p.quadraticCurveTo(right[0]+1,-30+d*.26,23,-42+d*.23);
   p.bezierCurveTo(7+d*.23,-52,-4+d*.3,-60+d,-14,-70+d);
 });
 path(legs,p=>{
  p.moveTo(-25+d*.28,-84+d);p.quadraticCurveTo(-4+d*.3,-91+d,8+d*.3,-74+d);
  p.bezierCurveTo(-3,-57+d*.7,-19-d*.26,-48+d*.38,-28-d*.33,-38+d*.26);
  p.lineTo(left[0]+9,left[1]+2);p.lineTo(left[0]-10,left[1]+2);
  p.quadraticCurveTo(-45,-25,-46-d*.24,-43+d*.25);p.bezierCurveTo(-46-d*.24,-49+d*.3,-37-d*.25,-61+d*.37,-32+d*.2,-65+d);
 });
 c.save();c.rotate(angle);
 // The shoe sole is on the deck in deck-local coordinates in every frame.
 for(const [x,col] of [[-42,'#dcbd91'],[20,'#e0c5a1']]){
   path(col,p=>{p.moveTo(x-9,-17);p.lineTo(x+6,-17);p.quadraticCurveTo(x+11,-14,x+17,-12);p.lineTo(x+16,-8);p.lineTo(x-12,-8);p.quadraticCurveTo(x-14,-10,x-9,-17);});
   line(c,[[x-11,-8.7],[x+16,-8.7]],'#533e35',1.1);line(c,[[x+1,-14],[x+7,-13]],'#fff0c3',1.1);
 }
 c.restore();
 c.translate(d*.41,d);
 // Rear arm, torso and sleeve are curved filled forms, not thick sticks.
 path('#b7816b',p=>{p.moveTo(-14,-107);p.quadraticCurveTo(-34,-101,-43,-85);p.lineTo(-62,-89);p.quadraticCurveTo(-72,-102,-77,-95);p.quadraticCurveTo(-77,-88,-70,-83);p.lineTo(-45,-74);p.quadraticCurveTo(-33,-76,-23,-91);});
 path(coat,p=>{p.moveTo(-25,-99);p.quadraticCurveTo(-15,-123,4,-127);p.quadraticCurveTo(21,-128,35,-107);p.lineTo(44,-94);p.quadraticCurveTo(42,-87,32,-85);p.lineTo(19,-96);p.quadraticCurveTo(12,-80,8,-74);p.quadraticCurveTo(-16,-72,-29,-82);p.closePath();});
 line(c,[[-23,-81],[-3,-81],[12,-84]],'#f4b28a9e',1.8);
 path('#d8a387',p=>{p.moveTo(36,-97);p.lineTo(46,-93);p.quadraticCurveTo(55,-89,70,-102);p.quadraticCurveTo(75,-104,81,-99);p.lineTo(72,-94);p.quadraticCurveTo(57,-75,43,-80);p.lineTo(35,-86);});
 path('#c18e7b',p=>{p.moveTo(-1,-129);p.lineTo(5,-143);p.lineTo(19,-140);p.lineTo(19,-122);p.quadraticCurveTo(8,-115,-1,-129);});
 path('#e1aa8d',p=>{p.moveTo(-1,-149);p.quadraticCurveTo(-2,-167,15,-170);p.quadraticCurveTo(29,-165,29,-150);p.lineTo(35,-146);p.lineTo(29,-142);p.quadraticCurveTo(28,-132,19,-134);p.quadraticCurveTo(5,-135,-1,-149);});
 path('#353e4f',p=>{p.moveTo(-3,-148);p.quadraticCurveTo(-13,-163,-3,-169);p.quadraticCurveTo(14,-181,28,-167);p.lineTo(33,-162);p.quadraticCurveTo(44,-162,44,-158);p.lineTo(20,-156);p.quadraticCurveTo(7,-151,4,-144);});
 dot(c,26,-149,1.15,'#4c4445');
 c.restore();c.restore();
 k.save();k.translate(px-125,y-204);
 if(outline){m.clearRect(0,0,250,245);m.drawImage(figure,0,0);m.globalCompositeOperation='source-in';m.fillStyle='#f5eacb';m.fillRect(0,0,250,245);m.globalCompositeOperation='source-over';for(let j=0;j<16;j++){const a=j/16*Math.PI*2;k.drawImage(mask,(3.7*outline)*Math.cos(a),(3.7*outline)*Math.sin(a));}}
 k.drawImage(figure,0,0);k.restore();
}

// @part draw
feature.s09=(k,w,h,t)=>{
 const z=t/5.4, hit=.331, release=.81;
 const rise=speedCurve(.19,hit,z),fall=speedCurve(release,.942,z), jump=rise-fall;
 const push=speedCurve(.10,.184,z)-speedCurve(.19,.257,z), landing=speedCurve(.89,.95,z)-speedCurve(.95,.997,z); const pop=speedCurve(.158,.205,z)-speedCurve(.205,.30,z);
 const crawl=flow(0,hit,z), glide=flow(release,1,z);
 const px=-95+460*crawl+470*glide, dy=-104*jump, rot=-.09*jump+.045*push, crouch=push*24+landing*17;
 const enters=flow(hit,hit+.10,z), exits=flow(.785,.895,z), framing=enters*(1-exits);
 k.fillStyle='#c7d2bf';k.fillRect(0,0,w,h);
 for(let i=0;i<17;i++){let x=i*56,hi=56+noise(i+83)*72;k.fillStyle=i%2?'#a4b3a0':'#b1bcaa';k.fillRect(x,279-hi,41,hi);}
 shape(k,[[0,280],[720,280],[720,400],[0,400]],'#6d827e');line(k,[[0,302],[720,302]],'#a7b6a4',3);line(k,[[0,342],[720,342]],'#e7d5a7',1);
 k.save();k.translate(px,323);k.scale(1,.18);dot(k,0,0,Math.max(13,54+dy*.22),'#29484259');k.restore();
 
 function panelClip(){
   const right=(w+65)*enters-38,left=(w+65)*exits-38;
   k.beginPath();k.moveTo(left+28,0);k.lineTo(right+28,0);k.lineTo(right-4,h);k.lineTo(left-4,h);k.closePath();k.clip();
 }
 if(framing>0){
  k.save();panelClip();
  k.fillStyle='#eed9a7';k.fillRect(0,0,w,h);
  // Distinct hard beats: printed field, paper strips, hand-drawn arrow.
  k.fillStyle='#163d35';k.fillRect(32,25,655,350);
  const field=flow(hit,hit+.12,z);
  k.save();k.translate((1-field)*-730,0);
  shape(k,[[38,57],[633,27],[678,278],[399,343],[100,373]],'#e8a94e');
  shape(k,[[41,235],[672,129],[684,325],[422,373],[63,357]],'#d35e46');
  for(let yy=43;yy<354;yy+=8)for(let x=47;x<672;x+=8)if((x-503)**2+(yy-171)**2<172**2)dot(k,x,yy,1+2*noise(x*.6+yy),'#4b302e7e');
  word(k,'腾空',74,202,119,'#fae7b3',900);
  k.restore();
  const p1=flow(.43,.56,z),p2=flow(.49,.63,z);
  if(p1>0)newspaper(k,43-(1-p1)*257,279+(1-p1)*39,234,62,-.086-(1-p1)*.29,'动作记录 / 09');
  if(p2>0)newspaper(k,506+(1-p2)*240,68-(1-p2)*93,162,65,.15+(1-p2)*.38,'停在最高点');
  k.restore();
 }
 function rider(outline){drawSkater(k,px,302+dy,rot,pop,crouch,outline);}
 if(framing>0){k.save();panelClip();rider(1);k.restore();}
 rider(0);
 if(framing>0){k.save();panelClip();
  const q=flow(.59,.745,z);
  if(q>0){
   const a=[[624,217],[588,207],[553,211],[511,228],[479,237],[446,247]],j=q*(a.length-1),n=Math.floor(j);
   k.lineCap='round';k.lineJoin='round';const b=a[Math.min(n+1,a.length-1)];
   line(k,[...a.slice(0,n+1),[mix(a[n][0],b[0],j-n),mix(a[n][1],b[1],j-n)]],'#fcebc1',4);
   const arrow=flow(.76,1,q);if(arrow>0)line(k,[[mix(442,459,arrow),mix(248,224,arrow)],[442,248],[mix(442,474,arrow),mix(248,252,arrow)]],'#fcebc1',4);
   for(let i=0;i<4;i++){const ox=407+i*10;line(k,[[ox,134-i*2],[ox+6,119-i*5]],'#f5dfac',2);}
  }
  k.restore();
 }

};
