#!/usr/bin/env python3
"""
Script to fetch product images from Prom.ua and update products_i18n.json
"""

import json
import re
import time
import urllib.request
from urllib.parse import urlparse
from pathlib import Path

def fetch_page(url):
    """Fetch HTML content from URL"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=10) as response:
        return response.read().decode('utf-8')

def extract_image_url(html):
    """Extract main product image URL from Prom.ua page"""
    # Pattern for main product image (фото 1)
    pattern = r'(https://images\.(prom\.ua|ua\.prom\.st)/\d+_w640_h640_[^"]+\.(?:jpg|png|jpeg))'
    matches = re.findall(pattern, html)
    
    if matches:
        # Return the first match (main image)
        return matches[0][0]
    
    # Fallback: try to find any Prom.ua image
    pattern_fallback = r'(https://images\.(prom\.ua|ua\.prom\.st)/\d+_[^"]+\.(?:jpg|png|jpeg))'
    matches_fallback = re.findall(pattern_fallback, html)
    
    if matches_fallback:
        img_url = matches_fallback[0][0]
        # Convert to high-res if needed
        img_url = re.sub(r'_w40_h40_', '_w640_h640_', img_url)
        img_url = re.sub(r'_w200_h200_', '_w640_h640_', img_url)
        return img_url
    
    return None

def main():
    # Load products
    products_file = Path(__file__).parent.parent / 'data' / 'products_i18n.json'
    print(f'Loading products from: {products_file}')
    
    with open(products_file, 'r', encoding='utf-8') as f:
        products = json.load(f)
    
    print(f'Found {len(products)} products')
    
    updated = 0
    errors = 0
    skipped = 0
    
    # Process each product
    for i, product in enumerate(products, 1):
        product_name = product.get('name', {}).get('uk', 'Unknown')
        if isinstance(product_name, dict):
            product_name = product_name.get('uk', 'Unknown')
        
        print(f'\n[{i}/{len(products)}] Processing: {product_name}')
        
        # Skip if no URL
        if not product.get('url'):
            print('  ⚠ No URL found, skipping')
            skipped += 1
            continue
        
        # Skip if already has image
        if product.get('image'):
            print(f'  ✓ Image already exists: {product["image"]}')
            skipped += 1
            continue
        
        try:
            # Convert URL to Ukrainian version if needed
            url = product['url']
            if '/p' in url and '/ua/p' not in url:
                url = url.replace('prom.ua/p', 'prom.ua/ua/p')
            
            print(f'  Fetching: {url}')
            
            # Fetch page
            html = fetch_page(url)
            
            # Extract image
            image_url = extract_image_url(html)
            
            if image_url:
                product['image'] = image_url
                updated += 1
                print(f'  ✓ Image found: {image_url}')
            else:
                print('  ✗ No image found')
                errors += 1
            
            # Delay to avoid rate limiting
            time.sleep(1)
            
        except Exception as e:
            print(f'  ✗ Error: {e}')
            errors += 1
    
    # Save updated products
    print('\n\nSaving updated products...')
    with open(products_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    
    print('\n✅ Done!')
    print(f'   Updated: {updated} products')
    print(f'   Skipped: {skipped} products')
    print(f'   Errors: {errors} products')
    print(f'   Total: {len(products)} products')

if __name__ == '__main__':
    main()
