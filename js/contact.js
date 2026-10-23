
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".backup-contact-hero");
    if (!hero) return;

    const title = hero.querySelector(".contact-hero-title");
    const breadcrumb = hero.querySelector(".contact-breadcrumb");
    const scroll = hero.querySelector(".contact-hero-scroll");

    if (
        typeof gsap === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    gsap.set([title, breadcrumb, scroll], {
        autoAlpha: 0,
        y: 24
    });

    gsap.timeline({
        defaults: { ease: "power3.out" }
    })
    .to(title, {
        autoAlpha: 1,
        y: 0,
        duration: 0.75
    })
    .to(breadcrumb, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5
    }, "-=0.3")
    .to(scroll, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4
    }, "-=0.2");
});



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("stacklyContactForm");
    if (!form) return;

    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const phoneInput = document.getElementById("contactPhone");
    const messageInput = document.getElementById("contactMessage");
    const submitButton = document.getElementById("contactSubmitBtn");

    const fields = [
        {
            input: nameInput,
            error: document.getElementById("contactNameError"),
            validate: validateName
        },
        {
            input: emailInput,
            error: document.getElementById("contactEmailError"),
            validate: validateEmail
        },
        {
            input: phoneInput,
            error: document.getElementById("contactPhoneError"),
            validate: validatePhone
        },
        {
            input: messageInput,
            error: document.getElementById("contactMessageError"),
            validate: validateMessage
        }
    ];

    const errorTimers = new WeakMap();

    function clearErrorTimer(errorElement) {
        const timer = errorTimers.get(errorElement);

        if (timer) clearTimeout(timer);

        errorTimers.delete(errorElement);
    }

    function clearError(field) {
        clearErrorTimer(field.error);
        field.error.textContent = "";
        field.input.removeAttribute("aria-invalid");
        field.input.classList.remove("stackly-invalid");
    }

    function showError(field, message) {
        clearErrorTimer(field.error);

        field.error.textContent = message;
        field.input.setAttribute("aria-invalid", "true");
        field.input.classList.add("stackly-invalid");
        field.input.classList.remove("stackly-valid");

        const timer = setTimeout(() => {
            field.error.textContent = "";
            errorTimers.delete(field.error);
        }, 3000);

        errorTimers.set(field.error, timer);
    }

    function setValid(field) {
        clearError(field);

        if (field.input.value.trim()) {
            field.input.classList.add("stackly-valid");
        } else {
            field.input.classList.remove("stackly-valid");
        }

        return true;
    }

    function validateName() {
        const value = nameInput.value.trim();
        const field = fields[0];

        if (!value) {
            showError(field, "Please enter your name.");
            return false;
        }

        if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(value)) {
            showError(field, "Use letters only. Spaces, apostrophes and hyphens are allowed.");
            return false;
        }

        if (value.replace(/[^A-Za-z]/g, "").length < 2) {
            showError(field, "Please enter at least 2 letters.");
            return false;
        }

        return setValid(field);
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const field = fields[1];
        const emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

        if (!value) {
            showError(field, "Please enter your email address.");
            return false;
        }

        if (!emailPattern.test(value)) {
            showError(field, "Please enter a valid email address.");
            return false;
        }

        return setValid(field);
    }

    function validatePhone() {
        const value = phoneInput.value.trim();
        const field = fields[2];
        const digits = value.replace(/\D/g, "");

        if (!value) {
            showError(field, "Please enter your phone number.");
            return false;
        }

        if (!/^[+\d\s().-]+$/.test(value)) {
            showError(field, "Use numbers and valid phone symbols only.");
            return false;
        }

        if (digits.length < 7 || digits.length > 15) {
            showError(field, "Enter a phone number containing 7 to 15 digits.");
            return false;
        }

        return setValid(field);
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        const field = fields[3];

        if (!value) {
            showError(field, "Please enter your backup or recovery requirements.");
            return false;
        }

        if (value.length < 10) {
            showError(field, "Please enter at least 10 characters.");
            return false;
        }

        if (value.length > 1000) {
            showError(field, "Your message cannot exceed 1000 characters.");
            return false;
        }

        return setValid(field);
    }

    // Name field: prevent numbers and unsupported symbols as the user types.
    nameInput.addEventListener("input", () => {
        const original = nameInput.value;
        const filtered = original.replace(/[^A-Za-z '\-]/g, "");

        if (filtered !== original) {
            nameInput.value = filtered;
        }

        const field = fields[0];

        if (field.error.textContent) {
            validateName();
        } else if (nameInput.classList.contains("stackly-valid")) {
            validateName();
        }
    });

    [emailInput, phoneInput, messageInput].forEach(input => {
        input.addEventListener("input", () => {
            const field = fields.find(item => item.input === input);

            if (field.error.textContent || input.classList.contains("stackly-valid")) {
                field.validate();
            }
        });
    });

    form.addEventListener("submit", event => {
        event.preventDefault();

        const results = fields.map(field => field.validate());
        const firstInvalidIndex = results.findIndex(result => !result);

        if (firstInvalidIndex !== -1) {
            fields[firstInvalidIndex].input.focus();
            return;
        }

        /*
         * Demo behavior: this form does not send data to a server.
         * Connect a backend before collecting real customer enquiries.
         */
        submitButton.disabled = true;
        submitButton.querySelector("span:first-child").textContent = "Please wait...";

        window.location.href = "./404.html";
    });

    // Reset all values and validation states when the user returns.
    function resetContactForm() {
        form.reset();

        fields.forEach(field => {
            clearErrorTimer(field.error);
            field.error.textContent = "";
            field.input.removeAttribute("aria-invalid");
            field.input.classList.remove("stackly-invalid", "stackly-valid");
        });

        submitButton.disabled = false;
        submitButton.querySelector("span:first-child").textContent = "Send message";
    }

    window.addEventListener("pageshow", resetContactForm);

    // GSAP: heading and image reveal from the left; form reveals from the right.
    const section = document.querySelector(".stackly-contact-section");
    const heading = document.querySelector(".stackly-contact-heading");
    const visual = document.querySelector(".stackly-contact-visual");
    const formCard = document.querySelector(".stackly-contact-form-card");

    if (
        section &&
        typeof gsap !== "undefined" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        const animatedElements = [heading, visual, formCard].filter(Boolean);

        gsap.set(heading, { autoAlpha: 0, x: -45 });
        gsap.set(visual, { autoAlpha: 0, x: -55 });
        gsap.set(formCard, { autoAlpha: 0, x: 55 });

        const observer = new IntersectionObserver(entries => {
            if (!entries.some(entry => entry.isIntersecting)) return;

            observer.disconnect();

            const timeline = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            timeline
                .to(heading, {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.7
                })
                .to(visual, {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.75
                }, "-=0.35")
                .to(formCard, {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.75
                }, "-=0.55");
        }, { threshold: 0.12 });

        observer.observe(section);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".stackly-contact-info");
    if (!section) return;

    const heading = section.querySelector(".stackly-contact-info-title");
    const paragraph = section.querySelector(".stackly-contact-info-heading > p");
    const cards = [...section.querySelectorAll(".stackly-contact-info-card")];

    if (
        typeof gsap === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    gsap.set(heading, { autoAlpha: 0, x: -45 });
    gsap.set(paragraph, { autoAlpha: 0, x: 45 });

    cards.forEach((card, index) => {
        gsap.set(card, {
            autoAlpha: 0,
            x: index % 2 === 0 ? -45 : 45,
            y: 15
        });
    });

    const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;

        observer.disconnect();

        const timeline = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        timeline
            .to(heading, {
                autoAlpha: 1,
                x: 0,
                duration: 0.7
            })
            .to(paragraph, {
                autoAlpha: 1,
                x: 0,
                duration: 0.7
            }, "-=0.45")
            .to(cards, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.65,
                stagger: 0.13
            }, "-=0.25");
    }, { threshold: 0.15 });

    observer.observe(section);
});



