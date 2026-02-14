// Effet de particules au clic
document.addEventListener('click', function(e) {
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50 + Math.random() * 50;
        
        particle.style.left = e.pageX + 'px';
        particle.style.top = e.pageY + 'px';
        particle.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * velocity + 'px');
        
        // Couleurs aléatoires gaming
        const colors = ['#d4a574', '#8b6914', '#ffd700', '#ff6b1a'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
});

// Trail du curseur
let lastTime = 0;
const trailDelay = 50; // Délai en ms entre chaque trail

document.addEventListener('mousemove', function(e) {
    const currentTime = Date.now();
    
    if (currentTime - lastTime > trailDelay) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 500);
        
        lastTime = currentTime;
    }
});

// Animations au scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animer les barres de compétences
            const bars = entry.target.querySelectorAll('.bar-fill');
            bars.forEach(bar => {
                setTimeout(() => {
                    bar.classList.add('animate');
                }, 200);
            });
            
            // Animer les barres de progression des certifications
            const progressBars = entry.target.querySelectorAll('.progress-bar-fill');
            progressBars.forEach(bar => {
                setTimeout(() => {
                    const targetWidth = bar.getAttribute('data-progress');
                    bar.style.width = targetWidth + '%';
                }, 300);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
