// counter.js
(() => {
  fetch(`https://hoodrich-counter.tear-7b0.workers.dev/hit?path=${encodeURIComponent(location.pathname)}`)
    .then(r => r.json())
    .then(j => {
      const el = document.getElementById('vcn');
      if (el) el.textContent = j.views;
    });
})();
