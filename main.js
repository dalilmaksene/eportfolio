// --- SECRETS & EASTER EGGS ---
let command = '';
const codes = {
    EVOLVE: () => evolveWeapon(),
    TORCH: () => toggleDungeonMode()
};

// Unified Coordinate Tracking
let vX = window.innerWidth / 2;
let vY = window.innerHeight / 2;

function updateGlobalCoords(e) {
    if (e.clientX !== undefined) {
        vX = e.clientX;
        vY = e.clientY;
    } else if (e.touches && e.touches[0]) {
        vX = e.touches[0].clientX;
        vY = e.touches[0].clientY;
    }
    updateActiveEffects();
}

function updateActiveEffects() {
    const overlay = document.querySelector('.dungeon-overlay');
    if (overlay && document.body.classList.contains('dungeon-mode')) {
        // Recalculate page coordinates for absolute positioning
        const pX = vX + window.scrollX;
        const pY = vY + window.scrollY;
        overlay.style.setProperty('--x', pX + 'px');
        overlay.style.setProperty('--y', pY + 'px');
    }
}

// Update on move
document.addEventListener('mousemove', updateGlobalCoords);
document.addEventListener('touchmove', (e) => updateGlobalCoords(e.touches[0]));

// Update on scroll (important for torch if mouse is stationary)
document.addEventListener('scroll', updateActiveEffects, { passive: true });

document.addEventListener('keydown', (e) => {
    command += e.key.toUpperCase();
    let possibleMatch = Object.keys(codes).some(code => code.startsWith(command));
    if (!possibleMatch) command = e.key.toUpperCase();
    if (codes[command]) {
        codes[command]();
        command = '';
    }
    if (command.length > 20) command = command.substring(1);
});

// 1. Weapon Evolution Logic
let weaponLevel = 1;
const weaponNames = ["BOIS", "FER", "OR", "DIAMANT", "LÉGENDAIRE"];

function evolveWeapon() {
    if (weaponLevel < 5) {
        weaponLevel++;
        document.body.className = document.body.className.replace(/weapon-lvl-\d/, '');
        document.body.classList.add(`weapon-lvl-${weaponLevel}`);
        showNotification(`L'ÉPÉE ÉVOLUE : NIVEAU ${weaponLevel} (${weaponNames[weaponLevel - 1]}) !`, 'gold');

        for (let i = 0; i < 30; i++) {
            createParticle({
                pageX: (window.innerWidth / 2) + window.scrollX,
                pageY: (window.innerHeight / 2) + window.scrollY
            });
        }
    } else {
        showNotification("L'ÉPÉE EST DÉJÀ AU NIVEAU MAXIMUM !", 'red');
    }
}

function showNotification(text, color) {
    const notif = document.createElement('div');
    notif.className = 'rpg-notification';
    notif.style.color = color === 'gold' ? '#ffd700' : '#ff4444';
    notif.innerText = text;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// 2. Dungeon Mode Logic
function toggleDungeonMode() {
    document.body.classList.toggle('dungeon-mode');
    if (document.body.classList.contains('dungeon-mode')) {
        showNotification("ENTRÉE DANS LE DONJON...", 'white');
        createDungeonOverlay();
    } else {
        showNotification("RETOUR À LA SURFACE", 'white');
        const overlay = document.querySelector('.dungeon-overlay');
        if (overlay) overlay.remove();
    }
}

function createDungeonOverlay() {
    if (document.querySelector('.dungeon-overlay')) return;
    const overlay = document.createElement('div');
    overlay.className = 'dungeon-overlay';
    document.body.appendChild(overlay);
    updateActiveEffects();
}

// Effet de particules au clic
document.addEventListener('click', function (e) {
    createParticle(e);
    if (e.target.classList.contains('submit-btn') || e.target.id === 'submit-contact' || e.target.closest('.mimic-active')) {
        handleMimicClick(e.target.closest('.submit-btn') || e.target);
    }
});

function createParticle(e) {
    const particleCount = 6 + (weaponLevel * 2);
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `click-particle lvl-${weaponLevel}`;
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 40 + (weaponLevel * 10) + Math.random() * 50;

        particle.style.left = e.pageX + 'px';
        particle.style.top = e.pageY + 'px';
        particle.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * velocity + 'px');

        const levelColors = [
            ['#d4a574', '#8b6914'], ['#a19d94', '#4a4a4a'],
            ['#ffd700', '#daa520'], ['#00f2ff', '#0099ff'],
            ['#ff4400', '#ffff00', '#ff0000']
        ];
        const colors = levelColors[weaponLevel - 1];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        if (weaponLevel >= 4) particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}

