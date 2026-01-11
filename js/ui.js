// UI helper functions for rendering components

/**
 * Create element with classes and attributes
 * @param {string} tag - HTML tag name
 * @param {Object} options - Options (classes, attrs, text, html)
 * @returns {HTMLElement}
 */
export function createElement(tag, options = {}) {
  const element = document.createElement(tag);
  
  if (options.classes) {
    element.className = Array.isArray(options.classes) 
      ? options.classes.join(' ') 
      : options.classes;
  }
  
  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      element.setAttribute(key, value);
    }
  }
  
  if (options.text) {
    element.textContent = options.text;
  }
  
  if (options.html) {
    element.innerHTML = options.html;
  }
  
  return element;
}

/**
 * Render a series card
 * @param {Object} series - Series data
 * @returns {HTMLElement}
 */
export function renderSeriesCard(series) {
  const card = createElement('div', { classes: 'series-card fade-in' });
  
  const image = createElement('div', { 
    classes: 'series-card-image',
    attrs: {
      style: series.heroImage 
        ? `background-image: url(${series.heroImage})` 
        : ''
    }
  });
  
  const content = createElement('div', { classes: 'series-card-content' });
  
  const title = createElement('h3', { text: series.name });
  const description = createElement('p', { 
    text: series.description 
      ? series.description.substring(0, 120) + '...' 
      : '' 
  });
  
  const link = createElement('a', {
    classes: 'btn btn-outline btn-small',
    text: 'View Series',
    attrs: { href: `/products/series.html?id=${series.id}` }
  });
  
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(link);
  
  card.appendChild(image);
  card.appendChild(content);
  
  return card;
}

/**
 * Render a model card
 * @param {Object} model - Model data
 * @returns {HTMLElement}
 */
export function renderModelCard(model) {
  const card = createElement('div', { classes: 'model-card fade-in' });
  
  const image = createElement('div', { 
    classes: 'model-card-image',
    attrs: {
      style: model.image 
        ? `background-image: url(${model.image})` 
        : ''
    }
  });
  
  const content = createElement('div', { classes: 'model-card-content' });
  
  const modelName = model.model || model.name || 'Unknown Model';
  const title = createElement('h4', { text: modelName });
  
  if (model.carrierWeightT) {
    const meta = createElement('div', { 
      classes: 'model-meta',
      text: `Carrier Weight: ${model.carrierWeightT} tons`
    });
    content.appendChild(title);
    content.appendChild(meta);
  } else {
    content.appendChild(title);
  }
  
  if (model.description) {
    const desc = createElement('p', { 
      text: model.description.length > 100 
        ? model.description.substring(0, 100) + '...' 
        : model.description 
    });
    content.appendChild(desc);
  }
  
  const actions = createElement('div', { classes: 'model-actions' });
  
  if (model.specTable) {
    const specBtn = createElement('button', {
      classes: 'btn btn-outline btn-small toggle-specs',
      text: 'View Specs',
      attrs: { 'data-model': modelName }
    });
    actions.appendChild(specBtn);
    
    const specContainer = createElement('div', { 
      classes: 'spec-table-container',
      attrs: { 'data-model': modelName }
    });
    
    if (window.innerWidth <= 768) {
      specContainer.appendChild(renderSpecTableMobile(model.specTable));
    } else {
      specContainer.appendChild(renderSpecTable(model.specTable));
    }
    
    content.appendChild(actions);
    content.appendChild(specContainer);
  }
  
  if (model.downloads && model.downloads.length > 0) {
    const downloadBtn = createElement('a', {
      classes: 'btn btn-primary btn-small',
      text: 'Downloads',
      attrs: { href: model.downloads[0].url, target: '_blank' }
    });
    actions.appendChild(downloadBtn);
  }
  
  card.appendChild(image);
  card.appendChild(content);
  
  return card;
}

/**
 * Render spec table (desktop)
 * @param {Object} specTable - Spec table data
 * @returns {HTMLElement}
 */
export function renderSpecTable(specTable) {
  if (!specTable || !specTable.columns || !specTable.rows) {
    return createElement('p', { text: 'No specifications available.' });
  }
  
  const wrapper = createElement('div', { classes: 'spec-table-wrapper' });
  const table = createElement('table', { classes: 'spec-table' });
  
  // Header
  const thead = createElement('thead');
  const headerRow = createElement('tr');
  specTable.columns.forEach(col => {
    const th = createElement('th', { text: col });
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Body
  const tbody = createElement('tbody');
  specTable.rows.forEach(row => {
    const tr = createElement('tr');
    row.forEach(cell => {
      const td = createElement('td', { text: cell });
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  
  wrapper.appendChild(table);
  return wrapper;
}

/**
 * Render spec table for mobile (accordion style)
 * @param {Object} specTable - Spec table data
 * @returns {HTMLElement}
 */
export function renderSpecTableMobile(specTable) {
  if (!specTable || !specTable.columns || !specTable.rows) {
    return createElement('p', { text: 'No specifications available.' });
  }
  
  // For 2-column tables, use regular table with horizontal scroll
  if (specTable.columns.length === 2) {
    return renderSpecTable(specTable);
  }
  
  // For multi-column tables, use accordion
  const accordion = createElement('div', { classes: 'spec-accordion' });
  
  specTable.rows.forEach((row, index) => {
    const specRow = createElement('div', { classes: 'spec-row' });
    
    const header = createElement('div', { classes: 'spec-row-header' });
    const headerText = createElement('span', { text: row[0] || `Row ${index + 1}` });
    const toggle = createElement('span', { 
      classes: 'spec-row-toggle',
      text: '▼'
    });
    
    header.appendChild(headerText);
    header.appendChild(toggle);
    
    const rowContent = createElement('div', { classes: 'spec-row-content' });
    
    for (let i = 1; i < row.length; i++) {
      const item = createElement('div', {
        html: `<strong>${specTable.columns[i]}:</strong> ${row[i]}`
      });
      rowContent.appendChild(item);
    }
    
    specRow.appendChild(header);
    specRow.appendChild(rowContent);
    
    header.addEventListener('click', () => {
      specRow.classList.toggle('active');
    });
    
    accordion.appendChild(specRow);
  });
  
  return accordion;
}

/**
 * Show loading spinner
 * @param {HTMLElement} container - Container element
 */
export function showLoading(container) {
  container.innerHTML = '<div class="loading" style="text-align: center; padding: 3rem;"><p>Loading...</p></div>';
}

/**
 * Show error message
 * @param {HTMLElement} container - Container element
 * @param {string} message - Error message
 */
export function showError(container, message) {
  container.innerHTML = `<div class="error" style="text-align: center; padding: 3rem; color: #dc3545;"><p>${message}</p></div>`;
}

/**
 * Setup lazy loading for images
 */
export function setupLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

/**
 * Setup fade-in animations
 */
export function setupFadeInAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(el => fadeObserver.observe(el));
}

/**
 * Toggle spec table visibility
 */
export function setupSpecToggle() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-specs')) {
      const modelName = e.target.dataset.model;
      const container = document.querySelector(`.spec-table-container[data-model="${modelName}"]`);
      
      if (container) {
        const isActive = container.classList.contains('active');
        container.classList.toggle('active');
        e.target.textContent = isActive ? 'View Specs' : 'Hide Specs';
      }
    }
  });
}

/**
 * Scroll to element smoothly
 * @param {string} selector - CSS selector
 */
export function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
