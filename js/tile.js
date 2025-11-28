function initTile() {
  const profileCard = document.querySelector('[data-tilt]');
  if (!profileCard) return;

  let isHovering = false;
  let rotateX = 0;
  let rotateY = 0;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let animationId = null;

  profileCard.addEventListener('mouseenter', () => {
    isHovering = true;
    profileCard.style.transition = 'none';
  });

  profileCard.addEventListener('mouseleave', () => {
    isHovering = false;
    targetRotateX = 0;
    targetRotateY = 0;
    profileCard.style.transition = 'transform 0.6s ease-out';
    profileCard.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)';
  });

  profileCard.addEventListener('mousemove', (e) => {
    if (!isHovering) return;

    const rect = profileCard.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    targetRotateY = (mouseX - centerX) / centerX * 15;
    targetRotateX = -(mouseY - centerY) / centerY * 15;

    if (!animationId) {
      const updateTransform = () => {
        rotateY += (targetRotateY - rotateY) * 0.1;
        rotateX += (targetRotateX - rotateX) * 0.1;

        profileCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

        if (Math.abs(rotateY - targetRotateY) > 0.1 || Math.abs(rotateX - targetRotateX) > 0.1) {
          animationId = requestAnimationFrame(updateTransform);
        } else {
          animationId = null;
        }
      };
      updateTransform();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.getElementById('welcomeScreen');
  if (welcomeScreen) {
    welcomeScreen.addEventListener('click', () => {
      initTile();
    });
  }
});
