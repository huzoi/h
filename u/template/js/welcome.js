// Welcome Screen Dismissal - Make it global
window.dismissWelcome = function(event) {
  if (event) event.preventDefault();
  
  const welcomeScreen = document.getElementById('welcomeScreen');
  const mainContent = document.getElementById('mainContent');
  
  if (welcomeScreen) {
    welcomeScreen.classList.add('hidden');
    
    // Wait for fade animation to complete before playing audio
    setTimeout(() => {
      const audio = document.getElementById('audioatp');
      if (audio) {
        audio.play().catch(err => console.log('Audio autoplay prevented:', err));
      }
    }, 800); // Matches CSS transition duration
  }
  
  if (mainContent) {
    mainContent.classList.remove('hidden');
  }
};

// Allow pressing any key to dismiss
document.addEventListener('keydown', function(event) {
  const welcomeScreen = document.getElementById('welcomeScreen');
  if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
    window.dismissWelcome();
  }
});