document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".stackly-map-section");
    if (!section) return;

    const heading = section.querySelector(".stackly-map-heading");
    const map = section.querySelector(".stackly-map-frame");
    const footer = section.querySelector(".stackly-map-footer");

    if (
        typeof gsap === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    gsap.set(heading, { autoAlpha: 0, y: 28 });
    gsap.set(map, { autoAlpha: 0, y: 35, scale: 0.98 });
    gsap.set(footer, { autoAlpha: 0, y: 22 });

    const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;

        observer.disconnect();

        gsap.timeline({
            defaults: { ease: "power3.out" }
        })
        .to(heading, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65
        })
        .to(map, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75
        }, "-=0.25")
        .to(footer, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5
        }, "-=0.3");
    }, { threshold: 0.15 });

    observer.observe(section);
});



document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".stackly-contact-faq");
    if (!section) return;

    const image = section.querySelector(".stackly-faq-visual");
    const content = section.querySelector(".stackly-faq-content");
    const faqItems = [...section.querySelectorAll(".stackly-faq-item")];

    // Allow one FAQ answer open at a time.
    faqItems.forEach(item => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;

            faqItems.forEach(other => {
                if (other !== item) other.open = false;
            });
        });
    });

    if (
        typeof gsap === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    gsap.set(image, { autoAlpha: 0, x: -45 });
    gsap.set(content, { autoAlpha: 0, x: 45 });

    const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;

        observer.disconnect();

        gsap.timeline({
            defaults: { ease: "power3.out" }
        })
        .to(image, {
            autoAlpha: 1,
            x: 0,
            duration: 0.8
        })
        .to(content, {
            autoAlpha: 1,
            x: 0,
            duration: 0.8
        }, "-=0.55");
    }, { threshold: 0.15 });

    observer.observe(section);
});
