/* ==========================================
   STACKLY BACKUP & RECOVERY
   HEADER / NAVBAR JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle =
        document.getElementById("mobileMenuToggle");

    const mobileNavigation =
        document.getElementById("mobileNavigation");

    const mobileLinks =
        document.querySelectorAll(".mobile-nav-link");

    const body =
        document.body;


    /* ==========================================
       OPEN / CLOSE MOBILE MENU
    ========================================== */

    if (menuToggle && mobileNavigation) {

        menuToggle.addEventListener("click", function () {

            const menuIsOpen =
                mobileNavigation.classList.contains("active");


            if (menuIsOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        });

    }


    /* ==========================================
       OPEN MENU
    ========================================== */

    function openMobileMenu() {

        mobileNavigation.classList.add("active");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close Menu"
        );

        body.classList.add("menu-open");

    }


    /* ==========================================
       CLOSE MENU
    ========================================== */

    function closeMobileMenu() {

        mobileNavigation.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open Menu"
        );

        body.classList.remove("menu-open");

    }


    /* ==========================================
       CLOSE AFTER CLICKING A MOBILE LINK
    ========================================== */

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeMobileMenu();

        });

    });


    /* ==========================================
       CLOSE WITH ESCAPE KEY
    ========================================== */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            mobileNavigation.classList.contains("active")
        ) {

            closeMobileMenu();

        }

    });


    /* ==========================================
       CLOSE MENU WHEN RESIZING TO DESKTOP
    ========================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {

            closeMobileMenu();

        }

    });

});



document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("backupNewsletterForm");

    const email =
        document.getElementById("backupNewsletterEmail");

    const error =
        document.getElementById("backupNewsletterError");


    if (!form || !email || !error) return;


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    form.addEventListener("submit", function (e) {

        e.preventDefault();


        const value =
            email.value.trim();


        /* Clear previous message */

        error.textContent = "";


        /* Empty */

        if (value === "") {

            error.textContent =
                "Please enter your email address.";

            setTimeout(function () {
                error.textContent = "";
            }, 3000);

            return;
        }


        /* Email validation */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(value)) {

            error.textContent =
                "Please enter a valid email address.";

            setTimeout(function () {
                error.textContent = "";
            }, 3000);

            return;
        }


        /* =================================================
           VALID EMAIL
           Go to 404
        ================================================= */

        sessionStorage.setItem(
            "backupNewsletterSubmitted",
            "true"
        );


        /* Reset before leaving */

        form.reset();


        window.location.href = "404.html";

    });


    /* =====================================================
       RESET WHEN RETURNING TO PAGE
    ===================================================== */

    window.addEventListener("pageshow", function () {

        form.reset();

        error.textContent = "";

    });

});
