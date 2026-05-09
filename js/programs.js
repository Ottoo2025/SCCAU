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

// Transparency section - Responsive Chart.js initialization
const chartElement = document.getElementById('impactChart');

if (chartElement) {
    const ctx = chartElement.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Clinical', 'Outreach', 'Vocational', 'Admin'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: ['#008080', '#e65c40', '#ffcc00', '#333333'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => ` ${context.label}: ${context.raw}%`
                    }
                }
            },
            cutout: '70%'
        }
    });
}