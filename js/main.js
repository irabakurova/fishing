// ===== Loader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 500);
});

// ===== Mobile Menu =====
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav--active');
        burger.classList.toggle('burger--active');
    });
}

// ===== Filter Buttons =====
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        if (typeof window.renderProducts === 'function') window.renderProducts(filter);
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            nav?.classList.remove('nav--active');
            burger?.classList.remove('burger--active');
        }
    });
});

// ===== Product Gallery (inside card) =====
function initProductGalleries() {
    document.querySelectorAll('.product-gallery').forEach(gallery => {
        const track = gallery.querySelector('.product-gallery__track');
        const slides = gallery.querySelectorAll('.product-gallery__slide');
        const prevBtn = gallery.querySelector('.product-gallery__nav--prev');
        const nextBtn = gallery.querySelector('.product-gallery__nav--next');
        const dots = gallery.querySelectorAll('.product-gallery__dot');
        const counter = gallery.querySelector('.product-gallery__counter');
        
        if (!track || slides.length === 0) return;
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        function updateGallery() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
            if (counter) counter.textContent = `${currentIndex + 1}/${totalSlides}`;
        }
        
        function goToSlide(index) {
            currentIndex = (index + totalSlides) % totalSlides;
            updateGallery();
        }
        
        if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(currentIndex - 1); });
        if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(currentIndex + 1); });
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(i); });
        });
        
        slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                e.stopPropagation();
                const img = slide.querySelector('img');
                if (img && typeof openLightbox === 'function') openLightbox(img.src, gallery.dataset.productName, slides, currentIndex);
            });
        });
        
        updateGallery();
    });
}

// ===== Lightbox Modal =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(src, productName, slides, startIndex) {
    lightboxImages = Array.from(slides).map(slide => {
        const img = slide.querySelector('img');
        return img ? img.src : null;
    }).filter(src => src);
    
    lightboxIndex = startIndex;
    updateLightbox();
    if (lightbox) lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateLightbox() {
    if (lightboxImages[lightboxIndex] && lightboxImg) {
        lightboxImg.src = lightboxImages[lightboxIndex];
        if (lightboxCaption) lightboxCaption.textContent = `Фото ${lightboxIndex + 1} из ${lightboxImages.length}`;
    }
}

function closeLightbox() {
    if (lightbox) lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
});

if (lightboxNext) lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length; updateLightbox(); }
    if (e.key === 'ArrowRight') { lightboxIndex = (lightboxIndex + 1) % lightboxImages.length; updateLightbox(); }
});

// ===== Scroll Animations =====
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .process-step, .material-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== Horizontal Slider =====
function initHorizontalSlider() {
    const slider = document.querySelector('.products-slider');
    const prevBtn = document.querySelector('.slider-nav--prev');
    const nextBtn = document.querySelector('.slider-nav--next');
    
    if (!slider || !prevBtn || !nextBtn) return;

    const scrollAmount = 370;

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Пункт 4: убрали обновление точек, так как индикатор скрыт

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// ===== Parallax Effect =====
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== Enhanced Product Card Animations =====
function enhanceProductCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== Render Products =====
window.renderProducts = function(filter = 'in-stock') {
    // Пункт 2: по умолчанию показываем "В наличии"
    const grid = document.getElementById('productsGrid');
    if (!grid || typeof products === 'undefined') return;
    
    let filtered = products;
    
    // Пункт 2: сортировка — сначала "В наличии"
    if (filter === 'in-stock') {
        filtered = products.filter(p => p.status === 'in-stock');
    } else if (filter === 'made-to-order') {
        filtered = products.filter(p => p.status === 'made-to-order');
    }
    // filter === 'all' — показываем всё, но сортируем: в наличии первыми
    
    // Сортировка: в наличии всегда первыми
    filtered = [...filtered].sort((a, b) => {
        if (a.status === 'in-stock' && b.status !== 'in-stock') return -1;
        if (a.status !== 'in-stock' && b.status === 'in-stock') return 1;
        return 0;
    });
    
    grid.innerHTML = filtered.map(product => {
        const images = Array.isArray(product.images) ? product.images : [product.image].filter(Boolean);
        const hasMultiple = images.length > 1;
        
        return `
        <article class="product-card" data-status="${product.status}">
            <div class="product-gallery" data-product-name="${product.name}">
                <div class="product-gallery__track">
                    ${images.map((img, i) => `
                        <div class="product-gallery__slide">
                            <img src="${img}" alt="${product.name} — фото ${i + 1}" 
                                 onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\'product-gallery__placeholder\'><br>Фото ${i + 1}</div>'">
                        </div>
                    `).join('')}
                </div>
                
                ${hasMultiple ? `
                <button class="product-gallery__nav product-gallery__nav--prev" aria-label="Предыдущее фото">&#10094;</button>
                <button class="product-gallery__nav product-gallery__nav--next" aria-label="Следующее фото">&#10095;</button>
                <div class="product-gallery__dots">
                    ${images.map((_, i) => `<button class="product-gallery__dot ${i === 0 ? 'active' : ''}" aria-label="Фото ${i + 1}"></button>`).join('')}
                </div>
                <span class="product-gallery__counter">1/${images.length}</span>
                ` : ''}
                
                <span class="product-card__badge badge--${product.status}">
                    ${product.status === 'in-stock' 
                        ? (product.stockCount ? `✓ В наличии: ${product.stockCount}` : '✓ В наличии') 
                        : '⏳ Под заказ'}
                </span>
            </div>
            
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name}</h3>
                <div class="product-card__specs">
                    ${product.length && product.length !== '-' ? `<span class="spec">📏 ${product.length}</span>` : ''}
                    ${product.weight && product.weight !== '-' ? `<span class="spec">⚖️ ${product.weight}</span>` : ''}
                    ${product.depth && product.depth !== '-' ? `<span class="spec">🌊 ${product.depth}</span>` : ''}
                </div>
                ${product.price && product.price !== '-' ? `<p class="product-card__price">${product.price} ₽</p>` : ''}
                <div class="product-card__buttons">
                    <a href="https://t.me/ShustSPB?text=Здравствуйте! Интересует: ${encodeURIComponent(product.name)}" 
                       target="_blank" class="product-card__btn product-card__btn--tg">
                        <span>✈</span><span>Узнать цену и заказать</span>
                    </a>
                    <a href="https://www.avito.ru/user/5a6d1dc240a4e3a9532db07a1e536d5a/profile?id=7757798928&src=item&page_from=from_item_card&iid=7757798928" 
                       target="_blank" class="product-card__btn product-card__btn--avito">
                        <span>🛒</span><span>Смотреть на Avito</span>
                    </a>
                </div>
            </div>
        </article>`;
    }).join('');
    
    setTimeout(() => {
        initProductGalleries();
        enhanceProductCards();
    }, 100);
};

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    // Пункт 2: по умолчанию загружаем "В наличии"
    if (typeof products !== 'undefined') {
        window.renderProducts('in-stock');
        
        // Обновляем активную кнопку фильтра
        const defaultBtn = document.querySelector('.filter-btn[data-filter="in-stock"]');
        if (defaultBtn) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            defaultBtn.classList.add('active');
        }
    }
    initProductGalleries();
    initScrollAnimations();
    initHorizontalSlider();
    initParallax();
});