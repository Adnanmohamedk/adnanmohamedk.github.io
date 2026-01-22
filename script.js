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
        
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        
        // Apply GPU accelerated transform
        heroContent.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
    
    // Reset parallax on mouse leave
    hero.addEventListener('mouseleave', () => {
        heroContent.style.transform = `rotateY(0deg) rotateX(0deg)`;
        heroContent.style.transition = 'transform 0.5s ease';
    });
    
    hero.addEventListener('mouseenter', () => {
        heroContent.style.transition = 'none';
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
});
