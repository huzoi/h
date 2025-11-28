const button = document.getElementById('soundToggle');
const audio = document.getElementById('audioatp');

if (button && audio) {
  let isPlaying = false;
  button.innerHTML = '<i class="fas fa-volume-mute"></i>';
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (isPlaying) {
      audio.pause();
      button.innerHTML = '<i class="fas fa-volume-mute"></i>';
      isPlaying = false;
    } else {
      audio.play();
      button.innerHTML = '<i class="fas fa-volume-up"></i>';
      isPlaying = true;
    }
  });
}
