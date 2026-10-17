(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const boot = document.getElementById('boot');
 let pct = 0; const bootText = document.getElementById('bootText');
 const timer = setInterval(() => { pct = Math.min(100, pct + Math.floor(Math.random()*18+7)); bootText.textContent = `LOADING CREATIVE SYSTEMS · ${String(pct).padStart(2,'0')}%`; if(pct >= 100){clearInterval(timer);setTimeout(()=>boot.classList.add('done'),220)} }, 130);
 window.addEventListener('load', () => setTimeout(()=>boot.classList.add('done'), 1900));

 const canvas = document.getElementById('space'), ctx = canvas.getContext('2d');
 let w=0,h=0,stars=[],frame=0; const pointer={x:-1000,y:-1000};
 function resize(){const dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.min(110,Math.floor(w*h/9000))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.3+.2,v:(Math.random()-.5)*.25,a:Math.random()*.6+.15}));}
 function paint(){ctx.clearRect(0,0,w,h);stars.forEach((s,i)=>{if(!reduced){s.y+=s.v;if(s.y>h)s.y=0;if(s.y<0)s.y=h;}const dx=s.x-pointer.x,dy=s.y-pointer.y,d=Math.hypot(dx,dy);if(d<120&&!reduced){s.x+=dx/d*-.15;s.y+=dy/d*-.15;}ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(202,198,255,${s.a})`;ctx.fill();for(let j=i+1;j<stars.length;j++){const q=stars[j],dist=Math.hypot(s.x-q.x,s.y-q.y);if(dist<75){ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(168,139,255,${(1-dist/75)*.11})`;ctx.stroke();}}});if(!reduced)frame=requestAnimationFrame(paint);}
 resize();paint();addEventListener('resize',()=>{cancelAnimationFrame(frame);resize();paint()},{passive:true});
 const core=document.getElementById('cursorCore'),aura=document.getElementById('cursorAura');
 let mx=innerWidth/2,my=innerHeight/2,ax=mx,ay=my;
 addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY;mx=e.clientX;my=e.clientY;core.style.left=mx+'px';core.style.top=my+'px';},{passive:true});
 function cursorLoop(){ax+=(mx-ax)*.16;ay+=(my-ay)*.16;aura.style.left=ax+'px';aura.style.top=ay+'px';if(!reduced)requestAnimationFrame(cursorLoop);}cursorLoop();
 document.querySelectorAll('a,button,.project').forEach(el=>{el.addEventListener('pointerenter',()=>aura.classList.add('hover'));el.addEventListener('pointerleave',()=>aura.classList.remove('hover'));});
 const progress=document.getElementById('progress');addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?scrollY/max*100:0)+'%';},{passive:true});
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}}),{threshold:.13});
 document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
 const portal=document.getElementById('portal');
 if(!reduced && matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{const r=portal.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;portal.style.transform=`rotateY(${x*10}deg) rotateX(${-y*9}deg)`;},{passive:true});addEventListener('pointerout',e=>{if(!e.relatedTarget)portal.style.transform='';});document.querySelectorAll('[data-tilt]').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1000px) rotateY(${x*2.4}deg) rotateX(${-y*2}deg) translateY(-2px)`;});el.addEventListener('pointerleave',()=>el.style.transform='');});document.querySelectorAll('.magnet').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.translate=`${(e.clientX-r.left-r.width/2)*.08}px ${(e.clientY-r.top-r.height/2)*.1}px`;});el.addEventListener('pointerleave',()=>el.style.translate='');});}
 const menuButton=document.getElementById('menuButton'),menu=document.getElementById('menu');menuButton.addEventListener('click',()=>menu.classList.toggle('open'));menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
 const copy=document.getElementById('copyEmail'),copied=document.getElementById('copied');copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('dharandharan152k@gmail.com');copied.classList.add('show');setTimeout(()=>copied.classList.remove('show'),1600);}catch(e){window.location.href='mailto:dharandharan152k@gmail.com';}});
})();