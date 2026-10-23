
document.addEventListener("DOMContentLoaded", () => {
    const dashboard = document.querySelector(".sr-admin-dashboard");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const menuToggle = document.getElementById("srMenuToggle");

    const pages = [...document.querySelectorAll(".sr-admin-dashboard .sr-page")];
    const navLinks = [...document.querySelectorAll(".sr-admin-dashboard .sr-nav-link[data-page]")];

    const titles = {
        overview: ["System Overview", "Monitor your backup and recovery environment."],
        monitoring: ["Backup Monitoring", "Inspect job queues, backup completion records, and exceptions."],
        clients: ["Client Management", "Review client accounts, protection plans, and account status."],
        infrastructure: ["Infrastructure", "Review storage, backup processing, and recovery components."],
        incidents: ["Recovery Incidents", "Coordinate incident review and restoration readiness."],
        security: ["Security Audit", "Review security events, account access, and control checks."],
        reports: ["Reports & Analytics", "Review backup performance, capacity, and operational reporting."],
        settings: ["System Settings", "Review platform configuration and administrator account information."]
    };

    /* DYNAMIC EMAIL AND AVATARS */
    const savedEmail = localStorage.getItem("stacklyUserEmail");
    const email = savedEmail || "admin@example.com";
    const initial = email.trim().charAt(0).toUpperCase() || "A";

    document.getElementById("sidebarAvatar").textContent = initial;
    document.getElementById("topAvatar").textContent = initial;
    document.getElementById("settingsAvatar").textContent = initial;

    document.getElementById("sidebarEmail").textContent = email;
    document.getElementById("sidebarEmailShort").textContent = email;
    document.getElementById("settingsEmail").textContent = email;

    /* MOBILE SIDEBAR */
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
        if (dashboard.classList.contains("sidebar-open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    sidebarOverlay.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeSidebar();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) closeSidebar();
    });

    /* HASH-BASED PAGE SWITCHING */
    function showPage() {
        const pageName = window.location.hash.slice(1) || "overview";
        const currentPage = document.getElementById(`page-${pageName}`);

        if (!titles[pageName] || !currentPage) {
            window.location.replace(
                window.location.pathname + window.location.search + "#overview"
            );
            return;
        }

        pages.forEach(page => {
            page.classList.toggle("active", page === currentPage);
        });

        navLinks.forEach(link => {
            const active = link.dataset.page === pageName;

            link.classList.toggle("active", active);

            if (active) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });

        document.getElementById("srPageTitle").textContent = titles[pageName][0];
        document.getElementById("srPageSubtitle").textContent = titles[pageName][1];

        closeSidebar();

        // Return to the top when switching sections.
        window.scrollTo({ top: 0, behavior: "auto" });

        const content = document.querySelector(".sr-admin-dashboard .sr-content");
        if (content) content.scrollTop = 0;

        // Smooth GSAP reveal for the active page.
        if (
            typeof gsap !== "undefined" &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            const animatedItems = currentPage.querySelectorAll(
                ".adm-page-intro, .adm-command-banner, .adm-section-heading, " +
                ".adm-metric-card, .adm-panel, .adm-infra-card, " +
                ".adm-report-card, .adm-settings-card, .adm-admin-profile"
            );

            gsap.killTweensOf(animatedItems);

            gsap.fromTo(
                animatedItems,
                { autoAlpha: 0, y: 13 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.045,
                    ease: "power2.out",
                    clearProps: "transform"
                }
            );
        }
    }

    window.addEventListener("hashchange", showPage);

    /* SEARCH: UNAVAILABLE PAGE */
    document.getElementById("srSearchBtn").addEventListener("click", () => {
        window.location.href = "./404.html";
    });

    /* NOTIFICATIONS: UNAVAILABLE PAGE */
    document.getElementById("srNotifications").addEventListener("click", () => {
        window.location.href = "./404.html";
    });

    /* PROFILE AVATAR: SYSTEM SETTINGS */
    document.getElementById("topAvatar").addEventListener("click", () => {
        window.location.hash = "settings";
    });

    /* ACTIONS NOT IMPLEMENTED YET */
    document.querySelectorAll("[data-unavailable]").forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "./404.html";
        });
    });

    /* LOGOUT */
    document.getElementById("srLogout").addEventListener("click", () => {
        localStorage.removeItem("stacklyUserEmail");
        localStorage.removeItem("stacklyUserRole");
        window.location.href = "./login.html";
    });

    /* INITIAL VIEW */
    showPage();
});
