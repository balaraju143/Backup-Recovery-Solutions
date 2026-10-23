document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".backup-blog-hero");

    if (!hero || typeof gsap === "undefined") return;

    const pattern = hero.querySelector(".backup-about-hero-pattern");
    const title = hero.querySelector(".backup-about-hero-title");
    const breadcrumb = hero.querySelector(".backup-about-breadcrumb");
    const circle = hero.querySelector(".backup-about-hero-circle");

    gsap.set([title, breadcrumb, circle], {
        opacity: 0
    });

    gsap.set(title, { y: 35 });
    gsap.set(breadcrumb, { y: 22 });
    gsap.set(circle, { scale: .65 });

    if (pattern) {
        gsap.set(pattern, { opacity: 0 });
    }

    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    if (pattern) {
        timeline.to(pattern, {
            opacity: .75,
            duration: 1.1
        });
    }

    timeline
        .to(title, {
            opacity: 1,
            y: 0,
            duration: .9
        }, "-=.4")

        .to(breadcrumb, {
            opacity: 1,
            y: 0,
            duration: .65
        }, "-=.4")

        .to(circle, {
            opacity: 1,
            scale: 1,
            duration: .65,
            ease: "back.out(1.5)"
        }, "-=.2");

    gsap.to(circle.querySelector("span"), {
        scale: 1.35,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

});



document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".stackly-blog-showcase");
    if (!section) return;

    const track = section.querySelector(".stackly-blog-track");
    const viewport = section.querySelector(".stackly-blog-viewport");
    const prevButton = section.querySelector(".stackly-blog-prev");
    const nextButton = section.querySelector(".stackly-blog-next");
    const pagination = section.querySelector(".stackly-blog-pagination");

    const originals = Array.from(track.children);
    const total = originals.length;

    if (!total) return;

    let visible = 2;
    let index = 0;
    let stepSize = 0;
    let timer = null;
    let isAnimating = false;
    let started = false;
    let resizeTimer;

    // Clone cards on both sides for a seamless loop.
    const prependClones = originals.slice(-2).map(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        return clone;
    });

    const appendClones = originals.slice(0, 2).map(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        return clone;
    });

    prependClones.forEach(card => track.insertBefore(card, track.firstChild));
    appendClones.forEach(card => track.appendChild(card));

    function cards() {
        return Array.from(track.children);
    }

    function getVisible() {
        return window.matchMedia("(max-width: 600px)").matches ? 1 : 2;
    }

    function getStepSize() {
        const firstCard = track.querySelector(".stackly-blog-card");
        if (!firstCard) return 0;

        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return firstCard.getBoundingClientRect().width + gap;
    }

    function measure() {
        visible = getVisible();
        stepSize = getStepSize();
    }

    function positionTrack(animate = true, callback) {
        const physicalIndex = visible === 1 ? index + 2 : index + 2;
        const x = -(physicalIndex * stepSize);

        if (typeof gsap !== "undefined") {
            gsap.to(track, {
                x,
                duration: animate ? 0.85 : 0,
                ease: "power3.inOut",
                overwrite: true,
                onComplete: callback
            });
        } else {
            track.style.transform = `translateX(${x}px)`;
            if (callback) callback();
        }
    }

    function updateDots() {
        const pageCount = Math.ceil(total / visible);
        const activePage = Math.floor(index / visible);

        pagination.querySelectorAll(".stackly-blog-dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === activePage);
            dot.setAttribute("aria-current", i === activePage ? "true" : "false");
        });
    }

    function createDots() {
        pagination.innerHTML = "";
        const pageCount = Math.ceil(total / visible);

        for (let i = 0; i < pageCount; i++) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "stackly-blog-dot";
            dot.setAttribute("aria-label", `Show article group ${i + 1}`);

            dot.addEventListener("click", () => {
                stopAuto();
                goTo(i * visible);
                startAuto();
            });

            pagination.appendChild(dot);
        }

        updateDots();
    }

    function goTo(newIndex) {
        if (isAnimating) return;

        isAnimating = true;
        index = newIndex;

        measure();
        positionTrack(true, () => {
            // Reset from the appended clones to the original cards.
            if (index >= total) {
                index = 0;
                positionTrack(false);
            }

            // Reset from prepended clones to the last original group.
            if (index < 0) {
                index = visible === 1 ? total - 1 : total - visible;
                positionTrack(false);
            }

            isAnimating = false;
            updateDots();
        });

        updateDots();
    }

    function next() {
        if (isAnimating) return;
        goTo(index + visible);
    }

    function previous() {
        if (isAnimating) return;
        goTo(index - visible);
    }

    function stopAuto() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    function startAuto() {
        stopAuto();
        timer = setInterval(next, 4500);
    }

    prevButton.addEventListener("click", () => {
        stopAuto();
        previous();
        startAuto();
    });

    nextButton.addEventListener("click", () => {
        stopAuto();
        next();
        startAuto();
    });

    viewport.addEventListener("mouseenter", stopAuto);
    viewport.addEventListener("mouseleave", startAuto);
    viewport.addEventListener("focusin", stopAuto);
    viewport.addEventListener("focusout", startAuto);

    // Reveal the heading and first two cards.
    if (typeof gsap !== "undefined") {
        const heading = section.querySelector(".stackly-blog-heading");

        gsap.set(heading, { opacity: 0, y: 30 });

        gsap.set(originals, {
            opacity: 0,
            x: (i) => i % 2 === 0 ? -55 : 55,
            y: 18
        });

        let observer = new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting || started) return;

            started = true;
            observer.disconnect();

            const tl = gsap.timeline({
                onComplete: startAuto
            });

            tl.to(heading, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            const firstVisibleCards = originals.slice(0, visible);

            tl.to(firstVisibleCards, {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.9,
                stagger: 0.16,
                ease: "power3.out"
            }, "-=0.25");

            // Prepare remaining cards for their first reveal.
            originals.slice(visible).forEach(card => {
                gsap.set(card, {
                    opacity: 1,
                    x: 0,
                    y: 0
                });
            });

        }, { threshold: 0.12 });

        observer.observe(section);
    } else {
        originals.forEach(card => {
            card.style.opacity = "1";
        });
        startAuto();
    }

    measure();
    createDots();
    positionTrack(false);

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            stopAuto();
            index = 0;
            measure();
            createDots();
            positionTrack(false);
            startAuto();
        }, 150);
    });
});


