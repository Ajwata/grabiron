// Product Detail Page Module
import { getProductsData } from './api.js';
import { t, getCurrentLanguage } from './i18n.js';

let productsData = null;

// Get URL parameters
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    categoryId: params.get('category'),
    subcategoryId: params.get('subcategory'),
    productId: params.get('id')
  };
}

// Find product in data structure
function findProduct(data, categoryId, subcategoryId, productId) {
  const category = data.categories.find(c => c.id === categoryId);
  if (!category) return null;

  const subcategory = category.subcategories.find(s => s.id === subcategoryId);
  if (!subcategory) return null;

  const product = subcategory.products.find(p => p.id === productId);
  if (!product) return null;

  return { category, subcategory, product };
}

// Render breadcrumbs
function renderBreadcrumbs(category, subcategory, product) {
  const lang = getCurrentLanguage();
  const categoryName = lang === 'uk' ? (category.nameUk || category.name) : category.name;
  const subcategoryName = lang === 'uk' ? (subcategory.nameUk || subcategory.name) : subcategory.name;
  const productName = lang === 'uk' ? (product.nameUk || product.name) : product.name;

  document.getElementById('breadcrumb-category').textContent = categoryName;
  document.getElementById('breadcrumb-subcategory').textContent = subcategoryName;
  document.getElementById('breadcrumb-product').textContent = productName;
}

// Render product details
function renderProduct(category, subcategory, product) {
  const lang = getCurrentLanguage();
  
  // Product name and basic info
  const productName = lang === 'uk' ? (product.nameUk || product.name) : product.name;
  const productDesc = lang === 'uk' ? (product.descriptionUk || product.description) : product.description;
  
  document.getElementById('product-name').textContent = productName;
  document.getElementById('product-model').textContent = `Model: ${product.model}`;
  document.getElementById('product-carrier').textContent = `${product.carrierWeightT} ${t('tons')}`;
  document.getElementById('product-description').textContent = productDesc;
  document.getElementById('product-image').src = product.image || '/assets/img/product-placeholder.svg';
  document.getElementById('product-image').alt = productName;
  
  // Update page title
  document.title = `${productName} | GrabIron Attachments`;

  // Render features
  renderFeatures(product);
  
  // Render specifications
  renderSpecifications(product);
  
  // Render applications
  renderApplications(product);
  
  // Render related products
  renderRelatedProducts(category, subcategory, product);
}

// Render features list
function renderFeatures(product) {
  const lang = getCurrentLanguage();
  const features = lang === 'uk' ? (product.featuresUk || product.features) : product.features;
  const featuresList = document.getElementById('product-features');
  
  if (!features || features.length === 0) {
    featuresList.innerHTML = '<li>No features available</li>';
    return;
  }

  featuresList.innerHTML = features.map(feature => `<li>${feature}</li>`).join('');
}

// Render specifications table
function renderSpecifications(product) {
  const lang = getCurrentLanguage();
  const specs = lang === 'uk' ? (product.specificationsUk || product.specifications) : product.specifications;
  const table = document.getElementById('specs-table').querySelector('tbody');
  
  if (!specs || Object.keys(specs).length === 0) {
    table.innerHTML = '<tr><td colspan="2">No specifications available</td></tr>';
    return;
  }

  const rows = Object.entries(specs).map(([key, value]) => `
    <tr>
      <th>${key}</th>
      <td>${value}</td>
    </tr>
  `).join('');
  
  table.innerHTML = rows;
}

// Render applications list
function renderApplications(product) {
  const lang = getCurrentLanguage();
  const applications = lang === 'uk' ? (product.applicationsUk || product.applications) : product.applications;
  const appList = document.getElementById('product-applications');
  
  if (!applications || applications.length === 0) {
    appList.innerHTML = '<li>No applications listed</li>';
    return;
  }

  appList.innerHTML = applications.map(app => `<li>${app}</li>`).join('');
}

// Render related products (other products in same subcategory)
function renderRelatedProducts(category, subcategory, currentProduct) {
  const lang = getCurrentLanguage();
  const relatedContainer = document.getElementById('related-products');
  
  const otherProducts = subcategory.products.filter(p => p.id !== currentProduct.id);
  
  if (otherProducts.length === 0) {
    relatedContainer.innerHTML = `<p>${t('no-related-products')}</p>`;
    return;
  }

  relatedContainer.innerHTML = otherProducts.slice(0, 3).map(product => {
    const productName = lang === 'uk' ? (product.nameUk || product.name) : product.name;
    const productDesc = lang === 'uk' ? (product.descriptionUk || product.description) : product.description;
    
    return `
      <div class="product-card">
        <img src="${product.image || '/assets/img/product-placeholder.svg'}" alt="${productName}">
        <h3>${productName}</h3>
        <p class="model">${product.model}</p>
        <p class="description">${productDesc.substring(0, 100)}...</p>
        <a href="product.html?category=${category.id}&subcategory=${subcategory.id}&id=${product.id}" 
           class="btn btn-outline">${t('view-details')}</a>
      </div>
    `;
  }).join('');
}

// Handle inquiry form submission
function setupInquiryForm(product) {
  const form = document.getElementById('inquiry-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = {
      product: product.model,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      message: formData.get('message')
    };
    
    console.log('Product inquiry submitted:', data);
    
    // Show success message
    alert(t('form-success'));
    form.reset();
  });
}

// Initialize product page
async function init() {
  try {
    // Get URL parameters
    const { categoryId, subcategoryId, productId } = getUrlParams();
    
    if (!categoryId || !subcategoryId || !productId) {
      window.location.href = 'index.html';
      return;
    }

    // Fetch products data
    productsData = await getProductsData();
    
    // Find product
    const result = findProduct(productsData, categoryId, subcategoryId, productId);
    
    if (!result) {
      window.location.href = '404.html';
      return;
    }
    
    const { category, subcategory, product } = result;
    
    // Render page content
    renderBreadcrumbs(category, subcategory, product);
    renderProduct(category, subcategory, product);
    setupInquiryForm(product);
    
  } catch (error) {
    console.error('Error loading product:', error);
    document.querySelector('.product-detail .container').innerHTML = 
      `<p class="error">${t('error-loading')}</p>`;
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
    const { categoryId, subcategoryId, productId } = getUrlParams();
    const result = findProduct(productsData, categoryId, subcategoryId, productId);
    if (result) {
      const { category, subcategory, product } = result;
      renderBreadcrumbs(category, subcategory, product);
      renderProduct(category, subcategory, product);
    }
  }
});
