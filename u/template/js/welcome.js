window.copyToClipboard = function(text) {
  if (!text || text === 'YOUR_LITECOIN_ADDRESS') return;
  navigator.clipboard.writeText(text).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  });
};

window.dismissWelcome = function(event) {
  if (event) event.preventDefault();

  const welcomeScreen = document.getElementById('welcomeScreen');
  const mainContent = document.getElementById('mainContent');

  if (welcomeScreen) welcomeScreen.classList.add('hidden');
  if (mainContent) mainContent.classList.remove('hidden');

};

document.addEventListener('DOMContentLoaded', function() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const video = document.getElementById('bgVideo');

  if (welcomeScreen) {
    welcomeScreen.addEventListener('click', function(e) {

      if (video) {
        video.muted = true;
        video.play().catch(err => console.log("Video play blocked:", err));
      }

      if (e.target === welcomeScreen) {
        window.dismissWelcome(e);
      }
    });
  }
});

document.addEventListener('keydown', function(event) {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const video = document.getElementById('bgVideo');

  if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {

    if (video) {
      video.muted = true;
      video.play().catch(err => console.log("Video play blocked:", err));
    }

    window.dismissWelcome();
  }
});
