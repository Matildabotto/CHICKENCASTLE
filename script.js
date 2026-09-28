/* El Castillo del Pollo — tráiler, formulario Fillout, animaciones y cursor */
(function(){
  /* ---------- TRÁILER DE YOUTUBE ---------- */
  var v=document.querySelector('.video[data-youtube]');
  if(v){
    var url=(v.getAttribute('data-youtube')||'').trim(),id='';
    var m=url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    if(m) id=m[1]; else if(/^[\w-]{11}$/.test(url)) id=url;
    if(id){
      var f=document.createElement('iframe');
      f.src='https://www.youtube-nocookie.com/embed/'+id+'?rel=0';
      f.title='Tráiler de El Castillo del Pollo';
      f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen=true;
      v.innerHTML='';v.appendChild(f);
    }
  }

  /* ---------- FORMULARIO FILLOUT ---------- */
  var fo=document.querySelector('.fillout');
  if(fo&&fo.getAttribute('data-fillout-id').trim()){
    fo.closest('.form-card').classList.add('has-form');
    var s=document.createElement('script');s.src='https://server.fillout.com/embed/v1/';document.body.appendChild(s);
  }

  /* ---------- APARICIÓN AL HACER SCROLL ---------- */
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.12});
    els.forEach(function(e){io.observe(e);});
  } else els.forEach(function(e){e.classList.add('in');});

  /* ---------- CURSOR CORONA ---------- */
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var crown=document.createElement('img');crown.src='imagenes/cursor-corona.png';crown.alt='';crown.className='cc-crown';
  var dot=document.createElement('div');dot.className='cc-dot';
  document.body.appendChild(crown);document.body.appendChild(dot);
  var mx=-100,my=-100,px=-100,py=-100,vx=0,t=0,down=false,last=0,inside=false;
  document.querySelectorAll('.video,.form-card').forEach(function(el){
    el.addEventListener('mouseenter',function(){inside=true;document.documentElement.classList.remove('cc-on');});
    el.addEventListener('mouseleave',function(){inside=false;});
  });
  document.addEventListener('mousemove',function(e){
    mx=e.clientX;my=e.clientY;if(inside)return;document.documentElement.classList.add('cc-on');
    dot.style.transform='translate('+mx+'px,'+my+'px)';
    var now=Date.now();
    if(!reduce&&now-last>45){last=now;var tr=document.createElement('div');tr.className='cc-trail';tr.style.transform='translate('+mx+'px,'+my+'px)';document.body.appendChild(tr);setTimeout(function(){tr.remove();},600);}
  });
  /* Al entrar al video o al formulario (iframes) se oculta la corona y vuelve el cursor normal */
  document.addEventListener('mouseleave',function(){document.documentElement.classList.remove('cc-on');});
  document.addEventListener('mouseover',function(e){crown.classList.toggle('cc-hover',!!e.target.closest('a,button'));});
  document.addEventListener('mousedown',function(){down=true;});
  document.addEventListener('mouseup',function(){down=false;});
  (function loop(){
    var nx=px+(mx-px)*(reduce?1:.22),ny=py+(my-py)*(reduce?1:.22);
    vx=nx-px;px=nx;py=ny;t+=Math.min(Math.abs(vx),20)*.08;
    var tilt=Math.max(-18,Math.min(18,vx*1.4));
    var bob=reduce?0:Math.sin(t*2)*Math.min(Math.abs(vx),8)*.5;
    crown.style.transform='translate('+(px+14)+'px,'+(py+12+bob)+'px) rotate('+tilt+'deg)'+(down?' scale(1.15,.8)':'');
    requestAnimationFrame(loop);
  })();
})();
