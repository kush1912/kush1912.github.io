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

// Initialize smooth scrolling when DOM loads
document.addEventListener('DOMContentLoaded', initSmoothScrolling);

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



