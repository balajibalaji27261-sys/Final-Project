
// ====================================
// 1. MOBILE NAVIGATION
// ====================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    menuToggle.textContent =
        navLinks.classList.contains("open") ? "✕" : "☰";
});

// Close menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
    });
});


// ====================================
// 2. TYPING ANIMATION
// ====================================

const typingElement = document.getElementById("typing");

const roles = [
    "Web Developer",
    "College Student",
    "Python Programmer",
    "AI Enthusiast"
];

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (reduceMotion) {
    typingElement.textContent = roles[0];
} else {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typingAnimation() {

        const currentRole = roles[roleIndex];

        if (!deleting) {
            typingElement.textContent =
                currentRole.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentRole.length) {
                deleting = true;
                setTimeout(typingAnimation, 1200);
                return;
            }

        } else {
            typingElement.textContent =
                currentRole.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(
            typingAnimation,
            deleting ? 50 : 100
        );
    }

    typingAnimation();
}


// ====================================
// 3. SCROLL REVEAL ANIMATION
// ====================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion) {

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


// ====================================
// 4. SKILL PROGRESS BAR ANIMATION
// ====================================

const skillBars = document.querySelectorAll(
    ".progress div"
);

function animateSkills() {

    skillBars.forEach(bar => {

        const position =
            bar.getBoundingClientRect().top;

        if (position < window.innerHeight - 50) {

            bar.style.width = bar.dataset.width;

        }

    });

}

if (reduceMotion) {
    skillBars.forEach(bar => {
        bar.style.width = bar.dataset.width;
    });
} else {
    window.addEventListener("scroll", animateSkills);
    animateSkills();
}


// ====================================
// 5. DARK AND LIGHT MODE
// ====================================

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

function updateThemeIcon() {

    themeToggle.textContent =
        document.body.classList.contains("light-theme")
            ? "☾"
            : "☼";

    themeToggle.setAttribute(
        "aria-label",
        document.body.classList.contains("light-theme")
            ? "Switch to dark mode"
            : "Switch to light mode"
    );
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const currentTheme =
        document.body.classList.contains("light-theme")
            ? "light"
            : "dark";

    localStorage.setItem("portfolioTheme", currentTheme);

    updateThemeIcon();

});


// ====================================
// 6. CONTACT FORM VALIDATION
// ====================================

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name");

    const email =
        document.getElementById("email");

    const message =
        document.getElementById("message");

    const fields = [name, email, message];

    let valid = true;

    // Clear previous errors

    fields.forEach(field => {

        field.classList.remove("invalid");

        field.nextElementSibling.textContent = "";

    });

    formStatus.textContent = "";

    // Name validation

    if (name.value.trim().length < 2) {

        showError(name, "Please enter your name.");

        valid = false;

    }

    // Email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

        showError(email, "Enter a valid email address.");

        valid = false;

    }

    // Message validation

    if (message.value.trim().length < 10) {

        showError(
            message,
            "Message must contain at least 10 characters."
        );

        valid = false;

    }

    // Successful frontend validation

    if (valid) {

        formStatus.textContent =
            "Thank you! Your details passed validation. This demo does not send emails.";

        contactForm.reset();

    } else {

        formStatus.textContent =
            "Please correct the highlighted fields.";

        formStatus.style.color = "#ff647c";

    }

});


// Display validation errors

function showError(field, message) {

    field.classList.add("invalid");

    field.nextElementSibling.textContent = message;

}


// ====================================
// 7. ACTIVE NAVIGATION LINKS
// ====================================

const sections = document.querySelectorAll(
    "main section[id]"
);

const navigationItems =
    document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navigationItems.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        );

                    });

                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


// ====================================
// 8. AUTOMATIC COPYRIGHT YEAR
// ====================================

document.getElementById("year").textContent =
    new Date().getFullYear();


// ====================================
// END OF PORTFOLIO JAVASCRIPT
// ====================================
