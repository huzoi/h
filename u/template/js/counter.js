// Global View Counter - API Version
(function() {
  'use strict';

  // Replace with your API endpoint
  const API_URL = 'https://worker.misc-e33.workers.dev';

  function initializeViewCounter() {
    const viewCountElement = document.getElementById('viewCount');
    
    if (!viewCountElement) {
      console.log('View counter element not found');
      return;
    }

    // Show loading state
    viewCountElement.textContent = '...';

    // Fetch view count from API
    fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const viewCount = data.views || 0;
      viewCountElement.textContent = viewCount;
      viewCountElement.setAttribute('data-views', viewCount);
      console.log('View counter updated:', viewCount);
    })
    .catch(error => {
      console.log('Error fetching view count:', error);
      // Fallback to local counter
      let localCount = 1;
      try {
        const stored = localStorage.getItem('huzoi_view_counter');
        if (stored) {
          localCount = parseInt(stored) + 1;
        }
        localStorage.setItem('huzoi_view_counter', localCount.toString());
      } catch (e) {
        localCount = Math.floor(Math.random() * 5000) + 1000;
      }
      viewCountElement.textContent = localCount;
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeViewCounter);
  } else {
    initializeViewCounter();
  }
})();
