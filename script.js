// script.js

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Custom Cursor
    // ==========================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const hoverTargets = document.querySelectorAll('.hover-target, a, button');

    // Only enable custom cursor if not on a touch device
    if (window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly move the dot
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // Smoothly animate the ring
        const animateRing = () => {
            // Easing factor (lower = smoother/slower)
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
            requestAnimationFrame(animateRing);
        };
        requestAnimationFrame(animateRing);

        // Hover effect scaling
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursorRing.classList.add('hover');
            });
            target.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('hover');
            });
        });
    }

    // ==========================================
    // Scroll Reveal Animations
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // Typewriter Effect (Hero Section)
    // ==========================================
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "AI/ML Engineer", 
        "Generative AI Dev", 
        "Data Scientist", 
        "Problem Solver"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove a character
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add a character
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Determine typing speed
        let typeSpeed = isDeleting ? 50 : 100;

        // If word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } 
        // If word is completely deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect after a short delay
    setTimeout(type, 1500);

});
