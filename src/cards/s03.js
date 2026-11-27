// @card {"id": "s03", "name": "希区柯克变焦", "en": "Dolly Zoom", "study": true, "group": "带人看空间", "seconds": 4.6, "dims": [720, 400], "desc": "镜头往前走，同时拉广焦距，正中的旅人保持一样大，走廊却像往深处退开。", "prompt": "对准[主体]沿镜头轴[推进或后拉]，同时反向调整焦距，始终保持主体在画面中的尺寸和位置几乎不变。让[背景中的纵深参照]明显拉伸或压缩。把[情绪转折]放在透视最强的一拍，不要直接缩放整帧。", "tags": ["镜头推近背景拉远", "走廊变长", "希区柯克", "眩晕", "主体大小不变", "透视变化"], "category": "空间 · 镜头 / 透视", "note": "周期与循环一致；接触影始终锚在地面脚点，不再自行旋转。", "beats": [["原始透视", 0.08], ["空间拉开", 0.54], ["回到原位", 0.991]], "rate": 1, "poster": 0.54}
// @part traveler
function dollyTraveler(k,x,y,t){
 const breath=Math.sin(t/4.6*2*Math.PI)*.48;
 k.save();k.translate(x,y);
 const shirt=grad(k,-40,10,36,128,[[0,'#edb28b'],[.55,'#ba6958'],[1,'#693f49']]);
 const skin=grad(k,-18,-23,18,0,[[0,'#f5c3a1'],[1,'#b67969']]);
 const trousers=grad(k,-28,88,31,157,[[0,'#526576'],[1,'#263741']]);
 roundPoly(k,[[-29,85],[20,86],[26,122],[24,158],[7,159],[2,115],[-7,158],[-24,157],[-22,121]],5,trousers);
 roundPoly(k,[[-24,151],[-8,152],[-8,164],[-34,165],[-34,160]],3,'#213136');
 roundPoly(k,[[8,151],[24,151],[32,163],[10,165]],3,'#213136');
 k.translate(0,breath);
 k.beginPath();k.moveTo(-4,6);k.bezierCurveTo(-17,9,-31,18,-34,33);k.bezierCurveTo(-40,54,-45,78,-29,87);k.lineTo(-18,108);k.bezierCurveTo(-3,110,16,105,26,100);k.lineTo(27,72);k.bezierCurveTo(38,51,40,22,21,9);k.closePath();k.fillStyle=shirt;k.fill();
 line(k,[[18,20],[10,42],[12,62],[16,79]],'#f6c6a368',2);
 k.beginPath();k.moveTo(17,30);k.bezierCurveTo(39,24,47,34,48,65);k.lineTo(43,92);k.quadraticCurveTo(31,101,22,90);k.lineTo(19,48);k.closePath();k.fillStyle='#365765';k.fill();
 line(k,[[26,55],[43,54],[44,77],[29,79]],'#b1aa8d',1.4);line(k,[[25,46],[38,37],[43,40]],'#6d8a87',1.3);
 shape(k,[[-12,-3],[6,-2],[10,13],[-8,18],[-14,11]],'#bc8271');
 k.beginPath();k.moveTo(-18,-15);k.bezierCurveTo(-20,-32,7,-34,17,-21);k.lineTo(20,-9);k.lineTo(26,-3);k.lineTo(20,0);k.lineTo(17,8);k.quadraticCurveTo(5,15,-5,6);k.lineTo(-15,-4);k.closePath();k.fillStyle=skin;k.fill();
 k.beginPath();k.moveTo(-19,-13);k.bezierCurveTo(-28,-25,-16,-39,0,-39);k.quadraticCurveTo(19,-38,22,-25);k.quadraticCurveTo(29,-24,36,-21);k.quadraticCurveTo(30,-17,16,-19);k.lineTo(-4,-15);k.lineTo(-11,-2);k.closePath();k.fillStyle='#303d4d';k.fill();
 dot(k,15,-10,1.45,'#3f3440');line(k,[[17,2],[21,1]],'#915b5c',1);dot(k,-7,-5,3.2,'#ca8b7a');
 k.restore();
}
// @part draw
feature.s03=(k,w,h,t)=>{
 const q=t/4.6,a=speedCurve(.12,.50,q)-speedCurve(.63,.98,q),D=mix(10.1,2.58,a),F=106*D;
 const ox=360,oy=160,P=(x,y,z)=>[ox+x*F/(z+D),oy+y*F/(z+D)];
 k.fillStyle='#282a3b';k.fillRect(0,0,w,h);
 const wall=(X,Y,Z,XX,YY,ZZ,c)=>shape(k,[P(X,Y,Z),P(XX,Y,Z),P(XX,YY,ZZ),P(X,YY,ZZ)],c);
 const fade=(z,n=0)=>`hsl(${n?246:233} ${n?24:20}% ${26+z*.67}%)`;
 const zmax=22;
 shape(k,[P(-4,1.55,-2),P(4,1.55,-2),P(4,1.55,zmax),P(-4,1.55,zmax)],'#413d50');
 shape(k,[P(-4,-2.65,-2),P(4,-2.65,-2),P(4,-2.65,zmax),P(-4,-2.65,zmax)],'#333143');
 wall(-4,-2.65,zmax,4,1.55,zmax,'#c78d69');
 for(const side of [-1,1]){
  shape(k,[P(side*4,-2.65,-2),P(side*4,-2.65,zmax),P(side*4,1.55,zmax),P(side*4,1.55,-2)],'#3f435a');
  for(let z=20;z>=-1;z-=3){
   const X=side*3.98;
   shape(k,[P(X,-1.99,z),P(X,-1.99,z+1.8),P(X,.77,z+1.8),P(X,.77,z)],fade(z,1));
   line(k,[P(X,-1.99,z),P(X,.77,z)],'#bf957c',1.45);
   line(k,[P(X,-1.56,z),P(X,-1.56,z+1.72)],'#d6a38c',1.3);
  }
 }
 for(let x=-4;x<=4;x+=.7)line(k,[P(x,1.55,-2),P(x,1.55,zmax)],'#d4a68956',1);
 for(let z=21;z>=-1;z-=2){
  line(k,[P(-4,1.55,z),P(4,1.55,z)],'#cbad9066',1);
  if(z%4===1){const A=P(-3.96,-2.55,z),B=P(3.96,-2.55,z);line(k,[A,B],'#e4af86',2.2);for(const side of [-1,1]){const H=P(side*3.92,-2.55,z);line(k,[H,P(side*3.92,1.55,z)],'#e4af868c',2);}}
 }
 const glow=k.createRadialGradient(360,170,6,360,170,240);glow.addColorStop(0,'#ffcd8f34');glow.addColorStop(1,'#1d243400');k.fillStyle=glow;k.fillRect(0,0,w,h);
 // The traveler lives on the focal plane z=0: the d factor cancels exactly.
 const [cx,cy]=P(0,0,0);
 // Ground-plane shadow points use the same perspective as the floor.
 const ground=P(0,1.55,0), far=P(.15,1.55,1.50);
 softShadow(k,ground[0],ground[1]+2,43,8.5,.61);
 softShadow(k,ground[0],(ground[1]+far[1])/2,34,Math.abs(ground[1]-far[1])*.53+3,.26);
 dollyTraveler(k,cx,cy,t);
 const vignette=k.createRadialGradient(360,195,115,360,195,421);vignette.addColorStop(0,'#171a2700');vignette.addColorStop(1,'#171a2780');k.fillStyle=vignette;k.fillRect(0,0,w,h);
};
