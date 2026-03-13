document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = window.innerWidth / 2;
    let followerY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Use requestAnimationFrame in render instead, but we can set cursor immediately to avoid lag
        if(cursor) {
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        }
    });
    
    // Smooth follow for follower ring
    function render() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        if (follower) {
            follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        }
        requestAnimationFrame(render);
    }
    render();

    // Nav Background on Scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Parallax Effect
    const parallaxImgs = document.querySelectorAll('.parallax-img');
    const heroBg = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Hero background parallax slow scroll
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Section img parallax
        parallaxImgs.forEach(img => {
            const speed = parseFloat(img.getAttribute('data-speed')) || 0.1;
            const rect = img.getBoundingClientRect();
            // Check if in view loosely
            if(rect.top < window.innerHeight && rect.bottom > 0) {
                const centerOffset = (rect.top + rect.height / 2) - window.innerHeight / 2;
                img.style.transform = `translateY(${centerOffset * speed}px)`;
            }
        });
    });

    // Intersection Observer for reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.fade-up, .reveal-text, .reveal-fade');
    revealElements.forEach(el => observer.observe(el));
    
    // Trigger hero animations immediately (in case observer doesn't fire fast enough on load)
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-up');
        heroElements.forEach(el => el.classList.add('in-view'));
    }, 100);
});
