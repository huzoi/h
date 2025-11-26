// Copy to Clipboard Function for Litecoin
window.copyToClipboard = function(text) {
  if (!text || text === 'YOUR_LITECOIN_ADDRESS') {
    alert('Litecoin address not configured. Please update the address in the HTML.');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    // Show success feedback
    alert('Litecoin address copied to clipboard!');
  }).catch(err => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Litecoin address copied to clipboard!');
  });
};

// Welcome Screen Dismissal
window.dismissWelcome = function(event) {
  if (event) event.preventDefault();
  
  const welcomeScreen = document.getElementById('welcomeScreen');
  const mainContent = document.getElementById('mainContent');
  
  if (welcomeScreen) {
    welcomeScreen.classList.add('hidden');
    
    // Wait for fade animation to complete (1.5s) before playing audio
    setTimeout(() => {
      const audio = document.getElementById('audioatp');
      if (audio) {
        audio.play().catch(err => console.log('Audio autoplay prevented:', err));
      }
    }, 1500); // Matches CSS transition duration (1.5s)
  }
  
  if (mainContent) {
    mainContent.classList.remove('hidden');
  }
};

// Add click listener to welcome screen
document.addEventListener('DOMContentLoaded', function() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  
  if (welcomeScreen) {
    welcomeScreen.addEventListener('click', function(e) {
      // Only trigger if clicking on the screen itself
      if (e.target === welcomeScreen) {
        window.dismissWelcome(e);
      }
    });
  }
});

// Allow pressing any key to dismiss
document.addEventListener('keydown', function(event) {
  const welcomeScreen = document.getElementById('welcomeScreen');
  if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
    window.dismissWelcome();
  }
});
