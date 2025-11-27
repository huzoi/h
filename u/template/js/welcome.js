window.copyToClipboard = function(text) {
  if (!text || text === 'YOUR_LITECOIN_ADDRESS') {
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
  }).catch(err => {
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
  const video = document.getElementById('bgVideo');

  if (welcomeScreen) {
    welcomeScreen.classList.add('hidden');
  }
  
  if (mainContent) {
    mainContent.classList.remove('hidden');
  }

  if (video) {
    video.play().catch(err => console.log('Video autoplay prevented:', err));
  }
};


document.addEventListener('DOMContentLoaded', function() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  
  if (welcomeScreen) {
    welcomeScreen.addEventListener('click', function(e) {
      if (e.target === welcomeScreen) {
        window.dismissWelcome(e);
      }
    });
  }
});

document.addEventListener('keydown', function(event) {
  const welcomeScreen = document.getElementById('welcomeScreen');
  if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
    window.dismissWelcome();
  }
});
