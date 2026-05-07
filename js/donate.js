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
