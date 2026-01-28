# Языку-зависимые изображения и PDF файлы

## Описание

Реализована система автоматического переключения:
- **Изображений товаров** в зависимости от выбранного языка сайта
- **PDF каталогов** в зависимости от выбранного языка сайта

### Изображения
- При выборе **Українська** показываются украинские версии изображений (с суффиксом `UA`)
- При выборе **English** показываются исходные англоязычные версии изображений

### PDF Файлы
- При выборе **Українська** скачивается украинская версия каталога
- При выборе **English** скачивается английская версия каталога

## Найденные украинские изображения

Всего найдено **27 украинских изображений** в папках:

### assets/img/Earth auger/ (4 файла)
- auger driveUA.png
- auger drive2UA.png
- auger drive3UA.png
- auger drive4UA.png

### assets/img/info/ (23 файла)
Включают украинские версии изображений для:
- Earth Auger (земляний бур)
- Hydraulic Breaker (гідравлічний молот)
- Fixed Pulverizer (стаціонарний пульверизатор)
- Rotation Pulverizer (ротаційний пульверизатор)
- Crusher Bucket (дробарка ковш)
- Hydraulic Crusher (гідравлічний дробарка)
- Hydraulic Compactor (гідравлічний компактор)
- Drum Cutter (барабанний різак)
- Demolition Grapple (демонтажний грейфер)
- Log Grab (грейфер для колод)
- Clamp Bucket (ковш-затискач)
- Mixer Bucket (міксер ковш)
- Stump Planer (пеньковий фрезер)
- Pile Driver (забійник паль)
- Quick Hitch (швидкозмінний пристрій)
- Eagle Shear (гідроножиці)
- Pulverizer (мультипроцессор)
- Vibro Ripper (вібраційний рихлитель)
- Dredging Pump (земснаряд)

## Реализованная функциональность

### 1. Функция преобразования путей (detail.html)
```javascript
function getLanguageAwareImagePath(imagePath) {
  const lang = getCurrentLanguage();
  
  if (lang === 'uk') {
    const withoutExt = imagePath.replace(/\.(png|jpg|jpeg|gif|svg|webp)$/i, '');
    const ext = imagePath.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)?.[0] || '.png';
    const uaPath = withoutExt + 'UA' + ext;
    return uaPath;
  }
  
  return imagePath;
}
```

### 2. Интеграция в каталоге (catalog.html)
Функция `renderProducts()` применяет языку-зависимые пути:
- Проверяет текущий язык
- Преобразует пути для украинского
- Перезагружается при смене языка через событие `languageChanged`

### 3. Интеграция на странице товара (detail.html)
Функция `renderProduct()` применяет языку-зависимые пути:
- К основному изображению товара
- К галерее миниатюр
- К изображениям спецификаций через `getProductInfoImages()`
- Перезагружается при смене языка

### 4. Экспортируемая функция (i18n.js)
Добавлена функция `getLanguageAwareImagePath()` которую можно использовать на других страницах:
```javascript
export function getLanguageAwareImagePath(imagePath) {
  // преобразует пути к изображениям в зависимости от языка
}
```

## События и слушатели

### Событие languageChanged
При смене языка срабатывает событие, которое вызывает:
- На catalog.html: `renderProducts(currentCategory, searchQuery)`
- На detail.html: повторная загрузка товара с новыми путями

## Примеры преобразований

| Исходное изображение | Украинская версия |
|---|---|
| auger drive.png | auger driveUA.png |
| Eagle Shear.png | Eagle ShearUA.png |
| Hydraulic Breaker2.png | Hydraulic Breaker2UA.png |
| Quick hitch.png | Quick hitchUA.png |
| vibro ripper.png | vibro ripperUA.png |

## Как добавить украинские изображения для новых товаров

1. **Добавить изображение в papку**: `assets/img/info/` или соответствующую поддиректорию
2. **Назвать файл с суффиксом UA**: 
   - Для файла `Product.png` создать `ProductUA.png`
3. **Система автоматически будет использовать** украинскую версию при выборе языка Українська

## Поддерживаемые форматы изображений

Функция работает со всеми распространенными форматами:
- `.png`
- `.jpg` / `.jpeg`
- `.gif`
- `.svg`
- `.webp`

## Поддерживаемые форматы изображений

Функция работает со всеми распространенными форматами:
- `.png`
- `.jpg` / `.jpeg`
- `.gif`
- `.svg`
- `.webp`

## PDF Файлы

### Найденные PDF файлы
- **RAY BROCHURE.pdf** (6.00 MB) - английская версия
- **RAY BROCHURE UA.pdf** (12.59 MB) - украинская версия

### Места использования PDF

1. **Страница товара** (products/detail.html)
   - Кнопка скачивания каталога в секции "Download Full Catalog"
   - Функция: `downloadPdf()`

2. **Страница загрузок** (downloads.html)
   - Первая карточка "Complete Product Catalog"
   - Функция: `downloadMainCatalog()`

### Реализованные функции для PDF

#### На уровне страниц
```javascript
// products/detail.html
function getLanguageAwarePdfPath() {
  const lang = getCurrentLanguage();
  if (lang === 'uk') {
    return '../RAY BROCHURE UA.pdf';
  }
  return '../RAY BROCHURE.pdf';
}

function downloadPdf() {
  const pdfPath = getLanguageAwarePdfPath();
  const lang = getCurrentLanguage();
  const fileName = lang === 'uk' ? 
    'GrabIron-RAY-BROCHURE-UA.pdf' : 
    'GrabIron-RAY-BROCHURE.pdf';
  
  const link = document.createElement('a');
  link.href = pdfPath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

#### На уровне i18n.js (экспортируемая)
```javascript
export function getLanguageAwarePdfPath(baseName = 'RAY BROCHURE') {
  const lang = getCurrentLanguage();
  
  if (lang === 'uk') {
    return `${baseName} UA.pdf`;
  }
  
  return `${baseName}.pdf`;
}
```

## Технические детали

- **Язык хранится в**: `localStorage.getItem('language')`
- **Значения языков**: `'en'` (English), `'uk'` (Українська)
- **Событие смены языка**: `'languageChanged'`
- **Совместимость**: Все современные браузеры
- **Метод скачивания**: Динамическое создание элемента `<a>` с `download` атрибутом

## Тестирование

### Тестирование изображений
1. Откройте страницу каталога товаров
2. Нажмите кнопку языка **УКР**
3. Изображения товаров должны измениться на украинские версии
4. Нажмите на товар для просмотра деталей
5. Изображение товара и спецификации должны быть на украинском языке
6. Вернитесь на каталог и переключитесь на **EN**
7. Изображения вернутся к исходным английским версиям

### Тестирование PDF
1. Откройте страницу товара (detail.html)
2. Прокрутите до раздела "Download Full Catalog"
3. Нажмите кнопку **Download**:
   - При **УКР**: скачивается `GrabIron-RAY-BROCHURE-UA.pdf` (12.59 MB)
   - При **EN**: скачивается `GrabIron-RAY-BROCHURE.pdf` (6.00 MB)
4. То же самое протестируйте на странице Downloads
