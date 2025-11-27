window.copyToClipboard = function(text) {
  if (!text || text === 'YOUR_LITECOIN_ADDRESS') {
    alert('Litecoin address not configured. Please update the address in the HTML.');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    alert('Litecoin address copied to clipboard!');
  }).catch(err => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Litecoin address copied to clipboard!');
  });
};

window.dismissWelcome = function(event) {
  if (event) event.preventDefault();
  
  const welcomeScreen = document.getElementById('welcomeScreen');
  const mainContent = document.getElementById('mainContent');
  
  if (welcomeScreen) {
    welcomeScreen.classList.add('hidden');
    
    setTimeout(() => {
      const audio = document.getElementById('audioatp');
      if (audio) {
        audio.play().catch(err => console.log('Audio autoplay prevented:', err));
      }
    }, 1500);
  }
  
  if (mainContent) {
    mainContent.classList.remove('hidden');
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
