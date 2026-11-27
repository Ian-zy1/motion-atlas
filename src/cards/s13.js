// @card {"id": "s13", "name": "数据跳动与进度生长", "en": "Metric Counter & Bar Reveal", "study": true, "group": "讲清结构", "seconds": 3.6, "dims": [720, 400], "desc": "读数和进度条同步推进，接近目标时一起减速停稳。适合评测、对比和复盘。", "prompt": "[指标]先轻滑渐显，落稳后读数从[起始值]到[目标值][单位]，条长按同一减速节奏相对[上限]生长。等宽数字，浅底保对比，停稳留读；不要首帧硬闪、超调回弹或末尾突兀归零。", "tags": ["计数器", "进度条", "数据可视化", "滚动读数", "进度生长", "评测", "metric counter", "bar reveal", "透明叠片"], "category": "数据 · 读数", "note": "网格仅供图鉴示意。默认复制通用动效模板；勾选顶部选项后，复制时才附透明导片协议。", "beats": [["起始读数", 0.05555555555555556], ["联动生长", 0.19], ["减速靠拢", 0.36], ["停稳阅读", 0.7]], "rate": 1, "poster": 0.7}
// @part draw
feature.s13=(k,w,h,t)=>{
 k.save();
 k.scale(w/720,h/400);
 // The light calibration card is preview scenery, not an export background.
 k.fillStyle='#dfded0';k.fillRect(0,0,720,400);
 for(let y=24;y<400;y+=20)line(k,[[26,y],[694,y]],'#515d4840',.55);
 for(let x=28;x<700;x+=20)line(k,[[x,25],[x,367]],'#515d4836',.55);
 const ink='#273d35', gold='#eabe73';
 line(k,[[32,36],[32,21],[47,21]],ink,1.4);line(k,[[673,21],[688,21],[688,36]],ink,1.4);
 line(k,[[32,366],[32,380],[47,380]],ink,1.4);line(k,[[673,380],[688,380],[688,366]],ink,1.4);
 word(k,'MEASUREMENT / LIVE COUNTER',53,39,11,ink,700,'ui-monospace, monospace');
 k.textAlign='right';word(k,'SAMPLE 03  /  240 FPS SCALE',668,363,10,ink,700,'ui-monospace, monospace');k.textAlign='left';
 softShadow(k,360,333,276,33,.31);
 rr(k,99,69,522,245,18,'#fbf5e540');
 rr(k,106,76,508,231,15,'#1b332e');k.strokeStyle='#56766a';k.lineWidth=1;k.stroke();
 line(k,[[134,127],[586,127]],'#81a29175',1);
 const accent='#84d3a3';
 dot(k,142,107,4,accent);
 word(k,'实时帧率',155,112,15,'#ecf3de',750);
 k.textAlign='right';word(k,'BENCHMARK / FRAME RATE',585,112,10,'#b1c9b2',650,'ui-monospace, monospace');k.textAlign='left';
 const start=24,target=168,limit=240;
 const u=clamp((t-.27)/1.52);
 const prog=1-(1-u)**3;
 const raw=mix(start,target,prog);
 const ratio=raw/limit;
 const display=String(Math.round(raw)).padStart(3,' ');
 k.font='750 68px ui-monospace,monospace';
 k.fillStyle='#f5f5de';k.textAlign='center';
 for(let i=0;i<3;i++)k.fillText(display[i],146+i*45,207);
 k.textAlign='left';word(k,'FPS',274,197,14,'#cce3c8',700,'ui-monospace, monospace');
 word(k,'稳定读数',512,176,12,u>=1?'#bcead0':'#a9beaa',650);
 word(k,u>=1?'HOLD':'RUN',535,201,13,u>=1?accent:gold,750,'ui-monospace, monospace');
 line(k,[[510,190],[526,190]],u>=1?accent:gold,1.6);
 const x=137,y=229,bw=445,bh=15;
 rr(k,x,y,bw,bh,7.5,'#577367');
 k.save();rr(k,x,y,bw,bh,7.5,'#577367');k.clip();
 k.fillStyle=grad(k,x,y,x+bw,y,[[0,'#50a189'],[.63,'#89d5a5'],[1,'#cbe8a6']]);
 k.fillRect(x,y,bw*ratio,bh);
 const tip=x+bw*ratio;
 line(k,[[tip-1,y],[tip-1,y+bh]],'#e5ffcf',1.5);
 for(let j=1;j<12;j++)line(k,[[x+j*bw/12,y+2],[x+j*bw/12,y+bh-2]],'#162d294c',1);
 k.restore();
 for(let j=0;j<=12;j++){
  const xx=x+j*bw/12, major=j%3===0;
  line(k,[[xx,251],[xx,major?262:256]],major?'#aec8b3':'#739483',1);
  if(major){k.textAlign='center';word(k,String(j*20),xx,278,10,'#c6d5c5',650,'ui-monospace, monospace');}
 }
 k.textAlign='left';k.restore();
};
