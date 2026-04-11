// Jquery Used for initialising the slick

$(document).ready(function(){
    $('.slider').slick({
        arrows:false,
        dots:true,
        appendDots:'.slider-dots',
        dotsClass:"dots"
    });

});

// Enhanced smooth scrolling for better UX
function initSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Typewriter Effect
class TypewriterEffect {
    constructor(element, words, options = {}) {
        this.element = document.querySelector(element);
        this.words = words;
        this.options = {
            typeSpeed: 100,
            deleteSpeed: 50,
            delayBetweenWords: 2000,
            loop: true,
            ...options
        };
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        
        if (this.element) {
            this.type();
        }
    }
    
    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentWord.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
                setTimeout(() => this.type(), 500);
                return;
            }
        } else {
            // Typing characters
            this.element.textContent = currentWord.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentWord.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.options.delayBetweenWords);
                return;
            }
        }
        
        const speed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;
        setTimeout(() => this.type(), speed);
    }
}

// Initialize typewriter effect
function initTypewriter() {
    const words = [
        'Software Engineer',
        'Full Stack Developer', 
        'Problem Solver',
        // 'Data Scientist',
        // 'Cloud Architect',
        // 'Tech Innovator'
    ];
    
    new TypewriterEffect('#typewriter', words, {
        typeSpeed: 120,
        deleteSpeed: 60,
        delayBetweenWords: 2500,
        loop: true
    });
}

// Initialize smooth scrolling when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initTypewriter();
});

// Hamberger functionality
let hamberger=document.querySelector('.hamberger')
let times = document.querySelector('.times');
let mobileNav = document.querySelector('.mobile-nav');

hamberger.addEventListener('click',function(){
    mobileNav.classList.add('open');
});

times.addEventListener('click',function(){
    mobileNav.classList.remove('open');
});

// Close mobile nav when clicking on links
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
    });
});



