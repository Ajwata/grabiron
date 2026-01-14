// Simple language switcher
const translations = {
  en: {
    // Navigation
    home: 'Home',
    catalog: 'Catalog',
    about: 'About',
    service: 'Service',
    contact: 'Contact',
    products: 'Products',
    downloads: 'Downloads',
    
    // Hero
    heroTitle: 'Attachments that withstand real loads',
    heroSubtitle: 'attachments — precise calculations, strong steel, and stable operation in real conditions',
    heroBrand: 'GrabIron',
    viewCatalog: 'View Catalog',
    contactUs: 'Contact Us',
    
    // Benefits
    benefitQualityTitle: 'Premium Quality',
    benefitQualityText: 'High-grade materials for maximum durability',
    benefitEngineeringTitle: 'Expert Engineering',
    benefitEngineeringText: 'Precision-designed for optimal performance',
    benefitSupportTitle: 'Reliable Support',
    benefitSupportText: 'Comprehensive service and support',
    
    // Products
    catalogTitle: 'Professional Attachments Catalog',
    catalogSubtitle: 'Precision-engineered equipment for maximum productivity and reliability',
    allProducts: 'All Products',
    searchPlaceholder: 'Search products...',
    showFilters: 'Show Filters',
    hideFilters: 'Hide Filters',
    viewDetails: 'View Details',
    availability: 'Availability',
    price: 'Price',
    carrier: 'Excavator Class',
    variants: 'variants',
    variantsAvailable: 'Available Variants',
    specificationsAndDimensions: 'Specifications & Dimensions',
    clickToEnlarge: 'Click to enlarge',
    contactUsTitle: 'Contact Us',
    photo: 'Photo',
    priceOnRequest: 'Price on request',
    inStock: 'In stock',
    onOrder: 'On order',
    characteristics: 'Characteristics',
    availableVariants: 'Available Variants',
    backToCatalog: 'Back to Catalog',
    loading: 'Loading...',
    noResults: 'No products found',
    noResultsDesc: 'Try changing the filters or search query',
    
    // Variant characteristic keys
    'Модель': 'Model',
    'Класс машин (t)': 'Machine Class (t)',
    'Вес (kg)': 'Weight (kg)',
    'Раскрытие челюстей (mm)': 'Jaw Opening (mm)',
    'Высота (mm)': 'Height (mm)',
    'Ширина (mm)': 'Width (mm)',
    'Рабочее давление (bar)': 'Working Pressure (bar)',
    'Oil flow (l/min)': 'Oil Flow (l/min)',
    'Усилие смыкания (t)': 'Closing Force (t)',
    'Производитель': 'Manufacturer',
    'Состояние': 'Condition',
    'Страна производитель': 'Country of Manufacture',
    'Гарантийный срок': 'Warranty Period',
    'Экскаватор': 'Excavator',
    
    // Category names for display
    categoryExcavator: 'Excavator Attachments',
    categoryBuckets: 'Buckets & Equipment',
    categoryLoaders: 'Loader Attachments',
    categoryComponents: 'Components & Adapters',
    categoryMunicipal: 'Municipal Equipment',
    
    // Additional product text
    'Новое': 'New',
    'Цену уточняйте': 'Price on request',
    'В наличии': 'In stock',
    'Под заказ': 'On order',
    
    ourProductSeries: 'Our Product Series',
    ourProductSeriesDesc: 'Explore our comprehensive range of excavator attachments designed for every application',
    viewFullCatalog: 'View Full Catalog',
    
    // Industries
    industriesTitle: 'Industries We Serve',
    industriesDesc: 'Trusted by professionals across multiple sectors',
    industryConstruction: 'Construction',
    industryConstructionDesc: 'Building foundations, demolition, site preparation',
    industryMining: 'Mining & Quarrying',
    industryMiningDesc: 'Rock crushing, material handling, heavy-duty operations',
    industryRecycling: 'Recycling',
    industryRecyclingDesc: 'Scrap metal processing, waste management',
    industryMunicipal: 'Municipal Services',
    industryMunicipalDesc: 'Road maintenance, snow removal, urban development',
    
    // Stats
    stat15Years: '15+',
    statYearsLabel: 'Years of Experience',
    stat500Plus: '500+',
    statProjectsLabel: 'Projects Completed',
    stat98Percent: '98%',
    statSatisfactionLabel: 'Client Satisfaction',
    stat30Countries: '30+',
    statCountriesLabel: 'Countries Served',
    
    // Technical Excellence
    techExcellenceTitle: 'Technical Excellence',
    techExcellenceDesc: 'Cutting-edge manufacturing and quality control',
    techPrecision: 'Precision Manufacturing',
    techPrecisionDesc: 'CNC machining and laser cutting for exact specifications',
    techQuality: 'Quality Assurance',
    techQualityDesc: 'Multi-stage testing and ISO-certified processes',
    techMaterials: 'Premium Materials',
    techMaterialsDesc: 'Hardox 450/500 steel and reinforced components',
    techCustom: 'Custom Solutions',
    techCustomDesc: 'Tailored designs to meet specific requirements',
    
    // Industries
    industriesTitle: 'Industries We Serve',
    industriesDesc: 'Trusted by professionals across multiple sectors',
    industryConstruction: 'Construction',
    industryConstructionDesc: 'Building foundations, demolition, site preparation',
    industryMining: 'Mining & Quarrying',
    industryMiningDesc: 'Rock crushing, material handling, heavy-duty operations',
    industryRecycling: 'Recycling',
    industryRecyclingDesc: 'Scrap metal processing, waste management',
    industryMunicipal: 'Municipal Services',
    industryMunicipalDesc: 'Road maintenance, snow removal, urban development',
    
    // Stats
    stat15Years: '15+',
    statYearsLabel: 'Years of Experience',
    stat500Plus: '500+',
    statProjectsLabel: 'Projects Completed',
    stat98Percent: '98%',
    statSatisfactionLabel: 'Client Satisfaction',
    stat30Countries: '30+',
    statCountriesLabel: 'Countries Served',
    
    // Technical Excellence
    techExcellenceTitle: 'Technical Excellence',
    techExcellenceDesc: 'Cutting-edge manufacturing and quality control',
    techPrecision: 'Precision Manufacturing',
    techPrecisionDesc: 'CNC machining and laser cutting for exact specifications',
    techQuality: 'Quality Assurance',
    techQualityDesc: 'Multi-stage testing and ISO-certified processes',
    techMaterials: 'Premium Materials',
    techMaterialsDesc: 'Hardox 450/500 steel and reinforced components',
    techCustom: 'Custom Solutions',
    techCustomDesc: 'Tailored designs to meet specific requirements',
    
    // Categories
    demolition: 'Demolition',
    sorting: 'Sorting',
    scrap: 'Scrap',
    drilling: 'Drilling',
    others: 'Others',
    
    // Machine Types
    machineTypes: 'Discover Products by Machine Type',
    machineTypesDesc: 'Find the perfect attachments for your equipment',
    excavators: 'Excavators',
    excavatorsDesc: 'Attachments designed for excavator carriers from 3 to 50+ tons',
    skidSteer: 'Skid Steer Loaders',
    skidSteerDesc: 'Compact attachments optimized for skid steer applications',
    browseExcavator: 'Browse Excavator Attachments',
    browseSkidSteer: 'Browse Skid Steer Attachments',
    
    // How We Work
    howWeWorkTitle: 'How We Work',
    howWeWorkDesc: 'From design to delivery — quality at every stage',
    workDesignTitle: 'Precision Engineering',
    workDesignDesc: 'Every attachment begins with detailed CAD modeling and structural analysis. Our engineers calculate load distributions, stress points, and optimal material thickness to ensure maximum durability and performance in real-world conditions.',
    workManufacturingTitle: 'Advanced Manufacturing',
    workManufacturingDesc: 'We use CNC laser cutting, precision welding, and automated machining to maintain tight tolerances. High-grade Hardox steel is processed in climate-controlled facilities to ensure consistent quality and longevity in demanding applications.',
    workTestingTitle: 'Rigorous Testing',
    workTestingDesc: 'Each attachment undergoes comprehensive quality control including dimensional verification, weld inspection, and load testing. We simulate real operational stresses to guarantee reliable performance before any product reaches our customers.',
    workDeliveryTitle: 'Global Delivery',
    workDeliveryDesc: 'With strategic logistics partners and efficient warehousing, we ensure fast delivery worldwide. Proper packaging protects your investment during transit, and our support team provides installation guidance and ongoing technical assistance.',
    
    // Why Choose
    whyChoose: 'Why Choose GrabIron?',
    whyChooseDesc: 'Industry-leading attachments backed by decades of engineering excellence',
    
    // About Us Page
    aboutUsTitle: 'About GrabIron',
    aboutUsSubtitle: 'Engineering excellence in excavator attachments since 1985',
    ourStory: 'Our Story',
    ourStoryText1: 'GrabIron Attachments was founded with a simple mission: to build the most durable, high-performance excavator attachments in the industry. What started as a small workshop has grown into a global leader in attachment manufacturing, serving construction, mining, and industrial customers worldwide.',
    ourStoryText2: 'For over three decades, we\'ve been pushing the boundaries of attachment design and engineering. Our commitment to quality, innovation, and customer satisfaction has made us the preferred choice for contractors who demand the best from their equipment.',
    engineeringExcellenceDesc: 'Every GrabIron attachment is designed using advanced CAD modeling, finite element analysis, and real-world testing to ensure exceptional performance in the most demanding conditions.',
    qualityManufacturingDesc: 'State-of-the-art facilities staffed by skilled technicians. Each attachment undergoes rigorous inspection and testing before leaving our factory.',
    globalReachDesc: 'Distribution partners and service centers worldwide provide local support backed by global expertise wherever your projects take you.',
    qualityStandards: 'Quality Standards',
    iso9001: 'ISO 9001 Certified Manufacturing',
    qualityFeature1: 'High-grade steel construction for maximum durability',
    qualityFeature2: 'Precision machining for optimal fit and performance',
    qualityFeature3: 'Advanced welding techniques for superior strength',
    qualityFeature4: 'Comprehensive quality assurance testing at every stage',
    qualityFeature5: 'Continuous improvement based on customer feedback',
    innovationSustainability: 'Innovation & Sustainability',
    innovationText1: 'The construction industry is constantly evolving, and so are we. Our R&D team continuously works on new designs and improvements to keep our products at the forefront of the industry. We\'re committed to reducing our environmental impact through sustainable manufacturing practices and products designed for longevity.',
    innovationText2: 'By building attachments that last longer and perform better, we help reduce waste and improve the sustainability of construction operations worldwide.',
    modernFacilities: 'Modern Facilities',
    modernFacilitiesDesc: 'Our state-of-the-art manufacturing facility spans over 50,000 square feet, equipped with the latest CNC machinery, robotic welding stations, and precision testing equipment. This allows us to maintain the highest quality standards while meeting the demands of our growing global customer base.',
    expertTeam: 'Expert Team',
    expertTeamDesc: 'Behind every GrabIron attachment is a team of dedicated professionals—engineers, welders, quality inspectors, and customer support specialists—all committed to delivering products that exceed expectations. Our experienced team members bring decades of combined knowledge in heavy equipment and attachment design.',
    readyToExperience: 'Ready to Experience the Difference?',
    readyToExperienceDesc: 'Contact us to learn more about our products and how we can support your projects',
    getInTouchBtn: 'Get In Touch',
    
    provenPerformance: 'Proven Performance',
    provenPerformanceDesc: 'Tested in demanding conditions',
    globalAvailability: 'Global Availability',
    globalAvailabilityDesc: 'Worldwide distribution network',
    customSolutions: 'Custom Solutions',
    customSolutionsDesc: 'Tailored to your needs',
    technicalSupport: 'Technical Support',
    technicalSupportDesc: 'Expert assistance when you need it',
    
    // Contact
    contactUsTitle: 'Contact Us',
    contactUsSubtitle: 'Get in touch with our team for sales inquiries, technical support, or general questions',
    contactInfo: 'Contact Information',
    getInTouch: 'Get In Touch',
    sendMessage: 'Send Us a Message',
    sendMessageDesc: 'Fill out the form below and we will get back to you as soon as possible.',
    email: 'Email',
    phone: 'Phone',
    name: 'Name',
    country: 'Country',
    productInterest: 'Product Interest',
    message: 'Message',
    submit: 'Submit',
    salesDept: 'Sales Department',
    techSupport: 'Technical Support',
    generalInquiries: 'General Inquiries',
    
    // Service Page
    serviceTitle: 'Service & Support',
    serviceSubtitle: 'Comprehensive support to keep your attachments performing at their best',
    technicalSupportTitle: 'Technical Support',
    technicalSupportDesc: 'Expert support for installation, setup, and maintenance of your GrabIron equipment. We\'re always ready to help.',
    supportLine247: '24/7 Support Line',
    emergencySupport: 'Emergency support available around the clock for critical issues.',
    expertAssistance: 'Expert Assistance',
    expertAssistanceDesc: 'Installation guidance, troubleshooting, maintenance planning, and performance optimization.',
    businessHours: 'Mon-Fri: 7:00 AM - 7:00 PM EST',
    fastPartsDelivery: 'Fast Parts Delivery',
    fastPartsDeliveryDesc: 'Comprehensive inventory of genuine replacement parts shipped from strategically located warehouses.',
    nextDayDelivery: 'Next-day delivery available',
    genuineParts: 'Genuine Parts & Components',
    whyGenuineParts: 'Why Choose Genuine Parts?',
    maintenanceServices: 'Maintenance Services',
    warrantyCoverage: 'Warranty Coverage',
    structuralComponents: 'Structural Components',
    hydraulicSystems: 'Hydraulic Systems',
    wearParts: 'Wear Parts',
    trainingResources: 'Training & Resources',
    professionalMaintenance: 'Professional Maintenance',
    professionalMaintenanceDesc: 'Our certified technicians provide comprehensive maintenance services to ensure your attachments operate at peak efficiency. From routine inspections to complete overhauls, we have the expertise and genuine parts to keep your equipment in top condition and minimize costly downtime.',
    comprehensiveTraining: 'Comprehensive Training Programs',
    comprehensiveTrainingDesc: 'We believe that proper training is essential for safe and efficient operation. Our expert trainers provide hands-on instruction covering equipment operation, maintenance procedures, and safety protocols. From basic operator training to advanced technician certification, we ensure your team has the knowledge and skills needed for success.',
    needService: 'Need Service or Support?',
    needServiceDesc: 'Our team is ready to help you keep your equipment running at peak performance.',
    requestService: 'Request Service',
    downloadManuals: 'Download Manuals',
    
    // About
    aboutUsTitle: 'About GrabIron',
    aboutUsSubtitle: 'Engineering excellence in excavator attachments since 1985',
    ourStory: 'Our Story',
    engineeringExcellence: 'Engineering Excellence',
    qualityManufacturing: 'Quality Manufacturing',
    globalReach: 'Global Reach',
    qualityStandards: 'Quality Standards',
    iso9001: 'ISO 9001 Certified Manufacturing',
    readyToExperience: 'Ready to Experience the Difference?',
    readyToExperienceDesc: 'Contact us to learn more about our products and how we can support your projects',
    getInTouchBtn: 'Get In Touch',
    
    // Service
    serviceTitle: 'Service & Support',
    serviceSubtitle: 'Comprehensive support to keep your attachments performing at their best',
    serviceHeroTitle: 'Service & Support',
    serviceHeroDesc: 'Expert technical support, genuine parts, and comprehensive maintenance services to keep your attachments performing at their best',
    technicalSupportTitle: 'Technical Support',
    technicalSupportDesc: 'Our experienced technical support team is available to help you with installation, troubleshooting, maintenance, and operation of your GrabIron attachments',
    supportLine247: '24/7 Support Line',
    emergencySupport: 'Emergency support available around the clock for critical issues',
    expertAssistance: 'Expert Assistance',
    expertAssistanceDesc: 'Installation guidance, troubleshooting, maintenance planning, and performance optimization',
    businessHours: 'Mon-Fri: 7:00 AM - 7:00 PM EST',
    fastPartsDelivery: 'Fast Parts Delivery',
    fastPartsDeliveryDesc: 'Comprehensive inventory of genuine replacement parts shipped from strategically located warehouses',
    nextDayDelivery: 'Next-day delivery available',
    genuineParts: 'Genuine Parts & Components',
    genuinePartsDesc: 'Keep your attachments running smoothly with genuine GrabIron replacement parts. We maintain a comprehensive inventory of wear parts, hydraulic components, and accessories to minimize downtime',
    whyGenuineParts: 'Why Choose Genuine Parts?',
    partsBenefit1: 'Manufactured to original specifications for perfect fit and performance',
    partsBenefit2: 'High-quality materials ensure longevity and reliability',
    partsBenefit3: 'Comprehensive warranty coverage on all parts',
    partsBenefit4: 'Fast shipping from multiple distribution centers',
    partsBenefit5: 'Expert guidance on part selection and installation',
    maintenanceServices: 'Maintenance Services',
    maintenanceServicesDesc: 'Regular maintenance is essential for maximizing the life and performance of your attachments. Our authorized service centers offer comprehensive maintenance packages',
    maintenanceItem1: 'Routine inspections and preventive maintenance schedules',
    maintenanceItem2: 'Hydraulic system service, testing, and repairs',
    maintenanceItem3: 'Wear component replacement and upgrades',
    maintenanceItem4: 'Structural repairs, modifications, and refurbishment',
    maintenanceItem5: 'Performance optimization and efficiency improvements',
    warrantyCoverage: 'Warranty Coverage',
    warrantyCoverageDesc: 'All GrabIron attachments are backed by our comprehensive warranty program. We stand behind the quality of our products and are committed to your complete satisfaction',
    warrantyExtended: 'Extended warranty options available. For complete warranty terms and conditions, please',
    downloadWarrantyPolicy: 'download our warranty policy',
    structuralComponents: 'Structural Components',
    hydraulicSystems: 'Hydraulic Systems',
    wearParts: 'Wear Parts',
    trainingResources: 'Training & Resources',
    trainingResourcesDesc: 'We offer comprehensive training programs to help your operators and maintenance personnel get the most from your GrabIron attachments',
    trainingItem1: 'On-site operator training and safety certification',
    trainingItem2: 'Maintenance technician certification programs',
    trainingItem3: 'Online training modules and instructional videos',
    trainingItem4: 'Comprehensive technical documentation and manuals',
    trainingItem5: 'Safety guidelines and industry best practices',
    professionalMaintenance: 'Professional Maintenance',
    professionalMaintenanceDesc: 'Our certified technicians provide comprehensive maintenance services to ensure your attachments operate at peak efficiency. From routine inspections to complete overhauls, we have the expertise and genuine parts',
    comprehensiveTraining: 'Comprehensive Training Programs',
    comprehensiveTrainingDesc: 'We believe that proper training is essential for safe and efficient operation. Our expert trainers provide hands-on instruction covering equipment operation, maintenance procedures, and safety protocols',
    needService: 'Need Service or Support?',
    needServiceDesc: 'Our team is ready to help you keep your equipment running at peak performance',
    requestService: 'Request Service',
    downloadManuals: 'Download Manuals',
    
    // CTA
    readyToStart: 'Ready to Get Started?',
    readyToStartDesc: 'Contact us today to discuss your attachment needs',
    
    // Footer
    company: 'Company',
    productCategories: 'Product Categories',
    allRightsReserved: 'All rights reserved',
    quickLinks: 'Quick Links',
    footerDesc: 'Premium excavator and skid steer attachments engineered for the toughest jobs. Built to last, designed to perform.'
  },
  
  uk: {
    // Navigation
    home: 'Головна',
    catalog: 'Каталог',
    about: 'Про нас',
    service: 'Сервіс',
    contact: 'Контакти',
    products: 'Продукція',
    downloads: 'Завантаження',
    
    // Hero
    heroTitle: 'Навісне обладнання, яке витримує реальне навантаження',
    heroSubtitle: 'Навісне обладнання — точні розрахунки, міцна сталь і стабільна робота в реальних умовах',
    heroBrand: 'GrabIron',
    viewCatalog: 'Переглянути каталог',
    contactUs: 'Зв\'яжіться з нами',
    
    // Benefits
    benefitQualityTitle: 'Преміум якість',
    benefitQualityText: 'Високоякісні матеріали для максимальної міцності',
    benefitEngineeringTitle: 'Експертна інженерія',
    benefitEngineeringText: 'Точна розробка для оптимальної продуктивності',
    benefitSupportTitle: 'Надійна підтримка',
    benefitSupportText: 'Комплексний сервіс та підтримка',
    
    // Products
    catalogTitle: 'Каталог професійного обладнання',
    catalogSubtitle: 'Високоточні рішення для максимальної продуктивності та надійності',
    allProducts: 'Всі товари',
    searchPlaceholder: 'Пошук товарів...',
    showFilters: 'Показати фільтри',
    hideFilters: 'Сховати фільтри',
    viewDetails: 'Детальніше',
    availability: 'Наявність',
    price: 'Ціна',
    carrier: 'Клас екскаватора',
    variants: 'варіанти',
    variantsAvailable: 'Доступні варіанти',
    specificationsAndDimensions: 'Специфікації та розміри',
    clickToEnlarge: 'Натисніть для збільшення',
    contactUsTitle: 'Зв\'\u044fжіться з нами',
    photo: 'Фото',
    priceOnRequest: 'Ціну уточнюйте',
    inStock: 'В наявності',
    onOrder: 'Під замовлення',
    characteristics: 'Характеристики',
    availableVariants: 'Доступні варіанти',
    backToCatalog: 'Назад до каталогу',
    loading: 'Завантаження...',
    noResults: 'Товари не знайдені',
    noResultsDesc: 'Спробуйте змінити фільтри або пошуковий запит',
    
    // Variant characteristic keys
    'Модель': 'Модель',
    'Класс машин (t)': 'Клас машин (t)',
    'Вес (kg)': 'Вага (kg)',
    'Раскрытие челюстей (mm)': 'Розкриття щелеп (mm)',
    'Высота (mm)': 'Висота (mm)',
    'Ширина (mm)': 'Ширина (mm)',
    'Рабочее давление (bar)': 'Робочий тиск (bar)',
    'Oil flow (l/min)': 'Потік масла (l/min)',
    'Усилие смыкания (t)': 'Зусилля змикання (t)',
    'Производитель': 'Виробник',
    'Состояние': 'Стан',
    'Страна производитель': 'Країна виробник',
    'Гарантийный срок': 'Гарантійний термін',
    'Экскаватор': 'Екскаватор',
    
    // Category names for display
    categoryExcavator: 'Екскаваторне навісне обладнання',
    categoryBuckets: 'Ковші і навісне обладнання',
    categoryLoaders: 'Навісне для навантажувачів',
    categoryComponents: 'Комплектуючі і адаптери',
    categoryMunicipal: 'Комунальна техніка',
    
    // Additional product text
    'Новое': 'Нове',
    'Цену уточняйте': 'Ціну уточнюйте',
    'В наличии': 'В наявності',
    'Под заказ': 'Під замовлення',
    
    ourProductSeries: 'Наші серії продукції',
    ourProductSeriesDesc: 'Ознайомтеся з нашим комплексним асортиментом навісного обладнання для екскаваторів',
    viewFullCatalog: 'Переглянути весь каталог',
        // Industries
    industriesTitle: 'Галузі, які ми обслуговуємо',
    industriesDesc: 'Довіра професіоналів у різних секторах',
    industryConstruction: 'Будівництво',
    industryConstructionDesc: 'Фундаменти, знесення, підготовка ділянок',
    industryMining: 'Гірнича справа',
    industryMiningDesc: 'Дроблення породи, обробка матеріалів, важкі роботи',
    industryRecycling: 'Переробка',
    industryRecyclingDesc: 'Обробка металобрухту, управління відходами',
    industryMunicipal: 'Комунальні послуги',
    industryMunicipalDesc: 'Обслуговування доріг, прибирання снігу, міське будівництво',
    
    // Stats
    stat15Years: '15+',
    statYearsLabel: 'Років досвіду',
    stat500Plus: '500+',
    statProjectsLabel: 'Завершених проектів',
    stat98Percent: '98%',
    statSatisfactionLabel: 'Задоволених клієнтів',
    stat30Countries: '30+',
    statCountriesLabel: 'Країн обслуговування',
    
    // Technical Excellence
    techExcellenceTitle: 'Технічна досконалість',
    techExcellenceDesc: 'Передові технології виробництва та контролю якості',
    techPrecision: 'Точне виробництво',
    techPrecisionDesc: 'ЧПУ обробка та лазерна різка для точних специфікацій',
    techQuality: 'Забезпечення якості',
    techQualityDesc: 'Багатоетапне тестування та процеси з сертифікацією ISO',
    techMaterials: 'Преміум матеріали',
    techMaterialsDesc: 'Сталь Hardox 450/500 та посилені компоненти',
    techCustom: 'Індивідуальні рішення',
    techCustomDesc: 'Розробка під конкретні вимоги',
        // Categories
    demolition: 'Демонтаж',
    sorting: 'Сортировка',
    scrap: 'Металолом',
    drilling: 'Бурение',
    others: 'Інше',
    
    // Machine Types
    machineTypes: 'Продукція за типом машини',
    machineTypesDesc: 'Знайдіть ідеальне обладнання для вашої техніки',
    excavators: 'Екскаватори',
    excavatorsDesc: 'Обладнання для екскаваторів від 3 до 50+ тонн',
    skidSteer: 'Міні-навантажувачі',
    skidSteerDesc: 'Компактне обладнання для міні-навантажувачів',
    browseExcavator: 'Переглянути обладнання для екскаваторів',
    browseSkidSteer: 'Переглянути обладнання для навантажувачів',
    
    // How We Work
    howWeWorkTitle: 'Як ми працюємо',
    howWeWorkDesc: 'Від проектування до доставки — якість на кожному етапі',
    workDesignTitle: 'Точне проектування',
    workDesignDesc: 'Кожне навісне обладнання починається з детального CAD-моделювання та структурного аналізу. Наші інженери розраховують розподіл навантажень, точки напруги та оптимальну товщину матеріалу, щоб забезпечити максимальну довговічність та продуктивність у реальних умовах.',
    workManufacturingTitle: 'Передове виробництво',
    workManufacturingDesc: 'Ми використовуємо лазерну різку з ЧПУ, точне зварювання та автоматизовану обробку для дотримання жорстких допусків. Високоякісна сталь Hardox обробляється в приміщеннях з контрольованим кліматом для забезпечення стабільної якості та довговічності у вимогливих застосуваннях.',
    workTestingTitle: 'Ретельне тестування',
    workTestingDesc: 'Кожне навісне обладнання проходить комплексний контроль якості, включаючи перевірку розмірів, інспекцію зварних швів та випробування під навантаженням. Ми симулюємо реальні експлуатаційні навантаження, щоб гарантувати надійну роботу до того, як продукт потрапить до наших клієнтів.',
    workDeliveryTitle: 'Глобальна доставка',
    workDeliveryDesc: 'Завдяки стратегічним логістичним партнерам та ефективному складуванню ми забезпечуємо швидку доставку по всьому світу. Належна упаковка захищає ваші інвестиції під час транспортування, а наша служба підтримки надає допомогу з встановленням та постійну технічну підтримку.',
    
    // Why Choose
    whyChoose: 'Чому обирають GrabIron?',
    whyChooseDesc: 'Обладнання світового рівня, підтверджене десятиліттями інженерної досконалості',
    
    // About Us Page
    aboutUsTitle: 'Про GrabIron',
    aboutUsSubtitle: 'Інженерна досконалість у виробництві навісного обладнання з 1985 року',
    ourStory: 'Наша історія',
    ourStoryText1: 'GrabIron Attachments була заснована з простою місією: створити найдовговічніше та найвищої продуктивності навісне обладнання для екскаваторів у галузі. Те, що починалося як невелика майстерня, виросло у світового лідера у виробництві навісного обладнання, обслуговуючи клієнтів у будівництві, гірничій та промисловій сферах по всьому світу.',
    ourStoryText2: 'Понад три десятиліття ми розширюємо межі проектування та інженерії навісного обладнання. Наша відданість якості, інноваціям та задоволенню клієнтів зробила нас першим вибором для підрядників, які вимагають найкращого від свого обладнання.',
    engineeringExcellenceDesc: 'Кожне навісне обладнання GrabIron спроектовано з використанням сучасного CAD-моделювання, аналізу кінцевих елементів та реальних випробувань, щоб забезпечити винятковy продуктивність у найскладніших умовах.',
    qualityManufacturingDesc: 'Сучасні виробничі потужності з кваліфікованими техніками. Кожне навісне обладнання проходить ретельну перевірку та випробування перед відправкою з заводу.',
    globalReachDesc: 'Дистриб\'юторські партнери та сервісні центри по всьому світу надають місцеву підтримку, підкріплену глобальним досвідом, де б не знаходилися ваші проекти.',
    qualityStandards: 'Стандарти якості',
    iso9001: 'Виробництво сертифіковане за ISO 9001',
    qualityFeature1: 'Конструкція з високоякісної сталі для максимальної довговічності',
    qualityFeature2: 'Точна механічна обробка для оптимального прилягання та продуктивності',
    qualityFeature3: 'Передові технології зварювання для надзвичайної міцності',
    qualityFeature4: 'Комплексне тестування забезпечення якості на кожному етапі',
    qualityFeature5: 'Постійне вдосконалення на основі відгуків клієнтів',
    innovationSustainability: 'Інновації та екологічність',
    innovationText1: 'Будівельна індустрія постійно розвивається, і ми разом з нею. Наша команда R&D постійно працює над новими дизайнами та удосконаленнями, щоб тримати наші продукти на передовій галузі. Ми присвячені зменшенню нашого впливу на навколишнє середовище через екологічні виробничі практики та продукти, розроблені для довговічності.',
    innovationText2: 'Створюючи навісне обладнання, яке служить довше та працює краще, ми допомагаємо скоротити відходи та покращити екологічність будівельних операцій по всьому світу.',
    modernFacilities: 'Сучасні потужності',
    modernFacilitiesDesc: 'Наш сучасний виробничий комплекс займає понад 50 000 квадратних футів, обладнаний новітніми верстатами з ЧПУ, роботизованими зварювальними станціями та прецизійним тестовим обладнанням. Це дозволяє нам підтримувати найвищі стандарти якості, відповідаючи потребам нашої зростаючої глобальної клієнтської бази.',
    expertTeam: 'Команда експертів',
    expertTeamDesc: 'За кожним навісним обладнанням GrabIron стоїть команда віддан их професіоналів—інженерів, зварювальників, інспекторів якості та фахівців підтримки клієнтів—усі вони прагнуть постачати продукти, які перевершують очікування. Наші досвідчені члени команди мають десятиліття спільних знань у проєктуванні важкої техніки та навісного обладнання.',
    readyToExperience: 'Готові відчути різницю?',
    readyToExperienceDesc: 'Зв\'яжіться з нами, щоб дізнатися більше про наші продукти та те, як ми можемо підтримати ваші проекти',
    getInTouchBtn: 'Зв\'язатися',
    
    provenPerformance: 'Перевірена продуктивність',
    provenPerformanceDesc: 'Випробувано в екстремальних умовах',
    globalAvailability: 'Глобальна доступність',
    globalAvailabilityDesc: 'Всесвітня мережа дистрибуції',
    customSolutions: 'Індивідуальні рішення',
    customSolutionsDesc: 'Підібрані під ваші потреби',
    technicalSupport: 'Технічна підтримка',
    technicalSupportDesc: 'Експертна допомога 24/7',
    
    // Contact
    contactUsTitle: 'Зв\'яжіться з нами',
    contactUsSubtitle: 'Зв\'яжіться з нашою командою з питань продажу, технічної підтримки чи загальних запитів',
    contactInfo: 'Контактна інформація',
    getInTouch: 'Зв\'яжіться з нами',
    sendMessage: 'Надішліть нам повідомлення',
    sendMessageDesc: 'Заповніть форму нижче, і ми зв\'яжемося з вами якнайшвидше.',
    email: 'Email',
    phone: 'Телефон',
    name: 'Ім\'я',
    country: 'Країна',
    productInterest: 'Цікавий продукт',
    message: 'Повідомлення',
    submit: 'Надіслати',
    salesDept: 'Відділ продажів',
    techSupport: 'Технічна підтримка',
    generalInquiries: 'Загальні запити',
    
    // Service Page
    serviceTitle: 'Сервіс та підтримка',
    serviceSubtitle: 'Комплексна підтримка для оптимальної роботи вашого обладнання',
    serviceHeroTitle: 'Сервіс і підтримка',
    serviceHeroDesc: 'Експертна технічна підтримка, оригінальні запчастини та комплексне технічне обслуговування для найкращої роботи вашого обладнання',
    technicalSupportTitle: 'Технічна підтримка',
    technicalSupportDesc: 'Наша досвідчена команда технічної підтримки готова допомогти вам зі встановленням, усуненням несправностей, обслуговуванням та експлуатацією навісного обладнання GrabIron',
    supportLine247: 'Підтримка 24/7',
    emergencySupport: 'Екстрена підтримка доступна цілодобово для критичних ситуацій',
    expertAssistance: 'Експертна допомога',
    expertAssistanceDesc: 'Керівництво по встановленню, усунення несправностей, планування технічного обслуговування та оптимізація продуктивності',
    businessHours: 'Пн-Пт: 7:00 - 19:00 EST',
    fastPartsDelivery: 'Швидка доставка запчастин',
    fastPartsDeliveryDesc: 'Повний асортимент оригінальних запасних частин відвантажується зі стратегічно розташованих складів',
    nextDayDelivery: 'Доступна доставка наступного дня',
    genuineParts: 'Оригінальні запчастини та компоненти',
    whyGenuineParts: 'Чому варто обирати оригінальні запчастини?',
    maintenanceServices: 'Послуги технічного обслуговування',
    warrantyCoverage: 'Гарантійне покриття',
    structuralComponents: 'Структурні компоненти',
    hydraulicSystems: 'Гідравлічні системи',
    wearParts: 'Зношувальні частини',
    trainingResources: 'Навчання та ресурси',
    professionalMaintenance: 'Професійне обслуговування',
    professionalMaintenanceDesc: 'Наші сертифіковані техніки надають комплексні послуги з обслуговування, щоб ваше навісне обладнання працювало на піковій ефективності. Від планових оглядів до повного ремонту — у нас є експертиза та оригінальні запчастини',
    comprehensiveTraining: 'Комплексні навчальні програми',
    comprehensiveTrainingDesc: 'Ми віримо, що правильне навчання є необхідним для безпечної та ефективної роботи. Наші експертні тренери проводять практичні заняття, що охоплюють експлуатацію обладнання, процедури обслуговування та протоколи безпеки',
    needService: 'Потрібен сервіс або підтримка?',
    needServiceDesc: 'Наша команда готова допомогти вам підтримувати ваше обладнання на піковій продуктивності',
    requestService: 'Запитати сервіс',
    downloadManuals: 'Завантажити інструкції',
    
    // About
    aboutUsTitle: 'Про GrabIron',
    aboutUsSubtitle: 'Інженерна досконалість у навісному обладнанні з 1985 року',
    ourStory: 'Наша історія',
    engineeringExcellence: 'Інженерна досконалість',
    qualityManufacturing: 'Якісне виробництво',
    globalReach: 'Глобальна присутність',
    qualityStandards: 'Стандарти якості',
    iso9001: 'Виробництво сертифіковане ISO 9001',
    readyToExperience: 'Готові відчути різницю?',
    readyToExperienceDesc: 'Зв\'яжіться з нами, щоб дізнатися більше про наші продукти та як ми можемо підтримати ваші проекти',
    getInTouchBtn: 'Зв\'язатися',
    
    // Service
    serviceTitle: 'Сервіс та підтримка',
    serviceSubtitle: 'Комплексна підтримка для оптимальної роботи вашого обладнання',
    serviceHeroTitle: 'Сервіс і підтримка',
    serviceHeroDesc: 'Експертна технічна підтримка, оригінальні запчастини та комплексне технічне обслуговування для найкращої роботи вашого обладнання',
    technicalSupportTitle: 'Технічна підтримка',
    technicalSupportDesc: 'Наша досвідчена команда технічної підтримки готова допомогти вам зі встановленням, усуненням несправностей, обслуговуванням та експлуатацією навісного обладнання GrabIron',
    supportLine247: 'Підтримка 24/7',
    emergencySupport: 'Екстрена підтримка доступна цілодобово для критичних ситуацій',
    expertAssistance: 'Експертна допомога',
    expertAssistanceDesc: 'Керівництво по встановленню, усунення несправностей, планування технічного обслуговування та оптимізація продуктивності',
    businessHours: 'Пн-Пт: 7:00 - 19:00 EST',
    fastPartsDelivery: 'Швидка доставка запчастин',
    fastPartsDeliveryDesc: 'Повний асортимент оригінальних запасних частин відвантажується зі стратегічно розташованих складів',
    nextDayDelivery: 'Доступна доставка наступного дня',
    genuineParts: 'Оригінальні запчастини та компоненти',
    genuinePartsDesc: 'Підтримуйте ваше навісне обладнання в ідеальному стані з оригінальними запчастинами GrabIron. Ми маємо повний асортимент зносних деталей, гідравлічних компонентів та аксесуарів для мінімізації простоїв',
    whyGenuineParts: 'Чому обирати оригінальні запчастини?',
    partsBenefit1: 'Виготовлені за оригінальними специфікаціями для ідеальної посадки та продуктивності',
    partsBenefit2: 'Високоякісні матеріали забезпечують довговічність та надійність',
    partsBenefit3: 'Повне гарантійне покриття на всі запчастини',
    partsBenefit4: 'Швидка доставка з декількох розподільчих центрів',
    partsBenefit5: 'Експертні консультації по вибору та встановленню запчастин',
    maintenanceServices: 'Сервісне обслуговування',
    maintenanceServicesDesc: 'Регулярне технічне обслуговування є необхідним для максимального продовження терміну служби та продуктивності вашого навісного обладнання. Наші авторизовані сервісні центри пропонують комплексні пакети обслуговування',
    maintenanceItem1: 'Планові огляди та графіки профілактичного обслуговування',
    maintenanceItem2: 'Обслуговування гідравлічної системи, тестування та ремонт',
    maintenanceItem3: 'Заміна зношених компонентів та модернізація',
    maintenanceItem4: 'Структурний ремонт, модифікації та відновлення',
    maintenanceItem5: 'Оптимізація продуктивності та підвищення ефективності',
    warrantyCoverage: 'Гарантійне покриття',
    warrantyCoverageDesc: 'Усе навісне обладнання GrabIron підтримується нашою комплексною гарантійною програмою. Ми підтримуємо якість наших продуктів і прагнемо вашого повного задоволення',
    warrantyExtended: 'Доступні розширені гарантійні опції. Для повних умов гарантії, будь ласка',
    downloadWarrantyPolicy: 'завантажте нашу гарантійну політику',
    structuralComponents: 'Конструкційні компоненти',
    hydraulicSystems: 'Гідравлічні системи',
    wearParts: 'Зносні деталі',
    trainingResources: 'Навчання та ресурси',
    trainingResourcesDesc: 'Ми пропонуємо комплексні навчальні програми, щоб допомогти вашим операторам та персоналу з обслуговування отримати максимум від навісного обладнання GrabIron',
    trainingItem1: 'Навчання операторів на місці та сертифікація з безпеки',
    trainingItem2: 'Програми сертифікації техніків з обслуговування',
    trainingItem3: 'Онлайн навчальні модулі та навчальні відео',
    trainingItem4: 'Повна технічна документація та посібники',
    trainingItem5: 'Керівництва з безпеки та найкращі практики галузі',
    professionalMaintenance: 'Професійне обслуговування',
    professionalMaintenanceDesc: 'Наші сертифіковані техніки надають комплексні послуги з обслуговування, щоб ваше навісне обладнання працювало на піковій ефективності. Від планових оглядів до повного ремонту — у нас є експертиза та оригінальні запчастини',
    comprehensiveTraining: 'Комплексні навчальні програми',
    comprehensiveTrainingDesc: 'Ми віримо, що правильне навчання є необхідним для безпечної та ефективної роботи. Наші експертні тренери проводять практичні заняття, що охоплюють експлуатацію обладнання, процедури обслуговування та протоколи безпеки',
    needService: 'Потрібен сервіс або підтримка?',
    needServiceDesc: 'Наша команда готова допомогти вам підтримувати ваше обладнання на піковій продуктивності',
    requestService: 'Запит на обслуговування',
    downloadManuals: 'Завантажити посібники',
    
    // CTA
    readyToStart: 'Готові почати?',
    readyToStartDesc: 'Зв\'яжіться з нами сьогодні, щоб обговорити ваші потреби в обладнанні',
    
    // Footer
    company: 'Компанія',
    productCategories: 'Категорії товарів',
    allRightsReserved: 'Всі права захищені',
    quickLinks: 'Швидкі посилання',
    footerDesc: 'Преміум навісне обладнання для екскаваторів та навантажувачів, розроблене для найскладніших робіт. Побудовано, щоб служити, спроектовано для продуктивності.'
  }
};

// Get current language from localStorage or default to 'uk'
export function getCurrentLang() {
  return localStorage.getItem('grabiron-lang') || 'uk';
}

// Set language
export function setLang(lang) {
  localStorage.setItem('grabiron-lang', lang);
  window.location.reload();
}

// Get translation
export function t(key) {
  const lang = getCurrentLang();
  return translations[lang]?.[key] || translations['uk'][key] || key;
}

// Initialize language switcher
export function initLangSwitcher() {
  const currentLang = getCurrentLang();
  
  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
    
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
    });
  });
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  
  // Update all elements with data-i18n-placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });
}
