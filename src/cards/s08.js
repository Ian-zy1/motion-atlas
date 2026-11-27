// @card {"id": "s08", "name": "前景遮挡转场", "en": "Occlusion Wipe", "study": true, "group": "切换画面", "seconds": 4.3, "dims": [720, 400], "desc": "近处的墙柱掠过视野，完全遮住时切场，移开后从站台来到海岸。", "prompt": "让镜头从[场景 A]横移经过贴近镜头的[前景遮挡物]，遮挡物比远处背景移动快；在画面被完全覆盖时切换到[场景 B]，遮挡物离开后再露出新场景。保留前后移动方向，边缘只加轻微运动模糊。", "tags": ["柱子遮挡换场", "从墙后穿过去", "镜头经过前景", "空间切换", "无感换场"], "category": "转场 · 遮挡 / 硬切", "note": "掠过约 0.52 秒；挡满时切场，边缘轻微羽化。", "beats": [["站台", 0.08], ["完全遮挡", 0.315], ["海岸", 0.55]], "rate": 1, "poster": 0.292}
// @part draw
function coastScene(k,A,cam){
 const f=cam;
 if(A){
   k.fillStyle=grad(k,0,0,0,400,[[0,'#2c3547'],[.75,'#8a766b'],[1,'#474559']]);k.fillRect(0,0,720,400);
   const vec=280-f*.08;
   shape(k,[[0,313],[vec,225],[720,303],[720,400],[0,400]],'#434457');
   for(let i=1;i<9;i++)line(k,[[vec,225],[i*126-241,400]],'#d9b28b57',1);
   for(let x=-120;x<880;x+=156){
     const X=x-f*.31;
     rr(k,X,82,130,195,3,'#a27b64');rr(k,X+7,89,115,180,3,'#333b4d');
     rr(k,X+13,110,101,53,4,'#efc38c');shape(k,[[X+13,160],[X+44,137],[X+68,147],[X+101,132],[X+113,146],[X+113,163]],'#7b6870');
     line(k,[[X+56,88],[X+56,270]],'#d9b18b',2);
     line(k,[[X-9,91],[X-9,287]],'#cfa47e80',2);
   }
   shape(k,[[0,288],[720,288],[720,303],[0,318]],'#625461');
   line(k,[[0,323],[720,304]],'#e9b770',4);
   line(k,[[78-f*.23,0],[78-f*.23,38]],'#413f4b',3);rr(k,29-f*.23,37,101,27,1,'#bd916b');word(k,'站台',60-f*.23,56,15,'#262b3a',700);
 }else{
   k.fillStyle=grad(k,0,0,0,400,[[0,'#655c73'],[.56,'#e3a68a'],[.61,'#dfa188'],[1,'#1c5a61']]);k.fillRect(0,0,720,400);
   dot(k,516-f*.042,146,49,'#f6c495');
   shape(k,[[0,217],[84,162],[171,189],[246,151],[351,219],[447,202],[571,229],[720,188],[720,283],[0,289]],'#6c6978');
   shape(k,[[0,245],[164,211],[226,226],[291,209],[518,262],[720,221],[720,294],[0,309]],'#57727b');
   k.fillStyle=grad(k,0,250,0,400,[[0,'#487d82'],[1,'#234b58']]);k.fillRect(0,250,720,150);
   for(let i=0;i<68;i++){const x=noise(i+351)*760-f*.08,y=252+noise(i+35)*146;line(k,[[x,y],[x+8+noise(i+70)*65,y]],i%3?'#afc3af46':'#f5c49868',1);}
   const x=618-f*.15;
   shape(k,[[x-7,252],[x+6,214],[x+14,214],[x+21,252]],'#eee0b4');
   rr(k,x+3,208,13,7,2,'#a25655');dot(k,x+9,209,1.9,'#f7dd98');
   shape(k,[[0,375],[157-f*.31,332],[264-f*.31,345],[424-f*.31,394],[720,394],[720,400],[0,400]],'#594f64');
   line(k,[[0,346],[146-f*.31,310],[251-f*.31,323]],'#ccb498',3);
   for(let j=0;j<4;j++){const u=18+j*55-f*.31;line(k,[[u,346-j*8],[u,372-j*7]],'#ad9b8e',2);}
 }
}

feature.s08=(k,w,h,t)=>{
 const z=t/4.3,cross1=speedCurve(.255,.375,z),cross2=speedCurve(.796,.916,z);
 const second=z>.58,u=second?cross2:cross1;
 const A=second?u>=.5:u<.5;
 const cam=second?(A?(u-1)*356:178+u*178):(A?u*356:(u-.5)*356);
 coastScene(k,A,cam);
 if(u<=0||u>=1)return;
 const W=730,x=740-(740+W+20)*u;
 const face=(a,b,y1,y2)=>[[a,y1],[b,y1],[b,y2],[a,y2]];
 // Vertical edges remain vertical. Only the receding face changes with viewpoint.
 const dist=(u-.5)*2,depth=56*Math.min(1,Math.abs(dist)*2);
 const a=x,b=x+W;
 if(dist<0)shape(k,[[a-depth,-8],[a,-56],[a,454],[a-depth,407]],'#4c4044');
 else shape(k,[[b,-56],[b+depth,-8],[b+depth,407],[b,454]],'#493d45');
 const C=face(a,b,-56,454);
 const dim=.10*Math.sin(Math.PI*u);
 if(dim>0) {k.fillStyle='rgba(21,18,27,'+dim+')';k.fillRect(0,0,w,h);}
 const g=grad(k,a,0,b,0,[[0,'#63545100'],[.005,'#6f5954'],[.12,'#97786b'],[.72,'#735d59'],[.995,'#49373b'],[1,'#49373b00']]);
 shape(k,C,g);
 k.save();k.beginPath();C.forEach(([X,Y],i)=>i?k.lineTo(X,Y):k.moveTo(X,Y));k.closePath();k.clip();
 for(let i=1;i<4;i++)line(k,[[a,100*i],[b,100*i]],'#aa92816b',1.5);
 for(let i=0;i<100;i++){const X=a+noise(i+59)*W,Y=noise(i+177)*h;line(k,[[X,Y],[X+9+noise(i)*14,Y]],'#b49b8029',.65);}
 k.restore();
};
