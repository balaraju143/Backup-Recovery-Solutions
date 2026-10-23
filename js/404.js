
document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".stackly-404-card");
    const visual = document.querySelector(".stackly-404-visual");
    const label = document.querySelector(".stackly-404-label");
    const title = document.querySelector(".stackly-404-card h1");
    const description = document.querySelector(".stackly-404-description");
    const actions = document.querySelector(".stackly-404-actions");
    const footer = document.querySelector(".stackly-404-footer");
    const backButton = document.getElementById("stacklyGoBack");

    if (backButton) {
        backButton.addEventListener("click", () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "index.html";
            }
        });
    }

    if (
        !card ||
        typeof gsap === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    const logo = card.querySelector(".stackly-404-logo");

    const elements = [
        logo, visual, label, title, description, actions, footer
    ].filter(Boolean);

    gsap.set(elements, { autoAlpha: 0, y: 20 });

    gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(logo, { autoAlpha: 1, y: 0, duration: 0.45 })
        .to(visual, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.2")
        .to(label, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.25")
        .to(title, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.2")
        .to(description, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.25")
        .to(actions, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.2")
        .to(footer, { autoAlpha: 1, y: 0, duration: 0.35 }, "-=0.2");
});
