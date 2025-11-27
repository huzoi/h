document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const mainContent = document.getElementById("mainContent");
  const video = document.getElementById("bgVideo");

  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  function dismiss() {
    welcomeScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");
  }

  welcomeScreen.addEventListener("click", () => {
    if (video) {
      video.muted = true;
      video.play().catch(err => console.log("Video blocked:", err));
    }
    dismiss();
  });

  document.addEventListener("keydown", () => {
    if (!welcomeScreen.classList.contains("hidden")) {
      if (video) {
        video.muted = true;
        video.play().catch(err => console.log("Video blocked:", err));
      }
      dismiss();
    }
  });
});
