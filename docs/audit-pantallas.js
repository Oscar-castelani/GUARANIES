const { chromium, devices } = require('playwright');
const sizes=[['SE1 320x568',320,568],['Galaxy Fold 280x653',280,653],['360x640',360,640],['360x800 Galaxy A',360,800],['375x667 iPhone8/SE',375,667],['375x812 iPhone X/13mini',375,812],['390x844 iPhone 12-14',390,844],['393x852 iPhone 15/Pixel',393,852],['412x915 Pixel/S20',412,915],['430x932 iPhone Pro Max',430,932],['384x854 Xiaomi/Redmi',384,854],['480x853 large Android',480,853],['600x960 small tablet',600,960],['768x1024 iPad',768,1024],['820x1180 iPad Air',820,1180],['717x512 Fold open',717,512],['1024x768 tablet',1024,768]];
const games=['arco','tucanes','canasta','cosecha','fuego'];
(async()=>{const b=await chromium.launch();const fails=[];const rep=[];
const F=(s,m)=>fails.push(s+': '+m);
for(const [name,w0,h0] of sizes){ for(const land of [false,true]){
  const w=land?Math.max(w0,h0):w0, h=land?Math.min(w0,h0):h0, tag=name+(land?' LAND ':' PORT ')+w+'x'+h;
  const x=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:true,deviceScaleFactor:1});const p=await x.newPage();
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(250);
  // splash
  const sp=await p.evaluate(()=>{const i=document.querySelector('#splash img');if(!i)return null;const r=i.getBoundingClientRect();return [r.width,r.height,innerWidth,innerHeight]});
  if(!sp)F(tag,'splash missing'); 
  await p.evaluate(()=>{const s=document.getElementById('splash');s&&s.dispatchEvent(new PointerEvent('pointerdown'))});await p.waitForTimeout(700);
  const portraitPhone=!land&&Math.min(w,h)<700;
  const notice=await p.evaluate(()=>!document.getElementById('rotate').classList.contains('hidden'));
  if(portraitPhone&&!notice)F(tag,'rotate notice not shown');
  if(notice){const r=await p.evaluate(()=>{const e=document.querySelector('.rot-box').getBoundingClientRect();return [e.left,e.top,e.right,e.bottom]});if(r[0]<0||r[2]>w||r[1]<0||r[3]>h)F(tag,'rotate box overflows '+r);
    await p.evaluate(()=>document.getElementById('rotSkip').click());}
  // menu
  const m=await p.evaluate(()=>{const m=document.getElementById('menu');const cards=[...document.querySelectorAll('.card')].map(c=>c.getBoundingClientRect());const foot=document.getElementById('muteMenu').getBoundingClientRect();return {sh:m.scrollHeight,ch:m.clientHeight,sw:document.documentElement.scrollWidth,cards:cards.map(r=>[Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)]),footB:foot.bottom,h1:document.querySelector('h1').getBoundingClientRect().top}});
  if(m.sh>m.ch+1)F(tag,'MENU scrolls ('+m.sh+'>'+m.ch+')');
  if(m.sw>w+1)F(tag,'menu horizontal overflow');
  m.cards.forEach((c,i)=>{if(c[2]>w+1||c[0]<-1||c[3]>h+1)F(tag,'card '+i+' outside viewport '+c)});
  if(m.footB>h+1)F(tag,'sound button below viewport');
  // games
  for(let gi=0;gi<5;gi++){
    await p.locator('.card').nth(gi).click({force:true});
    await p.waitForTimeout(150);
    // portrait-phone notice may appear again -> skip
    await p.evaluate(()=>{const r=document.getElementById('rotate');if(!r.classList.contains('hidden'))document.getElementById('rotSkip').click()});
    const ov=await p.evaluate(()=>{const e=document.querySelector('.panel').getBoundingClientRect(),b=document.getElementById('ovBtn1').getBoundingClientRect(),b2=document.getElementById('ovBtn2').getBoundingClientRect();return [e.left,e.top,e.right,e.bottom,b.bottom,b2.bottom,b.height]});
    if(ov[0]<-1||ov[2]>w+1||ov[1]<-1||ov[3]>h+1||ov[4]>h||ov[5]>h)F(tag+' '+games[gi],'intro panel/buttons outside viewport '+ov.map(Math.round));
    if(ov[6]<40)F(tag+' '+games[gi],'start button too small '+Math.round(ov[6]));
    await p.evaluate(()=>document.getElementById('ovBtn1').click());await p.waitForTimeout(350);
    const g=await p.evaluate(()=>{const c=document.getElementById('c').getBoundingClientRect(),hd=document.getElementById('hud'),st=document.getElementById('stage').getBoundingClientRect();return {c:[c.left,c.top,c.right,c.bottom,c.width,c.height],hudOver:hd.scrollWidth>hd.clientWidth+1,hudH:hd.getBoundingClientRect().height,sw:document.documentElement.scrollWidth,sh:document.documentElement.scrollHeight,ih:innerHeight,st:[st.width,st.height]}});
    const r=g.c;
    if(r[2]>w+1||r[3]>h+1||r[0]<-1||r[1]<-1)F(tag+' '+games[gi],'canvas outside viewport '+r.map(Math.round));
    if(g.hudOver)F(tag+' '+games[gi],'HUD overflows horizontally');
    if(g.sw>w+1||g.sh>h+1)F(tag+' '+games[gi],'page scrolls '+g.sw+'x'+g.sh);
    const fillW=r[4]/w,fillH=r[5]/g.st[1];
    rep.push([tag,games[gi],Math.round(fillW*100),Math.round(fillH*100),Math.round(g.hudH)]);
    if(land&&Math.min(w0,h0)<=500&&fillW<.82)F(tag+' '+games[gi],'canvas uses only '+Math.round(fillW*100)+'% of width');
    // end overlay
    await p.evaluate((nx)=>Core.finish(true,'t',{next:nx}),gi===1);await p.waitForTimeout(1100);
    const en=await p.evaluate(()=>{const e=document.querySelector('.panel').getBoundingClientRect(),b=document.getElementById('ovBtn1').getBoundingClientRect(),b2=document.getElementById('ovBtn2').getBoundingClientRect();return [e.left,e.top,e.right,e.bottom,b.bottom,b2.bottom]});
    if(en[0]<-1||en[2]>w+1||en[1]<-1||en[3]>h+1)F(tag+' '+games[gi],'END panel outside viewport '+en.map(Math.round));
    await p.evaluate(()=>document.getElementById('ovBtn2').click());await p.waitForTimeout(100);
  }
  if(errs.length)F(tag,'JS errors '+errs.join(';'));
  await x.close();
}}
await b.close();
const uniq=[...new Set(fails)];console.log('FAILS',uniq.length);uniq.forEach(f=>console.log(f));
require('fs').writeFileSync('rep.json',JSON.stringify(rep));
})();
