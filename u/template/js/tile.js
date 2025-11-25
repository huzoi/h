// Lightweight 3D Tilt Effect (No External Library Needed)
document.addEventListener('DOMContentLoaded', function() {
  const profileCard = document.querySelector('[data-tilt]');
  
  if (!profileCard) return;

  let isHovering = false;
  let rotateX = 0;
  let rotateY = 0;

  profileCard.addEventListener('mouseenter', () => {
    isHovering = true;
  });

  profileCard.addEventListener('mouseleave', () => {
    isHovering = false;
    profileCard.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)';
  });

  profileCard.addEventListener('mousemove', (e) => {
    if (!isHovering) return;

    const rect = profileCard.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    rotateY = (mouseX - centerX) / centerX * 15;
    rotateX = -(mouseY - centerY) / centerY * 15;

    profileCard.style.transition = 'none';
    profileCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
});
