// ==========================================
//  Portfolio v2 — Ajay Kushwaha
// ==========================================

(function () {
    'use strict';

    // --- DOM refs ---
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');
    const typewriterEl = document.getElementById('typewriter');

    // =====================
    //  Theme Toggle
    // =====================
    function initTheme() {
        const saved = localStorage.getItem('portfolio-theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        }

        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('portfolio-theme', next);
        });
    }

    // =====================
    //  Navbar scroll state
    // =====================
    function initNavbar() {
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
            backToTop.classList.toggle('visible', window.scrollY > 500);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // =====================
    //  Mobile menu
    // =====================
    function initMobileMenu() {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // =====================
    //  Smooth scroll
    // =====================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =====================
    //  Active nav highlight
    // =====================
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const links = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    links.forEach(l => {
                        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

        sections.forEach(s => observer.observe(s));
    }

    // =====================
    //  Scroll reveal
    // =====================
    function initScrollReveal() {
        const elements = document.querySelectorAll('[data-reveal]');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        elements.forEach(el => observer.observe(el));
    }

    // =====================
    //  Typewriter
    // =====================
    function initTypewriter() {
        if (!typewriterEl) return;

        const words = [
            'Software Engineer',
            'Backend Developer',
            'Full Stack Developer',
            'Problem Solver',
        ];

        let wordIdx = 0;
        let charIdx = 0;
        let deleting = false;

        function tick() {
            const word = words[wordIdx];

            if (deleting) {
                typewriterEl.textContent = word.substring(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) {
                    deleting = false;
                    wordIdx = (wordIdx + 1) % words.length;
                    setTimeout(tick, 400);
                    return;
                }
            } else {
                typewriterEl.textContent = word.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx === word.length) {
                    deleting = true;
                    setTimeout(tick, 2200);
                    return;
                }
            }
            setTimeout(tick, deleting ? 50 : 110);
        }

        tick();
    }

    // =====================
    //  Dynamic experience
    // =====================
    function initExperience() {
        const start = new Date(2020, 9, 1); // October 2020
        const now = new Date();
        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        if (months < 0) { years--; months += 12; }

        const decimal = (years + months / 12).toFixed(1);
        const longText = decimal + ' years';
        const shortText = decimal + ' yrs';

        const heroEl = document.getElementById('expHero');
        const aboutEl = document.getElementById('expAbout');
        const statEl = document.getElementById('expStat');

        if (heroEl) heroEl.textContent = longText;
        if (aboutEl) aboutEl.textContent = longText;
        if (statEl) statEl.textContent = shortText;
    }

    // =====================
    //  Time-of-day greeting
    // =====================
    function initGreeting() {
        const el = document.getElementById('greeting');
        if (!el) return;
        const hour = new Date().getHours();
        if (hour < 12) el.textContent = 'Good morning';
        else if (hour < 17) el.textContent = 'Good afternoon';
        else el.textContent = 'Good evening';
    }

    // =====================
    //  Dynamic copyright year
    // =====================
    function initCopyright() {
        const el = document.getElementById('copyrightYear');
        if (el) el.textContent = new Date().getFullYear();
    }

    // =====================
    //  Collapsible lists
    // =====================
    function initCollapsible() {
        document.querySelectorAll('.collapse-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const list = btn.previousElementSibling;
                if (!list) return;
                const expanded = list.classList.toggle('expanded');
                btn.textContent = expanded ? 'Show less ▴' : 'Show more ▾';
            });
        });

        document.querySelectorAll('.rec-read-more').forEach(btn => {
            btn.addEventListener('click', () => {
                const body = btn.previousElementSibling;
                if (!body) return;
                const expanded = body.classList.toggle('expanded');
                btn.textContent = expanded ? 'Read less ▴' : 'Read more ▾';
            });
        });
    }

    // =====================
    //  Init all
    // =====================
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initNavbar();
        initMobileMenu();
        initSmoothScroll();
        initExperience();
        initGreeting();
        initCopyright();
        initCollapsible();
        initActiveNav();
        initScrollReveal();
        initTypewriter();
    });
})();
