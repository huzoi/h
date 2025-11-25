// Welcome Screen Dismissal
function dismissWelcome() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const mainContent = document.getElementById('mainContent');
  
  if (welcomeScreen) {
    welcomeScreen.classList.add('hidden');
  }
  
  if (mainContent) {
    mainContent.classList.remove('hidden');
  }
  
  // Play audio if it exists
  const audio = document.getElementById('audioatp');
  if (audio) {
    audio.play().catch(err => console.log('Audio autoplay prevented:', err));
  }
}

// Allow pressing any key to dismiss
document.addEventListener('keydown', function(event) {
  const welcomeScreen = document.getElementById('welcomeScreen');
  if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
    dismissWelcome();
  }
});
