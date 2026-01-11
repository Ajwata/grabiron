// Products page functionality
import { getAllSeries, searchProducts, filterByMachineCategory } from './api.js';
import { renderSeriesCard, showLoading, showError, setupFadeInAnimations } from './ui.js';

let currentSeries = [];
let currentFilter = null;
let currentSearch = '';

/**
 * Render series grid
 * @param {Array} series - Array of series
 */
function renderSeries(series) {
  const container = document.getElementById('series-container');
  const noResults = document.querySelector('.no-results');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  if (series.length === 0) {
    if (noResults) {
      noResults.classList.add('active');
    }
    return;
  }
  
  if (noResults) {
    noResults.classList.remove('active');
  }
  
  series.forEach(s => {
    const card = renderSeriesCard(s);
    container.appendChild(card);
  });
  
  // Re-setup animations
  setTimeout(() => setupFadeInAnimations(), 100);
}

/**
 * Apply current filters and search
 */
async function applyFilters() {
  showLoading(document.getElementById('series-container'));
  
  try {
    let series = await getAllSeries();
    
    // Apply machine filter
    if (currentFilter) {
      series = await filterByMachineCategory(currentFilter);
    }
    
    // Apply search
    if (currentSearch) {
      const searchLower = currentSearch.toLowerCase();
      series = series.filter(s => {
        // Search in series name
        if (s.name && s.name.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // Search in model names
        if (s.subcategories) {
          for (const subcat of s.subcategories) {
            if (subcat.models) {
              for (const model of subcat.models) {
                const modelName = model.model || model.name || '';
                if (modelName.toLowerCase().includes(searchLower)) {
                  return true;
                }
              }
            }
          }
        }
        
        return false;
      });
    }
    
    currentSeries = series;
    renderSeries(series);
    
  } catch (error) {
    console.error('Error applying filters:', error);
    showError(document.getElementById('series-container'), 'Error loading products');
  }
}

/**
 * Setup search functionality
 */
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  
  if (!searchInput) return;
  
  let searchTimeout;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    currentSearch = e.target.value.trim();
    
    // Debounce search
    searchTimeout = setTimeout(() => {
      applyFilters();
    }, 300);
  });
}

/**
 * Setup filter buttons
 */
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update current filter
      currentFilter = filter === 'all' ? null : filter;
      
      // Apply filters
      applyFilters();
    });
  });
}

/**
 * Check URL parameters for initial filter
 */
function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const machine = urlParams.get('machine');
  
  if (machine) {
    currentFilter = machine;
    
    // Update active button
    const filterBtn = document.querySelector(`.filter-btn[data-filter="${machine}"]`);
    if (filterBtn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      filterBtn.classList.add('active');
    }
  }
}

/**
 * Initialize products page
 */
export async function initProductsPage() {
  const container = document.getElementById('series-container');
  
  if (!container) return;
  
  showLoading(container);
  
  try {
    // Check URL params
    checkUrlParams();
    
    // Setup search and filters
    setupSearch();
    setupFilters();
    
    // Load and render series
    await applyFilters();
    
  } catch (error) {
    console.error('Error initializing products page:', error);
    showError(container, 'Error loading products. Please try again later.');
  }
}
