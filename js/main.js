// Main JavaScript - Header, Navigation, and Animations
import { setupFadeInAnimations, setupLazyLoading } from './ui.js';
import { initForms } from './forms.js';
import { initLanguageSwitcher } from './i18n.js';

/**
 * Setup sticky header
 */
function setupStickyHeader() {
  const header = document.querySelector('.site-header');
  
  if (!header) return;
  
  // Check if page has video hero
  const hasVideoHero = document.querySelector('.hero-video') !== null;
  
  if (hasVideoHero) {
    // Start transparent
    header.classList.add('transparent');
  } else {
    // Start solid
    header.classList.add('scrolled');
  }
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
      header.classList.remove('transparent');
    } else if (hasVideoHero) {
      header.classList.remove('scrolled');
      header.classList.add('transparent');
    }
  });
}

/**
 * Setup mobile menu
 */
function setupMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');
  
  if (!toggle || !nav) return;
  
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // Update icon
    const icon = toggle.querySelector('i, span');
    if (icon) {
      if (nav.classList.contains('active')) {
        icon.textContent = '✕';
      } else {
        icon.textContent = '☰';
      }
    }
  });
  
  // Close menu when clicking nav link (не dropdown)
  const navLinks = nav.querySelectorAll('a:not(.has-dropdown > a)');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      const icon = toggle.querySelector('i, span');
      if (icon) {
        icon.textContent = '☰';
      }
    });
  });
  
  // Mobile dropdown toggle
  setupMobileDropdown();
}

/**
 * Setup mobile dropdown (accordion style)
 */
function setupMobileDropdown() {
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  
  dropdownItems.forEach(item => {
    const link = item.querySelector(':scope > a');
    
    if (!link) return;
    
    link.addEventListener('click', (e) => {
      // На мобільних пристроях відкриваємо dropdown
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('active');
        
        // Закриваємо інші dropdown
        dropdownItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
      }
    });
  });
  
  // Закриваємо dropdown при кліку на підкатегорію
  const subLinks = document.querySelectorAll('.mega-dropdown a');
  subLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        dropdownItems.forEach(item => {
          item.classList.remove('active');
        });
      }
    });
  });
}

/**
 * Set active nav link
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    
    if (currentPath === linkPath || 
        (currentPath.startsWith('/products/') && linkPath === '/products/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Smooth scroll for anchor links
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Initialize homepage functionality
 */
function initHomePage() {
  // Load categories for homepage
  import('./api.js').then(({ fetchProducts }) => {
    import('./ui.js').then(({ setupFadeInAnimations }) => {
      import('./i18n.js').then(({ getCurrentLanguage }) => {
        fetchProducts().then(data => {
          const container = document.getElementById('home-series-grid');
          if (container && data.categories && data.categories.length > 0) {
            const lang = getCurrentLanguage();
            
            // Display all categories (max 6 for homepage)
            const displayCategories = data.categories.slice(0, 6);
            
            container.innerHTML = displayCategories.map(category => {
              const name = lang === 'uk' ? (category.nameUk || category.name) : category.name;
              const desc = lang === 'uk' ? (category.descriptionUk || category.description) : category.description;
              const totalProducts = category.subcategories.reduce((sum, sub) => sum + (sub.products?.length || 0), 0);
              
              return `
                <a href="/products/index.html?category=${category.id}" class="series-card fade-in">
                  <div class="series-image">
                    <img src="${category.heroImage || '/assets/img/category-placeholder.svg'}" alt="${name}">
                  </div>
                  <div class="series-info">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <span class="learn-more">Learn more →</span>
                  </div>
                </a>
              `;
            }).join('');
            
            setTimeout(() => setupFadeInAnimations(), 100);
          }
        }).catch(err => {
          console.error('Error loading categories:', err);
        });
      });
    });
  });
}

/**
 * Initialize common functionality
 */
function init() {
  initLanguageSwitcher();
  setupStickyHeader();
  setupMobileMenu();
  setActiveNavLink();
  setupSmoothScroll();
  setupLazyLoading();
  setupFadeInAnimations();
  initForms();
  
  // Check if we're on homepage and load series
  if (document.getElementById('home-series-grid')) {
    initHomePage();
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for use in other modules
export { init, initHomePage };