/* =====================================
   BLOG TIMELINE GSAP REVEAL
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".stackly-blog-timeline");

    if (!section) return;

    const heading = section.querySelector(".blog-timeline-heading");
    const items = section.querySelectorAll(".blog-timeline-item");
    const footer = section.querySelector(".blog-timeline-footer");

    // Keep the content visible if GSAP is unavailable.
    if (typeof gsap === "undefined") {
        return;
    }

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const isMobile = window.matchMedia("(max-width: 600px)").matches;

    gsap.set(heading, {
        autoAlpha: 0,
        y: 30
    });

    gsap.set(items, {
        autoAlpha: 0,
        x: index => {
            if (isMobile) return 0;
            return index % 2 === 0 ? -55 : 55;
        },
        y: isMobile ? 35 : 15
    });

    if (footer) {
        gsap.set(footer, {
            autoAlpha: 0,
            y: 20
        });
    }

    const timelineObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                timelineObserver.unobserve(entry.target);

                const animation = gsap.timeline({
                    defaults: {
                        ease: "power3.out"
                    }
                });

                animation.to(heading, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8
                });

                animation.to(
                    items,
                    {
                        autoAlpha: 1,
                        x: 0,
                        y: 0,
                        duration: 0.75,
                        stagger: 0.18
                    },
                    "-=0.35"
                );

                if (footer) {
                    animation.to(
                        footer,
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.6
                        },
                        "-=0.2"
                    );
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    timelineObserver.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
    const timelineArrows = document.querySelectorAll(".blog-timeline-arrow");

    timelineArrows.forEach((arrow) => {
        arrow.style.cursor = "pointer";
        arrow.setAttribute("role", "link");
        arrow.setAttribute("tabindex", "0");
        arrow.setAttribute("aria-label", "Explore more");

        arrow.addEventListener("click", () => {
            window.location.href = "./404.html";
        });

        arrow.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                window.location.href = "./404.html";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".stackly-recovery-showcase");
    if (!section) return;

    const cards = Array.from(
        section.querySelectorAll(".recovery-expansion-card")
    );
    const heading = section.querySelector(".recovery-showcase-heading");
    const footer = section.querySelector(".recovery-showcase-footer");

    const mobileQuery = window.matchMedia("(max-width: 600px)");

    function activateCard(selectedCard) {
        cards.forEach(card => {
            card.classList.toggle("is-active", card === selectedCard);
        });
    }

    // Desktop: expand on hover or keyboard focus.
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            if (!mobileQuery.matches) activateCard(card);
        });

        card.addEventListener("focusin", () => {
            if (!mobileQuery.matches) activateCard(card);
        });

        // Mobile: tap a card to expand it.
        card.addEventListener("click", event => {
            if (!mobileQuery.matches) return;

            // Keep the Explore More link's normal navigation.
            if (event.target.closest(".recovery-expansion-link")) return;

            const wasActive = card.classList.contains("is-active");

            cards.forEach(item => item.classList.remove("is-active"));

            if (!wasActive) {
                card.classList.add("is-active");
            }
        });
    });

    // Reveal animation.
    if (typeof gsap === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    gsap.set(heading, {
        autoAlpha: 0,
        y: 30
    });

    gsap.set(cards, {
        autoAlpha: 0,
        x: index => index % 2 === 0 ? -55 : 55,
        y: 15
    });

    if (footer) {
        gsap.set(footer, {
            autoAlpha: 0,
            y: 18
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            observer.unobserve(entry.target);

            const animation = gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });

            animation.to(heading, {
                autoAlpha: 1,
                y: 0,
                duration: 0.75
            });

            animation.to(cards, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.8,
                stagger: 0.14
            }, "-=0.25");

            if (footer) {
                animation.to(footer, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.55
                }, "-=0.2");
            }
        });
    }, {
        threshold: 0.12
    });

    observer.observe(section);
});



document.addEventListener("DOMContentLoaded", function () {

    if (typeof gsap === "undefined") return;

    const cta = document.querySelector(".backup-cta");

    if (!cta) return;


    const elements = {
        left: cta.querySelector(".backup-cta-left-design"),
        right: cta.querySelector(".backup-cta-right-design"),
        title: cta.querySelector("h2"),
        text: cta.querySelector("p"),
        button: cta.querySelector(".backup-cta-button")
    };


    gsap.set(elements.title, {
        opacity: 0,
        y: 35
    });

    gsap.set(elements.text, {
        opacity: 0,
        y: 25
    });

    gsap.set(elements.button, {
        opacity: 0,
        y: 25,
        scale: .94
    });


    let animated = false;


    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting || animated) return;

                animated = true;


                const tl = gsap.timeline({
                    defaults: {
                        ease: "power3.out"
                    }
                });


                tl.to(elements.left, {
                    opacity: 1,
                    x: 0,
                    duration: 1.1
                })

                .to(elements.right, {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=.75")

                .to(elements.title, {
                    opacity: 1,
                    y: 0,
                    duration: .9
                }, "-=.65")

                .to(elements.text, {
                    opacity: 1,
                    y: 0,
                    duration: .7
                }, "-=.55")

                .to(elements.button, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: .7,
                    ease: "back.out(1.5)"
                }, "-=.4");


                /* subtle floating animation */

                gsap.to(elements.left, {
                    y: 8,
                    duration: 2.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });


                gsap.to(elements.right, {
                    y: -8,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

            });

        },
        {
            threshold: 0.2
        }
    );


    observer.observe(cta);

});


