/* ---------- DOM hooks ---------- */
const dcCard = document.getElementById('dcCard');
const dcAvatar = document.getElementById('dcAvatar');
const dcName = document.getElementById('dcName');
const dcBio = document.getElementById('dcBio');
const dcActivity = document.getElementById('dcActivity');

/* ---------- helper: pretty verb ---------- */
function verb(type) {
  switch (type) {
    case 0: return 'Playing';
    case 1: return 'Streaming';
    case 2: return 'Listening to';
    case 3: return 'Watching';
    case 5: return 'Competing in';
    default: return '';
  }
}

/* ---------- helper: nitro badge SVG ---------- */
const nitroBadge = `
<svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-left:3px;">
  <path d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8zm1.414 4l2.122 2.121-1.415 1.415L8 5.414 6.879 6.536 5.464 5.121 7.586 3l.828.001zM4.464 7.879L5.88 6.464 7 7.586l-1.121 1.121-1.415-1.414zm3.536 3.536L8 10.586l1.121 1.121 1.415-1.414L9.414 9.464 8.293 8.343 7.172 9.464l-1.415-1.414 1.121-1.121zm3.536-3.536L11.536 6.464 13 7.879l-1.415 1.414L10.464 7.172z" fill="#5865F2"/>
</svg>`;

/* ---------- injected Discord ID ---------- */
const id = window.DISCORD_ID || '';

/* ---------- fill card ---------- */
async function paintDiscordCard() {
  if (!id) {
    console.log('No Discord ID set');
    return;
  }

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
    
    if (!res.ok) {
      console.log('Lanyard API error:', res.status);
      return;
    }
    
    const { data } = await res.json();
    
    if (!data) {
      console.log('No data returned from Lanyard');
      return;
    }

    /* ---------- get first activity ---------- */
    const activities = data.activities || [];
    const spotify = data.spotify;
    const first = activities[0];

    /* ---------- build bio: white verb, normal color for rest ---------- */
    let bio = '';
    
    // Priority: Spotify > Custom Status > First Activity
    if (spotify && spotify.song) {
      const track = spotify.song;
      const artist = spotify.artist || '';
      bio = `<span style="color:#ffffff">Listening to</span> ${track}${artist ? '<br>' + artist : ''}`;
    } else if (data.discord_status && first?.name === 'Custom Status') {
      bio = first.state || '';
    } else if (first?.details && first.type !== undefined) {
      const v = verb(first.type);
      bio = `<span style="color:#ffffff">${v}</span> ${first.details}${first.state ? '<br>' + first.state : ''}`;
    } else if (first?.name) {
      bio = `<span style="color:#ffffff">${verb(first.type || 0)}</span> ${first.name}`;
    }

    /* ---------- build clean display name + badge ---------- */
    const username = data.discord_user.username || 'Unknown';
    const discriminator = data.discord_user.discriminator;
    const globalName = data.discord_user.global_name || username;
    
    // Check for Nitro (animated avatar = Nitro)
    const hasNitro = data.discord_user.avatar?.startsWith('a_') || false;
    
    const cleanName = discriminator === '0' || !discriminator
      ? globalName
      : `${globalName}#${discriminator}`;
    
    const nameHTML = hasNitro
      ? `${cleanName}${nitroBadge}`
      : cleanName;

    /* ---------- build avatar URL ---------- */
    const avatarId = data.discord_user.avatar;
    const avatarExt = avatarId?.startsWith('a_') ? 'gif' : 'png';
    const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatarId}.${avatarExt}?size=128`;

    /* ---------- map card ---------- */
    const card = {
      avatar: avatarUrl,
      displayName: nameHTML,
      bio: bio,
      profileDeepLink: `https://discord.com/users/${id}`,
      status: data.discord_status || 'offline'
    };

    /* ---------- push into DOM ---------- */
    if (dcAvatar) dcAvatar.src = card.avatar;
    if (dcName) dcName.innerHTML = card.displayName;
    if (dcBio) dcBio.innerHTML = card.bio;
    if (dcCard) dcCard.href = card.profileDeepLink;

    /* ---------- activity image ---------- */
    let actImg = '';
    
    if (spotify && spotify.album_art_url) {
      actImg = spotify.album_art_url;
    } else if (first?.assets?.large_image) {
      const largeImage = first.assets.large_image;
      if (largeImage.startsWith('mp:')) {
        actImg = `https://media.discordapp.net/${largeImage.replace('mp:', '')}`;
      } else {
        actImg = `https://cdn.discordapp.com/app-assets/${first.application_id}/${largeImage}.png`;
      }
    }

    if (dcActivity) {
      dcActivity.src = actImg;
      dcActivity.style.display = actImg ? 'block' : 'none';
    }

    console.log('Discord card updated:', username);
  } catch (error) {
    console.log('Error painting Discord card:', error);
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', paintDiscordCard);
} else {
  paintDiscordCard();
}

// Refresh every 15 seconds (Lanyard updates faster than 30s)
setInterval(paintDiscordCard, 15000);
