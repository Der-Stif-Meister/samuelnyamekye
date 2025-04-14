// =====================
// FRONTEND
// =====================

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

// =====================
// BACKEND
// =====================

// Contact form submission
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.value = 'Sending...';
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Message sent successfully!');
        contactForm.reset();
      } else {
        alert('Error: ' + (result.message || 'Failed to send message'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    } finally {
      submitBtn.disabled = false;
      submitBtn.value = 'Send Message';
    }
  });
}

// Fetch projects from backend
async function fetchProjects() {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const projects = await response.json();
    const portfolioContainer = document.querySelector('.portfolio-container');
    
    if (portfolioContainer && projects.length) {
      portfolioContainer.innerHTML = projects.map(project => `
        <div class="portfolio-box">
          <img src="${project.imageUrl}" alt="${project.title}">
          <div class="portfolio-layer">
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" aria-label="GitHub"><i class='bx bxl-github'></i></a>` : ''}
            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" aria-label="Live Demo"><i class='bx bx-link-external'></i></a>` : ''}
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Fallback to your existing static projects if API fails
  }
}

// Initialize backend-related functionality when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  fetchProjects();
  
  // Close mobile menu when clicking a nav link
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    });
  });
});