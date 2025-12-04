(function() {
  'use strict';

  function followingDotWithSparkles(options) {
    let canvas, ctx, animationId;
    let element = options && options.element;
    let container = element || document.body;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    
    const cursor = { x: windowWidth / 2, y: windowHeight / 2 };
    const dotPos = { x: windowWidth / 2, y: windowHeight / 2 };
    const particles = [];
    
    const dotColor = options?.dotColor || '#ffffff';
    const sparkleColor = options?.sparkleColor || '#ffffff';
    const dotSize = options?.dotSize || 6;
    const dotLag = options?.dotLag || 10;
    const sparkleInterval = options?.sparkleInterval || 50;
    const sparkleLifeSpan = options?.sparkleLifeSpan || 60;
    
    let lastSparkleTime = 0;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function init() {
      if (prefersReducedMotion.matches) {
        return false;
      }

      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.pointerEvents = 'none';

      if (element) {
        canvas.style.position = 'absolute';
        container.appendChild(canvas);
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      } else {
        canvas.style.position = 'fixed';
        document.body.appendChild(canvas);
        canvas.width = windowWidth;
        canvas.height = windowHeight;
      }

      container.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onResize);
      
      loop();
    }

    function onResize(e) {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
      
      if (element) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      } else {
        canvas.width = windowWidth;
        canvas.height = windowHeight;
      }
    }

    function onMouseMove(e) {
      if (element) {
        const rect = container.getBoundingClientRect();
        cursor.x = e.clientX - rect.left;
        cursor.y = e.clientY - rect.top;
      } else {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      }
    }

    function createSparkle(x, y) {
      particles.push(new Particle(x, y));
    }

    function loop(timestamp) {
      updateDot();
      render(timestamp);
      animationId = requestAnimationFrame(loop);
    }

    function updateDot() {
      dotPos.x += (cursor.x - dotPos.x) / dotLag;
      dotPos.y += (cursor.y - dotPos.y) / dotLag;
    }

    function render(timestamp) {
      if (particles.length === 0 && 
          Math.abs(dotPos.x - cursor.x) < 0.1 && 
          Math.abs(dotPos.y - cursor.y) < 0.1) {
        ctx.clearRect(0, 0, windowWidth, windowHeight);
        return;
      }

      ctx.clearRect(0, 0, windowWidth, windowHeight);

      if (timestamp - lastSparkleTime > sparkleInterval) {
        createSparkle(dotPos.x, dotPos.y);
        lastSparkleTime = timestamp;
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(ctx);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].lifeSpan < 0) {
          particles.splice(i, 1);
        }
      }

      ctx.save();
      ctx.fillStyle = dotColor;
      ctx.shadowBlur = 15;
      ctx.shadowColor = dotColor;
      ctx.beginPath();
      ctx.arc(dotPos.x, dotPos.y, dotSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }

    function destroy() {
      canvas.remove();
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    }

    function Particle(x, y) {
      this.initialLifeSpan = sparkleLifeSpan;
      this.lifeSpan = sparkleLifeSpan;
      this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 2),
        y: Math.random() * 2 + 1
      };
      this.position = { x: x, y: y };
      this.size = Math.random() * 3 + 1;

      this.update = function(ctx) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.lifeSpan--;
        
        this.velocity.y += 0.1;
        this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * 0.05;

        const opacity = Math.max(this.lifeSpan / this.initialLifeSpan, 0);

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = sparkleColor;
        ctx.shadowBlur = 10;
        ctx.shadowColor = sparkleColor;
        ctx.beginPath();
        ctx.arc(
          this.position.x,
          this.position.y,
          this.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      };
    }

    prefersReducedMotion.onchange = () => {
      if (prefersReducedMotion.matches) {
        destroy();
      } else {
        init();
      }
    };

    init();

    return { destroy: destroy };
  }

  window.followingDotWithSparkles = followingDotWithSparkles;

  function tryInit() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    
    if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
      return;
    }
    
    if (mainContent && !mainContent.classList.contains('hidden')) {
      window.cursorEffect = followingDotWithSparkles({
        dotColor: '#ffffff',
        sparkleColor: '#ffffff',
        dotSize: 6,
        dotLag: 10,
        sparkleInterval: 50,
        sparkleLifeSpan: 60
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) {
      welcomeScreen.addEventListener('click', () => {
        setTimeout(tryInit, 600);
      });
    }
  });

  document.addEventListener('keydown', () => {
    setTimeout(tryInit, 600);
  }, { once: true });

  setTimeout(tryInit, 1000);

})();