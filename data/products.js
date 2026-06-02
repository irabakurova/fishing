const products = [
    {
        id: 1,
        name: "Минноу 90мм",
        type: "minnow",
        length: "90мм",
        weight: "12г",
        depth: "1.5-2м",
        price: "1500",
        status: "in-stock",
        image: "img/products/lure-1.jpg",
        description: "Классический минноу с отличной игрой"
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
        description: "Глубоководный крэнк с активной игрой"
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
        description: "Поверхностный поппер с громким чпоком"
    }
];

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
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\'product-card__placeholder\'>📷<br>Фото воблера</div>'">
                <span class="product-card__badge badge--${product.status}">
                    ${product.status === 'in-stock' ? '✓ В наличии' : '⏳ Под заказ'}
                </span>
            </div>
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name}</h3>
                <div class="product-card__specs">
                    <span class="spec">📏 ${product.length}</span>
                    <span class="spec">⚖️ ${product.weight}</span>
                    <span class="spec">🌊 ${product.depth}</span>
                </div>
                <p class="product-card__price">${product.price} ₽</p>
                <div class="product-card__buttons">
                    <a href="https://t.me/username?text=Здравствуйте! Хочу заказать: ${product.name}" target="_blank" class="product-card__btn product-card__btn--tg">
                        <span>✈</span>
                        <span>Заказать в Telegram</span>
                    </a>
                    <a href="https://avito.ru" target="_blank" class="product-card__btn product-card__btn--avito">
                        <span>🛒</span>
                        <span>Смотреть на Avito</span>
                    </a>
                </div>
            </div>
        </article>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});