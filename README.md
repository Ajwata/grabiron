# GrabIron Attachments Website

Багатомовний (англійська/українська) статичний веб-сайт для B2B каталогу навісного обладнання для екскаваторів.

## Особливості

✅ **Повністю статичний сайт** - HTML5 + CSS3 + Vanilla JavaScript (ES Modules)
✅ **Двомовність** - Англійська та українська мови з перемикачем
✅ **Динамічне завантаження даних** - Всі продукти завантажуються з JSON
✅ **Відео-фон** - Повноекранний відео-герой на головній сторінці з фолбеком
✅ **Адаптивний дизайн** - Повністю адаптований для мобільних пристроїв
✅ **Пошук та фільтрація** - Пошук по моделям і фільтрація по типу техніки
✅ **SEO оптимізований** - Семантична розмітка та мета-теги

## Структура проєкту

```
grabiron/
├── index.html              # Головна сторінка
├── about.html              # Про компанію
├── service.html            # Сервіс та підтримка
├── downloads.html          # Завантаження документів
├── news.html               # Новини
├── video.html              # Відео галерея
├── contact.html            # Контакти
├── 404.html                # Сторінка 404
├── products/
│   ├── index.html          # Каталог продукції
│   └── series.html         # Шаблон сторінки серії (динамічний)
├── css/
│   ├── style.css           # Основні стилі
│   └── responsive.css      # Адаптивні стилі
├── js/
│   ├── main.js             # Головний JS модуль
│   ├── api.js              # Завантаження даних з JSON
│   ├── ui.js               # UI компоненти
│   ├── forms.js            # Валідація форм
│   ├── videoHero.js        # Відео-герой з фолбеком
│   ├── productsPage.js     # Сторінка каталогу
│   ├── seriesPage.js       # Сторінка серії
│   └── i18n.js             # Система перекладів
├── data/
│   └── products.json       # База даних продукції
└── assets/
    ├── img/                # Зображення
    ├── video/              # Відео файли
    ├── icons/              # SVG іконки
    └── pdf/                # PDF документи
```

## Запуск проєкту

### Варіант 1: Python HTTP Server (рекомендовано)

```bash
cd grabiron
python -m http.server 8000
```

Відкрийте браузер: `http://localhost:8000`

### Варіант 2: Node.js HTTP Server

```bash
npx http-server -p 8000
```

### Варіант 3: PHP Built-in Server

```bash
php -S localhost:8000
```

### Варіант 4: VS Code Live Server

1. Встановіть розширення "Live Server"
2. Клацніть правою кнопкою на `index.html`
3. Оберіть "Open with Live Server"

⚠️ **ВАЖЛИВО**: Не відкривайте файли безпосередньо у браузері (file://). ES Modules потребують HTTP сервера!

## Робота з мовами

### Зміна мови

Натисніть кнопки **EN** або **УКР** у хедері сайту. Вибрана мова зберігається в localStorage.

### Додавання перекладів

Відредагуйте файл `js/i18n.js`:

```javascript
export const translations = {
  en: {
    myNewKey: 'English text'
  },
  uk: {
    myNewKey: 'Український текст'
  }
};
```

Додайте атрибут до HTML елементу:

```html
<h1 data-i18n="myNewKey">Default text</h1>
```

## Робота з продукцією

### Структура products.json

```json
{
  "series": [
    {
      "id": "series-id",
      "name": "Назва серії",
      "description": "Опис",
      "benefits": ["Переваги"],
      "machineCategories": ["excavator", "skidsteer"],
      "heroImage": "/assets/img/series.jpg",
      "subcategories": [
        {
          "id": "subcat-id",
          "name": "Підкатегорія",
          "models": [
            {
              "model": "MODEL-100",
              "name": "Назва моделі",
              "carrierWeightT": "5-10",
              "description": "Опис",
              "image": "/assets/img/model.jpg",
              "specTable": {
                "columns": ["Характеристика", "Значення"],
                "rows": [
                  ["Модель", "MODEL-100"],
                  ["Вага", "500 кг"]
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### Додавання нової серії

1. Додайте об'єкт серії в `data/products.json`
2. Додайте зображення в `assets/img/`
3. Серія автоматично з'явиться на сайті

### Фільтрація по техніці

Використовуйте посилання:
- Екскаватори: `/products/?machine=excavator`
- Міні-навантажувачі: `/products/?machine=skidsteer`

## Відео-фон

### Поточний стан

Сайт використовує SVG placeholder як poster image. Для реального відео:

1. Створіть або завантажте відео файли:
   - `assets/video/hero.mp4` (H.264, 1920x1080, 10-30 сек)
   - `assets/video/hero.webm` (VP9, 1920x1080, 10-30 сек)

2. Рекомендовані джерела безкоштовних відео:
   - Pexels: https://www.pexels.com/search/videos/excavator/
   - Pixabay: https://pixabay.com/videos/search/construction/
   - Videvo: https://www.videvo.net/

3. Конвертація відео:
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium hero.mp4
   ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 hero.webm
   ```

### Фолбек система

Якщо відео не завантажилось:
1. Показується SVG poster з кнопкою "Play Video"
2. Користувач може спробувати запустити відео вручну
3. Сайт повністю працює без відео

## Форми

Всі форми включають:
- ✅ Валідацію в реальному часі
- ✅ Локалізовані повідомлення про помилки
- ✅ Mock submission (console.log)

Для інтеграції з backend:
Відредагуйте `js/forms.js`, функцію `handleFormSubmit()`.

## Продуктивність

- ✅ Lazy loading зображень
- ✅ Кешування JSON даних
- ✅ Оптимізований CSS
- ✅ ES Modules для tree shaking
- ✅ Мінімальний JavaScript

## Браузерна підтримка

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Opera: ✅
- IE11: ❌ (ES Modules не підтримуються)

## Розгортання

### На статичному хостингу

1. Завантажте всю папку `grabiron/`
2. Налаштуйте веб-сервер на корінь папки
3. Готово!

### Netlify / Vercel / GitHub Pages

Просто підключіть репозиторій - сайт статичний та готовий до розгортання.

### Nginx конфігурація

```nginx
server {
    listen 80;
    server_name grabiron.com;
    root /var/www/grabiron;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|webp|mp4|webm|pdf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Наступні кроки

1. ✅ Додати реальні зображення продукції
2. ✅ Додати відео-файли для героя
3. ✅ Інтегрувати з backend API для форм
4. ✅ Додати Google Analytics
5. ✅ Оптимізувати зображення (WebP)
6. ✅ Додати більше продуктів з PDF брошури

## Підтримка

Для питань або допомоги:
- Email: info@grabiron.com
- Phone: +1 (555) 123-4567

---

**© 2026 GrabIron Attachments. Всі права захищені.**
