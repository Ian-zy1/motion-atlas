// @card {"id": "a107", "name": "多层景深运镜", "en": "Multiplane Camera", "group": "带人看空间", "seconds": 6.8, "dims": [720, 400], "desc": "从松枝间推向湖心亭：湖面水纹与倒影也依深度前移，远山变化最小。", "prompt": "沿同一消失点穿过[前景遮挡物]，推向[中景主体]，以[远景参照物]保持空间方向。按深度分配缩放和位移，近处出画快，远处变化小；[地面或水面纹理]跟随其所在平面，不要钉在屏幕上。", "tags": ["层次", "插画", "视差", "远近", "推入世界", "把平面做出纵深", "镜头穿过前景看到里面"], "slug": "multiplane-camera", "category": "动态示意", "note": "原创插画演示 · 依据 VFX Atlas 手法", "beats": [["层次建立", 0], ["水面推进", 0.29], ["推近湖心", 0.53], ["缓退归位", 0.8]], "poster": 0.4, "playUntil": 0.56}
// @part draw
// 107 / Camera moves along the optical axis; all planes share the same vanishing point.
function atlas107Scale(depth, travel){return depth/(depth-travel);}
function atlas107Travel(t){
 const z=t/6.8;
 return .89*(flow(0,.53,z)-flow(.565,1,z));
}
function atlas107Water(x,y,travel){
 const vx=387,vy=218,depth=274/(y-vy),s=atlas107Scale(depth,travel);
 return [vx+(x-vx)*s,vy+(y-vy)*s,s];
}
function atlas107Pine(k,x,y,h,col,seed){
 k.save();k.translate(x,y);k.scale(h/100,h/100);
 const n=i=>noise(seed+i), bend=12*(n(5)-.5);
 shape(k,[[-3,0],[bend-1,-92],[bend+1,-99],[4,0]],col);
 for(let j=0;j<10;j++){
  const d=j/9, yy=-94+75*d, x=bend*(1-d), rad=3+27*d;
  const l=rad*(.68+n(j)*.48),r=rad*(.68+n(j+20)*.48);
  k.beginPath();k.moveTo(x,yy-10);
  k.quadraticCurveTo(x-l*.47,yy+1,x-l,yy+9);
  k.quadraticCurveTo(x-l*.62,yy+11,x-l*.49,yy+8);
  k.lineTo(x-l*.57,yy+15);k.quadraticCurveTo(x,yy+12,x+r*.55,yy+15);
  k.lineTo(x+r*.42,yy+9);k.quadraticCurveTo(x+r*.63,yy+13,x+r,yy+8);
  k.quadraticCurveTo(x+r*.38,yy+1,x,yy-10);k.fillStyle=col;k.fill();
 }
 k.restore();
}
feature.a107=(k,w,h,t)=>{
 const vx=387,vy=218, move=atlas107Travel(t);
 const plane=(depth,fn)=>{
  const s=atlas107Scale(depth,move);k.save();k.translate(vx,vy);k.scale(s,s);k.translate(-vx,-vy);fn();k.restore();
 };
 k.fillStyle=grad(k,0,0,0,400,[[0,'#243d4a'],[.22,'#54747e'],[.53,'#dbab8a'],[.70,'#edbc96'],[1,'#648887']]);k.fillRect(0,0,w,h);
 plane(32,()=>{
  const sky=k.createRadialGradient(482,134,6,482,134,172);
  sky.addColorStop(0,'#ffcea3b0');sky.addColorStop(.5,'#f6a88c4a');sky.addColorStop(1,'#ffe7af00');
  k.fillStyle=sky;k.fillRect(290,-48,400,380);
  dot(k,482,134,31,'#f8dbaf');
  for(let i=0;i<15;i++){
   const y=73+i*8.5,x=-45+noise(i+29)*600,len=45+noise(i+76)*190;
   k.fillStyle=grad(k,x,0,x+len,0,[[0,'#ffedd800'],[.52,'#ffedd845'],[1,'#ffedd800']]);
   k.beginPath();k.ellipse(x+len*.5,y,len*.5,.6+noise(i+10)*1.9,-.021,0,Math.PI*2);k.fill();
  }
 });
 function ridge(points,color,snow){
  const under=grad(k,0,108,0,319,[[0,color],[.8,'#82989b'],[1,'#b7a59c']]);
  shape(k,[...points,[965,430],[-245,430]],under);
  if(snow)for(const [x,y,b] of [[91,142,45],[223,118,64],[555,145,51],[641,125,50]]){
   shape(k,[[x,y],[x+b*.34,y+14],[x+b*.76,y+41],[x+b*.17,y+23],[x+b*.22,y+38],[x-4,y+18],[x-b*.41,y+29]],'#e4c6b475');
   shape(k,[[x,y],[x-6,y+19],[x-b*.18,y+48],[x-b*.53,y+54],[x-b*.41,y+29]],'#52657385');
  }
 }
 plane(17,()=>ridge([[-240,228],[-60,191],[-2,169],[49,184],[91,142],[150,180],[181,176],[223,118],[245,134],[276,169],[312,186],[347,170],[420,203],[474,181],[506,188],[555,145],[584,173],[641,125],[710,184],[775,166],[912,200]],'#617989',true));
 plane(10,()=>ridge([[-230,230],[-41,202],[42,192],[93,202],[145,193],[213,225],[266,224],[310,236],[354,223],[411,241],[475,221],[521,225],[609,190],[640,196],[699,171],[755,194],[920,190]],'#537d80'));
 // Inverse projection of a horizontal plane: base screen row encodes world depth.
 const lake=grad(k,0,242,0,400,[[0,'#a6aaa0'],[.33,'#6f9290'],[.74,'#375d65'],[1,'#274650']]);
 k.fillStyle=lake;k.fillRect(0,atlas107Water(387,244,move)[1],720,400);
 const drawRipple=(x,y,l,weight,bright)=>{
  const [px,py,s]=atlas107Water(x,y,move),span=l*s;
  if(py>401||px>721||px+span<0)return;
  const hue=bright?'255,199,148':'198,217,201';
  k.fillStyle=grad(k,px,0,px+span,0,[[0,`rgba(${hue},0)`],[.47,`rgba(${hue},${weight})`],[1,`rgba(${hue},0)`]]);
  k.fillRect(px,py,span,(.5+.85*(y-246)/155)*s);
 };
 for(let i=0;i<178;i++){
  const u=(i+1)/179,y=248+156*u,x=-38+noise(i+40)*798;
  drawRipple(x,y,(12+noise(i+215)*87)*(.22+.82*u),i%6?.27:.42,i%6===0);
 }
 for(let i=0;i<38;i++){
  const u=(i+1)/39,y=250+154*u,x=479+(noise(i+593)-.5)*(36+u*146),l=6+noise(i+88)*u*37;
  drawRipple(x,y,l,i%4?.42:.57,true);
 }
 plane(5.1,()=>{
  shape(k,[[-255,214],[-38,204],[77,216],[137,223],[190,244],[240,256],[309,258],[328,266],[229,275],[103,279],[-248,291]],'#385f60');
  shape(k,[[403,259],[460,249],[508,244],[573,217],[648,203],[729,198],[919,179],[929,278],[643,282],[514,268]],'#355858');
  for(let i=0;i<66;i++){const x=-44+i*12;if(x>225&&x<501)continue;const y=x<225?211+(x+45)*.24:252-(x-500)*.22;atlas107Pine(k,x,y,11+noise(i)*27,i%5?'#335b5c':'#426a66',978+i);}
  const haze=grad(k,0,233,0,281,[[0,'#e7bfaa00'],[.48,'#e9d4bd72'],[1,'#d9cfb700']]);k.fillStyle=haze;k.fillRect(-130,233,980,48);
 });
 plane(3.2,()=>{
  // Island, reflected roof and warm window remain attached to one middle plane.
  const land=[[237,295],[262,287],[295,285],[324,277],[371,275],[400,281],[419,280],[444,286],[418,295],[357,306],[279,307]];
  shape(k,land.map(([x,y])=>[x,596-y]),'#33545c68');
  shape(k,land,'#24474c');line(k,[[241,296],[287,302],[359,304],[415,293]],'#b0b19c70',1);
  for(let i=0;i<10;i++){const x=250+i*16;if(x>332&&x<390)continue;atlas107Pine(k,x,289-noise(i)*5,17+noise(i+98)*26,i%3?'#26484d':'#365957',285+i);}
  shape(k,[[329,261],[384,258],[386,281],[330,282]],'#203c40');
  shape(k,[[326,261],[343,252],[354,237],[367,235],[387,253],[395,256],[386,260],[343,263]],'#233a40');
  shape(k,[[329,260],[343,250],[356,237],[366,235],[353,251],[342,262]],'#a68c74');
  line(k,[[324,262],[344,262],[390,258]],'#d7b3959b',1);
  rr(k,347,265,23,13,1,'#f2b378');k.fillStyle='#7e503e';k.fillRect(357,265,2,13);
  for(let i=0;i<8;i++) {const x=347+noise(i+560)*22;k.fillStyle='#ffbe7c42';k.fillRect(x,290+i*1.9,4+noise(i+40)*14,1.2);}
 });
 plane(1.95,()=>{
  shape(k,[[-225,285],[-28,290],[23,311],[104,318],[154,347],[219,361],[269,400],[-240,456]],'#19383d');
  shape(k,[[545,428],[581,388],[627,369],[667,327],[725,298],[938,279],[955,441]],'#1b393e');
  for(let i=0;i<28;i++){const left=i<15,x=left?-32+i*15:572+(i-15)*16,y=left?303+(x+36)*.38:373-(x-572)*.35;atlas107Pine(k,x,y,18+noise(i+300)*64,i%3?'#1e4245':'#315450',i+845);}
 });
 plane(1.34,()=>{
  shape(k,[[-150,345],[28,357],[88,375],[160,408],[234,470],[-180,470]],'#102830');
  shape(k,[[609,432],[667,378],[711,356],[777,336],[904,331],[914,470]],'#132c33');
  [[60,387,246,-12],[19,372,150,0],[117,408,111,40],[677,378,205,53],[639,401,123,85],[722,351,205,92]].forEach(([x,y,h,n])=>atlas107Pine(k,x,y,h,'#112a31',n));
 });
 const shade=k.createRadialGradient(386,211,145,386,211,450);shade.addColorStop(0,'#13202a00');shade.addColorStop(1,'#10202b58');k.fillStyle=shade;k.fillRect(0,0,w,h);
};

