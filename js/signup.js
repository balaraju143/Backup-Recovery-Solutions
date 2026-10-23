
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("srSignupForm");
    if (!form) return;

    const nameInput = document.getElementById("srSignupName");
    const emailInput = document.getElementById("srSignupEmail");
    const passwordInput = document.getElementById("srSignupPassword");
    const confirmInput = document.getElementById("srSignupConfirmPassword");

    const nameError = document.getElementById("srSignupNameError");
    const emailError = document.getElementById("srSignupEmailError");
    const passwordError = document.getElementById("srSignupPasswordError");
    const confirmError = document.getElementById("srSignupConfirmError");
    const formError = document.getElementById("srSignupError");

    const submitButton = document.getElementById("srSignupSubmit");
    const roleButtons = [...document.querySelectorAll("#srSignupForm .sr-role-btn")];

    let selectedRole = "client";
    const timers = new WeakMap();

    // ERROR MESSAGE HELPERS
    function clearTimer(element) {
        const timer = timers.get(element);
        if (timer) clearTimeout(timer);
        timers.delete(element);
    }

    function clearMessage(element) {
        clearTimer(element);
        element.textContent = "";
    }

    function showMessage(element, message) {
        clearTimer(element);
        element.textContent = message;

        if (!message) return;

        const timer = setTimeout(() => {
            element.textContent = "";
            timers.delete(element);
        }, 3000);

        timers.set(element, timer);
    }

    function setFieldState(input, errorElement, message) {
        const wrapper = input.closest(".sr-input-wrap");

        wrapper.classList.toggle("sr-invalid", Boolean(message));
        wrapper.classList.toggle(
            "sr-valid",
            !message && input.value.trim().length > 0
        );

        if (message) {
            input.setAttribute("aria-invalid", "true");
            showMessage(errorElement, message);
            return false;
        }

        input.removeAttribute("aria-invalid");
        clearMessage(errorElement);
        return true;
    }

    // NAME: LETTERS AND SPACES ONLY
    function validateName() {
        const value = nameInput.value.trim();
        const namePattern = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;

        if (!value) {
            return setFieldState(
                nameInput,
                nameError,
                "Please enter your full name."
            );
        }

        if (value.length < 2 || value.length > 60) {
            return setFieldState(
                nameInput,
                nameError,
                "Name must contain 2–60 characters."
            );
        }

        if (!namePattern.test(value)) {
            return setFieldState(
                nameInput,
                nameError,
                "Use letters only. Spaces, apostrophes and hyphens are allowed."
            );
        }

        return setFieldState(nameInput, nameError, "");
    }

    // EMAIL
    function validateEmail() {
        const value = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!value) {
            return setFieldState(
                emailInput,
                emailError,
                "Please enter your email address."
            );
        }

        if (!emailPattern.test(value)) {
            return setFieldState(
                emailInput,
                emailError,
                "Please enter a valid email address."
            );
        }

        return setFieldState(emailInput, emailError, "");
    }

    // PASSWORD
    function validatePassword() {
        const value = passwordInput.value;

        if (!value) {
            return setFieldState(
                passwordInput,
                passwordError,
                "Please create a password."
            );
        }

        if (value.length < 8) {
            return setFieldState(
                passwordInput,
                passwordError,
                "Password must contain at least 8 characters."
            );
        }

        if (value.length > 128) {
            return setFieldState(
                passwordInput,
                passwordError,
                "Password cannot exceed 128 characters."
            );
        }

        return setFieldState(passwordInput, passwordError, "");
    }

    // CONFIRM PASSWORD
    function validateConfirmPassword() {
        const value = confirmInput.value;

        if (!value) {
            return setFieldState(
                confirmInput,
                confirmError,
                "Please confirm your password."
            );
        }

        if (value !== passwordInput.value) {
            return setFieldState(
                confirmInput,
                confirmError,
                "Passwords do not match."
            );
        }

        return setFieldState(confirmInput, confirmError, "");
    }

    // ROLE SELECTOR
    roleButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedRole = button.dataset.role;

            roleButtons.forEach(item => {
                const selected = item === button;
                item.classList.toggle("is-selected", selected);
                item.setAttribute("aria-pressed", String(selected));
            });

            clearMessage(formError);
        });
    });

    // PASSWORD VISIBILITY FOR BOTH PASSWORD FIELDS
    document.querySelectorAll(
        "#srSignupForm .sr-password-toggle"
    ).forEach(button => {
        button.addEventListener("click", () => {
            const input = document.getElementById(
                button.dataset.passwordTarget
            );

            const icon = button.querySelector(
                ".material-symbols-outlined"
            );

            const showPassword = input.type === "password";

            input.type = showPassword ? "text" : "password";
            icon.textContent = showPassword
                ? "visibility"
                : "visibility_off";

            button.setAttribute(
                "aria-label",
                showPassword ? "Hide password" : "Show password"
            );

            button.setAttribute(
                "aria-pressed",
                String(showPassword)
            );
        });
    });

    // LIVE VALIDATION
    nameInput.addEventListener("input", () => {
        // Reject numbers and symbols as they are typed.
        const position = nameInput.selectionStart;
        const before = nameInput.value;
        const filtered = before.replace(/[^\p{L} '\u2019-]/gu, "");

        if (before !== filtered) {
            nameInput.value = filtered;
            const newPosition = Math.max(0, position - 1);
            nameInput.setSelectionRange(newPosition, newPosition);
        }

        if (nameError.textContent) validateName();
    });

    emailInput.addEventListener("input", () => {
        if (emailError.textContent) validateEmail();
    });

    passwordInput.addEventListener("input", () => {
        if (passwordError.textContent) validatePassword();

        if (confirmInput.value && confirmError.textContent) {
            validateConfirmPassword();
        }
    });

    confirmInput.addEventListener("input", () => {
        if (confirmError.textContent) validateConfirmPassword();
    });

    // SUBMIT SIGNUP
    form.addEventListener("submit", event => {
        event.preventDefault();
        clearMessage(formError);

        const results = [
            validateName(),
            validateEmail(),
            validatePassword(),
            validateConfirmPassword()
        ];

        if (results.includes(false)) {
            const firstInvalid = form.querySelector(
                '[aria-invalid="true"]'
            );

            if (firstInvalid) firstInvalid.focus();
            return;
        }

        /*
         * Demo-only signup:
         * No account is created or password stored here.
         * Connect a backend signup API before production use.
         */
        submitButton.disabled = true;
        submitButton.innerHTML = `
            PLEASE WAIT...
            <span class="material-symbols-outlined">progress_activity</span>
        `;

        window.location.assign("./login.html");
    });

    // RESET FORM WHEN RETURNING TO THE PAGE
    window.addEventListener("pageshow", () => {
        form.reset();
        selectedRole = "client";

        roleButtons.forEach(button => {
            const selected = button.dataset.role === "client";
            button.classList.toggle("is-selected", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        document.querySelectorAll(
            "#srSignupForm .sr-password-toggle"
        ).forEach(button => {
            const input = document.getElementById(
                button.dataset.passwordTarget
            );

            const icon = button.querySelector(
                ".material-symbols-outlined"
            );

            input.type = "password";
            icon.textContent = "visibility_off";
            button.setAttribute("aria-label", "Show password");
            button.setAttribute("aria-pressed", "false");
        });

        [
            nameError,
            emailError,
            passwordError,
            confirmError,
            formError
        ].forEach(clearMessage);

        [nameInput, emailInput, passwordInput, confirmInput].forEach(input => {
            input.removeAttribute("aria-invalid");
            input.closest(".sr-input-wrap").classList.remove(
                "sr-invalid",
                "sr-valid"
            );
        });

        submitButton.disabled = false;
        submitButton.innerHTML = `
            CREATE ACCOUNT
            <span class="material-symbols-outlined">arrow_forward</span>
        `;
    });

    // GSAP ENTRANCE ANIMATION
    if (
        typeof gsap !== "undefined" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        const card = document.querySelector(".sr-signup-card");
        const visual = card.querySelector(".sr-login-visual-content");
        const panel = card.querySelector(".sr-login-form-wrap");

        gsap.set(card, { autoAlpha: 0, y: 24 });
        gsap.set(visual, { autoAlpha: 0, x: -24 });
        gsap.set(panel, { autoAlpha: 0, x: 24 });

        gsap.timeline({
            defaults: { ease: "power3.out" }
        })
        .to(card, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65
        })
        .to(visual, {
            autoAlpha: 1,
            x: 0,
            duration: 0.6
        }, "-=0.3")
        .to(panel, {
            autoAlpha: 1,
            x: 0,
            duration: 0.6
        }, "-=0.45");
    }
});
