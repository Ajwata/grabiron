/**
 * GRABIRON INDUSTRIAL ANIMATIONS
 * Modern, subtle micro-interactions
 */

class GrabIronAnimations {
  constructor() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    if (this.reducedMotion) {
      document.body.classList.add('reduce-motion');
      console.log('GrabIron Animations: Reduced motion enabled');
      return;
    }

    console.log('GrabIron Animations: Initializing...');
    // this.initHeroHook(); // Disabled - hero has video background
    this.initSparkButtons();
    this.initSectionLines();
    this.initCardLifts();
    this.initTechPatterns();
    this.initScrollAnimations();
    this.initExcavator();
    this.initCornerBolts();
    this.initFloatingTools();
    this.initStatCounters();
    this.initPulseIndicators();
    this.initWeldingSparks();
    this.initQualityBadges();
    console.log('GrabIron Animations: Ready!');
  }

  /**
   * 1. HERO HOOK
   * Adds swinging hook to hero section with parallax scroll
   */
  initHeroHook() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create hook element
    const hookContainer = document.createElement('div');
    hookContainer.className = 'hero-hook';
    hookContainer.innerHTML = `
      <div class="hook-cable"></div>
      <svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#9ca3af;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#6b7280;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#4b5563;stop-opacity:1" />
          </linearGradient>
        </defs>
        <!-- Hook ring -->
        <circle cx="40" cy="15" r="12" fill="none" stroke="url(#hookGradient)" stroke-width="3"/>
        <!-- Hook body -->
        <path d="M 40 27 Q 40 50 55 65 Q 60 70 60 80 Q 60 90 50 95 Q 40 100 30 95 Q 25 92 25 85 L 25 70" 
              fill="url(#hookGradient)" stroke="#374151" stroke-width="1"/>
        <!-- Hook tip -->
        <path d="M 25 70 Q 20 68 20 62 Q 20 55 30 55" 
              fill="none" stroke="url(#hookGradient)" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `;
    
    hero.appendChild(hookContainer);

    // Parallax on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY > 100) {
            hookContainer.classList.add('scrolled');
          } else {
            hookContainer.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * 2. SPARK BUTTONS
   * Creates spark particles on button hover/click
   */
  initSparkButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-large, .cta-button');
    
    buttons.forEach(btn => {
      btn.classList.add('spark-btn');
      
      const triggerSparks = (e) => {
        if (this.reducedMotion) return;
        
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.createSparks(btn, x, y);
      };

      // Desktop: hover
      if (window.innerWidth > 768) {
        btn.addEventListener('mouseenter', triggerSparks);
      } else {
        // Mobile: tap
        btn.addEventListener('pointerdown', triggerSparks);
      }
    });
  }

  createSparks(button, x, y) {
    const sparkCount = 8;
    const container = document.createElement('div');
    container.className = 'sparks';
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    
    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      
      // Random direction
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
      const distance = 30 + Math.random() * 20;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      
      spark.style.setProperty('--tx', `${tx}px`);
      spark.style.setProperty('--ty', `${ty}px`);
      spark.style.animationDelay = `${Math.random() * 50}ms`;
      
      container.appendChild(spark);
    }
    
    button.appendChild(container);
    
    // Remove after animation
    setTimeout(() => {
      container.remove();
    }, 500);
  }

  /**
   * 3. SECTION LINES
   * Animated metal lines under section headings
   */
  initSectionLines() {
    const headings = document.querySelectorAll('.section-title, h2.hero-title');
    
    headings.forEach(heading => {
      if (!heading.classList.contains('section-line')) {
        heading.classList.add('section-line');
      }
    });

    // Trigger animation on viewport entry
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    headings.forEach(heading => observer.observe(heading));
  }

  /**
   * 4. CARD LIFTS
   * Adds hook lift effect to cards
   */
  initCardLifts() {
    const cards = document.querySelectorAll('.product-card, .feature-card, .industry-card, .work-item');
    
    cards.forEach(card => {
      if (!card.classList.contains('card-lift')) {
        card.classList.add('card-lift');
      }
    });

    // Mobile: trigger on viewport entry
    if (window.innerWidth <= 768) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.3
      });

      cards.forEach(card => observer.observe(card));
    }
  }

  /**
   * 5. TECH PATTERNS
   * Adds subtle tech patterns to backgrounds
   */
  initTechPatterns() {
    const sections = [
      { selector: '.hero', type: 'bolts' },
      { selector: '.benefits-bar', type: 'grid' },
      { selector: '.industries-section', type: 'bolts' }
    ];

    sections.forEach(({ selector, type }) => {
      const section = document.querySelector(selector);
      if (section && !section.querySelector('.tech-pattern')) {
        const pattern = document.createElement('div');
        pattern.className = `tech-pattern ${type} animated`;
        section.style.position = 'relative';
        section.insertBefore(pattern, section.firstChild);
      }
    });
  }

  /**
   * 6. SCROLL ANIMATIONS
   * Fade-in-up animations for various elements
   */
  initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-up, .industry-card, .stat-card, .tech-feature');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100); // Stagger effect
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
      if (!el.classList.contains('fade-in-up')) {
        el.classList.add('fade-in-up');
      }
      observer.observe(el);
    });
  }

  /**
   * 7. METAL SHINE
   * Adds metallic shine effect to elements
   */
  addMetalShine(element) {
    if (!element.classList.contains('metal-shine')) {
      element.classList.add('metal-shine');
    }
  }

  /**
   * 8. EXCAVATOR ANIMATION
   * Creates small animated excavator in Industries section
   */
  initExcavator() {
    // Find Industries We Serve section
    const industriesSection = document.querySelector('.industries-section');
    if (!industriesSection) return;

    const excavatorScene = document.createElement('div');
    excavatorScene.className = 'excavator-mini';
    excavatorScene.innerHTML = `
      <svg class="excavator-svg" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Ground line -->
        <line class="excavator-ground" x1="0" y1="250" x2="400" y2="250" 
              stroke="#ff6600" stroke-width="3" stroke-linecap="round" opacity="0.3"/>
        
        <!-- Excavator base -->
        <g class="excavator-base">
          <!-- Tracks -->
          <rect x="50" y="230" width="120" height="20" rx="10" fill="#4b5563"/>
          <rect x="60" y="235" width="15" height="10" rx="2" fill="#6b7280"/>
          <rect x="85" y="235" width="15" height="10" rx="2" fill="#6b7280"/>
          <rect x="110" y="235" width="15" height="10" rx="2" fill="#6b7280"/>
          <rect x="135" y="235" width="15" height="10" rx="2" fill="#6b7280"/>
          
          <!-- Body -->
          <rect x="70" y="200" width="80" height="30" rx="4" fill="#6b7280"/>
          
          <!-- Cabin -->
          <path d="M 90 200 L 85 170 L 130 170 L 130 200 Z" fill="#4b5563"/>
          <rect x="95" y="178" width="25" height="15" rx="2" fill="#1a1a1a" opacity="0.3"/>
          
          <!-- Counterweight -->
          <rect x="70" y="205" width="20" height="25" rx="2" fill="#ff6600"/>
        </g>
        
        <!-- Arm (animated) -->
        <g class="excavator-arm">
          <!-- Main arm -->
          <rect x="140" y="205" width="100" height="12" rx="6" fill="#6b7280"/>
          <circle cx="145" cy="211" r="8" fill="#4b5563"/>
          <circle cx="235" cy="211" r="8" fill="#4b5563"/>
          
          <!-- Hydraulic cylinders -->
          <line x1="150" y1="215" x2="170" y2="195" stroke="#ff6600" stroke-width="4" stroke-linecap="round"/>
          <line x1="210" y1="215" x2="220" y2="190" stroke="#ff6600" stroke-width="4" stroke-linecap="round"/>
          
          <!-- Forearm -->
          <g class="excavator-bucket">
            <rect x="230" y="207" width="80" height="10" rx="5" fill="#6b7280"/>
            <circle cx="235" cy="212" r="6" fill="#4b5563"/>
            
            <!-- Bucket/Grapple -->
            <g transform="translate(310, 210)">
              <!-- Cable -->
              <line class="excavator-cable" x1="0" y1="0" x2="0" y2="25" 
                    stroke="#ff6600" stroke-width="2"/>
              
              <!-- Grapple jaws -->
              <path d="M -8 25 L -12 35 L -8 45 L -4 40 Z" fill="#4b5563"/>
              <path d="M 8 25 L 12 35 L 8 45 L 4 40 Z" fill="#4b5563"/>
              
              <!-- Hook -->
              <circle cx="0" cy="25" r="4" fill="#ff6600"/>
            </g>
          </g>
        </g>
        
        <!-- Accent details -->
        <circle cx="110" cy="215" r="3" fill="#ff6600"/>
        <rect x="95" y="210" width="8" height="2" fill="#ff6600"/>
      </svg>
    `;

    // Add to Industries section as decorative element
    industriesSection.style.position = 'relative';
    industriesSection.appendChild(excavatorScene);

    // Trigger animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    observer.observe(excavatorScene);
  }

  /**
   * 8. CORNER BOLTS
   * Decorative metallic bolts in section corners
   */
  initCornerBolts() {
    const sections = document.querySelectorAll('.benefits-bar, .products-section, .industries-section, .cta-section');
    
    sections.forEach(section => {
      const boltsContainer = document.createElement('div');
      boltsContainer.className = 'corner-bolts';
      boltsContainer.innerHTML = `
        <div class="bolt bolt-tl"></div>
        <div class="bolt bolt-tr"></div>
        <div class="bolt bolt-bl"></div>
        <div class="bolt bolt-br"></div>
      `;
      section.style.position = 'relative';
      section.appendChild(boltsContainer);
    });
  }

  /**
   * 9. FLOATING TOOLS
   * Subtle floating tool icons as decorative elements
   */
  initFloatingTools() {
    const targetSections = document.querySelectorAll('.products-section, .about-intro');
    
    targetSections.forEach(section => {
      const toolsContainer = document.createElement('div');
      toolsContainer.className = 'floating-tools';
      
      const tools = [
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>',
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>',
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
      ];
      
      tools.forEach((toolSvg, index) => {
        const tool = document.createElement('div');
        tool.className = `floating-tool floating-tool-${index + 1}`;
        tool.innerHTML = toolSvg;
        toolsContainer.appendChild(tool);
      });
      
      section.style.position = 'relative';
      section.appendChild(toolsContainer);
    });
  }

  /**
   * 10. ANIMATED STAT COUNTERS
   * Count-up animation for numerical statistics
   */
  initStatCounters() {
    const statElements = document.querySelectorAll('[data-stat-count]');
    
    const animateCounter = (element) => {
      const target = parseInt(element.getAttribute('data-stat-count'));
      const originalText = element.textContent;
      const suffix = originalText.replace(/[0-9,]/g, '').trim();
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      element.classList.add('counting');
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target.toLocaleString() + suffix;
          element.classList.remove('counting');
          clearInterval(counter);
        } else {
          element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
      }, duration / steps);
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statElements.forEach(el => observer.observe(el));
  }

  /**
   * 11. PULSE INDICATORS
   * Subtle pulsing indicators on important elements
   */
  initPulseIndicators() {
    const indicators = document.querySelectorAll('.btn-primary, .cta-button, [data-pulse]');
    
    indicators.forEach(element => {
      if (!element.querySelector('.pulse-ring')) {
        const pulseRing = document.createElement('span');
        pulseRing.className = 'pulse-ring';
        element.style.position = 'relative';
        element.style.overflow = 'visible';
        element.appendChild(pulseRing);
      }
    });
  }

  /**
   * 12. WELDING SPARKS
   * Subtle spark effects on section borders during scroll
   */
  initWeldingSparks() {
    const sections = document.querySelectorAll('.benefits-bar, .products-section, .industries-section');
    
    sections.forEach(section => {
      const sparksTop = document.createElement('div');
      sparksTop.className = 'welding-sparks welding-sparks-top';
      
      const sparksBottom = document.createElement('div');
      sparksBottom.className = 'welding-sparks welding-sparks-bottom';
      
      for (let i = 0; i < 5; i++) {
        const spark = document.createElement('div');
        spark.className = 'weld-spark';
        spark.style.left = `${20 + i * 15}%`;
        spark.style.animationDelay = `${i * 0.2}s`;
        sparksTop.appendChild(spark.cloneNode());
        sparksBottom.appendChild(spark);
      }
      
      section.style.position = 'relative';
      section.appendChild(sparksTop);
      section.appendChild(sparksBottom);
      
      // Trigger animation on scroll into view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('welding-active');
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(section);
    });
  }

  /**
   * 13. QUALITY BADGES
   * Adds premium quality badges to cards
   */
  initQualityBadges() {
    const premiumCards = document.querySelectorAll('.product-card[data-premium], .benefit-blob-card, .feature-card');
    
    premiumCards.forEach(card => {
      if (card.querySelector('.quality-badge')) return;
      
      const badge = document.createElement('div');
      badge.className = 'quality-badge';
      badge.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      `;
      card.style.position = 'relative';
      card.appendChild(badge);
    });
  }
}

/**
 * Initialize animations when DOM is ready
 */
export function initAnimations() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new GrabIronAnimations();
    });
  } else {
    new GrabIronAnimations();
  }
}

export default GrabIronAnimations;
