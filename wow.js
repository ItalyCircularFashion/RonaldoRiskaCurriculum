/**
 * WowEffect — Sorpresa interattiva per RonaldoRiskaCurriculum
 * Aggiunge un overlay temporaneo con animazioni cyberpunk.
 * Appare al caricamento e scompare dopo un po' di tempo.
 */

(function () {
  "use strict";

  const OVERLAY_ID = "wowOverlay";
  const SHOW_DURATION = 5000; // 5 secondi

  function createOverlay() {
    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.className = "wow-overlay";

    // Particelle
    const particles = document.createElement("div");
    particles.className = "wow-particles";
    for (let i = 0; i < 8; i++) {
      const span = document.createElement("span");
      overlay.appendChild(span);
    }
    overlay.appendChild(particles);

    // Contenuto principale
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
      <button id="wowNext">Continue →</button>
      <span class="label">Press to continue · Enter</span>
    `;

    content.appendChild(logo);
    content.appendChild(sub);
    content.appendChild(handler);

    // Glow effetto
    const glow = document.createElement("div");
    glow.className = "wow-glow";
    overlay.appendChild(glow);

    // Badge
    const badge = document.createElement("div");
    badge.className = "wow-heartbeat";
    badge.textContent = "∞";
    overlay.appendChild(badge);

    document.body.appendChild(overlay);

    return {
      container: overlay,
      logo: logo,
      sub: sub,
      handler: handler,
      button: document.getElementById("wowNext"),
    };
  }

  function onShow() {
    const overlay = document.getElementById("wowOverlay");
    if (!overlay) return;

    // Animazioni CSS già applicate via CSS
    const logo = overlay.querySelector(".wow-logo");
    if (logo) {
      // Forza reflow per riattivare l'animazione
      void logo.offsetWidth;
    }

    // Gestisci click sul continue
    const button = document.getElementById("wowNext");
    if (button) {
      button.addEventListener("click", closeWow);
      button.addEventListener("touchstart", closeWow);

      // Enter key
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          closeWow();
        }
      });
    }
  }

  function closeWow() {
    const overlay = document.getElementById("wowOverlay");
    if (overlay) {
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.8s ease";
      setTimeout(() => {
        overlay.remove();
        overlay.style.transition = "";
      }, 800);
    }
  }

  // Inizializza quando il DOM è pronto
  function init() {
    const overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
      onShow();
      return;
    }

    const timeout = setTimeout(() => {
      const result = createOverlay();
      onShow();
      if (result) {
        setTimeout(closeWow, SHOW_DURATION);
      }
    }, 800);

    // Pulizia in caso di problemi
    window.addEventListener("beforeunload", () => clearTimeout(timeout));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
