document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', function() {
            // Toggle navigation
            nav.classList.toggle('nav-active');
            
            // Animate links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger animation
            burger.classList.toggle('toggle');
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted with values:', formValues);
            
            // Show success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <h3>Thank you for your message!</h3>
                    <p>I'll get back to you as soon as possible.</p>
                </div>
            `;
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation for work items when they come into view
    const observeElements = document.querySelectorAll('.work-item, .portfolio-item');
    
    if (observeElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observeElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Add current year to footer copyright
    const footerYear = document.querySelector('footer p');
    if (footerYear && footerYear.textContent.includes('2025')) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
    }
    
    // Animate skill bars
    const animateSkills = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillPercents = document.querySelectorAll('.skill-percent');
        
        if (skillBars.length > 0) {
            // Function to check if element is in viewport
            const isInViewport = (element) => {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            };
            
            // Function to animate a single skill bar
            const animateSkill = (skillBar, percentElement) => {
                const targetProgress = skillBar.getAttribute('data-progress');
                let currentProgress = 0;
                
                // Reset to zero first
                skillBar.style.width = '0%';
                percentElement.textContent = '0%';
                
                // Animate to target value
                const interval = setInterval(() => {
                    if (currentProgress >= targetProgress) {
                        clearInterval(interval);
                    } else {
                        currentProgress++;
                        skillBar.style.width = currentProgress + '%';
                        percentElement.textContent = currentProgress + '%';
                    }
                }, 15);
            };
            
            // Check if skills section is in viewport and animate
            const checkAndAnimateSkills = () => {
                const skillsContainer = document.querySelector('.skills-container');
                if (skillsContainer && isInViewport(skillsContainer)) {
                    skillBars.forEach((skillBar, index) => {
                        animateSkill(skillBar, skillPercents[index]);
                    });
                    // Remove scroll listener once animation has started
                    window.removeEventListener('scroll', checkAndAnimateSkills);
                }
            };
            
            // Initial check and add scroll listener
            checkAndAnimateSkills();
            window.addEventListener('scroll', checkAndAnimateSkills);
        }
    };
    
    // Call the animate skills function
    animateSkills();
});

// Add CSS class for animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);
});
document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopButton = document.getElementById("scrollToTop");

    // Show or hide the button based on scroll position
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    // Scroll to the top when the button is clicked
    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});