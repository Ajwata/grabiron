// Category and Subcategory Page Module
import { getProductsData } from './api.js';
import { t, getCurrentLanguage } from './i18n.js';

let productsData = null;

// Get URL parameters
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    categoryId: params.get('category'),
    subcategoryId: params.get('subcategory')
  };
}

// Render all categories (main products page)
function renderAllCategories(data) {
  const lang = getCurrentLanguage();
  const container = document.getElementById('products-content').querySelector('.container');
  
  const html = `
    <div class="page-header">
      <h1 data-i18n="products-title">Our Products</h1>
      <p data-i18n="products-subtitle">Professional attachments for excavators and construction equipment</p>
    </div>
    
    <div class="categories-grid">
      ${data.categories.map(category => {
        const name = lang === 'uk' ? (category.nameUk || category.name) : category.name;
        const desc = lang === 'uk' ? (category.descriptionUk || category.description) : category.description;
        const totalProducts = category.subcategories.reduce((sum, sub) => sum + (sub.products?.length || 0), 0);
        
        return `
          <a href="?category=${category.id}" class="category-card">
            <div class="category-image">
              <img src="${category.heroImage || '/assets/img/category-placeholder.svg'}" alt="${name}">
            </div>
            <div class="category-info">
              <h2>${name}</h2>
              <p>${desc}</p>
              <span class="product-count">${totalProducts} ${t('products')}</span>
            </div>
          </a>
        `;
      }).join('')}
    </div>
  `;
  
  container.innerHTML = html;
}

// Render single category with subcategories
function renderCategory(category) {
  const lang = getCurrentLanguage();
  const container = document.getElementById('products-content').querySelector('.container');
  const categoryName = lang === 'uk' ? (category.nameUk || category.name) : category.name;
  const categoryDesc = lang === 'uk' ? (category.descriptionUk || category.description) : category.description;
  
  // Update breadcrumbs
  document.getElementById('breadcrumb-category').textContent = ` / ${categoryName}`;
  
  const html = `
    <div class="page-header">
      <h1>${categoryName}</h1>
      <p>${categoryDesc}</p>
    </div>
    
    <div class="subcategories-list">
      ${category.subcategories.map(subcategory => {
        const subName = lang === 'uk' ? (subcategory.nameUk || subcategory.name) : subcategory.name;
        const subDesc = lang === 'uk' ? (subcategory.descriptionUk || subcategory.description) : subcategory.description || '';
        const productCount = subcategory.products?.length || 0;
        
        return `
          <div class="subcategory-section">
            <div class="subcategory-header">
              <h2>
                <a href="?category=${category.id}&subcategory=${subcategory.id}">${subName}</a>
              </h2>
              ${subDesc ? `<p>${subDesc}</p>` : ''}
              <span class="product-count">${productCount} ${t('products')}</span>
            </div>
            
            ${productCount > 0 ? `
              <div class="products-grid">
                ${subcategory.products.slice(0, 4).map(product => {
                  const productName = lang === 'uk' ? (product.nameUk || product.name) : product.name;
                  const productDesc = lang === 'uk' ? (product.descriptionUk || product.description) : product.description;
                  const productImage = (product.images && product.images.length > 0) ? product.images[0] : (product.image || '/assets/img/product-placeholder.svg');
                  
                  return `
                    <div class="product-card">
                      <div class="product-image">
                        <img src="${productImage}" alt="${productName}">
                      </div>
                      <div class="product-info">
                        <h3>${productName}</h3>
                        <p class="model">${product.model}</p>
                        <p class="carrier-weight">${t('carrier-weight')}: ${product.carrierWeightT} ${t('tons')}</p>
                        <p class="description">${productDesc.substring(0, 100)}...</p>
                        <a href="product.html?category=${category.id}&subcategory=${subcategory.id}&id=${product.id}" 
                           class="btn btn-outline">${t('view-details')}</a>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
              ${productCount > 4 ? `
                <div class="view-all">
                  <a href="?category=${category.id}&subcategory=${subcategory.id}" class="btn btn-primary">
                    ${t('view-all')} ${subName}
                  </a>
                </div>
              ` : ''}
            ` : `
              <p class="no-products">${t('coming-soon')}</p>
            `}
          </div>
        `;
      }).join('')}
    </div>
  `;
  
  container.innerHTML = html;
}

// Render single subcategory with all products
function renderSubcategory(category, subcategory) {
  const lang = getCurrentLanguage();
  const container = document.getElementById('products-content').querySelector('.container');
  const categoryName = lang === 'uk' ? (category.nameUk || category.name) : category.name;
  const subName = lang === 'uk' ? (subcategory.nameUk || subcategory.name) : subcategory.name;
  const subDesc = lang === 'uk' ? (subcategory.descriptionUk || subcategory.description) : subcategory.description || '';
  
  // Update breadcrumbs
  document.getElementById('breadcrumb-category').textContent = ` / ${categoryName}`;
  document.getElementById('breadcrumb-subcategory').textContent = ` / ${subName}`;
  
  const html = `
    <div class="page-header">
      <nav class="back-link">
        <a href="?category=${category.id}">← ${t('back-to')} ${categoryName}</a>
      </nav>
      <h1>${subName}</h1>
      ${subDesc ? `<p>${subDesc}</p>` : ''}
    </div>
    
    ${subcategory.products && subcategory.products.length > 0 ? `
      <div class="products-grid">
        ${subcategory.products.map(product => {
          const productName = lang === 'uk' ? (product.nameUk || product.name) : product.name;
          const productDesc = lang === 'uk' ? (product.descriptionUk || product.description) : product.description;
          const productImage = (product.images && product.images.length > 0) ? product.images[0] : (product.image || '/assets/img/product-placeholder.svg');
          
          return `
            <div class="product-card">
              <div class="product-image">
                <img src="${productImage}" alt="${productName}">
              </div>
              <div class="product-info">
                <h3>${productName}</h3>
                <p class="model">${product.model}</p>
                <p class="carrier-weight">${t('carrier-weight')}: ${product.carrierWeightT} ${t('tons')}</p>
                <p class="description">${productDesc}</p>
                <a href="product.html?category=${category.id}&subcategory=${subcategory.id}&id=${product.id}" 
                   class="btn btn-primary">${t('view-details')}</a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    ` : `
      <div class="no-products">
        <p>${t('no-products-yet')}</p>
        <a href="/contact.html" class="btn btn-primary">${t('contact-us')}</a>
      </div>
    `}
  `;
  
  container.innerHTML = html;
}

// Initialize products page
async function init() {
  try {
    // Fetch products data
    productsData = await getProductsData();
    
    // Get URL parameters
    const { categoryId, subcategoryId } = getUrlParams();
    
    if (!categoryId) {
      // Show all categories
      renderAllCategories(productsData);
    } else {
      // Find category
      const category = productsData.categories.find(c => c.id === categoryId);
      
      if (!category) {
        window.location.href = 'index.html';
        return;
      }
      
      if (!subcategoryId) {
        // Show category with subcategories
        renderCategory(category);
      } else {
        // Find subcategory
        const subcategory = category.subcategories.find(s => s.id === subcategoryId);
        
        if (!subcategory) {
          window.location.href = `index.html?category=${categoryId}`;
          return;
        }
        
        // Show subcategory with products
        renderSubcategory(category, subcategory);
      }
    }
    
  } catch (error) {
    console.error('Error loading products:', error);
    document.getElementById('products-content').innerHTML = 
      `<div class="container"><p class="error">${t('error-loading')}</p></div>`;
  }
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Re-render on language change
document.addEventListener('languageChanged', () => {
  if (productsData) {
    init();
  }
});
