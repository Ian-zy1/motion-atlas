// @card {"id": "s10", "name": "指引线与局部标注", "en": "Leader Line Annotation", "study": true, "group": "突出重点", "seconds": 3.6, "dims": [720, 400], "desc": "先定位，再让引导线逐段接到标签。适合在实拍里点出局部细节。", "prompt": "点亮[锚点]指向[细节]，折线从锚点向外逐段接上，线到位后[标签]轻弹、停读、淡出。让标签避开主体，浅色或复杂底片用局部柔暗底、细边或轻影保住对比；不要让字先于线出现。", "tags": ["引导线", "高亮", "箭头", "局部标注", "leader line", "annotation", "callout", "透明叠片"], "category": "标注 · 注意力", "note": "图鉴以浅深纹理作为示意底图；复制时可选附加透明导出要求。", "beats": [["定位锚点", 0.05555555555555556], ["折线生长", 0.18888888888888888], ["标签停留", 0.53], ["淡出", 0.92]], "rate": 1, "poster": 0.54}
// @part draw
feature.s10=(k,w,h,t)=>{
 const sx=w/720,sy=h/400;
 k.save();k.scale(sx,sy);
 // A bright, textured product sketch makes the contrast fallback visible.
 k.fillStyle=grad(k,0,0,720,400,[[0,'#eee4d2'],[1,'#a9b7b2']]);k.fillRect(0,0,720,400);
 for(let j=0;j<23;j++)line(k,[[0,24+j*17],[720,24+j*17]],'#ffffff30',1);
 for(let j=0;j<33;j++)line(k,[[25+j*22,0],[25+j*22,400]],'#445b5b16',1);
 softShadow(k,277,324,207,35,.43);
 k.save();k.translate(271,217);k.rotate(-.17);
 roundPoly(k,[[-157,-78],[111,-78],[153,-49],[153,73],[109,94],[-157,94]],19,'#455d56');
 roundPoly(k,[[-163,-84],[106,-84],[143,-58],[143,65],[100,84],[-163,84]],19,grad(k,-140,-80,150,80,[[0,'#aabbb0'],[.46,'#829b91'],[1,'#3d625a']]),'#536b60');
 rr(k,-132,-47,118,71,8,'#243c3b');rr(k,-123,-39,98,53,4,'#b7c5ab');
 for(let j=0;j<12;j++)line(k,[[-113,-18+j*2],[-43,-24+j*2]],'#e4dac5aa',1);
 for(let j=0;j<6;j++)line(k,[[27+j*15,-26],[29+j*15,43]],'#234039',5);
 k.restore();
 k.fillStyle='#283a39';k.font='700 13px ui-monospace,monospace';k.letterSpacing='2px';k.fillText('DETAIL STUDY / 01',34,365);k.letterSpacing='0px';
 const p=[[326,173],[389,111],[459,111]],accent='#f4bf66';
 const up=1-speedCurve(3.08,3.48,t);
 k.save();k.globalAlpha=up*flow(.05,.25,t);
 dot(k,...p[0],12,'#203c3b');dot(k,...p[0],5,accent);
 k.lineCap=k.lineJoin='round';
 const g1=flow(.27,.58,t),g2=flow(.57,.83,t);
 const lerpPoint=(a,b,u)=>[mix(a[0],b[0],u),mix(a[1],b[1],u)];
 if(g1>0){const P=g2>0?[p[0],p[1],lerpPoint(p[1],p[2],g2)]:[p[0],lerpPoint(p[0],p[1],g1)];line(k,P,'#203c3b',5);line(k,P,accent,2);}
 const reveal=flow(.84,1.06,t);
 if(reveal>0){
  const scale=.88+.12*reveal+.035*(flow(.89,1.06,t)-flow(1.06,1.25,t));
  k.translate(457,111);k.scale(scale,scale);k.globalAlpha*=reveal;
  k.shadowColor='#13242159';k.shadowBlur=15;k.shadowOffsetY=5;
  rr(k,0,-29,218,58,10,'#223332f4');k.shadowColor='transparent';
  k.strokeStyle='#d8ab68';k.lineWidth=1;k.stroke();
  rr(k,13,-15,3,30,1.5,accent);
  word(k,'散热开孔',28,8,23,'#fff2d6',700);
  label(k,'01',178,5,accent,14);
 }
 k.restore();k.restore();
};
