/* ══════════════════════════════════════════════════════════
   INTERACTIONS.JS — Textile Intelligence Platform
   Effetti: tilt card, cursor glow, animated counters,
            scroll progress, tooltip sparklines, parallax,
            bento hover reveal, modal preview.
══════════════════════════════════════════════════════════ */
'use strict';

/* ---------- util ---------- */
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const el=t=>document.createElement(t);

/* ---------- scroll progress bar ---------- */
function initScrollProgress(){
  const bar=$('#scrollProgress');
  if(!bar) return;
  const set=()=>{
    const max=document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.transform = `scaleX(${pct/100})`;
  };
  window.addEventListener('scroll', set, {passive:true});
  set();
}

/* ---------- animated counters ---------- */
function initCounters(){
  $$('.count-up').forEach(node=>{
    const target = parseFloat(node.dataset.target || '0');
    const suffix = node.dataset.suffix || '';
    const prefix = node.dataset.prefix || '';
    const dur = parseInt(node.dataset.duration || '1400', 10);
    const decimals = parseInt(node.dataset.decimals || '0', 10);
    if(!node.dataset.animated){
      node.dataset.animated = '1';
      const io = new IntersectionObserver(entries=>{
        if(!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now)=>{
          const p = Math.min((now - t0)/dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          node.textContent = prefix + eased.toFixed(decimals) + suffix;
          if(p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }, {threshold:.4});
      io.observe(node);
    }
  });
}

/* ---------- tilt cards ---------- */
function initTilt(){
  $$('.tilt').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - .5;
      const y = (e.clientY - r.top)/r.height - .5;
      card.style.transform = `perspective(900px) rotateX(${-y*8}deg) rotateY(${x*8}deg) translateZ(0)`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

/* ---------- cursor glow ---------- */
function initCursorGlow(){
  const glow = $('#cursorGlow');
  if(!glow) return;
  let x=0,y=0;
  window.addEventListener('mousemove', e=>{ x=e.clientX; y=e.clientY; }, {passive:true});
  const tick=()=>{
    glow.style.transform = `translate3d(${x-120}px,${y-120}px,0)`;
    requestAnimationFrame(tick);
  };
  tick();
}

/* ---------- bento reveal ---------- */
function initBentoReveal(){
  $$('.bento-item').forEach((item,i)=>{
    item.style.transitionDelay = `${i*0.04}s`;
  });
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  },{threshold:.08});
  $$('.bento-item').forEach(c=>io.observe(c));
}

/* ---------- tooltip sparkline on hover ---------- */
function initSparklineTooltip(){
  $$('.mkt-card').forEach(card=>{
    const id = card.dataset.chart;
    if(!id) return;
    const tip = $('#'+id+'Tip');
    const canvas = $('#'+id);
    card.addEventListener('mouseenter', ()=>{
      if(tip) tip.style.opacity='1';
      if(canvas) canvas.style.transform='scale(1.03)';
    });
    card.addEventListener('mouseleave', ()=>{
      if(tip) tip.style.opacity='0';
      if(canvas) canvas.style.transform='scale(1)';
    });
  });
}

/* ---------- modal preview for software cards ---------- */
function initModals(){
  $$('.softcard').forEach(card=>{
    const btn = card.querySelector('[data-open-modal]');
    const modal = $(card.dataset.modal);
    if(!btn || !modal) return;
    btn.addEventListener('click', ()=>{
      modal.classList.add('open');
      document.body.style.overflow='hidden';
    });
    modal.addEventListener('click', e=>{
      if(e.target===modal) closeModal(modal);
    });
    const close = modal.querySelector('[data-close-modal]');
    if(close) close.addEventListener('click', ()=>closeModal(modal));
  });
}
function closeModal(modal){
  modal.classList.remove('open');
  document.body.style.overflow='';
}

/* ---------- parallax section bg ---------- */
function initParallax(){
  window.addEventListener('scroll', ()=>{
    $$('[data-parallax]').forEach(el=>{
      const speed = parseFloat(el.dataset.parallax || '0.05');
      el.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
  }, {passive:true});
}

/* ---------- motion reduce ---------- */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  if(!prefersReduced){
    initScrollProgress();
    initCursorGlow();
    initTilt();
    initBentoReveal();
    initSparklineTooltip();
    initParallax();
    initModals();
  }
  initCounters();
});
