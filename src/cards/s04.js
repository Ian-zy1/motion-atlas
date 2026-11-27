// @card {"id": "s04", "name": "形状变形", "en": "Shape Morph", "study": true, "group": "形状与材质", "seconds": 2.9, "dims": [720, 400], "desc": "直线弯成正圆，停一拍再收成定位针，最后回到直线。", "prompt": "让[起始轮廓]连续变形成[目标轮廓]。控制同一条轮廓的锚点和切线，不淡入替换、不凭空长出无关联细节。在[中间轮廓]停一拍，落定前给一次短促回弹。", "tags": ["轮廓变形", "线条变成图标", "圆变成定位针", "形状变来变去", "一条连续的线"], "category": "图形 · 弯曲 / 变形", "note": "先停在正圆；收尖后约 6.5% 回弹，再复原。", "beats": [["直线", 0.02], ["闭合成环", 0.33], ["定位图标", 0.65]], "rate": 1, "poster": 0.65}
// @part draw
feature.s04=(k,w,h,t)=>{
 const z=t/2.9, p=speedCurve(.03,.275,z)-speedCurve(.82,.995,z);
 const u=clamp((z-.385)/.245), b=5.3, a=4.60;
 const spring=1-Math.exp(-a*u)*(Math.cos(b*u)+(a/b)*Math.sin(b*u));
 const settled=mix(spring,1,speedCurve(.77,1,u));
 const f=settled*(1-speedCurve(.71,.82,z));
 k.clearRect(0,0,w,h);
 const cx=360,cy=196-13*f,L=183,theta=Math.PI*p;
 const pts=Array.from({length:141},(_,i)=>{
  const s=i/70-1;if(theta<1e-6)return[cx+L*s,cy];
  const r=L/theta,v=s*theta,Y=r*(1-Math.cos(v))-p*p*r;
  return[cx+r*Math.sin(v)*(1-.46*f*Math.max(0,Y/65)),cy+Y+49*f*Math.abs(s)**10];
 });
 k.lineCap='round';k.lineJoin='round';line(k,pts,'#285548',7.4);
};
