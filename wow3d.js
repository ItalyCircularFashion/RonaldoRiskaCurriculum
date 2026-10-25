/**
 * Wow3D — Effetto 3D/4D per RonaldoRiskaCurriculum
 *
 * Rendering 3D con Canvas 2D (soft 3D projection)
 * Scheduling: requestIdleCallback + requestAnimationFrame
 * Animazione 4D: colore, scala, rotazione, opacità, movimento
 *
 * Uso: includere prima di </body> in ogni pagina HTML:
 *   <link rel="stylesheet" href="wow.css">
 *   <link rel="stylesheet" href="wow3d.css">
 *   <script src="wow3d.js"></script>
 */

(function () {
  "use strict";

  // ---------------- CONFIGURATION ----------------
  const CONFIG = {
    // Canvas 3D rendering
    logoSize: 90,
    rotationSpeed: 0.006,
    // Particles system
    particleCount: 90,
    particleSpeed: 0.8,
    // Timeline 4D animation
    colorCycle: 8000,      // ms per colore full cycle
    scaleWave: 1500,       // ms per onda di scala
    rotationWave: 3000,    // ms per onda di rotazione
    highlight: 1200,       // ms per flash luminoso
    // Scheduling budget
    idleBudget: 35,        // ms for requestIdleCallback
  };

  // ---------------- STATE ----------------
  const state = {
    overlay: null,
    canvas: null,
    ctx: null,
    particles: [],
    logoMarkup: null,
    active: false,
    lastTime: 0,
    frameId: 0,
    isVisible: false,
  };

  // ---------------- 3D PROJECTION ----------------
  function project3D(p, viewport) {
    const { width, height } = viewport;
    const fov = 1.6;
    const scale = fov / (fov + p.z);
    return {
      x: width / 2 + (p.x * scale) * 1.2,
      y: height / 2 + (p.y * scale) * 1.2,
      z: p.z,
      sx: 1 + 0.6 * (1 - scale),
      sy: 1 + 0.6 * (1 - scale),
    };
  }

  // ---------------- PARTICLE SYSTEM ----------------
  function createParticle(index) {
    const angle = (index / CONFIG.particleCount) * Math.PI * 2;
    const radius = 30 + Math.random() * 30;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius - 50,
      z: index * 1.2 - 200,
      vx: (Math.random() - 0.5) * CONFIG.particleSpeed,
      vy: (Math.random() - 0.5) * CONFIG.particleSpeed,
      vz: (Math.random() - 0.5) * CONFIG.particleSpeed * 0.6,
      size: 1 + Math.random() * 3,
      color: `hsl(${360 * Math.random() | 0}, 90%, 60%)`,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      life: 1.0,
      time: Math.random() * 100,
    };
  }

  function initParticles() {
    state.particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      state.particles.push(createParticle(i));
    }
  }

  // ---------------- SCENE GRAPH ----------------
  function buildScene() {
    const scene = [];
    // Logo group
    scene.push({
      type: "group",
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0.1, y: 0.3, z: 0 },
      scale: 1.0,
      children: [{
        type: "text",
        text: "WOW",
        x: 0, y: 0, z: 0,
        color: "#00f0ff",
        size: CONFIG.logoSize,
        weight: "900"
      }]
    });
    // Particles
    for (const p of state.particles) {
      scene.push({
        type: "particle",
        x: p.x, y: p.y, z: p.z,
        size: p.size,
        color: p.color,
        life: p.life,
      });
    }
    // Light source
    scene.push({
      type: "light",
      x: 0, y: 0, z: -50,
      intensity: 0.8,
      color: "#fff"
    });
    return scene;
  }

  // ---------------- TIMER UTILITY ----------------
  function now() {
    return typeof performance !== "undefined" ? performance.now() : Date.now();
  }

  // ---------------- INITIALIZATION ----------------
  function init() {
    if (state.active) return;
    state.active = true;
    state.lastTime = now();
    state.isVisible = true;

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "wowOverlay";
    overlay.className = "wow-overlay";

    // Particles layer
    const particlesDiv = document.createElement("div");
    particlesDiv.className = "wow-particles";
    for (let i = 0; i < CONFIG.particleCount; i++) {
      const span = document.createElement("span");
      overlay.appendChild(span);
    }

    // 3D Canvas
    const canvas = document.createElement("canvas");
    canvas.id = "wow3dCanvas";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:100;pointer-events:none;opacity:0;transition:opacity 0.6s ease;";
    overlay.appendChild(canvas);

    // Content
    const content = document.createElement("div");
    content.className = "wow-content";

    const logo = document.createElement("h1");
    logo.className = "wow-logo";
    logo.textContent = "WOW";

    const sub = document.createElement("div");
    sub.className = "wow-sub";
    sub.innerHTML = "Welcome to the <span class='dot'>•</span> Future <span class='dot'>•</span> Now";

    const handler = document.createElement("div");
    handler.className = "wow-handler";
    handler.innerHTML = `
      <button id="wowNext">Enter →</button>
      <span class="label">Press to continue · Enter</span>
    `;

    content.appendChild(logo);
    content.appendChild(sub);
    content.appendChild(handler);

    // Glow and badge
    const glow = document.createElement("div");
    glow.className = "wow-glow";
    overlay.appendChild(glow);

    const badge = document.createElement("div");
    badge.className = "wow-heartbeat";
    badge.textContent = "∞";
    overlay.appendChild(badge);

    document.body.appendChild(overlay);
    state.overlay = overlay;
    state.canvas = canvas;
    state.ctx = canvas.getContext("2d");
    state.logoMarkup = content.querySelector("h1");
    state.particles = [];

    // Init particles
    initParticles();

    // Resize handler
    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeHandler);

    // Visibility change
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (state.frameId) {
          cancelAnimationFrame(state.frameId);
          state.frameId = 0;
        }
      } else {
        state.lastTime = now();
        if (state.frameId) {
          cancelAnimationFrame(state.frameId);
        }
        state.frameId = requestAnimationFrame(tick);
      }
    });

    // Schedule initial render
    scheduleIdle(() => {
      state.lastTime = now();
      state.frameId = requestAnimationFrame(tick);
    });

    // Show overlay with delay
    setTimeout(() => {
      overlay.style.opacity = "1";
      overlay.classList.add("wow-active");
    }, 300);
  }

  // ---------------- SCHEDULING HELPERS ----------------
  function scheduleIdle(fn) {
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(fn, { timeout: CONFIG.idleBudget });
    } else {
      setTimeout(fn, 100);
    }
  }

  // ---------------- RENDER LOOP ----------------
  function tick(time) {
    if (!state.canvas) return;

    const ctx = state.ctx;
    const w = state.canvas.width;
    const h = state.canvas.height;
    const delta = Math.min((time - state.lastTime) / 1000, 0.05);
    state.lastTime = time;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Update time
    const elapsed = (time - state.lastTime) / 1000;
    state.lastTime = time;

    // Update particles
    for (let i = 0; i < state.particles.length; i++) {
      const p = state.particles[i];
      p.x += p.vx * delta * 0.6;
      p.y += p.vy * delta * 0.6;
      p.z += p.vz * delta * 0.4;
      p.rot += p.rotSpeed * delta;
      p.life -= delta * 0.015;

      // Wrap
      if (p.z < -80) p.z = 80;
      if (p.y > 400) {
        p.y = -100;
        p.vy = -0.5;
      }
      if (p.x < -100 || p.x > 100) p.vx *= -1;
      if (p.y < -50 || p.y > 300) p.vy *= -0.8;
    }

    // --- Draw 3D background grid ---
    ctx.save();
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.lineWidth = 1;
    const gridSize = 80;
    const offset = 60;
    for (let i = -offset; i <= offset; i++) {
      const x = i * gridSize;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, x);
      ctx.lineTo(w, x);
      ctx.stroke();
    }
    ctx.restore();

    // --- Draw particles ---
    ctx.save();
    for (let i = state.particles.length - 1; i >= 0; i--) {
      const p = state.particles[i];
      if (p.life <= 0) continue;

      const projected = project3D(p, { width: w, height: h });
      const size = p.size * projected.sx * 0.8;
      const alpha = p.life * 0.8;

      ctx.shadowColor = p.color + "88";
      ctx.shadowBlur = size * 2;
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
      ctx.fill();
    }
    ctx.restore();

    // --- Draw 3D logo (text) ---
    const logo = state.logoMarkup;
    if (logo) {
      const rotY = Math.sin(elapsed * CONFIG.rotationWave * 0.002) * 0.15;
      const rotX = Math.cos(elapsed * CONFIG.colorCycle * 0.001) * 0.05;

      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(rotY * 0.5);
      ctx.scale(1, 1 + Math.sin(elapsed * CONFIG.scaleWave * 0.003) * 0.08);
      ctx.translate(-w / 2, -h / 2);

      // Shadow
      ctx.shadowColor = "rgba(0,240,255,0.4)";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "#00f0ff";
      ctx.font = `900 ${CONFIG.logoSize}px 'Orbitron', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("WOW", w / 2, h / 2 - 20);

      // Main text
      ctx.shadowBlur = 25;
      ctx.shadowColor = "rgba(255,0,170,0.4)";
      ctx.fillStyle = "#ff00aa";
      ctx.fillText("WOW", w / 2, h / 2);

      // Glow
      ctx.shadowBlur = 35;
      ctx.shadowColor = "rgba(168,85,247,0.3)";
      ctx.fillStyle = "rgba(168,85,247,0.5)";
      ctx.fillText("WOW", w / 2 - 2, h / 2);

      ctx.restore();
    }

    // --- Next frame ---
    state.frameId = requestAnimationFrame(tick);
  }

  // ---------------- CLOSE OVERLAY ----------------
  function closeWow() {
    const overlay = document.getElementById("wowOverlay");
    if (overlay) {
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.8s ease";
      setTimeout(() => {
        overlay.remove();
        overlay.style.transition = "";
        state.overlay = null;
        state.canvas = null;
        state.ctx = null;
        state.logoMarkup = null;
      }, 800);
    }
  }

  // ---------------- INITIALIZATION ----------------
  function init() {
    if (state.active) return;
    state.active = true;

    const overlay = document.createElement("div");
    overlay.id = "wowOverlay";
    overlay.className = "wow-overlay";

    const particlesDiv = document.createElement("div");
    particlesDiv.className = "wow-particles";
    for (let i = 0; i < CONFIG.particleCount; i++) {
      const span = document.createElement("span");
      overlay.appendChild(span);
    }

    const canvas = document.createElement("canvas");
    canvas.id = "wow3dCanvas";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:100;pointer-events:none;opacity:0;transition:opacity 0.6s ease;";
    overlay.appendChild(canvas);

    const content = document.createElement("div");
    content.className = "wow-content";

    const logo = document.createElement("h1");
    logo.className = "wow-logo";
    logo.textContent = "WOW";

    const sub = document.createElement("div");
    sub.className = "wow-sub";
    sub.innerHTML = "Welcome to the <span class='dot'>•</span> Future <span class='dot'>•</span> Now";

    const handler = document.createElement("div");
    handler.className = "wow-handler";
    handler.innerHTML = `
      <button id="wowNext">Enter →</button>
      <span class="label">Press to continue · Enter</span>
    `;

    content.appendChild(logo);
    content.appendChild(sub);
    content.appendChild(handler);

    const glow = document.createElement("div");
    glow.className = "wow-glow";
    overlay.appendChild(glow);

    const badge = document.createElement("div");
    badge.className = "wow-heartbeat";
    badge.textContent = "∞";
    overlay.appendChild(badge);

    document.body.appendChild(overlay);
    state.overlay = overlay;
    state.canvas = canvas;
    state.ctx = canvas.getContext("2d");
    state.logoMarkup = content.querySelector("h1");

    // Resize
    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener("resize", resizeHandler);

    // Visibility
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (state.frameId) {
          cancelAnimationFrame(state.frameId);
          state.frameId = 0;
        }
      } else {
        state.lastTime = now();
        if (state.frameId) {
          cancelAnimationFrame(state.frameId);
        }
        state.frameId = requestAnimationFrame(tick);
      }
    });

    // Show overlay
    setTimeout(() => {
      overlay.style.opacity = "1";
      overlay.classList.add("wow-active");
    }, 300);

    // Schedule initial render
    scheduleIdle(() => {
      state.lastTime = now();
      state.frameId = requestAnimationFrame(tick);
    });
  }

  function closeWow() {
    const overlay = document.getElementById("wowOverlay");
    if (overlay) {
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.8s ease";
      setTimeout(() => {
        overlay.remove();
        overlay.style.transition = "";
        state.overlay = null;
        state.canvas = null;
        state.ctx = null;
        state.logoMarkup = null;
      }, 800);
    }
  }

  // Public API
  window.RonaldoWow = {
    init,
    close: closeWow,
  };

  // Start
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