document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".stackly-insight-section");
    if (!section) return;

    const heading = section.querySelector(".stackly-insight-heading");
    const cards = gsap.utils.toArray(
        section.querySelectorAll(".stackly-flip-card")
    );
    const footer = section.querySelector(".stackly-insight-footer");

    // Handle Explore More links separately.
    section.querySelectorAll(".stackly-insight-link").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            window.location.href = link.getAttribute("href") || "404.html";
        });
    });

    // Accessible tap-to-flip behaviour.
    cards.forEach(card => {
        const button = card.querySelector(".stackly-flip-inner");
        if (!button) return;

        button.addEventListener("click", event => {
            // Do not flip the card when clicking Explore More.
            if (event.target.closest(".stackly-insight-link")) return;

            const shouldFlip = !card.classList.contains("is-flipped");

            cards.forEach(otherCard => {
                otherCard.classList.remove("is-flipped");

                const otherButton =
                    otherCard.querySelector(".stackly-flip-inner");

                if (otherButton) {
                    otherButton.setAttribute("aria-pressed", "false");
                }
            });

            if (shouldFlip) {
                card.classList.add("is-flipped");
                button.setAttribute("aria-pressed", "true");
            }
        });
    });

    // Stop here if GSAP is not loaded.
    if (typeof gsap === "undefined") return;

    const mobile = window.matchMedia("(max-width: 600px)").matches;

    gsap.set(heading, {
        opacity: 0,
        y: 32
    });

    gsap.set(cards, {
        opacity: 0,
        x: index => mobile ? 0 : (index % 2 === 0 ? -65 : 65),
        y: mobile ? 30 : 12
    });

    gsap.set(footer, {
        opacity: 0,
        y: 20
    });

    const observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;

        observer.disconnect();

        const timeline = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        timeline.to(heading, {
            opacity: 1,
            y: 0,
            duration: 0.8
        });

        timeline.to(cards, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.85,
            stagger: 0.16
        }, "-=0.25");

        timeline.to(footer, {
            opacity: 1,
            y: 0,
            duration: 0.65
        }, "-=0.2");

    }, {
        threshold: 0.12
    });

    observer.observe(section);
});


