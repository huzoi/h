// Select all cards
const cards = document.querySelectorAll('.container');

// Add event listeners for each card
cards.forEach((card) => {
  // Handle mousemove event for tilt effect
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Cursor position relative to card
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2; // Adjusted for a more central focus
    const centerY = rect.height / 2;

    // Increase intensity by reducing the divisor
    const rotateX = (centerY - y) / 20; // Reduced divisor for a stronger effect
    const rotateY = (x - centerX) / 20;

    // Apply the transformation with scale and shadow for added intensity
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
  });

  // Handle mouseleave event to reset the card
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});
