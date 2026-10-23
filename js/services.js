
document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".backup-services-hero");

    if (!hero || typeof gsap === "undefined") return;

    const pattern = hero.querySelector(".backup-about-hero-pattern");
    const title = hero.querySelector(".backup-about-hero-title");
    const breadcrumb = hero.querySelector(".backup-about-breadcrumb");
    const circle = hero.querySelector(".backup-about-hero-circle");

    gsap.set(title, {
        opacity: 0,
        y: 35
    });

    gsap.set(breadcrumb, {
        opacity: 0,
        y: 22
    });

    gsap.set(circle, {
        opacity: 0,
        scale: 0.65
    });

    if (pattern) {
        gsap.set(pattern, {
            opacity: 0
        });
    }

    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    if (pattern) {
        timeline.to(pattern, {
            opacity: 0.75,
            duration: 1.1
        });
    }

    timeline
        .to(title, {
            opacity: 1,
            y: 0,
            duration: 0.9
        }, "-=0.45")

        .to(breadcrumb, {
            opacity: 1,
            y: 0,
            duration: 0.65
        }, "-=0.4")

        .to(circle, {
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.5)"
        }, "-=0.25");

    /* Subtle continuous pulse */

    gsap.to(circle.querySelector("span"), {
        scale: 1.35,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

});


document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") return;

    const section = document.querySelector(".stackly-backup-services");
    if (!section) return;

    const headingLabel = section.querySelector(".stackly-services-label");
    const heading = section.querySelector(".stackly-services-heading h2");
    const cards = gsap.utils.toArray(
        section.querySelectorAll(".stackly-service-card")
    );

    const mobile = window.matchMedia("(max-width: 600px)").matches;

    // Set initial states before the reveal.
    gsap.set([headingLabel, heading], {
        opacity: 0,
        y: 28
    });

    cards.forEach((card, index) => {
        gsap.set(card, {
            opacity: 0,
            x: mobile ? 0 : (index % 2 === 0 ? -75 : 75),
            y: mobile ? 45 : 20
        });

        gsap.set(
            card.querySelectorAll(
                ".stackly-service-icon, .stackly-service-content h3, " +
                ".stackly-service-content p, .stackly-service-action"
            ),
            {
                opacity: 0,
                y: 18
            }
        );
    });

    let played = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting || played) return;

            played = true;
            observer.disconnect();

            const timeline = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            timeline
                .to(headingLabel, {
                    opacity: 1,
                    y: 0,
                    duration: 0.65
                })
                .to(heading, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8
                }, "-=0.35");

            cards.forEach((card, index) => {
                const cardContent = card.querySelectorAll(
                    ".stackly-service-icon, .stackly-service-content h3, " +
                    ".stackly-service-content p, .stackly-service-action"
                );

                timeline
                    .to(card, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 0.8
                    }, index === 0 ? "-=0.1" : "-=0.48")
                    .to(cardContent, {
                        opacity: 1,
                        y: 0,
                        duration: 0.45,
                        stagger: 0.08
                    }, "-=0.35");
            });
        });
    }, {
        threshold: 0.12
    });

    observer.observe(section);
});



document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".stackly-backup-faq");
    if (!section) return;

    /* ======================================
       FAQ ACCORDION
    ====================================== */

    const faqItems = section.querySelectorAll(".stackly-faq-item");

    faqItems.forEach((item) => {
        const button = item.querySelector(".stackly-faq-question");
        const icon = item.querySelector(".stackly-faq-toggle");

        button.addEventListener("click", () => {
            const wasOpen = item.classList.contains("active");

            faqItems.forEach((faq) => {
                faq.classList.remove("active");

                faq.querySelector(".stackly-faq-question")
                    .setAttribute("aria-expanded", "false");

                faq.querySelector(".stackly-faq-toggle").textContent = "+";
            });

            if (!wasOpen) {
                item.classList.add("active");
                button.setAttribute("aria-expanded", "true");
                icon.textContent = "−";
            }
        });
    });


    /* ======================================
       GSAP REVEAL
    ====================================== */

    if (typeof gsap === "undefined") return;

    const left = section.querySelector(".stackly-backup-faq-left");
    const right = section.querySelector(".stackly-backup-faq-right");

    const mobile = window.matchMedia("(max-width: 700px)").matches;

    gsap.set(left, {
        opacity: 0,
        x: mobile ? 0 : -75,
        y: mobile ? 35 : 0
    });

    gsap.set(right, {
        opacity: 0,
        x: mobile ? 0 : 75,
        y: mobile ? 35 : 0
    });

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting || hasAnimated) return;

            hasAnimated = true;
            observer.disconnect();

            const timeline = gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });

            timeline
                .to(left, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1
                })
                .to(right, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1
                }, "-=0.65");

        });
    }, {
        threshold: 0.12
    });

    observer.observe(section);

});


document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".stackly-timeline");

    if (!section || typeof gsap === "undefined") return;

    const heading = section.querySelector(".stackly-timeline-heading");
    const items = gsap.utils.toArray(
        section.querySelectorAll(".stackly-timeline-item")
    );
    const bottom = section.querySelector(".stackly-timeline-bottom");

    const mobile = window.matchMedia("(max-width: 650px)").matches;

    gsap.set(heading.children, {
        opacity: 0,
        y: 28
    });

    items.forEach((item, index) => {
        gsap.set(item, {
            opacity: 0,
            x: mobile ? 0 : (index % 2 === 0 ? -65 : 65),
            y: mobile ? 35 : 15
        });
    });

    gsap.set(bottom, {
        opacity: 0,
        y: 20
    });

    let played = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting || played) return;

            played = true;
            observer.disconnect();

            const timeline = gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });

            timeline.to(heading.children, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.13
            });

            items.forEach((item, index) => {
                timeline.to(item, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 0.8
                }, index === 0 ? "-=0.1" : "-=0.35");
            });

            timeline.to(bottom, {
                opacity: 1,
                y: 0,
                duration: 0.65
            }, "-=0.2");
        });
    }, {
        threshold: 0.08
    });

    observer.observe(section);
});



