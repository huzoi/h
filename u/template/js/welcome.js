document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const mainContent = document.getElementById("mainContent");
  const video = document.getElementById("bgVideo");
  const audio = document.getElementById("audioatp");

  // Ensure video starts paused
  if (video) {
    video.pause();
    video.muted = true;
  }

  function dismissWelcome() {
    welcomeScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");

    if (video) video.play().catch(err => console.log("Video play blocked:", err));
    if (audio) audio.play().catch(err => console.log("Audio play blocked:", err));
  }

  // Click handler
  welcomeScreen.addEventListener("click", dismissWelcome);

  // Keydown handler
  document.addEventListener("keydown", () => {
    if (!welcomeScreen.classList.contains("hidden")) dismissWelcome();
  });
});
