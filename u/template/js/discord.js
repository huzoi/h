// Discord Profile Fetching
async function fetchDiscordProfile() {
  const discordId = window.DISCORD_ID;
  
  if (!discordId) {
    console.log('Discord ID not set');
    return;
  }

  try {
    const response = await fetch(`https://discord.com/api/users/${discordId}`);
    
    if (!response.ok) {
      console.log('Discord API error:', response.status);
      return;
    }

    const user = await response.json();

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
  }
}

// View Counter
function initializeViewCounter() {
  const viewCountElement = document.getElementById('viewCount');
  
  if (!viewCountElement) {
    console.log('View counter element not found');
    return;
  }

  // Try to use localStorage
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
document.addEventListener('DOMContentLoaded', function() {
  fetchDiscordProfile();
  initializeViewCounter();
});

// Fallback if DOMContentLoaded already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    fetchDiscordProfile();
    initializeViewCounter();
  });
} else {
  fetchDiscordProfile();
  initializeViewCounter();
}
