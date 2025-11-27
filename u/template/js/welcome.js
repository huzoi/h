document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const mainContent = document.getElementById("mainContent");
  const video = document.getElementById("bgVideo");

  if (video) {
    video.pause();
    video.muted = true;
  }

  function dismissWelcomeScreen() {
    welcomeScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");
  }

  welcomeScreen.addEventListener("click", (e) => {
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => console.log("Video play blocked:", err));
      }
    }
    dismissWelcomeScreen();
  });

  document.addEventListener("keydown", (e) => {
    if (!welcomeScreen.classList.contains("hidden")) {
      if (video) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => console.log("Video play blocked:", err));
        }
      }
      dismissWelcomeScreen();
    }
  });
});
