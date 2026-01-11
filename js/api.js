// API module for fetching and caching product data
import { getCurrentLang } from '/js/lang.js';

let productsCache = null;
let transformedCache = null;
let currentCacheLang = null;

/**
 * Clear cache when language changes
 */
export function clearCache() {
  productsCache = null;
  transformedCache = null;
  currentCacheLang = null;
}

/**
 * Fetch products data from JSON file
 * @returns {Promise<Array>} Products array
 */
export async function fetchProducts() {
  const lang = getCurrentLang();
  
  // Clear cache if language changed
  if (currentCacheLang && currentCacheLang !== lang) {
    clearCache();
  }
  
  if (productsCache) {
    return productsCache;
  }
  
  try {
    const response = await fetch('/data/products_i18n.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rawData = await response.json();
    
    // Transform products to include current language fields
    productsCache = rawData.map(product => {
      return {
        ...product,
        nameUk: typeof product.name === 'object' ? product.name.uk : product.name,
        name: typeof product.name === 'object' ? product.name[lang] : product.name,
        description: typeof product.description === 'object' ? product.description[lang] : product.description
      };
    });
    
    currentCacheLang = lang;
    return productsCache;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Transform flat products array into structured categories format
 * @returns {Promise<Object>} Transformed data with categories structure
 */
async function getTransformedData() {
  if (transformedCache) {
    return transformedCache;
  }
  
  const products = await fetchProducts();
  
  // Category mapping for better organization
  const categoryMapping = {
    'Экскаваторное навесное оборудование': {
      id: 'demolition',
      name: 'Demolition & Cutting',
      nameUk: 'Знесення та різання',
      description: 'Heavy-duty demolition attachments for concrete, steel and mixed materials',
      descriptionUk: 'Потужне обладнання для знесення бетону, сталі та змішаних матеріалів',
      heroImage: '/assets/img/category-demolition.svg'
    },
    'Ковши / навесное оборудование': {
      id: 'grabs-handling',
      name: 'Buckets & Handling',
      nameUk: 'Ковші та навантаження',
      description: 'Material handling attachments for sorting, loading and transporting',
      descriptionUk: 'Обладнання для сортування, завантаження та транспортування матеріалів',
      heroImage: '/assets/img/category-grabs.svg'
    },
    'Комплектующие / адаптеры': {
      id: 'quick-couplers',
      name: 'Quick Couplers & Adapters',
      nameUk: 'Швидкозмінні пристрої та адаптери',
      description: 'Fast and safe attachment change systems',
      descriptionUk: 'Швидка та безпечна система зміни обладнання',
      heroImage: '/assets/img/category-couplers.svg'
    },
    'Коммунальная техника / навесное': {
      id: 'other-attachments',
      name: 'Municipal Equipment',
      nameUk: 'Комунальна техніка',
      description: 'Specialized attachments for municipal and seasonal applications',
      descriptionUk: 'Спеціалізоване обладнання для комунальних та сезонних робіт',
      heroImage: '/assets/img/category-other.svg'
    },
    'Навесное для погрузчиков/тракторов': {
      id: 'grabs-handling',
      name: 'Loader Attachments',
      nameUk: 'Навісне для навантажувачів',
      description: 'Attachments for loaders and tractors',
      descriptionUk: 'Навісне обладнання для навантажувачів та тракторів',
      heroImage: '/assets/img/category-grabs.svg'
    },
    'Навесное для погрузчиков': {
      id: 'grabs-handling',
      name: 'Loader Attachments',
      nameUk: 'Навісне для навантажувачів',
      description: 'Attachments for loaders',
      descriptionUk: 'Навісне обладнання для навантажувачів',
      heroImage: '/assets/img/category-grabs.svg'
    }
  };
  
  const categoriesMap = new Map();
  
  // Group products by category
  products.forEach(product => {
    const categoryName = product.category || 'Інше';
    const categoryInfo = categoryMapping[categoryName] || {
      id: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: categoryName,
      nameUk: categoryName,
      description: '',
      descriptionUk: '',
      heroImage: '/assets/img/category-placeholder.svg'
    };
    
    if (!categoriesMap.has(categoryInfo.id)) {
      categoriesMap.set(categoryInfo.id, {
        id: categoryInfo.id,
        name: categoryInfo.name,
        nameUk: categoryInfo.nameUk,
        description: categoryInfo.description,
        descriptionUk: categoryInfo.descriptionUk,
        heroImage: categoryInfo.heroImage,
        subcategories: []
      });
    }
    
    const category = categoriesMap.get(categoryInfo.id);
    
    // Extract base product name for subcategory
    const baseName = product.name.split('(')[0].trim();
    const subcategoryId = baseName.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .substring(0, 50);
    
    let subcategory = category.subcategories.find(s => s.id === subcategoryId);
    if (!subcategory) {
      subcategory = {
        id: subcategoryId,
        name: baseName,
        nameUk: baseName,
        description: product.description,
        descriptionUk: product.description,
        products: []
      };
      category.subcategories.push(subcategory);
    }
    
    // If product has variants, create separate product for each variant
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach((variant, index) => {
        const variantModel = variant['Модель'] || variant['Model'] || variant['Jaw'] || `${baseName} ${index + 1}`;
        const variantId = `${subcategoryId}-${variantModel.toLowerCase().replace(/[^\w-]/g, '-')}`;
        
        const transformedProduct = {
          id: variantId,
          model: variantModel,
          name: `${baseName} ${variantModel}`,
          nameUk: `${baseName} ${variantModel}`,
          image: '/assets/img/products/placeholder.svg',
          carrierWeightT: extractCarrierWeightFromVariant(variant, product),
          description: product.description,
          descriptionUk: product.description,
          price: product.price,
          availability: product.availability,
          url: product.url,
          characteristics: { ...product.characteristics, ...variant },
          variants: [],
          features: extractFeaturesFromVariant(variant, product),
          featuresUk: extractFeaturesFromVariant(variant, product),
          applications: [],
          applicationsUk: [],
          specifications: variant,
          specificationsUk: variant
        };
        
        subcategory.products.push(transformedProduct);
      });
    } else {
      // Single product without variants
      const transformedProduct = {
        id: subcategoryId,
        model: product.name.split('/')[0].split('(')[0].trim(),
        name: product.name,
        nameUk: product.name,
        image: '/assets/img/products/placeholder.svg',
        carrierWeightT: extractCarrierWeight(product),
        description: product.description,
        descriptionUk: product.description,
        price: product.price,
        availability: product.availability,
        url: product.url,
        characteristics: product.characteristics,
        variants: [],
        features: extractFeatures(product),
        featuresUk: extractFeatures(product),
        applications: [],
        applicationsUk: [],
        specifications: product.characteristics,
        specificationsUk: product.characteristics
      };
      
      subcategory.products.push(transformedProduct);
    }
  });
  
  transformedCache = {
    categories: Array.from(categoriesMap.values())
  };
  
  return transformedCache;
}

/**
 * Extract carrier weight from product characteristics
 */
function extractCarrierWeight(product) {
  const chars = product.characteristics || {};
  
  if (chars['Excavator class'] || chars['Machine class (t)'] || chars['Класс машин (t)']) {
    return chars['Excavator class'] || chars['Machine class (t)'] || chars['Класс машин (t)'];
  }
  
  if (chars['Экскаватор']) {
    return chars['Экскаватор'];
  }
  
  if (product.variants && product.variants.length > 0) {
    const firstVariant = product.variants[0];
    return extractCarrierWeightFromVariant(firstVariant, product);
  }
  
  return 'N/A';
}

/**
 * Extract carrier weight from variant
 */
function extractCarrierWeightFromVariant(variant, product) {
  if (variant['Excavator class (t)'] || variant['Machine class (t)'] || variant['Класс машин (t)']) {
    return variant['Excavator class (t)'] || variant['Machine class (t)'] || variant['Класс машин (t)'];
  }
  
  if (product.characteristics) {
    const chars = product.characteristics;
    if (chars['Excavator class'] || chars['Экскаватор']) {
      return chars['Excavator class'] || chars['Экскаватор'];
    }
  }
  
  return 'N/A';
}

/**
 * Extract features from product
 */
function extractFeatures(product) {
  const features = [];
  const chars = product.characteristics || {};
  
  Object.entries(chars).forEach(([key, value]) => {
    if (value && value !== 'Новое' && value !== 'Grabiron' && key !== 'Состояние' && key !== 'Производитель') {
      features.push(`${key}: ${value}`);
    }
  });
  
  return features.slice(0, 5);
}

/**
 * Extract features from variant
 */
function extractFeaturesFromVariant(variant, product) {
  const features = [];
  
  // Key characteristics to highlight
  const priorityKeys = ['Weight (kg)', 'Вес (kg)', 'Oil flow (l/min)', 'Working Pressure (bar)', 'Рабочее давление (bar)'];
  
  Object.entries(variant).forEach(([key, value]) => {
    if (value && key !== 'Модель' && key !== 'Model' && key !== 'Jaw') {
      features.push(`${key}: ${value}`);
    }
  });
  
  // Add product-level characteristics
  const chars = product.characteristics || {};
  Object.entries(chars).forEach(([key, value]) => {
    if (value && value !== 'Новое' && value !== 'Grabiron' && key !== 'Состояние' && key !== 'Производитель') {
      features.push(`${key}: ${value}`);
    }
  });
  
  return features.slice(0, 6);
}


/**
 * Get all series
 * @returns {Promise<Array>} Array of series
 */
export async function getAllSeries() {
  const data = await getTransformedData();
  return data.categories || [];
}

/**
 * Get series by ID
 * @param {string} seriesId - Series ID
 * @returns {Promise<Object|null>} Series object or null
 */
export async function getSeriesById(seriesId) {
  const series = await getAllSeries();
  return series.find(s => s.id === seriesId) || null;
}

/**
 * Get all products (for compatibility)
 * @returns {Promise<Object>} Products data with categories
 */
export async function getProductsData() {
  return await getTransformedData();
}

/**
 * Search series and models by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} Filtered series
 */
export async function searchProducts(query) {
  const series = await getAllSeries();
  
  if (!query || query.trim() === '') {
    return series;
  }
  
  const lowerQuery = query.toLowerCase().trim();
  
  return series.filter(s => {
    // Search in series name
    if (s.name && s.name.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // Search in subcategories and products
    if (s.subcategories) {
      for (const subcat of s.subcategories) {
        if (subcat.name && subcat.name.toLowerCase().includes(lowerQuery)) {
          return true;
        }
        if (subcat.products) {
          for (const product of subcat.products) {
            const productName = product.model || product.name || '';
            if (productName.toLowerCase().includes(lowerQuery)) {
              return true;
            }
          }
        }
      }
    }
    
    return false;
  });
}

/**
 * Filter series by machine category
 * @param {string} machineType - Machine category (e.g., 'excavator', 'skidsteer')
 * @returns {Promise<Array>} Filtered series
 */
export async function filterByMachineCategory(machineType) {
  const series = await getAllSeries();
  
  if (!machineType) {
    return series;
  }
  
  return series.filter(s => {
    // If series has no machineCategories, show it by default
    if (!s.machineCategories || s.machineCategories.length === 0) {
      return true;
    }
    
    return s.machineCategories.includes(machineType.toLowerCase());
  });
}

/**
 * Get all models from a series
 * @param {Object} series - Series object
 * @returns {Array} Array of models
 */
export function getModelsFromSeries(series) {
  const models = [];
  
  if (series.subcategories) {
    for (const subcat of series.subcategories) {
      if (subcat.products) {
        models.push(...subcat.products);
      }
    }
  }
  
  return models;
}
