
document.addEventListener("DOMContentLoaded", function () {

    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded.");
        return;
    }


    const hero =
        document.querySelector(".backup-about-hero");

    if (!hero) return;


    const title =
        hero.querySelector(".backup-about-hero-title");

    const breadcrumb =
        hero.querySelector(".backup-about-breadcrumb");

    const circle =
        hero.querySelector(".backup-about-hero-circle");

    const pattern =
        hero.querySelector(".backup-about-hero-pattern");


    /* =====================================================
       INITIAL STATES
    ===================================================== */

    gsap.set(title, {
        opacity: 0,
        y: 45,
        scale: 0.94
    });


    gsap.set(breadcrumb, {
        opacity: 0,
        y: 25,
        scale: 0.92
    });


    gsap.set(circle, {
        opacity: 0,
        scale: 0.3
    });


    gsap.set(pattern, {
        opacity: 0,
        scale: 1.08
    });


    /* =====================================================
       HERO TIMELINE
    ===================================================== */

    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });


    /* Background */

    tl.to(pattern, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
    });


    /* Title */

    tl.to(title, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power4.out"
    }, "-=1.0");


    /* Breadcrumb */

    tl.to(breadcrumb, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.4)"
    }, "-=0.45");


    /* Circle */

    tl.to(circle, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.35");


    /* =====================================================
       SUBTLE CIRCLE PULSE
    ===================================================== */

    gsap.to(circle, {
        scale: 1.08,

        duration: 1.8,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut",

        delay: 1.8
    });


    /* =====================================================
       BACKGROUND MOVEMENT
    ===================================================== */

    gsap.to(pattern, {
        backgroundPosition:
            "40px 30px, -30px 20px",

        duration: 18,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"
    });

});



document.addEventListener("DOMContentLoaded", function () {

    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded.");
        return;
    }


    const section =
        document.querySelector(".backup-solutions");

    if (!section) return;


    const image =
        section.querySelector(".backup-solutions-image");

    const imageElement =
        section.querySelector(".backup-solutions-image img");

    const content =
        section.querySelector(".backup-solutions-content");

    const label =
        section.querySelector(".backup-solutions-label");

    const heading =
        section.querySelector(".backup-solutions-content h2");

    const description =
        section.querySelector(".backup-solutions-description");

    const highlights =
        section.querySelectorAll(".backup-solution-highlight");

    const points =
        section.querySelectorAll(".backup-solution-point");

    const button =
        section.querySelector(".backup-solutions-button");


    /* =====================================================
       INITIAL STATES
    ===================================================== */

    /*
       IMAGE:
       Start slightly smaller and rotated.
    */

    gsap.set(image, {
        opacity: 0,
        scale: 0.72,
        rotation: -1080,
        x: -30,
        transformOrigin: "center center"
    });


    gsap.set(imageElement, {
        scale: 1.08
    });


    /*
       RIGHT CONTENT:
       Start outside/right.
    */

    gsap.set(content, {
        opacity: 0,
        x: 100
    });


    gsap.set(label, {
        opacity: 0,
        x: 45
    });


    gsap.set(heading, {
        opacity: 0,
        x: 55
    });


    gsap.set(description, {
        opacity: 0,
        x: 45
    });


    gsap.set(
        [
            ...highlights,
            ...points,
            button
        ],
        {
            opacity: 0,
            x: 40,
            y: 15
        }
    );


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer =
        new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const tl =
                        gsap.timeline({
                            defaults: {
                                ease: "power3.out"
                            }
                        });


                    /* ==========================================
                       IMAGE
                       3 FULL ROTATIONS
                    ========================================== */

                    tl.to(image, {
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        x: 0,
                        duration: 2.2,

                        ease: "power4.out"
                    });


                    /* Image internal zoom */

                    tl.to(imageElement, {
                        scale: 1,
                        duration: 1.7,
                        ease: "power3.out"
                    }, "<");


                    /* ==========================================
                       RIGHT CONTENT
                       RIGHT -> LEFT
                    ========================================== */

                    tl.to(content, {
                        opacity: 1,
                        x: 0,
                        duration: 1.05,
                        ease: "power4.out"
                    }, "-=1.45");


                    /* Label */

                    tl.to(label, {
                        opacity: 1,
                        x: 0,
                        duration: 0.55
                    }, "-=0.65");


                    /* Heading */

                    tl.to(heading, {
                        opacity: 1,
                        x: 0,
                        duration: 0.75
                    }, "-=0.35");


                    /* Description */

                    tl.to(description, {
                        opacity: 1,
                        x: 0,
                        duration: 0.65
                    }, "-=0.4");


                    /* Highlights */

                    tl.to(highlights, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.15
                    }, "-=0.3");


                    /* Points */

                    tl.to(points, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 0.55,
                        stagger: 0.14
                    }, "-=0.3");


                    /* Button */

                    tl.to(button, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 0.65,
                        ease: "back.out(1.2)"
                    }, "-=0.2");


                    /*
                       After entrance, subtle floating effect.
                    */

                    gsap.to(image, {
                        y: -7,
                        duration: 3.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: 2.5
                    });


                    observerInstance.unobserve(entry.target);

                });

            },
            {
                threshold: 0.18
            }
        );


    observer.observe(section);


    /* =====================================================
       IMAGE HOVER
    ===================================================== */

    image.addEventListener("mouseenter", function () {

        gsap.to(imageElement, {
            scale: 1.04,
            duration: 0.7,
            ease: "power2.out"
        });

    });


    image.addEventListener("mouseleave", function () {

        gsap.to(imageElement, {
            scale: 1,
            duration: 0.7,
            ease: "power2.out"
        });

    });


    /* =====================================================
       HIGHLIGHT HOVER
    ===================================================== */

    highlights.forEach(function (item) {

        const icon =
            item.querySelector(".backup-solution-icon");


        item.addEventListener("mouseenter", function () {

            gsap.to(icon, {
                y: -4,
                scale: 1.06,
                duration: 0.35,
                ease: "power2.out"
            });

        });


        item.addEventListener("mouseleave", function () {

            gsap.to(icon, {
                y: 0,
                scale: 1,
                duration: 0.35,
                ease: "power2.out"
            });

        });

    });

});



