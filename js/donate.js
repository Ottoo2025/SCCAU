// Loader
document.addEventListener("DOMContentLoaded", function() {
    const progressBar = document.getElementById('load-bar');
    const progressText = document.getElementById('load-percentage');
    const loader = document.getElementById('loader-wrapper');
    
    let width = 0;
    const duration = 2500; // 4 seconds
    const intervalTime = 25; // update every 40ms
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

// copy to clipboard
function copyAccount() {
    const accNo = document.getElementById('accountNo').innerText;
    navigator.clipboard.writeText(accNo).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.innerText;
        
        btn.innerText = "COPIED TO CLIPBOARD!";
        btn.style.background = "#28a745";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "#008080";
        }, 3000);
    });
}
