const DISCORD_USER_ID = '1429098082318024735';

const dcCard = document.getElementById('dcCard');
const dcAvatar = document.getElementById('dcAvatar');
const dcName = document.getElementById('dcName');
const dcBio = document.getElementById('dcBio');
const dcActivity = document.getElementById('dcActivity');

const nitroBadge = `
<svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-left:3px;">
  <path d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8zm1.414 4l2.122 2.121-1.415 1.415L8 5.414 6.879 6.536 5.464 5.121 7.586 3l.828.001zM4.464 7.879L5.88 6.464 7 7.586l-1.121 1.121-1.415-1.414zm3.536 3.536L8 10.586l1.121 1.121 1.415-1.414L9.414 9.464 8.293 8.343 7.172 9.464l-1.415-1.414 1.121-1.121zm3.536-3.536L11.536 6.464 13 7.879l-1.415 1.414L10.464 7.172z" fill="#5865F2"/>
</svg>`;

function getActivityVerb(type) {
  const verbs = {
    0: 'Playing',
    1: 'Streaming',
    2: 'Listening to',
    3: 'Watching',
    5: 'Competing in'
  };
  return verbs[type] || '';
}

async function updateDiscordCard() {
  if (!dcCard || !dcAvatar || !dcName || !dcBio) {
    console.error('Discord card elements not found');
    return;
  }

  if (!DISCORD_USER_ID || DISCORD_USER_ID === 'YOUR_DISCORD_USER_ID') {
    console.warn('Discord User ID not configured. Please set DISCORD_USER_ID in ap.js');
    dcName.innerHTML = 'Discord User';
    dcBio.innerHTML = 'Configure your Discord ID';
    dcAvatar.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
    dcCard.href = '#';
    if (dcActivity) dcActivity.style.display = 'none';
    return;
  }

  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();

    if (!data || !data.discord_user) {
      throw new Error('Invalid data received from Lanyard API');
    }

    const user = data.discord_user;
    const activities = data.activities || [];
    const spotify = data.spotify;
    
    const avatarId = user.avatar;
    const isAnimated = avatarId?.startsWith('a_');
    const avatarExt = isAnimated ? 'gif' : 'png';
    const avatarUrl = avatarId 
      ? `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${avatarId}.${avatarExt}?size=128`
      : 'https://cdn.discordapp.com/embed/avatars/0.png';

    const username = user.username || 'Unknown';
    const discriminator = user.discriminator;
    const globalName = user.global_name || username;
    const hasNitro = isAnimated;
    
    const displayName = discriminator === '0' || !discriminator 
      ? globalName 
      : `${globalName}#${discriminator}`;

    let bioHTML = '';
    
    if (spotify && spotify.song) {
      const artist = spotify.artist ? `<br>${spotify.artist}` : '';
      bioHTML = `<span style="color:#ffffff">Listening to</span> ${spotify.song}${artist}`;
    } else {
      const customStatus = activities.find(a => a.name === 'Custom Status');
      const mainActivity = activities.find(a => a.name !== 'Custom Status');
      
      if (customStatus && customStatus.state) {
        bioHTML = customStatus.state;
      } else if (mainActivity) {
        const verb = getActivityVerb(mainActivity.type);
        const name = mainActivity.name || '';
        const details = mainActivity.details || '';
        const state = mainActivity.state ? `<br>${mainActivity.state}` : '';
        
        if (details) {
          bioHTML = `<span style="color:#ffffff">${verb}</span> ${details}${state}`;
        } else if (name) {
          bioHTML = `<span style="color:#ffffff">${verb}</span> ${name}`;
        }
      }
    }

    let activityImageUrl = '';
    
    if (spotify && spotify.album_art_url) {
      activityImageUrl = spotify.album_art_url;
    } else {
      const mainActivity = activities.find(a => a.name !== 'Custom Status');
      if (mainActivity?.assets?.large_image) {
        const largeImage = mainActivity.assets.large_image;
        if (largeImage.startsWith('mp:')) {
          activityImageUrl = `https://media.discordapp.net/${largeImage.replace('mp:', '')}`;
        } else if (mainActivity.application_id) {
          activityImageUrl = `https://cdn.discordapp.com/app-assets/${mainActivity.application_id}/${largeImage}.png`;
        }
      }
    }

    dcAvatar.src = avatarUrl;
    dcAvatar.alt = `${displayName}'s Avatar`;
    dcName.innerHTML = usernameHTML;
    dcBio.innerHTML = bioHTML || 'Online';
    dcCard.href = `https://discord.com/users/${DISCORD_USER_ID}`;

    if (dcActivity) {
      if (activityImageUrl) {
        dcActivity.src = activityImageUrl;
        dcActivity.style.display = 'block';
        dcActivity.alt = 'Activity';
      } else {
        dcActivity.style.display = 'none';
      }
    }

  } catch (error) {
    console.error('Error fetching Discord data:', error);
    
    dcName.innerHTML = 'Discord User';
    dcBio.innerHTML = 'Unable to load status';
    dcAvatar.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
    dcCard.href = '#';
    if (dcActivity) dcActivity.style.display = 'none';
  }
}

window.initDiscordCard = function() {
  console.log('Initializing Discord card...');
  updateDiscordCard();
  setInterval(updateDiscordCard, 15000);
};

if (typeof window.dismissWelcome === 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (!welcomeScreen || welcomeScreen.classList.contains('hidden')) {
      window.initDiscordCard();
    }
  });
}
