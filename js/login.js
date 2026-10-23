
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("srLoginForm");
    if (!form) return;

    const email = document.getElementById("srEmail");
    const password = document.getElementById("srPassword");
    const emailError = document.getElementById("srEmailError");
    const passwordError = document.getElementById("srPasswordError");
    const loginError = document.getElementById("srLoginError");
    const passwordToggle = document.getElementById("srPasswordToggle");
    const passwordIcon = document.getElementById("srPasswordIcon");
    const submitButton = document.getElementById("srSubmitBtn");
    const roleButtons = [...document.querySelectorAll(".sr-role-btn")];

    let selectedRole = "client";
    const timers = new WeakMap();


    // Change these paths to your actual dashboard filenames.
    const dashboardRoutes = {
        client: "./client-dashboard.html",
        admin: "./admin-dashboard.html"
    };

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

        const timer = setTimeout(() => {
            element.textContent = "";
            timers.delete(element);
        }, 3000);

        timers.set(element, timer);
    }

    function updateField(input, errorElement, message) {
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

    // EMAIL VALIDATION
    function validateEmail() {
        const value = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!value) {
            return updateField(
                email,
                emailError,
                "Please enter your email address."
            );
        }

        if (!emailPattern.test(value)) {
            return updateField(
                email,
                emailError,
                "Please enter a valid email address."
            );
        }

        return updateField(email, emailError, "");
    }

    // PASSWORD VALIDATION
    function validatePassword() {
        const value = password.value;

        if (!value) {
            return updateField(
                password,
                passwordError,
                "Please enter your password."
            );
        }

        if (value.length < 8) {
            return updateField(
                password,
                passwordError,
                "Password must contain at least 8 characters."
            );
        }

        if (value.length > 128) {
            return updateField(
                password,
                passwordError,
                "Password cannot exceed 128 characters."
            );
        }

        return updateField(password, passwordError, "");
    }

    // CLIENT / ADMIN ROLE SELECTION
    roleButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedRole = button.dataset.role;

            roleButtons.forEach(item => {
                const selected = item === button;
                item.classList.toggle("is-selected", selected);
                item.setAttribute("aria-pressed", String(selected));
            });

            clearMessage(loginError);
        });
    });

    // PASSWORD SHOW / HIDE
    passwordToggle.addEventListener("click", () => {
        const showPassword = password.type === "password";

        password.type = showPassword ? "text" : "password";
        passwordIcon.textContent = showPassword
            ? "visibility"
            : "visibility_off";

        passwordToggle.setAttribute(
            "aria-label",
            showPassword ? "Hide password" : "Show password"
        );

        passwordToggle.setAttribute(
            "aria-pressed",
            String(showPassword)
        );
    });

    // LIVE VALIDATION AFTER AN ERROR
    email.addEventListener("input", () => {
        if (emailError.textContent) validateEmail();
    });

    password.addEventListener("input", () => {
        if (passwordError.textContent) validatePassword();
    });

    // LOGIN SUBMISSION
    form.addEventListener("submit", async event => {
        event.preventDefault();

        clearMessage(loginError);

        const emailValid = validateEmail();
        const passwordValid = validatePassword();

        if (!emailValid || !passwordValid) {
            if (!emailValid) {
                email.focus();
            } else {
                password.focus();
            }
            return;
        }

        /*
         * DEMO REDIRECT ONLY.
         *
         * This validates the form format but does NOT verify credentials.
         * Connect your authentication API and verify the user's role
         * on the server before redirecting to protected dashboards.
         */
        submitButton.disabled = true;
        submitButton.innerHTML = `
            PLEASE WAIT...
            <span class="material-symbols-outlined">progress_activity</span>
        `;
         localStorage.setItem("stacklyUserEmail", email.value.trim());
         localStorage.setItem("stacklyUserRole", selectedRole);
        window.location.assign(dashboardRoutes[selectedRole]);
    });

    // RESET THE FORM WHEN RETURNING TO THIS PAGE
    window.addEventListener("pageshow", () => {
        form.reset();
        selectedRole = "client";

        roleButtons.forEach(button => {
            const selected = button.dataset.role === "client";
            button.classList.toggle("is-selected", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        password.type = "password";
        passwordIcon.textContent = "visibility_off";
        passwordToggle.setAttribute("aria-label", "Show password");
        passwordToggle.setAttribute("aria-pressed", "false");

        [emailError, passwordError, loginError].forEach(clearMessage);

        [email, password].forEach(input => {
            input.removeAttribute("aria-invalid");
            input.closest(".sr-input-wrap").classList.remove(
                "sr-invalid",
                "sr-valid"
            );
        });

        submitButton.disabled = false;
        submitButton.innerHTML = `
            SIGN IN
            <span class="material-symbols-outlined">arrow_forward</span>
        `;
    });

    // GSAP REVEAL ANIMATION
    if (
        typeof gsap !== "undefined" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        const card = document.querySelector(".sr-login-card");
        const visual = document.querySelector(".sr-login-visual-content");
        const panel = document.querySelector(".sr-login-form-wrap");

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
