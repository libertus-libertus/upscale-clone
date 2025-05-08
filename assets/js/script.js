// JavaScript for fixed navbar on scroll
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const body = document.body;
    
    // Threshold when the navbar should become fixed
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('fixed-navbar');
            header.classList.remove('absolute', 'bg-transparent');
            body.classList.add('with-fixed-nav');
        } else {
            header.classList.remove('fixed-navbar');
            header.classList.add('absolute', 'bg-transparent');
            body.classList.remove('with-fixed-nav');
        }
    });
});