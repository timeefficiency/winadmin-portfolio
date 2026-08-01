/**
 * =====================================================
 * WinAdmin Portfolio
 * Main JavaScript
 * =====================================================
 */

'use strict';

/* =====================================================
   DOM ELEMENTS
===================================================== */

const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {
    navLinks.classList.toggle('active');

    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';

    menuToggle.setAttribute('aria-expanded', !expanded);
}

if (menuToggle) {

    menuToggle.setAttribute('aria-expanded', 'false');

    menuToggle.addEventListener('click', toggleMenu);

}

/* Close menu after clicking a link */

navItems.forEach(link => {

    link.addEventListener('click', () => {

        navLinks.classList.remove('active');

        menuToggle.setAttribute('aria-expanded', 'false');

    });

});

/* =====================================================
   STICKY NAVBAR
===================================================== */

window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {

        navbar.classList.add('scrolled');

    } else {

        navbar.classList.remove('scrolled');

    }

});

/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

window.addEventListener('scroll', () => {

    let currentSection = '';

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (pageYOffset >= top) {

            currentSection = section.getAttribute('id');

        }

    });

    navItems.forEach(link => {

        link.classList.remove('active');

        const href = link.getAttribute('href');

        if (href === `#${currentSection}`) {

            link.classList.add('active');

        }

    });

});

/* =====================================================
   SCROLL REVEAL
===================================================== */

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('fade-up');

                observer.unobserve(entry.target);

            }

        });

    },

    {

        threshold: 0.15

    }

);

document.querySelectorAll('section, .card, .project-card')
    .forEach(item => {

        observer.observe(item);

    });

/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            const target = document.querySelector(this.getAttribute('href'));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: 'smooth'

            });

        });

    });

/* =====================================================
   SCROLL TO TOP BUTTON
===================================================== */

const scrollButton = document.createElement('button');

scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';

scrollButton.className = 'scroll-top';

scrollButton.setAttribute('aria-label', 'Scroll to top');

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {

    if (window.scrollY > 400) {

        scrollButton.classList.add('show');

    } else {

        scrollButton.classList.remove('show');

    }

});

scrollButton.addEventListener('click', () => {

    window.scrollTo({

        top: 0,

        behavior: 'smooth'

    });

});

/* =====================================================
   THEME TOGGLE (Future Ready)
===================================================== */

const themeButton = document.createElement('button');

themeButton.innerHTML = '<i class="fas fa-moon"></i>';

themeButton.className = 'theme-toggle';

themeButton.setAttribute('aria-label', 'Toggle theme');

document.body.appendChild(themeButton);

themeButton.addEventListener('click', () => {

    document.body.classList.toggle('light-theme');

    const icon = themeButton.querySelector('i');

    if (document.body.classList.contains('light-theme')) {

        icon.className = 'fas fa-sun';

    } else {

        icon.className = 'fas fa-moon';

    }

});

/* =====================================================
   KEYBOARD ACCESSIBILITY
===================================================== */

document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {

        navLinks.classList.remove('active');

        menuToggle.setAttribute('aria-expanded', 'false');

    }

});

/* =====================================================
   PRELOADER (Optional)
===================================================== */

window.addEventListener('load', () => {

    document.body.classList.add('loaded');

});

/* =====================================================
   CURRENT YEAR
===================================================== */

const footerYear = document.querySelector('#year');

if (footerYear) {

    footerYear.textContent = new Date().getFullYear();

}

/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log('%cWelcome to WinAdmin Portfolio!',
    'color:#0078D4;font-size:18px;font-weight:bold;');

console.log('Built with HTML, CSS and Vanilla JavaScript.');
