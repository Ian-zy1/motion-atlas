// @card {"id": "a159", "name": "狭缝扫描", "en": "Slit-Scan Photography", "group": "切换画面", "seconds": 5.8, "dims": [720, 400], "desc": "持续采样一条虚拟窄缝，把不同时刻的颜色沿深度展开。看亮斑如何顺着光轨掠出画框。", "prompt": "固定[消失点位置]，持续采样一条虚拟狭缝里的[光源、纹理和配色]，把不同时刻的采样沿深度排开。近处的光轨变宽、亮部顺光轨掠过；光带保留暗隙，不用外扩圆环或静态扇形射线。在[目标色调或场景]收束。", "tags": ["穿梭", "隧道", "光轨", "光带", "科幻", "从一个空间进入另一个空间", "穿过一道光门"], "slug": "slit-scan-photography", "category": "动态示意", "note": "原创数字示意 · 虚拟窄缝采样，不是光学实拍", "beats": [["细光起势", 0.18], ["亮斑掠过", 0.44], ["暖色尾迹", 0.7]], "poster": 0.44}
// @part draw
// 159 / Sample a moving virtual slit at earlier times for farther layers.
// A fixed lens and fixed vanishing point, not a set of static wedges.
const atlas159Banks=[
 [-2.93,.24,.62,[73,133,162]],[-2.47,.15,.92,[237,127,87]],[-2.17,.085,.72,[252,173,112]],
 [-1.58,.083,.44,[81,155,170]],[-1.23,.22,.61,[52,125,148]],[-.69,.11,.88,[108,203,191]],
 [-.41,.17,.95,[184,228,193]],[.105,.19,.45,[93,154,155]],[.48,.175,.76,[211,131,94]],
 [.91,.21,.89,[255,169,109]],[1.19,.13,.76,[248,202,137]],[1.76,.17,.46,[108,135,164]],
 [2.33,.22,.74,[157,100,126]],[2.73,.088,.53,[236,144,149]]];
function atlas159Scan(j,phase,q){
 const [a,b,strength,rgb]=atlas159Banks[j], wind=phase-q*5.9;
 const burst=Math.pow(.5+.5*Math.sin(wind*2+a*3.5),8);
 const density=.25+.44*(.5+.5*Math.sin(wind+a*2.1))+.45*burst;
 return [a+.054*Math.sin(wind+a)+.014*Math.sin(wind*2+a*3), b*(.87+.24*Math.sin(wind+a*4.7)+.30*burst), strength*density, rgb,burst];
}
feature.a159=(k,w,h,t)=>{
 const f=t>=5.8?0:t/5.8*Math.PI*2, x0=365,y0=205,N=39;
 const bg=k.createRadialGradient(x0,y0,2,x0,y0,412);bg.addColorStop(0,'#253e41');bg.addColorStop(.14,'#15232d');bg.addColorStop(.45,'#0d151e');bg.addColorStop(1,'#070e16');k.fillStyle=bg;k.fillRect(0,0,w,h);
 const XY=(a,r)=>[x0+Math.cos(a)*r*1.66,y0+Math.sin(a)*r];
 k.globalCompositeOperation='screen';
 for(let j=0;j<atlas159Banks.length;j++){
  const rows=[];
  for(let i=0;i<=N;i++){const q=i/N,r=7*Math.pow(74,q),[a,b,l,[R,G,B],burst]=atlas159Scan(j,f,q);rows.push({a,b,r,l,R,G,B,burst});}
  for(let lane=0;lane<4;lane++){
   const d=[0,.22,-.30,.57][lane], thickness=[1.65,.54,.13,.075][lane], gain=[.12,.46,.67,.38][lane];
   const {R,G,B}=rows[0];
   k.fillStyle=grad(k,x0,y0,...XY(atlas159Banks[j][0],410),[[0,`rgba(${R},${G},${B},0)`],[.07,`rgba(${R},${G},${B},${gain*.64})`],[.53,`rgba(${R},${G},${B},${gain})`],[1,`rgba(${R},${G},${B},${gain*.62})`]]);
   k.beginPath();
   const edge=(p,sgn)=>XY(p.a+(d+sgn*thickness*(.63+.31*p.l))*p.b,p.r);
   rows.forEach((p,i)=>{const xy=edge(p,1);i?k.lineTo(...xy):k.moveTo(...xy);});
   for(let i=N;i>=0;i--)k.lineTo(...edge(rows[i],-1));
   k.closePath();k.fill();
  }
  // Short exposure packets vary along the depth axis with the sampled source.
  for(let i=4;i<N;i+=2){
   const a=rows[i-2],m=rows[i-1],b=rows[i],peak=m.burst;
   if(peak<.12)continue;
   const from=XY(a.a+a.b*.14,a.r),to=XY(b.a+b.b*.14,b.r);
   const color=grad(k,...from,...to,[[0,'transparent'],[.60,`rgba(${m.R},${m.G},${m.B},${peak*.57})`],[1,'transparent']]);
   shape(k,[XY(a.a-a.b*.4,a.r),XY(m.a-m.b*.6,m.r),XY(b.a-b.b*.37,b.r),XY(b.a+b.b*.51,b.r),XY(m.a+m.b*.73,m.r),XY(a.a+a.b*.65,a.r)],color);
  }
  // Traveling highlights are finite streaks traced on the sampled ribbon, never on static screen rays.
  for(let n=0;n<5;n++){
   const q=(((f/(2*Math.PI)*(n%2+1)+noise(j*72+n*398))%1)+1)%1;
   const span=.105+noise(j+68*n)*.13, end=Math.min(1,q+span), linePoints=[];
   for(let i=0;i<=8;i++){const u=q+(end-q)*i/8,[a,b]=atlas159Scan(j,f,u);linePoints.push(XY(a+b*(.42+n*.16),7*Math.pow(74,u)));}
   const a=linePoints[0],b=linePoints.at(-1),[R,G,B]=atlas159Banks[j][3];if(Math.hypot(a[0]-b[0],a[1]-b[1])<1)continue;
   const alpha=.92*Math.sin(q*Math.PI)**.7;
   const color=grad(k,...a,...b,[[0,`rgba(${R},${G},${B},0)`],[.6,`rgba(${R},${G},${B},${alpha*.5})`],[.95,`rgba(${Math.min(255,R+45)},${Math.min(255,G+50)},${Math.min(255,B+53)},${alpha})`],[1,`rgba(${R},${G},${B},0)`]]);
   line(k,linePoints,color,1+5.3*q*q);
   line(k,linePoints,color,.45+1.22*q*q);
  }
 }
 k.globalCompositeOperation='source-over';
 const core=k.createRadialGradient(x0,y0,0,x0,y0,21);core.addColorStop(0,'#fff8ed');core.addColorStop(.11,'#f5f8eade');core.addColorStop(.27,'#c9f0e39c');core.addColorStop(.5,'#76b4bd35');core.addColorStop(1,'#8fc6d200');
 k.fillStyle=core;k.fillRect(313,153,104,104);
 const edge=k.createRadialGradient(x0,y0,192,x0,y0,460);edge.addColorStop(0,'#070f1700');edge.addColorStop(1,'#080f197c');k.fillStyle=edge;k.fillRect(0,0,w,h);
};

