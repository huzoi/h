var cursoreffects = function(t) {
  "use strict";
  return t.followingDotWithSparkles = function(t) {
    let e, n, i, o = t && t.element, s = o || document.body, h = window.innerWidth, c = window.innerHeight, l = {x: h / 2, y: h / 2}, a = {x: h / 2, y: h / 2}, r = [];
    const d = t?.dotColor || "#ffffff", u = t?.sparkleColor || "#ffffff", A = t?.dotSize || 2, m = t?.dotLag || 10, g = t?.sparkleInterval || 25, f = t?.sparkleLifeSpan || 75;
    let p = 0;
    const y = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    function v() {
      if (y.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), !1;
      e = document.createElement("canvas"), n = e.getContext("2d"), e.style.top = "0px", e.style.left = "0px", e.style.pointerEvents = "none", e.style.zIndex = "10000", o ? (e.style.position = "absolute", s.appendChild(e), e.width = s.clientWidth, e.height = s.clientHeight) : (e.style.position = "fixed", document.body.appendChild(e), e.width = h, e.height = c), document.body.style.cursor = "none", document.querySelectorAll("*").forEach(el => el.style.cursor = "none"), s.addEventListener("mousemove", E), window.addEventListener("resize", w), x();
    }
    
    function w(t) {
      h = window.innerWidth, c = window.innerHeight, o ? (e.width = s.clientWidth, e.height = s.clientHeight) : (e.width = h, e.height = c);
    }
    
    function E(t) {
      if (o) {
        const e = s.getBoundingClientRect();
        l.x = t.clientX - e.left, l.y = t.clientY - e.top;
      } else l.x = t.clientX, l.y = t.clientY;
    }
    
    function M(t, e) {
      r.push(new b(t, e));
    }
    
    function x(t) {
      !function() {
        a.x += (l.x - a.x) / m, a.y += (l.y - a.y) / m;
      }(), function(t) {
        if (0 == r.length && Math.abs(a.x - l.x) < 0.1 && Math.abs(a.y - l.y) < 0.1) return void n.clearRect(0, 0, h, c);
        n.clearRect(0, 0, h, c), t - p > g && (M(a.x, a.y), p = t);
        for (let t = 0; t < r.length; t++) r[t].update(n);
        for (let t = r.length - 1; t >= 0; t--) r[t].lifeSpan < 0 && r.splice(t, 1);
        n.save(), n.fillStyle = d, n.shadowBlur = 15, n.shadowColor = d, n.beginPath(), n.arc(a.x, a.y, A, 0, 2 * Math.PI), n.fill(), n.closePath(), n.restore();
      }(t), i = requestAnimationFrame(x);
    }
    
    function C() {
      e.remove(), cancelAnimationFrame(i), document.body.style.cursor = "", s.removeEventListener("mousemove", E), window.removeEventListener("resize", w);
    }
    
    function b(t, e) {
      this.initialLifeSpan = f, this.lifeSpan = f, this.velocity = {x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 2, y: 2 * Math.random() + 1}, this.position = {x: t, y: e}, this.size = 3 * Math.random() + 1, this.update = function(t) {
        this.position.x += this.velocity.x, this.position.y += this.velocity.y, this.lifeSpan--, this.velocity.y += 0.1, this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * 0.05;
        const e = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
        t.save(), t.globalAlpha = e, t.fillStyle = u, t.shadowBlur = 10, t.shadowColor = u, t.beginPath(), t.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI), t.fill(), t.closePath(), t.restore();
      };
    }
    return y.onchange = () => {y.matches ? C() : v()}, v(), {destroy: C};
  }, t;
}({});

(function() {
  function t() {
    const t = document.getElementById("welcomeScreen"), e = document.getElementById("mainContent");
    t && !t.classList.contains("hidden") || e && !e.classList.contains("hidden") && (window.cursorEffect = cursoreffects.followingDotWithSparkles({dotColor: "#ffffff", sparkleColor: "#ffffff", dotSize: 2, dotLag: 10, sparkleInterval: 25, sparkleLifeSpan: 75}));
  }
  document.addEventListener("DOMContentLoaded", (() => {
    const e = document.getElementById("welcomeScreen");
    e && e.addEventListener("click", (() => {setTimeout(t, 600)}));
  })), document.addEventListener("keydown", (() => {setTimeout(t, 600)}), {once: !0}), setTimeout(t, 1e3);
})();