// 3. Mimic Encounter Logic
let mimicClicks = 0;
let mimicHP = 100;
let isMimicActive = false;

function handleMimicClick(btn) {
    if (!btn || !btn.classList.contains('submit-btn')) return;
    if (isMimicActive) {
        mimicHP -= 10;
        updateBossBar();
        if (mimicHP <= 0) defeatMimic(btn);
        return;
    }
    mimicClicks++;
    if (mimicClicks === 7) activateMimic(btn);
}

function activateMimic(btn) {
    isMimicActive = true;
    btn.classList.add('mimic-active');

    // Clear parts if any exist
    btn.querySelectorAll('.mimic-face').forEach(p => p.remove());

    const face = document.createElement('div');
    face.className = 'mimic-face';
    btn.appendChild(face);

    showNotification("UN MIMIQUE APPARAÎT !", 'red');
    const bossBar = document.createElement('div');
    bossBar.className = 'boss-bar-container';
    bossBar.innerHTML = `<div class="boss-name">LE MIMIQUE DU FORMULAIRE</div><div class="boss-hp-bg"><div class="boss-hp-fill" style="width: 100%"></div></div>`;
    document.body.appendChild(bossBar);
}

function updateBossBar() {
    const fill = document.querySelector('.boss-hp-fill');
    if (fill) fill.style.width = mimicHP + '%';
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 200);
}

function defeatMimic(btn) {
    isMimicActive = false;
    mimicClicks = 0;
    mimicHP = 100;
    btn.classList.remove('mimic-active');
    btn.querySelectorAll('.mimic-face').forEach(p => p.remove());
    const bBar = document.querySelector('.boss-bar-container');
    if (bBar) bBar.remove();
    showNotification("MIMIQUE VAINCU ! LOOT RÉCUPÉRÉ.", '#00ff00');

    const rect = btn.getBoundingClientRect();
    for (let i = 0; i < 50; i++) {
        createParticle({
            pageX: rect.left + rect.width / 2 + window.scrollX,
            pageY: rect.top + rect.height / 2 + window.scrollY
        });
    }
}

// Trail du curseur
let lastTime = 0;
const trailDelay = 50;
document.addEventListener('mousemove', function (e) {
    const currentTime = Date.now();
    if (currentTime - lastTime > trailDelay) {
        const trail = document.createElement('div');
        trail.className = `cursor-trail lvl-${weaponLevel}`;
        trail.style.left = vX + 'px';
        trail.style.top = vY + 'px';
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 500);

        // Intensité légendaire (Niveau 5)
        if (weaponLevel === 5) {
            spawnLegendaryFire(vX, vY);
        }

        lastTime = currentTime;
    }
});

function spawnLegendaryFire(x, y) {
    for (let i = 0; i < 8; i++) {
        const fire = document.createElement('div');
        fire.className = 'legendary-fire';
        fire.style.left = x + 'px';
        fire.style.top = y + 'px';

        // Random rising trajectory
        const rx = (Math.random() - 0.5) * 100;
        const ry = - (Math.random() * 120 + 50);
        fire.style.setProperty('--rx', rx + 'px');
        fire.style.setProperty('--ry', ry + 'px');

        const size = Math.random() * 18 + 6;
        fire.style.width = size + 'px';
        fire.style.height = size + 'px';

        document.body.appendChild(fire);
        setTimeout(() => fire.remove(), 600);
    }
}

// Animations au scroll (Core)
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.bar-fill').forEach(b => setTimeout(() => b.classList.add('animate'), 200));
            entry.target.querySelectorAll('.progress-bar-fill').forEach(b => {
                setTimeout(() => b.style.width = b.getAttribute('data-progress') + '%', 300);
            });
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });
document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
