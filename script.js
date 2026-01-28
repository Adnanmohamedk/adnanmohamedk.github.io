document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.progress');

    // Simulate loading
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);

    setTimeout(() => {
        loader.style.opacity = '0';
        document.body.classList.remove('loading');
        setTimeout(() => loader.style.display = 'none', 500);

        // Trigger initial reveal animations
        revealOnScroll();
    }, 1500);

    // Parallax Effect
    const hero = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');

    document.addEventListener('mousemove', (e) => {
        if (!heroContent) return;

        // Disable parallax on mobile/small screens for better UX
        if (window.innerWidth < 768) {
            heroContent.style.transform = 'none';
            return;
        }

        // Use clientX/Y to stay consistent regardless of scroll position
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;

        // Clamp values to prevent "upside down" or extreme rotations (limit to 15 degrees)
        const limit = 15;
        const clampedX = Math.max(-limit, Math.min(limit, x));
        const clampedY = Math.max(-limit, Math.min(limit, y));

        heroContent.style.transform = `rotateY(${clampedX}deg) rotateX(${clampedY}deg)`;
    });

    // Reset parallax on mouse leave
    hero.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 768) {
            heroContent.style.transition = 'transform 0.5s ease';
            heroContent.style.transform = `rotateY(0deg) rotateX(0deg)`;
        }
    });

    hero.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 768) {
            heroContent.style.transition = 'none';
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const projectCards = document.querySelectorAll('.project-card');

    function revealOnScroll() {
        // Standard sections
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });

        // Staggered Project Cards
        projectCards.forEach((card, index) => {
            const elementTop = card.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < window.innerHeight - elementVisible) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100); // 100ms stagger delay
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // Active Navigation Link Update
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Navigation (Future refinement)

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Check if form is still using placeholder ID
            const accessKey = contactForm.querySelector('input[name="access_key"]').value;
            if (accessKey === 'YOUR_ACCESS_KEY') {
                formStatus.textContent = 'Please update the Web3Forms Access Key in index.html first!';
                formStatus.className = 'form-status error';
                return;
            }

            submitBtn.classList.add('loading');
            formStatus.style.display = 'none';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Thanks! Your message has been sent successfully.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    formStatus.textContent = data.errors ? data.errors.map(error => error.message).join(', ') : 'Oops! There was a problem submitting your form';
                    formStatus.className = 'form-status error';
                }
            } catch (error) {
                formStatus.textContent = 'Oops! There was a problem connecting to the server.';
                formStatus.className = 'form-status error';
            } finally {
                submitBtn.classList.remove('loading');
            }
        });
    }
});
