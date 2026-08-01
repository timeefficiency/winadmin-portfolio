/**
 * ==========================================================
 * PROJECT PAGE
 * Shared JavaScript for all project pages
 * ==========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    initSmoothScroll();
    initRevealAnimations();
    initBackToTop();
    initReadingProgress();
    initCodeCopyButtons();
    initActiveSections();
    initGalleryLightbox();

});

/* ==========================================================
   Smooth Scrolling
========================================================== */

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

}

/* ==========================================================
   Reveal Animation
========================================================== */

function initRevealAnimations() {

    const items = document.querySelectorAll(

        ".section, .timeline-item, .highlight-card, .tech-card, .spec-card, .gallery-card"

    );

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    items.forEach(item => observer.observe(item));

}

/* ==========================================================
   Reading Progress Bar
========================================================== */

function initReadingProgress() {

    const progress = document.createElement("div");

    progress.id = "reading-progress";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {

        const scrollTop = document.documentElement.scrollTop;

        const height =

            document.documentElement.scrollHeight -

            document.documentElement.clientHeight;

        const width = (scrollTop / height) * 100;

        progress.style.width = width + "%";

    });

}

/* ==========================================================
   Back To Top Button
========================================================== */

function initBackToTop() {

    const button = document.createElement("button");

    button.id = "back-to-top";

    button.innerHTML = "↑";

    document.body.appendChild(button);

    window.addEventListener("scroll", () => {

        button.classList.toggle(

            "show",

            window.scrollY > 500

        );

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================================================
   Copy Code Buttons
========================================================== */

function initCodeCopyButtons() {

    document.querySelectorAll("pre").forEach(pre => {

        const button = document.createElement("button");

        button.className = "copy-button";

        button.textContent = "Copy";

        pre.appendChild(button);

        button.addEventListener("click", async () => {

            const code = pre.querySelector("code");

            if (!code) return;

            try {

                await navigator.clipboard.writeText(

                    code.innerText

                );

                button.textContent = "Copied!";

                setTimeout(() => {

                    button.textContent = "Copy";

                }, 2000);

            }

            catch {

                button.textContent = "Failed";

            }

        });

    });

}

/* ==========================================================
   Active Section Highlight
========================================================== */

function initActiveSections() {

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(

        '.article-sidebar a'

    );

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (

                        link.getAttribute("href") ===

                        "#" + entry.target.id

                    ) {

                        link.classList.add("active");

                    }

                });

            });

        },

        {

            rootMargin: "-30% 0px -60% 0px"

        }

    );

    sections.forEach(section => observer.observe(section));

}

/* ==========================================================
   Gallery Lightbox
========================================================== */

function initGalleryLightbox() {

    const images = document.querySelectorAll(

        ".gallery-card img"

    );

    if (!images.length) return;

    const overlay = document.createElement("div");

    overlay.id = "lightbox";

    overlay.innerHTML =

        '<span class="close">&times;</span><img>';

    document.body.appendChild(overlay);

    const lightboxImage = overlay.querySelector("img");

    const close = overlay.querySelector(".close");

    images.forEach(image => {

        image.addEventListener("click", () => {

            lightboxImage.src = image.src;

            lightboxImage.alt = image.alt;

            overlay.classList.add("show");

        });

    });

    close.addEventListener("click", () => {

        overlay.classList.remove("show");

    });

    overlay.addEventListener("click", e => {

        if (e.target === overlay) {

            overlay.classList.remove("show");

        }

    });

}

/* ==========================================================
   Keyboard Shortcuts
========================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Home") {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

});

/* ==========================================================
   Reading Time
========================================================== */

(function () {

    const article = document.querySelector("main");

    if (!article) return;

    const words = article.innerText.trim().split(/\s+/).length;

    const minutes = Math.max(1, Math.ceil(words / 200));

    const target = document.querySelector(".article-meta");

    if (!target) return;

    const span = document.createElement("span");

    span.textContent = `📖 ${minutes} min read`;

    target.appendChild(span);

})();