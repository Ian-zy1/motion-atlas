const feature={};
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=(a,b,x)=>{x=clamp((x-a)/(b-a));return x*x*(3-2*x)};
const noise=(n)=>{let a=Math.sin(n*73.194+15.454)*75358.128;return a-Math.floor(a);};
function shape(k, pts, color){
 k.fillStyle=color;k.beginPath();pts.forEach(([x,y],i)=>i?k.lineTo(x,y):k.moveTo(x,y));k.closePath();k.fill();
}
function grad(k,x,y,x2,y2,stops){const g=k.createLinearGradient(x,y,x2,y2);stops.forEach(([a,b])=>g.addColorStop(a,b));return g;}
function label(k,text,x,y,color='#f4e6c8',size=12){k.fillStyle=color;k.font='600 '+size+'px ui-monospace, monospace';k.fillText(text,x,y);}
