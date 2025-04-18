
// FRONTEND 
// Mobile Menu Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Active Section Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

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
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// Read More/Read Less Toggle
document.addEventListener("DOMContentLoaded", function() {
    const readMoreLinks = document.querySelectorAll('.read-more-link');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const fullContent = this.nextElementSibling;
            fullContent.classList.toggle('hidden');
            this.textContent = fullContent.classList.contains('hidden') ? 'Read More' : 'Read Less';
        });
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Close mobile menu when scrolling
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});

// Scroll Reveal Animations
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Typed.js Text Animation
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Web Designer', 'Software Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// BACKEND
// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const originalText = submitBtn.value;
    
    try {
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.value = 'Sending...';
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      
      // Send to backend
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message');
      }
      
      alert(result.message || 'Message sent successfully!');
      contactForm.reset();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Failed to send message. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.value = originalText;
    }
  });
}
// Dynamic Projects Loading
async function fetchProjects() {
    try {
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
            throw new Error('Failed to load projects');
        }
        
        const projects = await response.json();
        const portfolioContainer = document.querySelector('.portfolio-container');
        
        if (portfolioContainer && projects.length) {
            portfolioContainer.innerHTML = projects.map(project => `
                <div class="portfolio-box">
                    <img src="${project.imageUrl || 'images/default-project.jpg'}" alt="${project.title}">
                    <div class="portfolio-layer">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                        <div class="project-links">
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" aria-label="GitHub"><i class='bx bxl-github'></i></a>` : ''}
                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" aria-label="Live Demo"><i class='bx bx-link-external'></i></a>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        // Static content remains as fallback
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    // Load projects
    fetchProjects();
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });
    
    // Add any other initialization code here
});