document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const mainContent = document.getElementById("mainContent");
  const video = document.getElementById("bgVideo");

  // Ensure video starts paused
  if (video) {
    video.pause();
    video.muted = true;
  }

  function dismissWelcomeScreen() {
    welcomeScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");
  }

  // Direct user gesture: click
  welcomeScreen.addEventListener("click", () => {
    if (video) {
      video.muted = true;
      video.play().catch(err => console.log("Video play blocked:", err));
    }
    dismissWelcomeScreen();
  });

  // Optional: direct user gesture: keydown
  document.addEventListener("keydown", () => {
    if (!welcomeScreen.classList.contains("hidden")) {
      if (video) {
        video.muted = true;
        video.play().catch(err => console.log("Video play blocked:", err));
      }
      dismissWelcomeScreen();
    }
  });
});
