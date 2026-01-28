const fs = require('fs');
const path = require('path');

// Получаем список всех файлов изображений
const allImagesJson = JSON.parse(fs.readFileSync('all-images.json', 'utf-8'));
const allImages = allImagesJson.map(img => {
  const fullPath = img.FullName;
  const relativePath = fullPath.replace(/^.*?assets[\\\/]/, 'assets/').replace(/\\/g, '/');
  return {
    fullPath,
    relativePath,
    name: img.Name
  };
});

console.log(`Найдено изображений всего: ${allImages.length}`);

// Список используемых изображений
const usedImages = new Set();

// Функция для поиска изображений в файле
function findImagesInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Регулярные выражения для поиска изображений
    const patterns = [
      /['"]([^'"]*\.(?:jpg|jpeg|png|gif|svg|webp))['"]/gi,
      /src\s*=\s*['"]([^'"]*)['"]/gi,
      /href\s*=\s*['"]([^'"]*\.(?:jpg|jpeg|png|gif|svg|webp))['"]/gi,
      /url\s*\(\s*['"]?([^'")]*\.(?:jpg|jpeg|png|gif|svg|webp))['"]?\s*\)/gi,
      /image['":\s]+['"]([^'"]*)['"]/gi
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const imagePath = match[1];
        if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('data:')) {
          // Нормализуем путь
          let normalized = imagePath
            .replace(/^\.\.\//, '')
            .replace(/^\//, '')
            .replace(/\\/g, '/');
          
          usedImages.add(normalized);
          
          // Также добавляем только имя файла
          const fileName = path.basename(imagePath);
          usedImages.add(fileName);
        }
      }
    });
  } catch (err) {
    console.error(`Ошибка чтения файла ${filePath}:`, err.message);
  }
}

// Поиск во всех HTML файлах
const htmlFiles = [
  'index.html',
  'about.html',
  'contact.html',
  'service.html',
  'downloads.html',
  'test-images.html',
  'products/catalog.html',
  'products/detail.html',
  'products/index.html',
  'products/product.html'
];

htmlFiles.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  if (fs.existsSync(fullPath)) {
    console.log(`Анализ: ${file}`);
    findImagesInFile(fullPath);
  }
});

// Поиск во всех JS файлах
const jsFiles = fs.readdirSync(path.join(__dirname, '..', 'js'))
  .filter(f => f.endsWith('.js'))
  .map(f => path.join(__dirname, '..', 'js', f));

jsFiles.forEach(file => {
  console.log(`Анализ: ${path.basename(file)}`);
  findImagesInFile(file);
});

// Поиск во всех CSS файлах
const cssFiles = fs.readdirSync(path.join(__dirname, '..', 'css'))
  .filter(f => f.endsWith('.css'))
  .map(f => path.join(__dirname, '..', 'css', f));

cssFiles.forEach(file => {
  console.log(`Анализ: ${path.basename(file)}`);
  findImagesInFile(file);
});

// Поиск в JSON файлах
const dataFiles = fs.readdirSync(path.join(__dirname, '..', 'data'))
  .filter(f => f.endsWith('.json'))
  .map(f => path.join(__dirname, '..', 'data', f));

dataFiles.forEach(file => {
  console.log(`Анализ: ${path.basename(file)}`);
  findImagesInFile(file);
});

console.log(`\nНайдено уникальных используемых изображений: ${usedImages.size}`);

// Определяем неиспользуемые изображения
const unusedImages = [];

allImages.forEach(img => {
  const fileName = img.name;
  const relativePath = img.relativePath;
  
  let isUsed = false;
  
  // Проверяем различные варианты пути
  for (const used of usedImages) {
    if (used.includes(fileName) || 
        relativePath.includes(used) || 
        used.includes(relativePath) ||
        fileName === used ||
        relativePath === used) {
      isUsed = true;
      break;
    }
  }
  
  if (!isUsed) {
    unusedImages.push(img);
  }
});

console.log(`\n=== НЕИСПОЛЬЗУЕМЫЕ ИЗОБРАЖЕНИЯ (${unusedImages.length}) ===\n`);

// Группируем по папкам
const groupedByFolder = {};
unusedImages.forEach(img => {
  const folder = path.dirname(img.relativePath);
  if (!groupedByFolder[folder]) {
    groupedByFolder[folder] = [];
  }
  groupedByFolder[folder].push(img);
});

// Выводим по папкам
Object.keys(groupedByFolder).sort().forEach(folder => {
  console.log(`\n${folder}:`);
  groupedByFolder[folder].forEach(img => {
    console.log(`  - ${img.name}`);
  });
});

// Сохраняем результат в файл
fs.writeFileSync('unused-images.json', JSON.stringify(unusedImages, null, 2));
console.log(`\n\nРезультат сохранен в unused-images.json`);

// Создаем скрипт для удаления
const deleteScript = unusedImages.map(img => {
  return `Remove-Item -Path "${img.fullPath}" -Force`;
}).join('\n');

fs.writeFileSync('delete-unused-images.ps1', deleteScript);
console.log(`Скрипт для удаления сохранен в delete-unused-images.ps1`);

console.log(`\n=== ИТОГО ===`);
console.log(`Всего изображений: ${allImages.length}`);
console.log(`Используется: ${allImages.length - unusedImages.length}`);
console.log(`НЕ используется: ${unusedImages.length}`);
