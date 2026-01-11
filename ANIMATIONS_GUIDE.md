# GrabIron Industrial Animations

Современная система микроанимаций в индустриальном стиле для сайта GrabIron.

## Установка

Все файлы уже подключены на всех страницах:

```html
<link rel="stylesheet" href="/css/animations.css">
<script type="module" src="/js/animations.js"></script>
```

## Компоненты

### 1. Hero Hook (Крюк в Hero)
Автоматически добавляется на главной странице в секцию `.hero`.

**Эффекты:**
- Покачивание (swing animation)
- Параллакс при скролле
- Подпрыгивание при наведении

**Настройка:** Работает автоматически, настройки в CSS переменных.

---

### 2. Spark Buttons (Искры на кнопках)
Автоматически применяется ко всем кнопкам: `.btn-primary`, `.btn-large`, `.cta-button`

**Эффекты:**
- 8 искр разлетаются от точки клика/hover
- Свечение кнопки при hover
- На мобильных: срабатывает при tap

**Ручное применение:**
```html
<button class="spark-btn">Click Me</button>
```

---

### 3. Section Lines (Металлические линии)
Автоматически применяется к `.section-title` и `h2.hero-title`

**Эффекты:**
- Анимация "рисования" линии
- Сварочная точка в конце
- Градиент металла

**Ручное применение:**
```html
<h2 class="section-line">Section Title</h2>
```

---

### 4. Card Lift (Подъём карточек)
Автоматически применяется к: `.product-card`, `.feature-card`, `.industry-card`, `.work-item`

**Эффекты:**
- Desktop: подъём на 8px при hover
- Иконка крюка появляется сверху
- Mobile: fade-in при появлении в viewport

**Ручное применение:**
```html
<div class="card-lift">
  <!-- card content -->
</div>
```

---

### 5. Tech Pattern (Технический паттерн)
Автоматически добавляется на:
- `.hero` (болты)
- `.benefits-bar` (сетка)
- `.industries-section` (болты)

**Варианты паттернов:**
```html
<div class="tech-pattern"></div>          <!-- шестигранники -->
<div class="tech-pattern grid"></div>     <!-- сетка -->
<div class="tech-pattern bolts"></div>    <!-- болты -->
```

**Настройка непрозрачности:**
```css
.tech-pattern {
  opacity: 0.04; /* default, можно изменить от 0.02 до 0.08 */
}
```

---

### 6. Metal Shine (Металлический блеск)
Эффект блеска при наведении

**Применение:**
```html
<div class="metal-shine">
  <button>Shiny Button</button>
</div>
```

---

### 7. Fade In Up
Появление элементов с низа при скролле

**Применение:**
```html
<div class="fade-in-up">Content</div>
<div class="fade-in-up stagger-1">Content 1</div>
<div class="fade-in-up stagger-2">Content 2</div>
<div class="fade-in-up stagger-3">Content 3</div>
```

**Stagger классы:** `.stagger-1` до `.stagger-5` (задержка 0.1s - 0.5s)

---

## CSS Переменные

Настройте в `/css/animations.css`:

```css
:root {
  --accent: #ff6600;          /* Основной цвет (оранжевый) */
  --metal: #6b7280;           /* Цвет металла */
  --bg-dark: #1a1a1a;         /* Тёмный фон */
  --spark-duration: 400ms;    /* Длительность искр */
  --lift-duration: 300ms;     /* Длительность подъёма */
}
```

---

## Accessibility

**Поддержка `prefers-reduced-motion`:**
Все анимации автоматически отключаются для пользователей с включенной настройкой "Уменьшить движение".

**Отключение вручную:**
```html
<div class="no-animation">No animations here</div>
```

---

## Производительность

- **CSS-only анимации** где возможно (GPU acceleration)
- **IntersectionObserver** для анимаций при скролле
- **requestAnimationFrame** для плавных анимаций
- Автоматическая очистка DOM (искры удаляются после анимации)

---

## Кастомизация

### Изменить цвет искр:
```css
.spark {
  background: #00ff00; /* ваш цвет */
  box-shadow: 0 0 6px #00ff00;
}
```

### Изменить высоту подъёма карточек:
```css
.card-lift:hover {
  transform: translateY(-12px); /* default: -8px */
}
```

### Изменить скорость анимации линии:
```css
.section-line::after {
  transition: width 1s ease; /* default: 0.6s */
}
```

---

## Примеры использования

### Добавить все эффекты к элементу:
```html
<div class="card-lift metal-shine fade-in-up">
  <h3 class="section-line">Product Name</h3>
  <button class="spark-btn">Order Now</button>
</div>
```

### Создать секцию с фоном:
```html
<section class="my-section" style="position: relative;">
  <div class="tech-pattern bolts animated"></div>
  <h2 class="section-line">Section Title</h2>
  <!-- content -->
</section>
```

---

## Troubleshooting

**Анимации не работают:**
1. Проверьте подключение `/css/animations.css`
2. Проверьте подключение `/js/animations.js`
3. Убедитесь, что `initAnimations()` вызывается

**Искры не появляются:**
1. Кнопка должна иметь класс `.spark-btn` или один из: `.btn-primary`, `.btn-large`, `.cta-button`
2. Проверьте консоль на ошибки

**Крюк не появляется:**
1. Должна быть секция с классом `.hero`
2. Проверьте, что JS инициализируется после загрузки DOM

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

**Не поддерживается:** IE11 (но graceful degradation работает)
