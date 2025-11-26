// View Counter - Standalone
(function() {
  'use strict';

  function initializeViewCounter() {
    const viewCountElement = document.getElementById('viewCount');
    
    if (!viewCountElement) {
      console.log('View counter element not found');
      return;
    }

    let viewCount = 0;
    const storageKey = 'huzoi_view_counter';

    try {
      // Try to use localStorage
      const stored = localStorage.getItem(storageKey);
      
      if (stored) {
        viewCount = parseInt(stored) + 1;
      } else {
        viewCount = 1;
      }
      
      localStorage.setItem(storageKey, viewCount.toString());
      console.log('View counter updated:', viewCount);
      
    } catch (error) {
      // If localStorage fails, use a fallback
      console.log('localStorage unavailable, using fallback counter');
      viewCount = Math.floor(Math.random() * 5000) + 1000;
    }

    // Display the counter
    viewCountElement.textContent = viewCount;
    viewCountElement.setAttribute('data-views', viewCount);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeViewCounter);
  } else {
    initializeViewCounter();
  }
})();