document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".stackly-testimonials");
    if (!section) return;

    const viewport = section.querySelector(".stackly-testimonials-viewport");
    const track = section.querySelector(".stackly-testimonials-track");
    const prevButton = section.querySelector(".stackly-testimonial-prev");
    const nextButton = section.querySelector(".stackly-testimonial-next");
    const dotsContainer = section.querySelector(".stackly-testimonial-dots");

    const originalCards = Array.from(track.children);
    const total = originalCards.length;

    let index = 0;
    let timer = null;
    let isAnimating = false;
    let visible = 3;
    let stepSize = 0;
    let clonesAdded = false;

    function getVisibleCount() {
        return window.matchMedia("(max-width: 700px)").matches ? 1 : 3;
    }

    function addClones() {
        if (clonesAdded) return;

        originalCards.slice(0, 3).forEach((card) => {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            track.appendChild(clone);
        });

        clonesAdded = true;
    }

    addClones();

    const allCards = () => Array.from(track.children);

    function measure() {
        visible = getVisibleCount();

        const firstCard = track.querySelector(".stackly-testimonial-card");
        if (!firstCard) return;

        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        stepSize = firstCard.getBoundingClientRect().width + gap;
    }

    function updateFeatured() {
        allCards().forEach(card => card.classList.remove("is-featured"));

        // Highlight the center card on desktop and current card on mobile.
        const featuredIndex = visible === 1 ? index : index + 1;
        const cards = allCards();

        if (cards[featuredIndex]) {
            cards[featuredIndex].classList.add("is-featured");
        }

        dotsContainer.querySelectorAll(".stackly-testimonial-dot")
            .forEach((dot, i) => {
                dot.classList.toggle("active", i === index % total);
            });
    }

    function createDots() {
        dotsContainer.innerHTML = "";

        originalCards.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "stackly-testimonial-dot";
            dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);

            dot.addEventListener("click", () => {
                stopAuto();
                goTo(i);
                startAuto();
            });

            dotsContainer.appendChild(dot);
        });
    }

    function goTo(nextIndex, instant = false) {
        if (isAnimating && !instant) return;

        measure();
        isAnimating = true;
        index = nextIndex;

        const destination = -(index * stepSize);

        if (typeof gsap !== "undefined") {
            gsap.to(track, {
                x: destination,
                duration: instant ? 0 : 0.8,
                ease: "power3.inOut",
                onComplete: () => {
                    // Seamlessly return to the originals after the clones.
                    if (index >= total) {
                        index = 0;
                        gsap.set(track, { x: 0 });
                    }

                    isAnimating = false;
                    updateFeatured();
                }
            });
        } else {
            track.style.transform = `translateX(${destination}px)`;
            isAnimating = false;
            updateFeatured();
        }

        updateFeatured();
    }

    function next() {
        if (isAnimating) return;
        goTo(index + 1);
    }

    function previous() {
        if (isAnimating) return;

        if (index === 0) {
            index = total;
            measure();

            if (typeof gsap !== "undefined") {
                gsap.set(track, { x: -(index * stepSize) });
            } else {
                track.style.transform = `translateX(${-index * stepSize}px)`;
            }
        }

        goTo(index - 1);
    }

    function stopAuto() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    function startAuto() {
        stopAuto();
        timer = setInterval(next, 4000);
    }

    nextButton.addEventListener("click", () => {
        stopAuto();
        next();
        startAuto();
    });

    prevButton.addEventListener("click", () => {
        stopAuto();
        previous();
        startAuto();
    });

    // Pause autoplay while the user interacts with the carousel.
    viewport.addEventListener("mouseenter", stopAuto);
    viewport.addEventListener("mouseleave", startAuto);
    viewport.addEventListener("focusin", stopAuto);
    viewport.addEventListener("focusout", startAuto);

    // Initial GSAP reveal.
    if (typeof gsap !== "undefined") {
        gsap.set(section.querySelector(".stackly-testimonials-heading"), {
            opacity: 0,
            y: 30
        });

        gsap.set(allCards(), {
            opacity: 0,
            y: -35
        });

        gsap.set(section.querySelectorAll(".stackly-client-avatar"), {
            opacity: 0,
            y: 55
        });

        const observer = new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting) return;

            observer.disconnect();

            const revealCards = originalCards;

            const tl = gsap.timeline({
                onComplete: startAuto
            });

            tl.to(section.querySelector(".stackly-testimonials-heading"), {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            tl.to(revealCards, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                stagger: 0.15,
                ease: "power3.out"
            }, "-=0.25");

            tl.to(revealCards.map(card =>
                card.querySelector(".stackly-client-avatar")
            ), {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "back.out(1.4)"
            }, "-=0.3");
        }, { threshold: 0.12 });

        observer.observe(section);
    } else {
        originalCards.forEach(card => {
            card.style.opacity = "1";
            card.style.transform = "none";
        });
        startAuto();
    }

    createDots();
    measure();
    updateFeatured();

    window.addEventListener("resize", () => {
        measure();
        goTo(index, true);
    });
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
