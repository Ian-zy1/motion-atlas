// @card {"id": "s01", "name": "爆炸分解", "en": "Exploded View", "study": true, "group": "讲清结构", "seconds": 5.6, "dims": [720, 400], "desc": "一台便携播放器沿同一根轴拆成面板、内部部件和后壳，停一拍看清对应关系，再依次装回。", "prompt": "把[设备或物件]从完整状态沿[拆解轴]依次移开[部件列表]。保持各部件的形状、装配顺序和尺度不变；完全展开时留出阅读[标注]的时间。回装时让真实接触先发生，再给轻微机械顿挫。", "tags": ["分层", "机械", "零件拆开再装回", "展示内部结构", "拆解", "组装"], "category": "结构 · 分离 / 回装", "note": "固定厚度四壁；面板贴合后机身短震。", "beats": [["整机", 0.07], ["刚拆开", 0.3], ["完全拆开", 0.55], ["装回", 0.994]], "rate": 1, "poster": 0.55}
// @part draw
feature.s01=(k,w,h,t)=>{
 const z=t/5.6;
 const lock=.946, r=speedCurve(.12,.44,z)*(1-speedCurve(.64,.926,z));
 const strike=z<.926?4:4*(1-Math.pow(clamp((z-.926)/(lock-.926)),2.45));
 const clap=z<lock?0:1.45*Math.exp(-84*(z-lock))*Math.sin((z-lock)*180);
 const travel=[-162,-80,0,82,166];
 const move=travel.map(x=>x*r);
 const scale=1.18-.18*(speedCurve(.12,.54,z)-speedCurve(.71,1,z));
 const bg=grad(k,0,0,600,400,[[0,'#f7eee0'],[.66,'#e7dbc9'],[1,'#c6b8a3']]);
 k.fillStyle=bg;k.fillRect(0,0,w,h);
 const P=(x,y,d)=>[360+clap+(x*.83+y*.18+d)*scale,196+clap*.42+(-x*.225+y*.81+d*.35)*scale];
 const quad=(d,x,y,W,H)=>[P(x,y,d),P(x+W,y,d),P(x+W,y+H,d),P(x,y+H,d)];
 function solid(d,x,y,W,H,Z,a,b,c,r=6){
  const A=quad(d,x,y,W,H),B=quad(d+Z,x,y,W,H);
  roundPoly(k,B,r,b);
  shape(k,[A[0],A[1],B[1],B[0]],b);shape(k,[A[1],A[2],B[2],B[1]],c);
  shape(k,[A[2],A[3],B[3],B[2]],c);shape(k,[A[3],A[0],B[0],B[3]],b);
  roundPoly(k,A,r,a,'#26343344');
  line(k,[P(x+9,y+1,d),P(x+W-9,y+1,d)],'#fff5d95e',1.25);
 }
 function disc(d,x,y,r,c){shape(k,Array.from({length:56},(_,j)=>P(x+Math.cos(j/56*Math.PI*2)*r,y+Math.sin(j/56*Math.PI*2)*r,d)),c);}

 const f=[0,12,23,32,45].map((x,i)=>x+move[i]-(i===0?strike*speedCurve(.70,.85,z):0));
 const separate=(speedCurve(.22,.42,z)-speedCurve(.65,.79,z));
 softShadow(k,366,338,160+95*separate,26,.32);
 for(let i=0;i<5;i++){const [x,y]=P(20,98,f[i]);softShadow(k,x,y+25,59,16,.26*separate);}
 if(separate>.02){k.save();k.globalAlpha=separate;k.setLineDash([5,5]);line(k,[P(-56,50,f[0]-32),P(-56,50,f[4]+45)],'#526760af',1);k.restore();}
 const rear=f[4],mouth=rear-46;
 // Draw an open cup: far walls, inner parts, near walls/rim, then parts already outside.
 const A=quad(mouth,-74,-67,148,134),B=quad(rear+2,-74,-67,148,134);
 const a=quad(mouth,-67,-60,134,120),b=quad(rear,-67,-60,134,120);
 solid(rear,-74,-67,148,134,17,'#59736a','#85988a','#304844',8);
 function wall(i,col){const j=(i+1)%4;roundPoly(k,[A[i],A[j],B[j],B[i]],3,col);}
 function rim(i){const j=(i+1)%4;shape(k,[A[i],A[j],a[j],a[i]],'#a3ac94');}
 function insideSurface(i,col){const j=(i+1)%4;shape(k,[a[i],a[j],b[j],b[i]],col);}
 wall(0,'#78938a');wall(3,'#647e74');
 insideSurface(0,'#47645c');insideSurface(3,'#36574f');rim(0);rim(3);
 function part(i){
  const f0=f[i];
  if(i===3){solid(f0,-58,-48,113,96,10,'#c09454','#e3be77','#8d5c38');for(let n=0;n<3;n++){const y=-25+n*24;shape(k,quad(f0-1,-47,y,86,5),'#f1c98c');}}
  if(i===2){solid(f0,-61,-53,122,106,5,'#3f796e','#91a591','#274d48');solid(f0-2,-25,-28,52,51,2,'#313e42','#546064','#202937',3);
  for(let j=-23;j<28;j+=8){line(k,[P(j,-35,f0-3),P(j,-28,f0-3)],'#f8d08e',1.4);line(k,[P(j,23,f0-3),P(j,31,f0-3)],'#f8d08e',1.4);}
  for(let j=0;j<4;j++)line(k,[P(-48,28+j*5,f0-1),P(54,28+j*5,f0-1)],'#bcd8a58f',1);}
  if(i===1){solid(f0,-62,-56,124,112,7,'#e6d5b6','#f6e4be','#a29578');for(const [R,C] of [[41,'#5c736e'],[34,'#264744'],[28,'#aeb7a5'],[18,'#405857']])disc(f0-1,0,2,R,C);}
 }
 for(let i=3;i>=1;i--)if(f[i]>=mouth)part(i);
 wall(1,'#45635c');wall(2,'#324f49');insideSurface(1,'#658078');insideSurface(2,'#506960');rim(1);rim(2);
 for(let i=3;i>=1;i--)if(f[i]<mouth)part(i);
 const front=f[0];
 solid(front,-75,-68,150,136,11,'#b95d49','#d98e69','#803e36',9);
 roundPoly(k,quad(front-1,-52,-48,104,40),5,'#233b37');
 roundPoly(k,quad(front-2,-46,-42,92,28),3,'#d3ca97');
 line(k,Array.from({length:26},(_,j)=>P(-36+j*2.8,-28+Math.sin(j*.87)*4,front-3)),'#567365',1.5);
 for(const [R,C] of [[25,'#8d493b'],[21,'#e8c884'],[16,'#f5dc9e'],[5,'#76624e']])disc(front-1,14,34,R,C);
 for(let j=0;j<4;j++)line(k,[P(-49,23+j*5,front-2),P(-25,23+j*5,front-2)],'#f0ad807c',1.3);
 const guides=speedCurve(.38,.53,z)-speedCurve(.61,.72,z);
 if(guides>.02){k.save();k.globalAlpha=guides;const names=['面板','扬声组件','电路板','电池','后壳'];
   [101,230,360,490,614].forEach((x,i)=>{const A=P(0,-68,f[i]),y=49;line(k,[A,[x,y+12]],'#5b706777',1);dot(k,...A,2,'#537063');k.textAlign='center';word(k,names[i],x,y,15,'#304941',700);});k.restore();}
};

