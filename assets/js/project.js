/* ==========================================================
   HOMELAB PAGE
   File: assets/js/homelab.js
   Description: Interactive functionality for homelab.html
   ========================================================== */

"use strict";

/* ==========================================================
   DOM Ready
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeCounters();
    initializeRevealAnimations();
    initializeSmoothScrolling();
    initializeStatusPulse();
    initializeGalleryEffects();
    initializeRoadmapEffects();

});

/* ==========================================================
   Animated Statistics
========================================================== */

function initializeCounters() {

    const counters = document.querySelectorAll(".stat-card h2");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));

}

function animateCounter(element) {

    const text = element.textContent;

    const target = parseInt(text.replace(/\D/g, ""), 10);

    if (isNaN(target)) return;

    const suffix = text.replace(/[0-9]/g, "");

    let current = 0;

    const duration = 1800;

    const increment = target / (duration / 16);

    const update = () => {

        current += increment;

        if (current >= target) {

            element.textContent = target + suffix;

            return;

        }

        element.textContent = Math.floor(current) + suffix;

        requestAnimationFrame(update);

    };

    update();

}

/* ==========================================================
   Reveal Animations
========================================================== */

function initializeRevealAnimations() {

    const elements = document.querySelectorAll(

        ".feature-card," +
        ".status-card," +
        ".hardware-card," +
        ".vm-card," +
        ".storage-card," +
        ".service-card," +
        ".gallery-item," +
        ".faq-item"

    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {

        threshold: 0.15

    });

    elements.forEach(item => {

        item.classList.add("fade-up");

        observer.observe(item);

    });

}

/* ==========================================================
   Smooth Scrolling
========================================================== */

function initializeSmoothScrolling() {

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const target = document.querySelector(

                link.getAttribute("href")

            );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

}

/* ==========================================================
   Status Pulse
========================================================== */

function initializeStatusPulse() {

    const indicators = document.querySelectorAll(

        ".status-indicator, .service-status, .vm-status"

    );

    indicators.forEach(indicator => {

        setInterval(() => {

            indicator.classList.toggle("pulse");

        }, 2500);

    });

}

/* ==========================================================
   Gallery Hover
========================================================== */

function initializeGalleryEffects() {

    const images = document.querySelectorAll(".gallery-item img");

    images.forEach(image => {

        image.addEventListener("mouseenter", () => {

            image.style.transform = "scale(1.05)";

        });

        image.addEventListener("mouseleave", () => {

            image.style.transform = "";

        });

    });

}

/* ==========================================================
   Roadmap Animation
========================================================== */

function initializeRoadmapEffects() {

    const roadmapItems = document.querySelectorAll(".roadmap-item");

    roadmapItems.forEach((item, index) => {

        item.style.transitionDelay = `${index * 100}ms`;

    });

}

/* ==========================================================
   Future Integrations
========================================================== */

/*
|--------------------------------------------------------------------------
| Planned Enhancements
|--------------------------------------------------------------------------
|
| Future versions of the portfolio can load live infrastructure
| information generated from PowerShell or monitoring systems.
|
| Example:
|
| fetch("assets/data/homelab-status.json")
|     .then(response => response.json())
|     .then(data => updateDashboard(data));
|
|--------------------------------------------------------------------------
*/

/* ==========================================================
   Dashboard Update Example
========================================================== */

function updateDashboard(data) {

    if (!data) return;

    console.log("Dashboard data loaded:", data);

}

/* ==========================================================
   VM Update Example
========================================================== */

function updateVirtualMachines(vms) {

    if (!vms) return;

    console.log("Virtual machines:", vms);

}

/* ==========================================================
   Backup Status Example
========================================================== */

function updateBackupStatus(status) {

    if (!status) return;

    console.log("Backup status:", status);

}

/* ==========================================================
   Homelab Health Score (Future)
========================================================== */

function calculateHealthScore() {

    return 100;

}

/* ==========================================================
   End of File
========================================================== */