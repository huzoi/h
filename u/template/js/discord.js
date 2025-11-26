// Discord Profile Fetching - Using Lanyard API (No Auth Required)
async function fetchDiscordProfile() {
  const discordId = window.DISCORD_ID;
  
  if (!discordId) {
    console.log('Discord ID not set');
    return;
  }

  try {
    // Using Lanyard API - free service that doesn't require authentication
    const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
    
    if (!response.ok) {
      console.log('Lanyard API error:', response.status);
      // Fallback to placeholder
      setDiscordPlaceholder();
      return;
    }

    const data = await response.json();
    const user = data.data;

    // Update Discord Card
    const discordCard = document.getElementById('discordCard');
    const discordName = document.getElementById('discordName');
    const discordAvatar = document.getElementById('discordAvatar');

    if (discordName) {
      discordName.textContent = user.username;
    }

    if (discordAvatar && user.avatar) {
      const avatarUrl = `https://cdn.discordapp.com/avatars/${discordId}/${user.avatar}.png?size=256`;
      discordAvatar.src = avatarUrl;
      discordAvatar.onerror = function() {
        this.src = `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`;
      };
    }

    if (discordCard) {
      discordCard.href = `https://discord.com/users/${discordId}`;
      discordCard.title = `Visit ${user.username}'s Discord Profile`;
    }

  } catch (error) {
    console.log('Error fetching Discord profile:', error);
    setDiscordPlaceholder();
  }
}

// Fallback placeholder
function setDiscordPlaceholder() {
  const discordName = document.getElementById('discordName');
  const discordAvatar = document.getElementById('discordAvatar');
  
  if (discordName) {
    discordName.textContent = 'Discord User';
  }
  
  if (discordAvatar) {
    discordAvatar.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2750%22 fill=%22%235865f2%22/%3E%3Ctext x=%2250%22 y=%2760%22 font-size=%2750%22 text-anchor=%22middle%22 fill=%22white%22%3E%3C/text%3E%3C/svg%3E';
  }
}

// View Counter
function initializeViewCounter() {
  const viewCountElement = document.getElementById('viewCount');
  
  if (!viewCountElement) {
    console.log('View counter element not found');
    return;
  }

  let viewCount = 0;

  try {
    const stored = localStorage.getItem('huzoi_views');
    viewCount = stored ? parseInt(stored) + 1 : 1;
    localStorage.setItem('huzoi_views', viewCount.toString());
  } catch (e) {
    // If localStorage is not available, use a session counter
    console.log('localStorage not available, using session counter');
    viewCount = Math.floor(Math.random() * 1000) + 1;
  }

  viewCountElement.textContent = viewCount;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    fetchDiscordProfile();
    initializeViewCounter();
  });
} else {
  fetchDiscordProfile();
  initializeViewCounter();
}
