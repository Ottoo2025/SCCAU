// navbar
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('#navLinks');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


// JavaScript for the accordion functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        
        // Close other open items (optional)
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) item.classList.remove('active');
        });

        faqItem.classList.toggle('active');
    });
});


// changing text script
(function() {
    const words = ["an individual volunteer", "a donor", "a corporate partner", "a community advocate", "a policy influencer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const target = document.getElementById("changing-text");
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const waitTime = 3000; // 3 seconds wait at the end of a word

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            target.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            target.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let nextActionDelay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            // Word finished typing, wait 3 seconds before deleting
            isDeleting = true;
            nextActionDelay = waitTime;
        } else if (isDeleting && charIndex === 0) {
            // Word finished deleting, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            nextActionDelay = 500; // Small pause before starting next word
        }

        setTimeout(type, nextActionDelay);
    }

    // Start immediately
    type();
})();