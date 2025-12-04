// ===================================
// FREELANCER PORTFOLIO - JAVASCRIPT
// Interactive Features & Animations
// ===================================

// ===================================
// NAVIGATION
// ===================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ===================================
// TYPING EFFECT FOR HERO
// ===================================

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form field validation
function validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(`${field.id}Error`);

    // Clear previous error
    errorElement.textContent = '';
    field.classList.remove('error');

    // Check if empty
    if (value === '') {
        errorElement.textContent = 'This field is required';
        field.classList.add('error');
        return false;
    }

    // Email-specific validation
    if (field.type === 'email' && !emailRegex.test(value)) {
        errorElement.textContent = 'Please enter a valid email address';
        field.classList.add('error');
        return false;
    }

    // Minimum length validation
    if (field.id === 'message' && value.length < 10) {
        errorElement.textContent = 'Message must be at least 10 characters';
        field.classList.add('error');
        return false;
    }

    return true;
}

// Real-time validation on blur
const formFields = ['name', 'email', 'subject', 'message'];
formFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('blur', () => validateField(field));

        // Clear error on input
        field.addEventListener('input', () => {
            const errorElement = document.getElementById(`${fieldId}Error`);
            if (errorElement.textContent !== '') {
                validateField(field);
            }
        });
    }
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        formFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            formSuccess.textContent = '✓ Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
            formSuccess.style.color = 'var(--accent-color)';
            formSuccess.style.display = 'block';

            // Reset form
            contactForm.reset();

            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;

            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

// ===================================
// PARALLAX EFFECT
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// PORTFOLIO HOVER EFFECTS
// ===================================

const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.zIndex = '10';
    });

    item.addEventListener('mouseleave', function () {
        this.style.zIndex = '1';
    });
});

// ===================================
// SERVICE CARDS STAGGER ANIMATION
// ===================================

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ===================================
// FOOTER YEAR
// ===================================

const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ===================================
// CURSOR TRAIL EFFECT (Optional Enhancement)
// ===================================

// Create subtle cursor trail for desktop
if (window.innerWidth > 768) {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');

    // Create cursor circles if they don't exist
    if (circles.length === 0) {
        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            circle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: var(--primary-light);
                pointer-events: none;
                opacity: 0;
                z-index: 9999;
                transition: opacity 0.3s;
            `;
            document.body.appendChild(circle);
        }
    }

    const allCircles = document.querySelectorAll('.cursor-circle');

    allCircles.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        allCircles.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.transform = `scale(${(allCircles.length - index) / allCircles.length})`;
            circle.style.opacity = (allCircles.length - index) / allCircles.length * 0.3;

            const nextCircle = allCircles[index + 1] || allCircles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;

            circle.x = x;
            circle.y = y;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Any heavy scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cLike what you see? Let\'s work together!', 'font-size: 14px; color: #94a3b8;');
