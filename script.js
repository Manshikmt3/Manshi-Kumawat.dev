// Simple fade-in animation
window.addEventListener("load", () => {
    const hero = document.querySelector(".hero");
    hero.style.opacity = 0;
    hero.style.transform = "translateY(30px)";

    setTimeout(() => {
        hero.style.transition = "0.8s";
        hero.style.opacity = 1;
        hero.style.transform = "translateY(0)";
    }, 200);
});
const preloader = document.getElementById("preloader");
const preFill = document.getElementById("preFill");
const prePercent = document.getElementById("prePercent");

let p = 0;

// fake loading progress (smooth)
const timer = setInterval(() => {
    // speed curve
    const add = p < 60 ? 4 : p < 85 ? 2 : 1;
    p = Math.min(99, p + add);

    preFill.style.width = p + "%";
    prePercent.textContent = p + "%";
}, 120);

// when everything loaded, finish to 100 and hide
window.addEventListener("load", () => {
    clearInterval(timer);

    const finish = setInterval(() => {
        p = Math.min(100, p + 2);
        preFill.style.width = p + "%";
        prePercent.textContent = p + "%";

        if (p >= 100) {
            clearInterval(finish);
            preloader.classList.add("hide");
            setTimeout(() => preloader.remove(), 600);
        }
    }, 20);
});

// Animate skill progress bars when #skills section is visible
const skillsSection = document.querySelector("#skills");
const skillCards = document.querySelectorAll("#skills .skill-card");

function fillBars() {
    skillCards.forEach(card => {
        const percent = card.getAttribute("data-percent");
        const bar = card.querySelector(".progress");
        bar.style.width = percent + "%";
    });
}

function resetBars() {
    skillCards.forEach(card => {
        const bar = card.querySelector(".progress");
        bar.style.width = "0%";
    });
}

// Using IntersectionObserver (smooth + best)
if (skillsSection) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fillBars();
                } else {
                    // If you don't want reset on scroll back, comment next line
                    // resetBars();
                }
            });
        },
        { threshold: 0.25 }
    );

    observer.observe(skillsSection);
}

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Trigger once on load


// Slide-in reveal for contact cards
const revealSides = document.querySelectorAll(".reveal-left, .reveal-right");

function revealSideOnScroll() {
    revealSides.forEach(el => {
        const windowHeight = window.innerHeight;
        const top = el.getBoundingClientRect().top;

        if (top < windowHeight - 120) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealSideOnScroll);
revealSideOnScroll();

// Demo form submit (no backend)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        formStatus.textContent = "Message sent! (Demo) — Connect backend to receive emails.";
        contactForm.reset();
    });
}
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
});
const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("show");
        });
    },
    { threshold: 0.2 }
);

timelineItems.forEach((item) => timelineObserver.observe(item));
