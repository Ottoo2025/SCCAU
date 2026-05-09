// Loader
document.addEventListener("DOMContentLoaded", function() {
    const progressBar = document.getElementById('load-bar');
    const progressText = document.getElementById('load-percentage');
    const loader = document.getElementById('loader-wrapper');
    
    let width = 0;
    const duration = 4000; // 4 seconds
    const intervalTime = 40; // update every 40ms
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
        width += step;
        if (width >= 100) {
            width = 100;
            clearInterval(timer);
            
            // Hide the loader immediately when 100% is reached
            setTimeout(() => {
                loader.classList.add('loader-hidden');
            }, 200);
        }
        
        progressBar.style.width = width + "%";
        progressText.textContent = Math.floor(width);
    }, intervalTime);
});

// navbar
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('#navLinks');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Gallery section Swiper initialization
const swiper = new Swiper('.gallery-swiper', {
    // Basic settings
    slidesPerView: 1, // Small screen default
    spaceBetween: 30,
    loop: true,
    centeredSlides: false,
    grabCursor: true,
    
    // Autoplay logic (5 seconds)
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsive Breakpoints
    breakpoints: {
        // Medium screens (tablets)
        768: {
            slidesPerView: 2,
        },
        // Large screens (desktops)
        1024: {
            slidesPerView: 3, // Shows 3 at a time, moves 1 by 1
        }
    }
});


// fact toggle menu
document.querySelectorAll('.flip-card-wrapper').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('is-flipped');
    });
});

