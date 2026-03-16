const button = document.getElementById('soundToggle');
const audio = document.getElementById('audioatp');

if (button && audio) {
  button.innerHTML = '<i class="fas fa-volume-mute"></i>';
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!audio.paused) {
      audio.pause();
      button.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      audio.play();
      button.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });
}
