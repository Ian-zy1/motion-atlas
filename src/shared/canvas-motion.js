// Quintic ramps give both velocity and acceleration continuous endpoints.
const flow=(a,b,t)=>{const v=clamp((t-a)/(b-a));return v*v*v*(10+v*(-15+6*v));};
const mix=(a,b,t)=>a+(b-a)*t;
function roundPoly(k,points,r,fill,stroke){
  k.beginPath();
  points.forEach((p,i)=>{
    const a=points[(i+points.length-1)%points.length],b=points[(i+1)%points.length];
    const ta=Math.min(.4,r/Math.max(1,Math.hypot(a[0]-p[0],a[1]-p[1]))),tb=Math.min(.4,r/Math.max(1,Math.hypot(b[0]-p[0],b[1]-p[1])));
    const x=mix(p[0],a[0],ta),y=mix(p[1],a[1],ta);
    i?k.lineTo(x,y):k.moveTo(x,y);k.quadraticCurveTo(p[0],p[1],mix(p[0],b[0],tb),mix(p[1],b[1],tb));
  });
  k.closePath();k.fillStyle=fill;k.fill();if(stroke){k.strokeStyle=stroke;k.lineWidth=1;k.stroke();}
}
function line(k, pts, color, width=1){
 k.beginPath();pts.forEach(([x,y],i)=>i?k.lineTo(x,y):k.moveTo(x,y));k.strokeStyle=color;k.lineWidth=width;k.stroke();
}
function rr(k,x,y,w,h,r,color){k.beginPath();k.roundRect(x,y,w,h,r);k.fillStyle=color;k.fill();}
function dot(k,x,y,r,color){k.beginPath();k.arc(x,y,r,0,Math.PI*2);k.fillStyle=color;k.fill();}
function word(k,s,x,y,size,clr,weight=800,family='system-ui,sans-serif'){k.font=weight+' '+size+'px '+family;k.fillStyle=clr;k.fillText(s,x,y);}


