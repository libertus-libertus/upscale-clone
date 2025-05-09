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


const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close'); // Tambahkan ini

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('open');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
});

// Dropdown Mobile
const dropdownToggleMobile = document.querySelector('.dropdown-toggle-mobile');
const dropdownContentMobile = document.querySelector('.dropdown-content-mobile');

if (dropdownToggleMobile) {
    dropdownToggleMobile.addEventListener('click', () => {
        dropdownContentMobile.classList.toggle('hidden');
    });
}