// Video hero fallback handling

/**
 * Check if video can autoplay
 * @returns {Promise<boolean>}
 */
async function canAutoplay() {
  try {
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.src = 'data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAACm1kYXQAAAANbW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAA+gAAAAAAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAkdHJhawAAAFx0a2hkAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAA';
    
    await video.play();
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Setup video hero with fallback
 */
export async function setupVideoHero() {
  const hero = document.querySelector('.hero');
  const video = document.querySelector('.hero-video');
  const fallback = document.querySelector('.hero-fallback');
  const playBtn = document.querySelector('.play-video-btn');
  
  if (!hero || !video) return;
  
  // Check if autoplay is supported
  const autoplaySupported = await canAutoplay();
  
  if (!autoplaySupported && fallback) {
    // Show fallback
    fallback.classList.add('active');
    video.style.display = 'none';
    
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        video.style.display = 'block';
        video.muted = true;
        video.play().then(() => {
          fallback.classList.remove('active');
        }).catch(err => {
          console.error('Video play error:', err);
        });
      });
    }
  } else {
    // Try to play video
    video.play().catch(err => {
      console.error('Video autoplay failed:', err);
      if (fallback) {
        fallback.classList.add('active');
        video.style.display = 'none';
      }
    });
  }
  
  // Handle video errors
  video.addEventListener('error', () => {
    console.error('Video loading error');
    if (fallback) {
      fallback.classList.add('active');
      video.style.display = 'none';
    }
  });
  
  // Ensure video loops
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.play().catch(err => console.error('Video loop error:', err));
  });
}

/**
 * Initialize video hero on page load
 */
export function initVideoHero() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupVideoHero);
  } else {
    setupVideoHero();
  }
}
