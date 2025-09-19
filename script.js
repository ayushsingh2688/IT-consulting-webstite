// Premium IT Consulting Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            mirror: false
        });
    }

    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initStatsCounters();
    initSolutionsTabs();
    initPortfolioFilter();
    initTestimonialsSlider();
    initContactForm();
    initBackToTop();
    initLoadingScreen();
    initScrollEffects();
    initServiceCardAnimations();
    initImageLazyLoading();
    initVideoModal();
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Update active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Hero section animations
function initHeroAnimations() {
    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });

    // Animate hero buttons on load
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach((button, index) => {
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 1500 + (index * 200));
    });
}

// Stats counter animation
function initStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 50;
        let count = 0;
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(count);
        }, 50);
    };

    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                if (!statNumber.classList.contains('animated')) {
                    animateCounter(statNumber);
                    statNumber.classList.add('animated');
                }
            }
        });
    }, { threshold: 0.7 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Solutions tabs functionality
function initSolutionsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Activate first tab by default
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Animate the tab content
            const activeContent = document.querySelector('.tab-content.active');
            if (activeContent) {
                activeContent.style.opacity = '0';
                activeContent.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    activeContent.style.opacity = '1';
                    activeContent.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    });
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                item.classList.add('hide');
                
                setTimeout(() => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.remove('hide');
                        }, 10);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });

            // Re-initialize AOS for filtered items
            if (typeof AOS !== 'undefined') {
                setTimeout(() => {
                    AOS.refresh();
                }, 400);
            }
        });
    });
}

// Testimonials slider
function initTestimonialsSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialBtns = document.querySelectorAll('.testimonial-btn');
    let currentTestimonial = 0;
    let testimonialInterval;

    if (testimonialItems.length === 0) return;

    // Function to show testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialBtns.forEach(btn => btn.classList.remove('active'));

        // Show selected testimonial
        testimonialItems[index].classList.add('active');
        testimonialBtns[index].classList.add('active');
        
        currentTestimonial = index;
    }

    // Button click handlers
    testimonialBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showTestimonial(index);
            resetTestimonialInterval();
        });
    });

    // Auto-play testimonials
    function startTestimonialInterval() {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }

    startTestimonialInterval();

    // Pause on hover
    const testimonialsContainer = document.querySelector('.testimonials-slider');
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            startTestimonialInterval();
        });
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(testimonialInterval);
        });

        testimonialsContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startTestimonialInterval();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - next testimonial
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            } else {
                // Swiped right - previous testimonial
                currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            }
            showTestimonial(currentTestimonial);
        }
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.btn-submit');
    
    if (!contactForm) return;

    // Form validation rules
    const validationRules = {
        firstName: { required: true, minLength: 2 },
        lastName: { required: true, minLength: 2 },
        email: { required: true, email: true },
        phone: { phone: true },
        company: {},
        service: { required: true },
        message: { required: true, minLength: 10 }
    };

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            submitForm();
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.form-group.error input, .form-group.error select, .form-group.error textarea');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });

    // Field validation function
    function validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const rules = validationRules[fieldName] || {};
        const formGroup = field.closest('.form-group');
        
        let errorMessage = '';

        // Required validation
        if (rules.required && !value) {
            errorMessage = `${getFieldLabel(fieldName)} is required`;
        }
        // Email validation
        else if (rules.email && value && !isValidEmail(value)) {
            errorMessage = 'Please enter a valid email address';
        }
        // Phone validation
        else if (rules.phone && value && !isValidPhone(value)) {
            errorMessage = 'Please enter a valid phone number';
        }
        // Minimum length validation
        else if (rules.minLength && value && value.length < rules.minLength) {
            errorMessage = `${getFieldLabel(fieldName)} must be at least ${rules.minLength} characters`;
        }

        // Update UI
        if (errorMessage) {
            showFieldError(formGroup, errorMessage);
            return false;
        } else {
            showFieldSuccess(formGroup);
            return true;
        }
    }

    function showFieldError(formGroup, message) {
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    function showFieldSuccess(formGroup) {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    function getFieldLabel(fieldName) {
        const labels = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email Address',
            phone: 'Phone Number',
            company: 'Company Name',
            service: 'Service Interest',
            message: 'Project Details'
        };
        return labels[fieldName] || fieldName;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[\s\-\(\)0-9]{10,}$/;
        return phoneRegex.test(phone);
    }

    async function submitForm() {
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showSuccessMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
            
            // Reset form
            contactForm.reset();
            inputs.forEach(input => {
                const formGroup = input.closest('.form-group');
                formGroup.classList.remove('success', 'error');
            });

            // Scroll to success message
            const successMessage = document.querySelector('.success-message');
            if (successMessage) {
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

        } catch (error) {
            showSuccessMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', true);
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    function showSuccessMessage(message, isError = false) {
        let successDiv = document.querySelector('.success-message');
        
        if (!successDiv) {
            successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            contactForm.insertBefore(successDiv, contactForm.firstChild);
        }

        if (isError) {
            successDiv.style.background = '#fef2f2';
            successDiv.style.borderColor = '#ef4444';
            successDiv.style.color = '#dc2626';
        }

        successDiv.textContent = message;
        successDiv.classList.add('show');

        // Hide message after 5 seconds
        setTimeout(() => {
            successDiv.classList.remove('show');
        }, 5000);
    }

    // Animated labels for better UX
    inputs.forEach(input => {
        if (input.value) {
            input.classList.add('has-value');
        }

        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.classList.remove('focused');
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Loading screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (!loadingScreen) return;

    // Hide loading screen after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.classList.remove('loading');
            }, 500);
        }, 1500);
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');

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

    [...fadeElements, ...slideLeftElements, ...slideRightElements].forEach(element => {
        observer.observe(element);
    });
}

// Service card animations
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Image lazy loading
function initImageLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Video modal functionality
function initVideoModal() {
    const playButton = document.querySelector('.play-button');
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="video-container">
                <iframe width="100%" height="100%" src="about:blank" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);

    if (playButton) {
        playButton.addEventListener('click', function() {
            const videoIframe = modalOverlay.querySelector('iframe');
            videoIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Replace with your actual video URL
            modalOverlay.classList.add('active');
            document.body.classList.add('modal-open');
        });
    }

    const closeModal = modalOverlay.querySelector('.close-modal');
    closeModal.addEventListener('click', function() {
        const videoIframe = modalOverlay.querySelector('iframe');
        videoIframe.src = "about:blank";
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    });

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            const videoIframe = modalOverlay.querySelector('iframe');
            videoIframe.src = "about:blank";
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
}

// Utility functions
function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const debouncedResize = debounce(function() {
    // Handle resize events
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250);

const throttledScroll = throttle(function() {
    // Handle scroll events that need throttling
    updateActiveNavLink();
}, 100);

window.addEventListener('resize', debouncedResize);
window.addEventListener('scroll', throttledScroll);

// Enhanced user experience features
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu and modals
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const modalOverlay = document.querySelector('.modal-overlay');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
        
        if (modalOverlay && modalOverlay.classList.contains('active')) {
            const videoIframe = modalOverlay.querySelector('iframe');
            videoIframe.src = "about:blank";
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1552664730-d307ca884978',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Cookie consent (if needed)
function initCookieConsent() {
    // Add cookie consent logic here if required
}

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    // Add your analytics tracking code here
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can send error reports to your logging service here
});

// Service worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker if you have one
        // navigator.serviceWorker.register('/sw.js');
    });
}

console.log('Inonetecx website loaded successfully! 🚀');