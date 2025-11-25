// Initialize Vanilla Tilt for profile card
document.addEventListener('DOMContentLoaded', function() {
  const profileCard = document.querySelector('[data-tilt]');
  
  if (profileCard && typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(profileCard, {
      max: 25,              // Maximum tilt angle (25 degrees)
      scale: 1.05,          // Scale on hover (5% larger)
      speed: 400,           // Speed of tilt animation (ms)
      transition: true,     // Smooth transition
      easing: "cubic-bezier(.03,.98,.52,.99)",
      perspective: 1200,    // Perspective depth
      glare: false,         // No glare effect (optional)
      'max-glare': 0.2      // If glare enabled, max intensity
    });
  } else if (!profileCard) {
    console.log('Profile card element not found for tilt effect');
  } else if (typeof VanillaTilt === 'undefined') {
    console.log('Vanilla Tilt library not loaded');
  }
});
