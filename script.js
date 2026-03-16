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

    // Mock Google Sign-In
    const signinBtn = document.getElementById('google-signin-btn');
    if (signinBtn) {
        signinBtn.addEventListener('click', () => {
            signinBtn.innerHTML = 'Connecting...';
            setTimeout(() => {
                signinBtn.innerHTML = '<div style="width:20px; height:20px; background:var(--accent-gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#000; font-weight:bold; font-size:12px;">M</div> Jane Doe';
                signinBtn.style.pointerEvents = 'none';
                signinBtn.style.background = 'transparent';
            }, 800);
        });
    }

    // Mock Google Pay
    const modal = document.getElementById('gpay-modal');
    const closeBtn = document.getElementById('close-modal');
    const confirmBtn = document.getElementById('confirm-pay');
    const successMsg = document.getElementById('pay-success');
    const orderTitle = document.getElementById('order-title');
    const orderPrice = document.getElementById('order-price');

    window.openGPay = (title, price) => {
        orderTitle.textContent = title;
        orderPrice.textContent = price;
        modal.classList.add('active');
        confirmBtn.style.display = 'block';
        successMsg.classList.remove('show');
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            confirmBtn.classList.add('loading');
            setTimeout(() => {
                confirmBtn.classList.remove('loading');
                confirmBtn.style.display = 'none';
                successMsg.classList.add('show');
                setTimeout(() => {
                    modal.classList.remove('active');
                }, 2000);
            }, 1500);
        });
    }
});
