/**
 * Script to fetch product images from Prom.ua store
 * and update products_i18n.json with real image URLs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { JSDOM } = require('jsdom');

const PRODUCTS_FILE = path.join(__dirname, '../data/products_i18n.json');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch HTML content from URL
 */
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Extract main product image from Prom.ua page
 */
function extractImage(html) {
  try {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    // Try multiple selectors
    const selectors = [
      'img[src*="images.prom.ua"]',
      'img[src*="images.ua.prom.st"]',
      'img[alt*="фото 1"]',
      '.product-image img',
      '[data-qaid="product_image"] img'
    ];
    
    for (const selector of selectors) {
      const img = doc.querySelector(selector);
      if (img && img.src) {
        // Get high-res version (w640_h640 or w1200_h1200)
        let imgUrl = img.src;
        
        // Convert to high-res if contains size parameters
        if (imgUrl.includes('_w40_h40_')) {
          imgUrl = imgUrl.replace('_w40_h40_', '_w640_h640_');
        } else if (imgUrl.includes('_w200_h200_')) {
          imgUrl = imgUrl.replace('_w200_h200_', '_w640_h640_');
        }
        
        return imgUrl;
      }
    }
    
    // Fallback: search for any image with prom.ua domain
    const allImages = doc.querySelectorAll('img');
    for (const img of allImages) {
      if (img.src && (img.src.includes('images.prom.ua') || img.src.includes('images.ua.prom.st'))) {
        let imgUrl = img.src;
        if (imgUrl.includes('_w40_h40_')) {
          imgUrl = imgUrl.replace('_w40_h40_', '_w640_h640_');
        }
        return imgUrl;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting image:', error.message);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Loading products from:', PRODUCTS_FILE);
  
  // Load products
  const productsData = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
  const products = JSON.parse(productsData);
  
  console.log(`Found ${products.length} products`);
  
  let updated = 0;
  let errors = 0;
  
  // Process each product
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const productName = product.name.uk || product.name.en || 'Unknown';
    
    console.log(`\n[${i + 1}/${products.length}] Processing: ${productName}`);
    
    // Skip if no URL
    if (!product.url) {
      console.log('  ⚠ No URL found, skipping');
      continue;
    }
    
    // Skip if already has image
    if (product.image) {
      console.log('  ✓ Image already exists:', product.image);
      continue;
    }
    
    try {
      // Convert URL to Ukrainian version if needed
      let url = product.url;
      if (url.startsWith('https://grabiron.prom.ua/p')) {
        url = url.replace('https://grabiron.prom.ua/p', 'https://grabiron.prom.ua/ua/p');
      }
      
      console.log('  Fetching:', url);
      
      // Fetch page
      const html = await fetchPage(url);
      
      // Extract image
      const imageUrl = extractImage(html);
      
      if (imageUrl) {
        product.image = imageUrl;
        updated++;
        console.log('  ✓ Image found:', imageUrl);
      } else {
        console.log('  ✗ No image found');
        errors++;
      }
      
      // Delay to avoid rate limiting
      await delay(1000);
      
    } catch (error) {
      console.error('  ✗ Error:', error.message);
      errors++;
    }
  }
  
  // Save updated products
  console.log('\n\nSaving updated products...');
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  
  console.log('\n✅ Done!');
  console.log(`   Updated: ${updated} products`);
  console.log(`   Errors: ${errors} products`);
  console.log(`   Total: ${products.length} products`);
}

// Run
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fetchPage, extractImage };
