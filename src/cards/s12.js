// @card {"id": "s12", "name": "关键词高亮划重点", "en": "Text Highlight / Kinetic Callout", "study": true, "group": "突出重点", "seconds": 3.2, "dims": [720, 400], "desc": "整句先落稳，再用荧光笔扫亮指定词。适合给口播补一个视觉重音。", "prompt": "[整句]先落稳，再按重拍用斜笔锋扫过[重点词]，笔触左右略宽于词但不拉大字距，轻收停读后短淡出。复杂浅底用克制轻影或细描边保清晰；拒绝黑底大药丸、紧贴文字的纯色硬矩形，别扫到邻词。", "tags": ["关键词", "划重点", "荧光笔", "口播字幕", "动态文字", "透明叠片", "text highlight", "kinetic callout", "underline"], "category": "文字 · 注意力", "note": "图鉴示意背景用来演示标注在浅色画面的可读性。", "beats": [["整句落稳", 0.2], ["荧光笔扫过", 0.335], ["重点停留", 0.66], ["短淡出", 0.918]], "rate": 1, "poster": 0.66}
// @part draw
feature.s12=(k,w,h,t)=>{
 const z=clamp(t/3.2), ivory='#f0e8d8', ink='#202827', br='#6b7873';
 k.save();k.scale(w/720,h/400);
 // Quiet desk / playback frame. Only this dictionary preview has a base image.
 k.fillStyle=grad(k,0,0,720,400,[[0,'#e8e0ce'],[1,'#b7bbad']]);
 k.fillRect(0,0,720,400);
 for(let n=0;n<110;n++){
  const x=noise(n+31)*720,y=noise(n+217)*400;
  k.fillStyle=n%2?'#a6968837':'#ffffff48';k.fillRect(x,y,2,1);
 }
 k.fillStyle='#46524e';k.font='600 10px ui-monospace,monospace';
 k.letterSpacing='2px';k.fillText('VOICEOVER STUDY',43,35);k.textAlign='right';k.fillText('12 / KEYWORD',677,35);k.textAlign='start';k.letterSpacing='0px';
 k.save();k.shadowColor='#373d3940';k.shadowBlur=20;k.shadowOffsetY=9;
 rr(k,43,53,634,291,15,'#e7e3d8');k.restore();
 k.save();k.beginPath();k.roundRect(43,53,634,291,15);k.clip();
 const paper=grad(k,0,53,620,340,[[0,'#e1d3bc'],[.59,'#eae2ce'],[1,'#8e9f97']]);
 k.fillStyle=paper;k.fillRect(43,53,634,291);
 // A backlit worktop and diagonals are conspicuous behind the bright, difficult part.
 shape(k,[[43,53],[407,53],[290,344],[43,344]],'#f5ebd4bb');
 shape(k,[[164,53],[194,53],[86,344],[53,344]],'#f7f0db83');
 shape(k,[[517,53],[677,53],[677,344],[381,344]],'#465f5b77');
 for(let j=0;j<14;j++)line(k,[[435+j*23,53],[306+j*23,344]],'#2f514a18',1);
 k.save();k.translate(561,175);k.rotate(-.2);
 k.shadowColor='#41544e52';k.shadowBlur=18;k.shadowOffsetX=9;k.shadowOffsetY=16;
 rr(k,-37,-97,89,176,30,'#273b38');k.shadowColor='transparent';
 const steel=grad(k,-36,-100,47,-7,[[0,'#627874'],[.53,'#98aaa1'],[1,'#58706a']]);
 rr(k,-39,-102,84,168,27,steel);
 rr(k,-28,-96,62,150,21,'#425e57');
 for(let i=0;i<39;i++)line(k,[[-19,-85+i*3.45],[25,-83+i*3.45]],i%3===0?'#789089':'#59716a',1);
 rr(k,-17,44,40,74,8,'#435b55');
 rr(k,-31,99,70,8,4,'#374a45');
 k.restore();
 rr(k,65,74,52,19,5,'#e3e4d78c');dot(k,75,83,2.8,'#9b513f');
 k.font='700 9px ui-monospace,monospace';k.fillStyle='#4a5650';k.fillText('REC',84,87);
 // Viewfinder ticks nod to explainer footage without competing with the words.
 for(const [x,y,dx,dy] of [[62,108,1,1],[657,77,-1,1],[62,323,1,-1],[657,323,-1,-1]])
  line(k,[[x+dx*13,y],[x,y],[x,y+dy*13]],'#f6f1dfaf',1);
 k.restore();
 // Timeline ticks show the pacing at a glance in the illustration.
 k.font='600 10px ui-monospace,monospace';k.fillStyle=br;k.fillText('00:00',43,373);
 k.textAlign='right';k.fillText('00:03',677,373);k.textAlign='start';
 line(k,[[96,370],[622,370]],'#78867c88',.8);
 for(const p of [.19,.42,.81])dot(k,96+p*526,370,2,'#66776d');
 dot(k,96+z*526,370,3.4,'#9e5342');
 const appearance=flow(.035,.145,z),leave=flow(.855,.965,z),gain=appearance*(1-leave);
 if(gain>0){
  k.save();k.translate(74,248+(1-appearance)*8-leave*5);k.globalAlpha=gain;
  const before='关键不是速度，是',focus='稳定',full=before+focus;
  const font='700 31px system-ui,sans-serif';
  k.font=font;
  const textW=k.measureText(full).width, preW=k.measureText(before).width, focusW=textW-preW;
  const textX=23, base=47, A=textX+preW-2;
  const boxW=textW+47;
  k.shadowColor='#17252160';k.shadowBlur=16;k.shadowOffsetY=5;
  rr(k,0,0,boxW,76,12,'#202a28f6');k.shadowColor='transparent';
  k.lineWidth=.75;k.strokeStyle='#ecdec95e';k.stroke();
  const sweep=flow(.23,.44,z), tail=flow(.45,.54,z)-flow(.54,.64,z);
  const marker=focusW*sweep;
  if(sweep>0){
   // The grain and irregular marker edges are clipped to the actual target word.
   k.save();k.beginPath();k.rect(A,12,marker,56);k.clip();
   const gold=grad(k,A,18,A+focusW,51,[[0,'#dfac5b'],[.72,'#f1c979'],[1,'#edb768']]);
   shape(k,[[A,23],[A+focusW,18],[A+focusW-1,53],[A+3,55]],gold);
   for(let i=0;i<25;i++){
    k.fillStyle=i%2?'#8d5e4137':'#fbebae8a';
    k.fillRect(A+noise(i+79)*focusW,23+noise(i+64)*28,2.5,1);
   }
   k.restore();
  }
  k.font=font;k.fillStyle=ivory;k.fillText(full,textX,base);
  if(sweep>0){
   k.save();k.beginPath();k.rect(A,15,marker,42);k.clip();
   k.fillStyle=ink;k.fillText(full,textX,base);k.restore();
   const y=61+tail*2.4;
   k.lineCap='round';k.beginPath();k.moveTo(A+3,y);
   k.quadraticCurveTo(A+marker*.64,y+tail*3,A+marker,y-tail*1.7);
   k.lineWidth=1.65;k.strokeStyle='#f3ca86';k.stroke();
  }
  k.restore();
 }
 k.restore();
};
