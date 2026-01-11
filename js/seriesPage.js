// Series page functionality
import { getSeriesById, getModelsFromSeries } from './api.js';
import { renderModelCard, showLoading, showError, setupFadeInAnimations, setupSpecToggle, scrollToElement } from './ui.js';

/**
 * Get series ID from URL
 * @returns {string|null}
 */
function getSeriesIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

/**
 * Render series hero
 * @param {Object} series - Series data
 */
function renderHero(series) {
  const hero = document.querySelector('.series-hero');
  
  if (!hero) return;
  
  // Set background image
  if (series.heroImage) {
    hero.style.backgroundImage = `url(${series.heroImage})`;
  }
  
  // Update breadcrumbs and title
  const breadcrumbs = hero.querySelector('.breadcrumbs');
  const title = hero.querySelector('h1');
  
  if (breadcrumbs) {
    breadcrumbs.innerHTML = `
      <a href="/">Home</a>
      <span>/</span>
      <a href="/products/">Products</a>
      <span>/</span>
      <span>${series.name}</span>
    `;
  }
  
  if (title) {
    title.textContent = series.name;
  }
}

/**
 * Render series description
 * @param {Object} series - Series data
 */
function renderDescription(series) {
  const section = document.querySelector('.series-description');
  
  if (!section) return;
  
  const content = section.querySelector('.description-content');
  
  if (!content) return;
  
  let html = `<h2>About ${series.name}</h2>`;
  html += `<p>${series.description || ''}</p>`;
  
  if (series.benefits && series.benefits.length > 0) {
    html += '<h3>Key Benefits</h3>';
    html += '<ul class="benefits-list">';
    series.benefits.forEach(benefit => {
      html += `<li>${benefit}</li>`;
    });
    html += '</ul>';
  }
  
  content.innerHTML = html;
}

/**
 * Render subcategories and models
 * @param {Object} series - Series data
 */
function renderSubcategories(series) {
  const section = document.querySelector('.subcategories-section');
  
  if (!section) return;
  
  const container = section.querySelector('.container');
  
  if (!container) return;
  
  if (!series.subcategories || series.subcategories.length === 0) {
    container.innerHTML = '<p>No models available for this series.</p>';
    return;
  }
  
  let html = '';
  
  series.subcategories.forEach(subcat => {
    if (!subcat.models || subcat.models.length === 0) return;
    
    html += `
      <div class="subcategory-block">
        <h3>${subcat.name}</h3>
        <div class="models-grid" data-subcategory="${subcat.id}">
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Render model cards
  series.subcategories.forEach(subcat => {
    const grid = container.querySelector(`.models-grid[data-subcategory="${subcat.id}"]`);
    if (grid && subcat.models) {
      subcat.models.forEach(model => {
        const card = renderModelCard(model);
        grid.appendChild(card);
      });
    }
  });
  
  // Setup spec toggle
  setupSpecToggle();
  
  // Setup animations
  setTimeout(() => setupFadeInAnimations(), 100);
}

/**
 * Setup CTA button
 * @param {Object} series - Series data
 */
function setupCTA(series) {
  const ctaButtons = document.querySelectorAll('.request-info-btn');
  
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Scroll to contact form
      scrollToElement('.contact-form');
      
      // Pre-fill product interest if form exists
      const productSelect = document.getElementById('product-interest');
      if (productSelect) {
        // Try to find matching option
        const options = productSelect.options;
        for (let i = 0; i < options.length; i++) {
          if (options[i].text.includes(series.name)) {
            productSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });
}

/**
 * Render 404 page
 */
function render404() {
  const main = document.querySelector('main');
  
  if (!main) return;
  
  main.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Series Not Found</h1>
        <p>The series you're looking for doesn't exist.</p>
      </div>
    </div>
    <section class="content-section">
      <div class="container" style="text-align: center;">
        <p>Sorry, we couldn't find the series you're looking for.</p>
        <a href="/products/" class="btn btn-primary">View All Products</a>
      </div>
    </section>
  `;
}

/**
 * Initialize series page
 */
export async function initSeriesPage() {
  const seriesId = getSeriesIdFromUrl();
  
  if (!seriesId) {
    render404();
    return;
  }
  
  const mainContent = document.querySelector('.subcategories-section .container');
  
  if (mainContent) {
    showLoading(mainContent);
  }
  
  try {
    const series = await getSeriesById(seriesId);
    
    if (!series) {
      render404();
      return;
    }
    
    // Render all sections
    renderHero(series);
    renderDescription(series);
    renderSubcategories(series);
    setupCTA(series);
    
    // Update page title
    document.title = `${series.name} - GrabIron Attachments`;
    
  } catch (error) {
    console.error('Error loading series:', error);
    if (mainContent) {
      showError(mainContent, 'Error loading series data. Please try again later.');
    }
  }
}
