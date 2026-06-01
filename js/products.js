const products = [
    {
        id: 1,
        name: "Минноу 90мм",
        type: "minnow",
        length: "90мм",
        weight: "12г",
        depth: "1.5-2м",
        price: "1500",
        status: "in-stock", // in-stock или made-to-order
        image: "img/products/lure-1.jpg",
        description: "Классический минноу, отличная игра"
    },
    {
        id: 2,
        name: "Крэнк 65мм",
        type: "crank",
        length: "65мм",
        weight: "18г",
        depth: "2-3м",
        price: "1300",
        status: "made-to-order",
        image: "img/products/lure-2.jpg",
        description: "Глубоководный, активная игра"
    },
    {
        id: 3,
        name: "Поппер 80мм",
        type: "popper",
        length: "80мм",
        weight: "15г",
        depth: "поверхность",
        price: "1400",
        status: "in-stock",
        image: "img/products/lure-3.jpg",
        description: "Поверхностный, громкий чпок"
    }
    // Добавляй новые воблеры сюда
];

// Функция для рендера товаров
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    let filtered = products;
    if (filter === 'in-stock') {
        filtered = products.filter(p => p.status === 'in-stock');
    } else if (filter === 'made-to-order') {
        filtered = products.filter(p => p.status === 'made-to-order');
    }
    
    grid.innerHTML = filtered.map(product => `
        <article class="product-card" data-status="${product.status}">
            <div class="product-card__image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.textContent='Фото воблера'">
            </div>
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__specs">${product.length}, ${product.weight}, ${product.depth}</p>
                <span class="product-card__status status-${product.status}">
                    ${product.status === 'in-stock' ? '✓ В наличии' : '⏳ Под заказ (7-14 дней)'}
                </span>
                <p class="product-card__price">${product.price} ₽</p>
                <div class="product-card__buttons">
                    <a href="https://t.me/username?text=Здравствуйте! Хочу заказать: ${product.name}" target="_blank" class="product-card__btn product-card__btn--tg">
                        ✈️ Заказать в Telegram
                    </a>
                    <a href="https://avito.ru" target="_blank" class="product-card__btn product-card__btn--avito">
                        🛒 Смотреть на Avito
                    </a>
                </div>
            </div>
        </article>
    `).join('');
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});