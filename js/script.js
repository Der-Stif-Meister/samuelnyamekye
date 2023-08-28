// Toggle icon and navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Scroll sections active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            currentSection = id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`header nav a[href*=${currentSection}]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
});

// Toggle full content for "Read More"
document.addEventListener("DOMContentLoaded", function () {
    const readMoreLinks = document.querySelectorAll('.read-more-link');

    readMoreLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const fullContent = this.nextElementSibling;
        fullContent.classList.toggle('hidden');
        this.textContent = fullContent.classList.contains('hidden') ? 'Read More' : 'Read Less';
      });
    });
  });

// Sticky navbar and close menu on link click
window.addEventListener('scroll', () => {
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});

// Scroll reveal
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Typed.js
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Web Designer', 'Software Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});
