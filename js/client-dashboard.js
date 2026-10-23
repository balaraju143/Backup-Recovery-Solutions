
document.addEventListener("DOMContentLoaded", () => {
    const dashboard = document.querySelector(".sr-dashboard");
    const sidebar = document.getElementById("srSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const menuToggle = document.getElementById("srMenuToggle");
    const navLinks = [...document.querySelectorAll(".sr-nav-link[data-page]")];
    const pages = [...document.querySelectorAll(".sr-page")];

    const pageTitles = {
        overview: ["Overview", "Your backup and recovery workspace at a glance."],
        backups: ["My Backups", "Review backup records and available backup actions."],
        recovery: ["Recovery Center", "Explore recovery options and restoration readiness."],
        devices: ["Protected Devices", "Review devices included in your protection strategy."],
        security: ["Security & Alerts", "Review account protection and notification preferences."],
        activity: ["Activity History", "Review recent workspace activity and operational events."],
        plans: ["Plans & Usage", "Review storage allocation and service plan information."],
        settings: ["Account Settings", "Review your account information and preferences."]
    };

    // DYNAMIC EMAIL AND INITIAL
    const savedEmail = localStorage.getItem("stacklyUserEmail");
    const email = savedEmail || "client@example.com";
    const initial = email.trim().charAt(0).toUpperCase() || "C";

    document.getElementById("sidebarAvatar").textContent = initial;
    document.getElementById("topAvatar").textContent = initial;
    document.getElementById("settingsAvatar").textContent = initial;
    document.getElementById("sidebarEmail").textContent = email;
    document.getElementById("sidebarEmailShort").textContent = email;
    document.getElementById("settingsEmail").textContent = email;

    document.querySelectorAll(".sr-display-email").forEach(element => {
        element.textContent = email;
    });

    // SET UP HASH-BASED PAGE NAVIGATION
    function showPage() {
        const requestedPage = window.location.hash.replace("#", "") || "overview";
        const pageExists = pageTitles[requestedPage] &&
            document.getElementById(`page-${requestedPage}`);

        if (!pageExists) {
            window.location.replace("#overview");
            return;
        }

        pages.forEach(page => {
            page.classList.toggle("active", page.id === `page-${requestedPage}`);
        });

        navLinks.forEach(link => {
            const active = link.dataset.page === requestedPage;
            link.classList.toggle("active", active);

            if (active) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });

        document.getElementById("srPageTitle").textContent =
            pageTitles[requestedPage][0];

        document.getElementById("srPageSubtitle").textContent =
            pageTitles[requestedPage][1];

        closeSidebar();

        // Start reveal animation when switching views.
        const currentPage = document.getElementById(`page-${requestedPage}`);

        if (typeof gsap !== "undefined" &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const targets = currentPage.querySelectorAll(
                ".sr-page-intro, .sr-welcome-banner, .sr-stat-card, .sr-panel, .sr-feature-card, .sr-plan-card"
            );

            gsap.fromTo(targets,
                { autoAlpha: 0, y: 12 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.35,
                    stagger: 0.045,
                    ease: "power2.out",
                    clearProps: "all"
                }
            );
        }
    }

    function openSidebar() {
        dashboard.classList.add("sidebar-open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation");
        menuToggle.querySelector(".material-symbols-outlined").textContent = "close";
    }

    function closeSidebar() {
        dashboard.classList.remove("sidebar-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.querySelector(".material-symbols-outlined").textContent = "menu";
    }

    menuToggle.addEventListener("click", () => {
        dashboard.classList.contains("sidebar-open")
            ? closeSidebar()
            : openSidebar();
    });

    overlay.addEventListener("click", closeSidebar);

    window.addEventListener("hashchange", showPage);

    // BUTTONS FOR UNAVAILABLE FEATURES GO TO 404
    document.querySelectorAll("[data-unavailable]").forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "./404.html";
        });
    });

    // SEARCH BUTTON GOES TO 404
    document.getElementById("srSearchBtn").addEventListener("click", () => {
        window.location.href = "./404.html";
    });

    // NOTIFICATIONS GO TO 404
    document.getElementById("srNotifications").addEventListener("click", () => {
        window.location.href = "./404.html";
    });

    // AVATAR OPENS ACCOUNT SETTINGS SECTION
    document.getElementById("topAvatar").addEventListener("click", () => {
        window.location.hash = "settings";
    });

    // LOGOUT
    document.getElementById("srLogout").addEventListener("click", () => {
        localStorage.removeItem("stacklyUserEmail");
        localStorage.removeItem("stacklyUserRole");
        window.location.href = "./login.html";
    });

    // ESCAPE CLOSES MOBILE SIDEBAR
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeSidebar();
    });

    // Initial page
    showPage();
});
