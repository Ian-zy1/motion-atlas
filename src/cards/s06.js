// @card {"id": "s06", "name": "纸张撕开", "en": "Paper Tear Reveal", "study": true, "group": "切换画面", "seconds": 4.5, "dims": [720, 400], "desc": "沿裂尖将同一张海报分成两片。两片离场后停在完整底图，可手动重播。", "prompt": "让[上层画面]像一张纸，从[裂口起点]撕向[裂口终点]，露出[下层画面]。裂尖前的纸面保持连贯，裂口两侧随裂尖推进后翻、离场；只在边缘加入纤维、卷边高光和落在底层的投影。结束停在完整底图，不倒放。", "tags": ["撕裂", "揭开", "扒掉表层", "材质转场", "纸张卷边", "把纸撕开看看下面"], "category": "材质 · 裂开 / 卷边", "note": "整片纸向外移，只在裂尖附近弯折；放开后按一次性转场停止。", "beats": [["完整海报", 0.038], ["裂缝形成", 0.31], ["露出底层", 0.94]], "rate": 1, "once": true, "poster": 0.47}
// @part draw
const paperSheets=(()=>{
 const p=document.createElement('canvas');p.width=720;p.height=400;const c=p.getContext('2d');
 c.fillStyle=grad(c,0,0,720,400,[[0,'#f0dcc0'],[.65,'#debc98'],[1,'#c69779']]);c.fillRect(0,0,720,400);
 c.strokeStyle='#744b4564';c.strokeRect(26,25,668,349);
 c.save();c.translate(430,178);c.rotate(-.45);
 for(let i=0;i<16;i++){c.strokeStyle=i===2?'#a85443':'#784c4588';c.lineWidth=i===2?2.5:1;
 c.beginPath();c.ellipse(0,0,28+i*12,14+i*8,0,0,Math.PI*2);c.stroke();}
 c.restore();
 c.fillStyle='#a55345';c.fillRect(49,91,7,196);word(c,'纸的剖面',96,248,59,'#633b39',750);
 line(c,[[97,269],[310,269]],'#9a5a4b',1.4);word(c,'01 / 材质试验',97,289,14,'#6f4540',650);
 return p;
})();
function paperTriangle(k,img,src,dst){
 const [a,b,c]=src,[A,B,C]=dst, ux=b[0]-a[0],uy=b[1]-a[1],vx=c[0]-a[0],vy=c[1]-a[1],d=ux*vy-vx*uy;
 if(Math.abs(d)<.001)return;
 const U=[B[0]-A[0],B[1]-A[1]],V=[C[0]-A[0],C[1]-A[1]];
 const m=(U[0]*vy-V[0]*uy)/d,n=(U[1]*vy-V[1]*uy)/d,p=(V[0]*ux-U[0]*vx)/d,q=(V[1]*ux-U[1]*vx)/d;
 if(dst.every(([x])=>x< -2)||dst.every(([x])=>x>722)||dst.every(([,y])=>y< -2)||dst.every(([,y])=>y>402))return;
 const orientation=Math.sign(U[0]*V[1]-U[1]*V[0]);
 if(!orientation)return;
 const normals=dst.map(([x,y],i)=>{const [X,Y]=dst[(i+1)%3],r=Math.max(.001,Math.hypot(X-x,Y-y));return [orientation*(Y-y)/r,-orientation*(X-x)/r];});
 k.save();k.beginPath();
 dst.forEach(([x,y],i)=>{
   const A=normals[(i+2)%3],B=normals[i],dot=A[0]*B[0]+A[1]*B[1];
   const f=.85/Math.max(.03,1+dot),dx=(A[0]+B[0])*f,dy=(A[1]+B[1])*f;
   i?k.lineTo(x+dx,y+dy):k.moveTo(x+dx,y+dy);
 });
 k.closePath();k.clip();k.transform(m,n,p,q,A[0]-m*a[0]-p*a[1],A[1]-n*a[0]-q*a[1]);k.drawImage(img,0,0);k.restore();
}
function paperProjection(x,y,side,pivot,r,outside){
 // The whole panel moves; the small cosine change is optical foreshortening,
 // not compression of the print against a pinned outside edge.
 const yaw=.31*r+.30*outside, c=Math.cos(yaw), span=(x-pivot);
 return [pivot+span*c+side*(82*r+620*outside), y-16*r-11*side*span*Math.sin(yaw)/180+outside*44];
}
function paperTearState(t,h=400){
 const z=t/4.5, outside=speedCurve(.57,.89,z);
 return {tip:h*speedCurve(.1,.57,z),outside,strain:speedCurve(.13,.51,z)};
}
feature.s06=(k,w,h,t)=>{
 const {tip,outside,strain}=paperTearState(t,h);
 k.fillStyle=grad(k,0,0,w,h,[[0,'#193345'],[.61,'#22464c'],[1,'#477777']]);k.fillRect(0,0,w,h);
 k.save();k.translate(427,188);k.rotate(-.4);
 for(let i=0;i<16;i++){k.strokeStyle=i===2?'#ffe3a1':'#dac18f90';k.lineWidth=i===2?2.6:1;k.beginPath();k.ellipse(0,0,28+i*12,14+i*8,0,0,Math.PI*2);k.stroke();}
 oval(k,0,0,10,8,'#f3cfa3');k.restore();
 line(k,[[50,77],[50,338],[169,338]],'#dab48273',1);word(k,'回声',71,317,62,'#edd6aa',750);
 if(tip<.1){k.drawImage(paperSheets,0,0);return;}
 if(outside>=.999)return;
 const seam=y=>360+Math.sin(y*.084)*4.7+Math.sin(y*.151)*2.5+(noise(Math.round(y*2.1))-.5)*4.5;
 const rows=Array.from({length:Math.ceil(h/13)},(_,i)=>i*13).concat(tip,h).sort((a,b)=>a-b).filter((y,i,ys)=>i===0||y-ys[i-1]>.03);
 const samples=[0,1];
 function lift(y){return strain*speedCurve(0,112,tip-y);}
 function map(x,y,side){
   const r=lift(y);
   return paperProjection(x,y,side,side<0?w*.25:w*.75,r,outside);
 }
 const broken=rows.filter(y=>y<tip).concat(tip);
 const edges=[-1,1].map(side=>broken.map(y=>map(seam(y),y,side)));
 k.save();k.lineCap='round';k.lineJoin='round';
 for(const e of edges){
   const shifted=e.map(([x,y],i)=>[x+9*lift(broken[i]),y+15*lift(broken[i])]);
   // Three soft bands under the lifted edge, without a per-frame blur pass.
   for(const [width,alpha] of [[29,.055],[17,.11],[8,.19]]){
     k.globalAlpha=strain*alpha;line(k,shifted,'#101c24',width);
   }
 }
 k.restore();
 for(const side of [-1,1]){
   const XY=(y,v)=>[mix(seam(y),side<0?0:w,v),y];
   const inner=rows.map(y=>map(...XY(y,0),side)),outer=rows.map(y=>map(...XY(y,1),side));
   k.save();k.beginPath();
   [...inner,...outer.reverse()].forEach(([x,y],i)=>i?k.lineTo(x,y):k.moveTo(x,y));k.closePath();k.clip();
   for(let r=1;r<rows.length;r++){
     const a=rows[r-1],b=rows[r];if(a>=tip&&outside===0)continue;
     for(let i=1;i<samples.length;i++){
       const u=samples[i-1],v=samples[i],Q=[XY(a,u),XY(a,v),XY(b,v),XY(b,u)],D=Q.map(([x,y])=>map(x,y,side));
       for(const idx of [[0,1,2],[0,2,3]])paperTriangle(k,paperSheets,idx.map(j=>Q[j]),idx.map(j=>D[j]));
     }
   }
   k.restore();
 }
 if(tip<h)k.drawImage(paperSheets,0,tip,w,h-tip,0,tip,w,h-tip);
 for(const [i,side] of [[0,-1],[1,1]]){
  const e=edges[i];const lip=broken.map(y=>map(seam(y)+side*(3+10*lift(y))*lift(y),y,side));
  k.save();k.globalAlpha=Math.min(1,strain*2.5);shape(k,[...e,...lip.reverse()],'#ebc49cb2');k.lineJoin='round';line(k,e,'#fff0d3a8',1.15);
  for(let j=4;j<e.length-1;j+=2){const [x,y]=e[j],r=lift(broken[j]);if(r>.06)line(k,[[x,y],[x-side*(1+noise(j)*4)*r,y+(noise(j+21)-.5)*3]],'#ffedcf9e',.68);}
  k.restore();
 }
};
