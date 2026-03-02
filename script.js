/* ═══════════════════════════════════════════════════════
   PORTFOLIO FUTURISTE IA - JAVASCRIPT
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const themeToggle = document.getElementById('theme-toggle');

    // ── Theme Toggle (Dark / Light) ──
    function getTheme() {
        return localStorage.getItem('portfolio-theme') || 'light';
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.querySelector('i').classList.remove('fa-sun');
            themeToggle.querySelector('i').classList.add('fa-moon');
        }
        localStorage.setItem('portfolio-theme', theme);
    }

    // Appliquer le thème sauvegardé
    applyTheme(getTheme());

    themeToggle.addEventListener('click', () => {
        const current = getTheme();
        applyTheme(current === 'light' ? 'dark' : 'light');
    });

    // ── Navigation SPA ──
    function switchSection(targetId) {
        sections.forEach(s => s.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));

        const targetSection = document.getElementById(targetId);
        const targetLink = document.querySelector(`[data-section="${targetId}"]`);

        if (targetSection) {
            targetSection.classList.add('active');
            animateSection(targetSection);
        }
        if (targetLink) targetLink.classList.add('active');

        sidebar.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection(link.getAttribute('data-section'));
        });
    });

    // Menu mobile
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        mobileMenuBtn.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 &&
            !sidebar.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // ── Animations d'entrée ──
    function animateSection(section) {
        const items = section.querySelectorAll(
            '.glass-card, .timeline-item, .stat-card, .detail-card, ' +
            '.project-card, .cert-card, .veille-card, .profil-hero, ' +
            '.terminal-window, .profil-details-grid'
        );

        items.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(25px)';
            item.style.transition = 'none';

            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 80 * i);
        });
    }

    const activeSection = document.querySelector('.section.active');
    if (activeSection) animateSection(activeSection);

    // ── Compteurs animés ──
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 1500;
            const start = performance.now();

            function update(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.round(target * eased);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target === 650 ? 'Top ' + target : target + '+';
                }
            }

            requestAnimationFrame(update);
        });
    }

    setTimeout(animateCounters, 500);

    // ── Effet typing ──
    const typingEl = document.querySelector('.typing-effect');
    if (typingEl) {
        const text = typingEl.textContent;
        typingEl.textContent = '';
        typingEl.style.borderRight = '2px solid var(--primary)';
        let i = 0;

        function typeChar() {
            if (i < text.length) {
                typingEl.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 45);
            } else {
                setInterval(() => {
                    typingEl.style.borderRight =
                        typingEl.style.borderRight === 'none'
                            ? '2px solid var(--primary)' : 'none';
                }, 500);
            }
        }

        setTimeout(typeChar, 800);
    }

    // ── Formulaire contact ──
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const btnText = btn.querySelector('.btn-text');
            const original = btnText.textContent;

            btnText.textContent = 'Envoi en cours...';
            btn.style.pointerEvents = 'none';

            setTimeout(() => {
                btnText.textContent = 'Message envoyé !';
                btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

                setTimeout(() => {
                    btnText.textContent = original;
                    btn.style.background = '';
                    btn.style.pointerEvents = '';
                    form.reset();
                }, 2500);
            }, 1500);
        });
    }

    // ── Particules Canvas ──
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    const maxParticles = 55;
    const connectDist = 140;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Lire les couleurs depuis les CSS variables
    function getParticleColor() {
        const style = getComputedStyle(document.documentElement);
        return style.getPropertyValue('--particle-color').trim() || '14, 165, 233';
    }

    function getParticleOpacity() {
        const style = getComputedStyle(document.documentElement);
        return parseFloat(style.getPropertyValue('--particle-opacity').trim()) || 0.08;
    }

    function getParticleDotOpacity() {
        const style = getComputedStyle(document.documentElement);
        return parseFloat(style.getPropertyValue('--particle-dot-opacity-max').trim()) || 0.3;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacityFactor = Math.random() * 0.8 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    this.x += dx * 0.003;
                    this.y += dy * 0.003;
                }
            }
        }

        draw() {
            const rgb = getParticleColor();
            const maxOp = getParticleDotOpacity();
            ctx.fillStyle = `rgba(${rgb}, ${this.opacityFactor * maxOp})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        const rgb = getParticleColor();
        const lineOp = getParticleOpacity();

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectDist) {
                    const opacity = (1 - dist / connectDist) * lineOp;
                    ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            if (mouse.x !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectDist * 1.5) {
                    const opacity = (1 - dist / (connectDist * 1.5)) * lineOp * 2;
                    ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
                    ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();

    // ── Parallax 3D sur les cards ──
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / rect.height) * -2.5;
            const rotateY = ((x - rect.width / 2) / rect.width) * 2.5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ── Navigation clavier ──
    const sectionIds = ['profil', 'formations', 'experiences', 'projets', 'certifications', 'veille', 'contact'];

    document.addEventListener('keydown', (e) => {
        // Ne pas capturer si on est dans un input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const idx = sectionIds.findIndex(id => document.getElementById(id).classList.contains('active'));

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            switchSection(sectionIds[(idx + 1) % sectionIds.length]);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            switchSection(sectionIds[(idx - 1 + sectionIds.length) % sectionIds.length]);
        }
    });
});
