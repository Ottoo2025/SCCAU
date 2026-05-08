// navbar
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('#navLinks');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


// impact stats 
const statsSection = document.querySelector('.stats-section');
const stats = document.querySelectorAll('.stat-number');
let started = false; // Flag to ensure animation runs only once

function startCount(el) {
    let target = parseInt(el.dataset.target);
    let count = 0;
    let speed = target / 100; // Adjust for smoothness

    let updateCount = setInterval(() => {
        count += Math.ceil(speed);
        if (count >= target) {
            el.innerText = target.toLocaleString() + (target > 100 ? "+" : "");
            clearInterval(updateCount);
        } else {
            el.innerText = count.toLocaleString();
        }
    }, 20);
}

// Intersection Observer for Scroll Animation
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
        stats.forEach(stat => startCount(stat));
        started = true;
    }
}, { threshold: 0.5 });

observer.observe(statsSection);

// welcome section animation
const revealItems = document.querySelectorAll('.reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
        }
    });
}, { threshold: 0.2 });

revealItems.forEach(item => {
    revealObserver.observe(item);
});

// Add this line to the selection logic we wrote earlier
const revealUpItems = document.querySelectorAll('.reveal-up');

revealUpItems.forEach(item => {
    revealObserver.observe(item);
});


// Testing
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const parent = document.getElementById('canvasParent');

let particles = [];
const particleCount = 50;

// Coordinates for Lira City (Matches CSS top: 35%, right: 35%)
// Since CSS uses 'right', JS uses (100% - 35%) = 65% for X
const hqX = 0.65; 
const hqY = 0.35;

function init() {
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = canvas.width * hqX;
        this.y = canvas.height * hqY;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        const dx = this.x - (canvas.width * hqX);
        const dy = this.y - (canvas.height * hqY);
        if (Math.hypot(dx, dy) > 250) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 127, 80, 0.8)`; // Constant Coral
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
        
        ctx.beginPath();
        // Constant Coral lines
        ctx.strokeStyle = `rgba(104, 169, 210, 0.22)`; 
        ctx.moveTo(canvas.width * hqX, canvas.height * hqY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();
/* --- SCROLL REVEAL OBSERVER --- */
// This ensures the sections slide in beautifully as the user scrolls
const expansionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-left, .reveal-right').forEach(el => {
    expansionObserver.observe(el);
});


// testimonials video play button
const video = document.getElementById('spotlightVideo');
const playBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const progressBar = document.getElementById('progressBar');

playBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playBtn.innerHTML = '||'; // Change to Pause icon
        playBtn.style.opacity = '0.3'; // Fade out slightly when playing
    } else {
        video.pause();
        playBtn.innerHTML = '▶';
        playBtn.style.opacity = '1';
    }
});

muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted ? '🔇' : '🔊';
});

video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.value = progress;
});

progressBar.addEventListener('input', () => {
    const time = (progressBar.value / 100) * video.duration;
    video.currentTime = time;
});
// testimonials section animation
const slider = document.getElementById('testiSlider');
let autoScroll = setInterval(() => moveSlider(1), 8000);

function moveSlider(direction) {
    // Reset timer on manual click
    clearInterval(autoScroll);
    autoScroll = setInterval(() => moveSlider(1), 8000);

    const scrollAmount = slider.offsetWidth; 
    if (direction === 1) {
        // If at the end, wrap back to start
        if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    } else {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}