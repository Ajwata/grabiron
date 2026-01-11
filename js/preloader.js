// Preloader functionality
export function initPreloader() {
  const preloader = document.getElementById('preloader');
  
  if (!preloader) return;
  
  // Hide preloader when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      
      // Remove from DOM after transition
      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 500);
    }, 500); // Show for at least 500ms
  });
  
  // Fallback: hide after 3 seconds if load event doesn't fire
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 500);
    }
  }, 3000);
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPreloader);
} else {
  initPreloader();
}