document.addEventListener("DOMContentLoaded", function () {

    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded.");
        return;
    }


    const section =
        document.querySelector(".backup-process");

    if (!section) return;


    const heading =
        section.querySelector(".backup-process-heading");

    const label =
        section.querySelector(".backup-process-label");

    const title =
        section.querySelector(".backup-process-heading h2");

    const cards =
        section.querySelectorAll(".backup-process-card");


    /* =====================================================
       INITIAL HEADING
    ===================================================== */

    gsap.set(label, {
        opacity: 0,
        y: 25
    });


    gsap.set(title, {
        opacity: 0,
        y: 35
    });


    /* =====================================================
       INITIAL CARDS
    ===================================================== */

    cards.forEach(function (card, index) {

        gsap.set(card, {
            opacity: 0,

            x: index % 2 === 0
                ? -100
                : 100,

            y: 35,

            scale: 0.94
        });

    });


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer =
        new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const tl =
                        gsap.timeline({
                            defaults: {
                                ease: "power3.out"
                            }
                        });


                    /* Label */

                    tl.to(label, {
                        opacity: 1,
                        y: 0,
                        duration: 0.65
                    });


                    /* Heading */

                    tl.to(title, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8
                    }, "-=0.35");


                    /* Cards */

                    tl.to(cards, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,

                        duration: 0.85,

                        stagger: 0.14,

                        ease: "power4.out"
                    }, "-=0.3");


                    /* =================================================
                       ICON POP
                    ================================================= */

                    cards.forEach(function (card, index) {

                        const icon =
                            card.querySelector(
                                ".backup-process-icon"
                            );


                        gsap.fromTo(
                            icon,

                            {
                                scale: 0.6,
                                rotation: -15
                            },

                            {
                                scale: 1,
                                rotation: 0,

                                duration: 0.65,

                                ease: "back.out(1.6)",

                                delay:
                                    1.1 + (index * 0.14)
                            }
                        );

                    });


                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.15
            }
        );


    observer.observe(section);


    /* =====================================================
       CARD HOVER
    ===================================================== */

    cards.forEach(function (card) {

        const icon =
            card.querySelector(
                ".backup-process-icon"
            );


        card.addEventListener(
            "mouseenter",
            function () {

                gsap.to(icon, {
                    rotation: 12,
                    scale: 1.08,
                    duration: 0.35,
                    ease: "power2.out"
                });

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                gsap.to(icon, {
                    rotation: 0,
                    scale: 1,
                    duration: 0.35,
                    ease: "power2.out"
                });

            }
        );

    });

});




