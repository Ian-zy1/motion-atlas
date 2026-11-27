// @card {"id": "s11", "name": "UI 局部放大聚焦", "en": "Spotlight / Loupe Zoom", "study": true, "group": "突出重点", "seconds": 4.2, "dims": [720, 400], "desc": "先框出目标，再拉出同一块截图的放大窗。讲解设置项、图表和细小读数时，不用把整页放大。", "prompt": "用[完整截图]交代上下文，先框出[目标区域]，让周围均匀压暗，再从原位置展开[倍率]倍局部放大窗。保留原字和数值，停留够读、轻缓收回；不要灰雾、全屏放大或重画截图。", "tags": ["UI", "截图", "局部放大", "聚焦框", "放大镜", "压暗", "spotlight", "loupe zoom"], "category": "聚焦 · 界面讲解", "note": "示意图内置虚构仪表板；整帧保留完整截图作上下文，放大窗直接取样原图。", "beats": [["框选区域", 0.125], ["局部拉出", 0.24], ["停留核对", 0.53], ["收回", 0.85]], "rate": 1, "poster": 0.53}
// @part draw
feature.s11=(()=>{
 const W=720,H=400,D=2,source=document.createElement('canvas');
 source.width=W*D;source.height=H*D;
 const s=source.getContext('2d');s.scale(D,D);
 const ink='#213844', muted='#576c72', mint='#11776e', accent='#49c2a4', light='#f8fbf9';
 const box=(c,x,y,w,h,r)=>{c.beginPath();c.roundRect(x,y,w,h,r);};
 const fill=(c,x,y,w,h,r,color,edge)=>{box(c,x,y,w,h,r);c.fillStyle=color;c.fill();
  if(edge){c.lineWidth=1;c.strokeStyle=edge;c.stroke();}};
 const text=(c,str,x,y,size,color=ink,weight=550,mono=false)=>{
  c.fillStyle=color;c.font=weight+' '+size+'px '+(mono?'ui-monospace, monospace':'system-ui, sans-serif');
  c.textAlign='left';c.textBaseline='alphabetic';c.fillText(str,x,y);
 };
 const stroke=(c,a,b,color,w)=>{c.beginPath();c.moveTo(...a);c.lineTo(...b);c.strokeStyle=color;c.lineWidth=w;c.stroke();};
 // The loupe samples this same immutable source; it never redraws the enlarged value.
 s.fillStyle=grad(s,0,0,W,H,[[0,'#edf2e8'],[1,'#d6e6dd']]);s.fillRect(0,0,W,H);
 for(let x=18;x<W;x+=18)for(let y=14;y<H;y+=18)fill(s,x,y,1.6,1.6,.8,'#5a716e1e');
 s.save();s.shadowColor='#223c3c50';s.shadowBlur=28;s.shadowOffsetY=11;
 fill(s,57,43,606,302,15,'#f7faf7');s.restore();
 fill(s,57,43,606,302,15,'#f7faf7','#9fb6ad');
 s.save();box(s,57,43,606,302,15);s.clip();
 s.fillStyle='#dde8e3';s.fillRect(57,43,606,37);
 stroke(s,[57,80.5],[663,80.5],'#aebfb8',1);
 for(let i=0;i<3;i++)fill(s,72+12*i,57,6,6,3,['#a45250','#b18437','#3a8a78'][i]);
 text(s,'WORKBENCH / PERFORMANCE',117,66,10,muted,700,true);
 fill(s,523,51,124,20,5,'#eff5ee');
 fill(s,533,58,5,5,2.5,'#1a816c');text(s,'SESSION READY',544,64,8,mint,650,true);
 s.fillStyle='#edf3ef';s.fillRect(57,81,119,264);
 stroke(s,[175.5,80],[175.5,345],'#d1e0d8',1);
 text(s,'PROJECT',71,108,9,muted,700,true);
 fill(s,66,118,101,26,5,'#d8e9e1');
 text(s,'Overview',77,135,11,mint,700);
 text(s,'Requests',77,162,11,muted);
 text(s,'Settings',77,188,11,muted);
 text(s,'SANDBOX DATA',72,322,8,muted,650,true);
 text(s,'Latency overview',195,105,17,ink,730);
 text(s,'Latest session / last 60 seconds',196,121,9,muted,520);
 const tile=(x,w,title,value,sub)=>{
  fill(s,x,135,w,73,6,'#fffdf7','#cbdad0');
  text(s,title,x+11,152,9,muted,650,true);
  text(s,value,x+10,176,20,ink,740,true);
  text(s,sub,x+11,194,8,mint,680,true);
 };
 tile(195,155,'P95 LATENCY','128 ms','-12 ms since last run');
 tile(358,137,'THROUGHPUT','480/s','within benchmark');
 tile(503,142,'ERROR RATE','0.20%','12 of 6,000 events');
 fill(s,195,218,450,107,7,'#f9fbf8','#cbdad0');
 text(s,'Response times',206,238,10,ink,700);
 text(s,'ms',213,252,7,muted,500,true);
 for(const y of [258,276,296])stroke(s,[234,y],[631,y],'#d5e3dc',1);
 const graph=[[234,285],[254,272],[276,280],[296,270],[318,281],[339,256],[353,269],[374,280],[395,279],[415,273],[436,281],[455,261],[476,269],[496,266],[519,270],[540,259],[562,272],[584,264],[606,267],[631,263]];
 s.beginPath();s.moveTo(graph[0][0],303);graph.forEach(([x,y])=>s.lineTo(x,y));s.lineTo(631,303);s.closePath();
 s.fillStyle=grad(s,0,253,0,304,[[0,'#80c8b581'],[1,'#b9ddd219']]);s.fill();
 line(s,graph,'#238c78',1.6);
 text(s,'00:00',233,315,7,muted,500,true);
 text(s,'01:00',609,315,7,muted,500,true);
 s.restore();
 const crop={x:199,y:137,w:147,h:66}, final={x:361,y:211,w:294,h:132};
 const fadeIn=(a,b,t)=>speedCurve(a,b,t);
 const corners=(k,x,y,w,h,color,weight)=>{
   const r=9;k.lineCap='round';k.lineJoin='round';
   for(const [i,j,dx,dy] of [[x,y,1,1],[x+w,y,-1,1],[x,y+h,1,-1],[x+w,y+h,-1,-1]]){
     k.beginPath();k.moveTo(i,j+r*dy);k.lineTo(i,j);k.lineTo(i+r*dx,j);
     k.strokeStyle=color;k.lineWidth=weight;k.stroke();
   }
 };
 return (k,w,h,t)=>{
  k.save();k.scale(w/W,h/H);
  k.drawImage(source,0,0,W,H);
  const focus=fadeIn(.17,.42,t)*(1-fadeIn(3.57,3.99,t));
  k.save();box(k,57,43,606,302,15);k.clip();k.beginPath();
  k.rect(57,43,606,302);k.roundRect(crop.x-4,crop.y-4,crop.w+8,crop.h+8,6);
  k.fillStyle='#101f29';k.globalAlpha=.57*focus;k.fill('evenodd');k.restore();
  if(focus>0){
   k.save();k.globalAlpha=focus;
   corners(k,crop.x-3,crop.y-3,crop.w+6,crop.h+6,'#173238',4);
   corners(k,crop.x-3,crop.y-3,crop.w+6,crop.h+6,accent,2);
   k.restore();
  }
  const q=flow(.56,1.42,t)*(1-flow(3.10,3.78,t));
  if(q>0){
   const x=mix(crop.x,final.x,q), y=mix(crop.y,final.y,q);
   const dw=mix(crop.w,final.w,q), dh=mix(crop.h,final.h,q);
   const vis=fadeIn(0,.22,q);
   k.save();k.globalAlpha=vis;
   const points=[[crop.x+crop.w+5,crop.y+crop.h*.61],[x-14,y+dh*.36],[x,y+dh*.36]];
   k.lineCap='round';k.lineJoin='round';
   line(k,points,'#10282d',4);line(k,points,'#b1e7d4',1.6);
   k.shadowColor='#142a306d';k.shadowBlur=17*q;k.shadowOffsetY=5*q;
   fill(k,x-2,y-2,dw+4,dh+4,7,'#19333b');k.shadowColor='transparent';
   k.save();box(k,x,y,dw,dh,5);k.clip();
   k.drawImage(source,crop.x*D,crop.y*D,crop.w*D,crop.h*D,x,y,dw,dh);
   k.restore();
   box(k,x,y,dw,dh,5);k.strokeStyle='#86d2bc';k.lineWidth=1.2;k.stroke();
   if(q>.86){
    k.globalAlpha=fadeIn(.86,1,q);
    fill(k,x+dw-50,y-13,43,23,4,'#19353c','#99d7c8');
    text(k,'2x',x+dw-36,y+3,12,light,740,true);
   }
   k.restore();
  }
  text(k,'FOCUS STUDY / 02',58,373,10,muted,700,true);
  k.restore();
 };
})();
