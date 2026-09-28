/* =========================================================
   FORMULARIO DE CASTING
   Pega aquí abajo, entre las comillas, UNA de estas URL:
   - Google Sheets: la URL de la "Aplicación web" de Apps Script
     (https://script.google.com/macros/s/.../exec). Ver LEEME.txt.
   - Formspree: https://formspree.io/f/xxxxxxx
   ========================================================= */
var FORM_ENDPOINT = "";


(function(){
  // Aparición al hacer scroll
  var els=document.querySelectorAll('section:not([id$="inicio"]) > *, article, .band');
  els.forEach(function(e,i){e.classList.add('reveal');e.style.transitionDelay=(i%3)*90+'ms';});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.12});
    els.forEach(function(e){io.observe(e);});
  } else els.forEach(function(e){e.classList.add('in');});
  // Menú móvil
  var btn=document.querySelector('.menu-btn'),nav=document.getElementById('m-nav');
  if(btn&&nav){btn.addEventListener('click',function(){var o=nav.hasAttribute('hidden');if(o)nav.removeAttribute('hidden');else nav.setAttribute('hidden','');btn.setAttribute('aria-expanded',o);});
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.setAttribute('hidden','');btn.setAttribute('aria-expanded','false');});});}
  // Formulario de casting (Netlify Forms)
  document.querySelectorAll('.casting-form').forEach(function(f){
    f.addEventListener('submit',function(ev){
      ev.preventDefault();
      var b=f.querySelector('button[type=submit]'),msg=f.querySelector('.form-msg');
      b.disabled=true;b.textContent='ENVIANDO…';
      (FORM_ENDPOINT.indexOf('http')!==0?Promise.reject():(FORM_ENDPOINT.indexOf('script.google.com')>-1?fetch(FORM_ENDPOINT,{method:'POST',mode:'no-cors',body:new URLSearchParams(new FormData(f))}).then(function(){return {ok:true};}):fetch(FORM_ENDPOINT,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(f)})))
      .then(function(r){if(!r.ok)throw 0;f.reset();msg.textContent='¡Postulación recibida! El rey la revisará pronto.';})
      .catch(function(){msg.textContent='No se pudo enviar. Inténtalo de nuevo en un momento.';})
      .finally(function(){msg.hidden=false;b.disabled=false;b.textContent='ENVIAR POSTULACIÓN';});
    });
  });
})();


(function(){
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pollo=document.createElement('img');pollo.src="imagenes/cursor-corona.png";pollo.alt="";pollo.className='cc-pollo';
  var dot=document.createElement('div');dot.className='cc-dot';
  document.body.appendChild(pollo);document.body.appendChild(dot);
  var mx=-100,my=-100,px=-100,py=-100,vx=0,t=0,hover=false,down=false,last=0;
  document.addEventListener('mousemove',function(e){
    mx=e.clientX;my=e.clientY;document.documentElement.classList.add('cc-on');
    dot.style.transform='translate('+mx+'px,'+my+'px)';
    var now=Date.now();
    if(!reduce&&now-last>45){last=now;var tr=document.createElement('div');tr.className='cc-trail';tr.style.transform='translate('+mx+'px,'+my+'px)';document.body.appendChild(tr);setTimeout(function(){tr.remove();},600);}
  });
  document.addEventListener('mouseleave',function(){document.documentElement.classList.remove('cc-on');});
  document.addEventListener('mouseover',function(e){hover=!!e.target.closest('a,button,label,article');pollo.classList.toggle('cc-hover',hover);});
  document.addEventListener('mousedown',function(){down=true;});
  document.addEventListener('mouseup',function(){down=false;});
  (function loop(){
    var nx=px+(mx-px)*(reduce?1:.22), ny=py+(my-py)*(reduce?1:.22);
    vx=nx-px;px=nx;py=ny;t+=Math.min(Math.abs(vx),20)*.08;
    var tilt=Math.max(-18,Math.min(18,vx*1.4));
    var bob=reduce?0:Math.sin(t*2)*Math.min(Math.abs(vx),8)*.5;
    var sq=down?' scale(1.15,.8)':'';
    pollo.style.transform='translate('+(px+14)+'px,'+(py+12+bob)+'px) rotate('+tilt+'deg)'+sq;
    requestAnimationFrame(loop);
  })();
})();
