// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger effect for children
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.fade-in, .process-step, .material-card, .reveal').forEach(el => {
        observer.observe(el);
    });
}

// ===== Horizontal Slider =====
function initHorizontalSlider() {
    const slider = document.querySelector('.products-slider');
    const prevBtn = document.querySelector('.slider-nav--prev');
    const nextBtn = document.querySelector('.slider-nav--next');
    const cards = document.querySelectorAll('.products-slider .product-card');
    
    if (!slider || !prevBtn || !nextBtn) return;

    const scrollAmount = 370; // card width + gap

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Update dots on scroll
    slider.addEventListener('scroll', () => {
        const scrollLeft = slider.scrollLeft;
        const index = Math.round(scrollLeft / scrollAmount);
        
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    });

    // Touch/drag support
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

// ===== Update Init =====
const originalInit = document.addEventListener;
document.addEventListener('DOMContentLoaded', () => {
    if (typeof products !== 'undefined') renderProducts();
    initProductGalleries();
    initScrollAnimations();
    initHorizontalSlider();
    initParallax();
    enhanceProductCards();
});