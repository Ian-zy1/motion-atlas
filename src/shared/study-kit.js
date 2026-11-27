// Six revised motion studies. The original reference cards keep their own renderers.
const speedCurve=(a,b,t)=>{const u=clamp((t-a)/(b-a));return (1-Math.cos(Math.PI*u))*.5;};
const oval=(k,x,y,rx,ry,fill)=>{k.beginPath();k.ellipse(x,y,rx,ry,0,0,Math.PI*2);k.fillStyle=fill;k.fill();};
const softShadow=(k,x,y,rx,ry,a)=>{
 k.save();k.translate(x,y);k.scale(rx,ry);
 const g=k.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,'rgba(18,29,31,'+a+')');g.addColorStop(1,'rgba(18,29,31,0)');
 k.fillStyle=g;k.fillRect(-1,-1,2,2);k.restore();
};