document.addEventListener("DOMContentLoaded", function () {

    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded.");
        return;
    }


    const section =
        document.querySelector(".backup-work-process");

    if (!section) return;


    const heading =
        section.querySelector(".backup-work-heading");

    const label =
        section.querySelector(".backup-work-label");

    const title =
        section.querySelector(".backup-work-heading h2");

    const steps =
        section.querySelectorAll(".backup-work-step");

    const centerDot =
        section.querySelector(".backup-work-center-dot");


    /* =====================================================
       INITIAL HEADING
    ===================================================== */

    gsap.set(label, {
        opacity: 0,
        y: 25
    });


    gsap.set(title, {
        opacity: 0,
        y: 35
    });


    /* =====================================================
       INITIAL STEPS
    ===================================================== */

    steps.forEach(function (step) {

        const image =
            step.querySelector(".backup-work-image");

        const number =
            step.querySelector(".backup-work-number");

        const content =
            step.querySelector(".backup-work-content");


        gsap.set(image, {
            opacity: 0,
            scale: 0.65,
            rotation: -1080,
            transformOrigin: "center center"
        });


        gsap.set(number, {
            opacity: 0,
            scale: 0.4
        });


        gsap.set(content, {
            opacity: 0,
            y: 35
        });

    });


    gsap.set(centerDot, {
        opacity: 0,
        scale: 0.5
    });


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer =
        new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const tl =
                        gsap.timeline({
                            defaults: {
                                ease: "power3.out"
                            }
                        });


                    /* Heading */

                    tl.to(label, {
                        opacity: 1,
                        y: 0,
                        duration: 0.65
                    });


                    tl.to(title, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8
                    }, "-=0.35");


                    /* =================================================
                       EACH IMAGE
                    ================================================= */

                    steps.forEach(function (step, index) {

                        const image =
                            step.querySelector(
                                ".backup-work-image"
                            );

                        const number =
                            step.querySelector(
                                ".backup-work-number"
                            );

                        const content =
                            step.querySelector(
                                ".backup-work-content"
                            );


                        /*
                           Slight stagger between
                           the three process steps.
                        */

                        const delay =
                            index * 0.35;


                        /* Image: 3 rotations */

                        tl.to(image, {
                            opacity: 1,

                            scale: 1,

                            rotation: 0,

                            duration: 1.9,

                            ease: "power4.out"
                        }, `-=${index === 0 ? 0.15 : 1.25 - delay}`);


                        /* Number */

                        tl.to(number, {
                            opacity: 1,

                            scale: 1,

                            duration: 0.55,

                            ease: "back.out(1.7)"
                        }, "-=1.1");


                        /* Content */

                        tl.to(content, {
                            opacity: 1,

                            y: 0,

                            duration: 0.65,

                            ease: "power3.out"
                        }, "-=0.35");

                    });


                    /* =================================================
                       CENTER DOT
                    ================================================= */

                    tl.to(centerDot, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        ease: "back.out(1.5)"
                    }, "-=0.5");


                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.15
            }
        );


    observer.observe(section);


    /* =====================================================
       SUBTLE CONTINUOUS IMAGE FLOAT
    ===================================================== */

    steps.forEach(function (step, index) {

        const image =
            step.querySelector(".backup-work-image");


        gsap.to(image, {
            y: -6,

            duration: 2.8 + (index * 0.25),

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut",

            delay: 3
        });

    });


    /* =====================================================
       CENTER DOT PULSE
    ===================================================== */

    gsap.to(centerDot, {

        scale: 1.08,

        duration: 1.7,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut",

        delay: 3

    });

});



document.addEventListener("DOMContentLoaded", function () {

    if (typeof gsap === "undefined") {
        return;
    }


    /* =========================================
       PRICING HEADING
    ========================================= */

    gsap.set(".backup-pricing-label", {
        opacity: 0,
        y: 25
    });

    gsap.set(".backup-pricing-title-row h2", {
        opacity: 0,
        y: 40
    });

    gsap.set(".backup-pricing-title-row p", {
        opacity: 0,
        x: 45
    });


    /* =========================================
       PRICING CARDS
    ========================================= */

    gsap.set(".backup-pricing-card", {
        opacity: 0,
        y: -100,
        scale: 0.94,
        rotationX: -8
    });


    const pricingSection = document.querySelector(".backup-pricing");


    if (!pricingSection) return;


    let pricingAnimated = false;


    const pricingObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting || pricingAnimated) {
                    return;
                }

                pricingAnimated = true;


                /* Heading */

                gsap.to(".backup-pricing-label", {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out"
                });


                gsap.to(".backup-pricing-title-row h2", {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.15,
                    ease: "power3.out"
                });


                gsap.to(".backup-pricing-title-row p", {
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                    delay: 0.3,
                    ease: "power3.out"
                });


                /* Cards fall down one by one */

                gsap.to(".backup-pricing-card", {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,

                    duration: 1.05,

                    stagger: {
                        each: 0.18,
                        from: "start"
                    },

                    delay: 0.45,

                    ease: "back.out(1.25)",

                    clearProps: "transform"
                });


            });

        },
        {
            threshold: 0.18
        }
    );


    pricingObserver.observe(pricingSection);


    /* =========================================
       MOUSE MOVEMENT EFFECT
    ========================================= */

    document
        .querySelectorAll(".backup-pricing-card")
        .forEach((card) => {

            card.addEventListener("mousemove", (e) => {

                const rect = card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    (x - centerX) / 30;

                const rotateX =
                    (centerY - y) / 35;


                gsap.to(card, {

                    rotationY: rotateY,
                    rotationX: rotateX,

                    duration: 0.4,

                    ease: "power2.out",

                    overwrite: true

                });

            });


            card.addEventListener("mouseleave", () => {

                gsap.to(card, {

                    rotationY: 0,
                    rotationX: 0,

                    duration: 0.7,

                    ease: "power3.out"

                });

            });

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
