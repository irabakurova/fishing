// Mobile menu toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav--active');
        burger.classList.toggle('burger--active');
    });
}

// Filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        
        // Filter products
        const filter = btn.dataset.filter;
        if (typeof renderProducts === 'function') {
            renderProducts(filter);
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            nav?.classList.remove('nav--active');
            burger?.classList.remove('burger--active');
        }
    });
});

// Add scroll effect to header
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header?.classList.add('header--scrolled');
    } else {
        header?.classList.remove('header--scrolled');
    }
    
    lastScroll = currentScroll;
});