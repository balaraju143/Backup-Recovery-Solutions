/* =========================================================
   STACKLY BACKUP & RECOVERY
   HERO GSAP REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded.");
        return;
    }


    /* ==========================================
       ELEMENTS
    ========================================== */

    const ring =
        document.querySelector(".hero-ring-bg");

    const eyebrow =
        document.querySelector(".hero-eyebrow");

    const title =
        document.querySelector(".hero-title");

    const description =
        document.querySelector(".hero-description");

    const actions =
        document.querySelector(".hero-actions");

    const personImage =
        document.querySelector(".hero-person-image");

    const geometry =
        document.querySelector(".hero-geometry");


    /* ==========================================
       INITIAL POSITION
    ========================================== */

    gsap.set(ring, {
        opacity: 0,
        scale: 0.82,
        x: -40
    });

    gsap.set(eyebrow, {
        opacity: 0,
        y: 25
    });

    gsap.set(title, {
        opacity: 0,
        y: 45
    });

    gsap.set(description, {
        opacity: 0,
        y: 30
    });

    gsap.set(actions, {
        opacity: 0,
        y: 30
    });

    gsap.set(personImage, {
        opacity: 0,
        x: 100,
        scale: 1.04
    });

    gsap.set(geometry, {
        opacity: 0,
        x: 80
    });


    /* ==========================================
       MAIN REVEAL
    ========================================== */

    const heroAnimation = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });


    heroAnimation

        /* Background rings */

        .to(ring, {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.1
        })

        /* Small label */

        .to(eyebrow, {
            opacity: 1,
            y: 0,
            duration: 0.65
        }, "-=0.65")

        /* Heading */

        .to(title, {
            opacity: 1,
            y: 0,
            duration: 0.9
        }, "-=0.35")

        /* Description */

        .to(description, {
            opacity: 1,
            y: 0,
            duration: 0.7
        }, "-=0.45")

        /* Buttons */

        .to(actions, {
            opacity: 1,
            y: 0,
            duration: 0.7
        }, "-=0.4")

        /* Person image */

        .to(personImage, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.15,
            ease: "power3.out"
        }, "-=0.95")

        /* Exact geometric image */

        .to(geometry, {
            opacity: 1,
            x: 0,
            duration: 0.95,
            ease: "power3.out"
        }, "-=0.85");


    /* ==========================================
       VERY SLOW BACKGROUND MOVEMENT
    ========================================== */

    gsap.to(ring, {
        x: 10,
        y: 5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    /* ==========================================
       VERY SLOW IMAGE MOTION
    ========================================== */

    gsap.to(personImage, {
        scale: 1.025,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

});



/* =========================================================
   STACKLY RECOVERY SOLUTIONS
   GSAP SECTION ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       CHECK GSAP
    ========================================== */

    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded.");
        return;
    }


    /* ==========================================
       ELEMENTS
    ========================================== */

    const image =
        document.querySelector(".recovery-main-image");

    const badge =
        document.querySelector(".recovery-image-badge");

    const dots =
        document.querySelector(".recovery-dots");

    const label =
        document.querySelector(".recovery-label");

    const title =
        document.querySelector(".recovery-title");

    const description =
        document.querySelector(".recovery-description");

    const features =
        document.querySelectorAll(".recovery-feature");

    const button =
        document.querySelector(".recovery-button");

    const background =
        document.querySelector(".recovery-tech-bg");


    /* ==========================================
       SAFETY CHECK
    ========================================== */

    if (!image) {
        console.warn(
            "Recovery image element not found."
        );

        return;
    }


    /* ==========================================
       INITIAL STATES
    ========================================== */

    /*
       IMPORTANT:

       Image does NOT use x:-120.

       It stays in its original position
       and is completely hidden using clip-path.
    */

    gsap.set(image, {

        opacity: 1,

        x: 0,

        y: 0,

        scale: 1,

        clipPath: "inset(0 100% 0 0)"

    });


    /* Badge */

    if (badge) {

        gsap.set(badge, {

            opacity: 0,

            y: 30

        });

    }


    /* Dots */

    if (dots) {

        gsap.set(dots, {

            opacity: 0,

            scale: 0.65

        });

    }


    /* Label */

    if (label) {

        gsap.set(label, {

            opacity: 0,

            x: 70

        });

    }


    /* Title */

    if (title) {

        gsap.set(title, {

            opacity: 0,

            x: 90

        });

    }


    /* Description */

    if (description) {

        gsap.set(description, {

            opacity: 0,

            x: 70

        });

    }


    /* Features */

    if (features.length) {

        gsap.set(features, {

            opacity: 0,

            x: 65

        });

    }


    /* Button */

    if (button) {

        gsap.set(button, {

            opacity: 0,

            x: 65

        });

    }


    /* Background */

    if (background) {

        gsap.set(background, {

            opacity: 0,

            scale: 0.82

        });

    }


    /* ==========================================
       MAIN TIMELINE
    ========================================== */

    const timeline = gsap.timeline({

        defaults: {

            ease: "power3.out"

        }

    });


    /* ==========================================
       1. BACKGROUND CIRCLE
    ========================================== */

    if (background) {

        timeline.to(background, {

            opacity: 1,

            scale: 1,

            duration: 1.1,

            ease: "power2.out"

        });

    }


    /* ==========================================
       2. LEFT IMAGE
       HIDDEN → REVEAL
    ========================================== */

    timeline.to(image, {

        clipPath: "inset(0 0% 0 0)",

        duration: 1.15,

        ease: "power4.inOut"

    }, "+=0.35");


    /* ==========================================
       3. IMAGE BADGE
    ========================================== */

    if (badge) {

        timeline.to(badge, {

            opacity: 1,

            y: 0,

            duration: 0.65,

            ease: "power3.out"

        }, "-=0.45");

    }


    /* ==========================================
       4. IMAGE DOTS
    ========================================== */

    if (dots) {

        timeline.to(dots, {

            opacity: 1,

            scale: 1,

            duration: 0.55,

            ease: "back.out(1.4)"

        }, "-=0.40");

    }


    /* ==========================================
       5. RIGHT LABEL
    ========================================== */

    if (label) {

        timeline.to(label, {

            opacity: 1,

            x: 0,

            duration: 0.65

        }, "-=0.30");

    }


    /* ==========================================
       6. RIGHT TITLE
    ========================================== */

    if (title) {

        timeline.to(title, {

            opacity: 1,

            x: 0,

            duration: 0.85,

            ease: "power3.out"

        }, "-=0.40");

    }


    /* ==========================================
       7. DESCRIPTION
    ========================================== */

    if (description) {

        timeline.to(description, {

            opacity: 1,

            x: 0,

            duration: 0.65

        }, "-=0.45");

    }


    /* ==========================================
       8. FEATURES
       ONE BY ONE
    ========================================== */

    if (features.length) {

        timeline.to(features, {

            opacity: 1,

            x: 0,

            duration: 0.55,

            stagger: 0.18,

            ease: "power3.out"

        }, "-=0.30");

    }


    /* ==========================================
       9. BUTTON
    ========================================== */

    if (button) {

        timeline.to(button, {

            opacity: 1,

            x: 0,

            duration: 0.65,

            ease: "power3.out"

        }, "-=0.20");

    }


    /* ==========================================
       10. BACKGROUND CONTINUOUS MOTION
    ========================================== */

    if (background) {

        gsap.to(background, {

            rotation: 8,

            duration: 15,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        });

    }


    /* ==========================================
       11. IMAGE VERY SMALL FLOATING MOTION
    ========================================== */

    gsap.to(image, {

        y: -4,

        duration: 4.5,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    });


    /* ==========================================
       12. BADGE VERY SMALL FLOAT
    ========================================== */

    if (badge) {

        gsap.to(badge, {

            y: -3,

            duration: 3.5,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        });

    }


    /* ==========================================
       13. DOTS SMALL FLOAT
    ========================================== */

    if (dots) {

        gsap.to(dots, {

            y: -5,

            duration: 3,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        });

    }

});


/* =========================================================
   STACKLY BACKUP & RECOVERY
   SOLUTIONS GSAP ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (typeof gsap === "undefined") {

        console.warn("GSAP is not loaded.");

        return;
    }


    /* ==========================================
       ELEMENTS
    ========================================== */

    const section =
        document.querySelector(".recovery-solutions");

    if (!section) {
        return;
    }


    const label =
        section.querySelector(".solutions-label");

    const heading =
        section.querySelector(".solutions-heading h2");

    const cards =
        section.querySelectorAll(".solution-card");

    const leftDecoration =
        section.querySelector(".solutions-left-decoration");

    const rightDecoration =
        section.querySelector(".solutions-right-decoration");


    /* ==========================================
       INITIAL STATES
    ========================================== */

    gsap.set(label, {

        opacity: 0,

        y: 25

    });


    gsap.set(heading, {

        opacity: 0,

        y: 35

    });


    /*
       Alternate card directions.

       Desktop:
       Card 1 → left
       Card 2 → right
       Card 3 → left
       Card 4 → right
    */

    cards.forEach(function (card, index) {

        gsap.set(card, {

            opacity: 0,

            x: index % 2 === 0
                ? -100
                : 100,

            y: 25,

            scale: 0.96

        });

    });


    /* Decorative shapes */

    gsap.set(leftDecoration, {

        opacity: 0,

        x: -40

    });


    gsap.set(rightDecoration, {

        opacity: 0,

        scale: 0.8

    });


    /* ==========================================
       TIMELINE
    ========================================== */

    const timeline = gsap.timeline({

        defaults: {

            ease: "power3.out"

        }

    });


    /* ==========================================
       LEFT DECORATION
    ========================================== */

    timeline.to(leftDecoration, {

        opacity: 1,

        x: 0,

        duration: 0.8

    });


    /* ==========================================
       RIGHT DECORATION
    ========================================== */

    timeline.to(rightDecoration, {

        opacity: 1,

        scale: 1,

        duration: 1

    }, "-=0.65");


    /* ==========================================
       LABEL
    ========================================== */

    timeline.to(label, {

        opacity: 1,

        y: 0,

        duration: 0.65

    }, "-=0.55");


    /* ==========================================
       HEADING
    ========================================== */

    timeline.to(heading, {

        opacity: 1,

        y: 0,

        duration: 0.8

    }, "-=0.35");


    /* ==========================================
       CARDS
       REVEAL FROM BOTH SIDES
    ========================================== */

    timeline.to(cards, {

        opacity: 1,

        x: 0,

        y: 0,

        scale: 1,

        duration: 0.8,

        stagger: 0.16,

        ease: "power3.out"

    }, "-=0.35");


    /* ==========================================
       VERY SUBTLE DECORATION MOTION
    ========================================== */

    gsap.to(rightDecoration, {

        rotation: 8,

        duration: 14,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    });


    gsap.to(leftDecoration, {

        y: 8,

        duration: 6,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    });


    /* ==========================================
       CARD HOVER ENHANCEMENT
    ========================================== */

    cards.forEach(function (card) {

        const icon =
            card.querySelector(".solution-icon");

        const plus =
            card.querySelector(".solution-plus");


        card.addEventListener("mouseenter", function () {

            gsap.to(card, {

                y: -8,

                duration: 0.35,

                ease: "power2.out"

            });


            if (icon) {

                gsap.to(icon, {

                    scale: 1.06,

                    duration: 0.3,

                    ease: "power2.out"

                });

            }


            if (plus) {

                gsap.to(plus, {

                    rotation: 90,

                    duration: 0.35,

                    ease: "power2.out"

                });

            }

        });


        card.addEventListener("mouseleave", function () {

            gsap.to(card, {

                y: 0,

                duration: 0.4,

                ease: "power2.out"

            });


            if (icon) {

                gsap.to(icon, {

                    scale: 1,

                    duration: 0.3

                });

            }


            if (plus) {

                gsap.to(plus, {

                    rotation: 0,

                    duration: 0.35,

                    ease: "power2.out"

                });

            }

        });

    });

});



/* =========================================================
   STACKLY BACKUP & RECOVERY
   APPROACH SECTION - GSAP ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       GSAP CHECK
    ========================================== */

    if (typeof gsap === "undefined") {

        console.warn("GSAP is not loaded.");

        return;
    }


    /* ==========================================
       SECTION
    ========================================== */

    const section =
        document.querySelector(".recovery-approach");

    if (!section) {
        return;
    }


    /* ==========================================
       ELEMENTS
    ========================================== */

    const imageWrapper =
        section.querySelector(".recovery-circle-image");

    const image =
        section.querySelector(".recovery-circle-image img");

    const imageDots =
        section.querySelector(".recovery-image-dots");

    const imageShape =
        section.querySelector(".recovery-image-shape");

    const label =
        section.querySelector(".recovery-approach-label");

    const title =
        section.querySelector(".recovery-approach-content h2");

    const description =
        section.querySelector(".recovery-approach-description");

    const cards =
        section.querySelectorAll(".recovery-approach-card");


    /* ==========================================
       IMPORTANT IMAGE SETUP
    ========================================== */

    if (imageWrapper) {

        gsap.set(imageWrapper, {

            overflow: "hidden"

        });

    }


    /*
       ACTUAL IMAGE:

       Starts completely hidden
       from bottom.

       It does NOT move from left/right.
    */

    if (image) {

        gsap.set(image, {

            opacity: 1,

            scaleY: 0,

            transformOrigin: "center bottom"

        });

    }


    /* ==========================================
       INITIAL DECORATION STATES
    ========================================== */

    if (imageDots) {

        gsap.set(imageDots, {

            opacity: 0,

            y: 25

        });

    }


    if (imageShape) {

        gsap.set(imageShape, {

            opacity: 0,

            scale: 0.5,

            rotation: -20

        });

    }


    /* ==========================================
       RIGHT CONTENT INITIAL STATES
    ========================================== */

    if (label) {

        gsap.set(label, {

            opacity: 0,

            x: 60

        });

    }


    if (title) {

        gsap.set(title, {

            opacity: 0,

            x: 75

        });

    }


    if (description) {

        gsap.set(description, {

            opacity: 0,

            x: 60

        });

    }


    /* ==========================================
       CARDS INITIAL STATES
    ========================================== */

    if (cards.length) {

        gsap.set(cards, {

            opacity: 0,

            x: -70,

            y: 15

        });

    }


    /* ==========================================
       ANIMATION FUNCTION
    ========================================== */

    function playRecoveryAnimation() {


        const timeline = gsap.timeline({

            defaults: {

                ease: "power3.out"

            }

        });


        /* ======================================
           1. IMAGE
           BOTTOM → TOP
        ====================================== */

        if (image) {

            timeline.to(image, {

                scaleY: 1,

                duration: 1.5,

                ease: "power4.out"

            });

        }


        /* ======================================
           2. IMAGE DOTS
        ====================================== */

        if (imageDots) {

            timeline.to(imageDots, {

                opacity: 1,

                y: 0,

                duration: 0.65,

                ease: "power3.out"

            }, "-=0.85");

        }


        /* ======================================
           3. IMAGE SHAPE
        ====================================== */

        if (imageShape) {

            timeline.to(imageShape, {

                opacity: 1,

                scale: 1,

                rotation: 20,

                duration: 0.7,

                ease: "back.out(1.5)"

            }, "-=0.55");

        }


        /* ======================================
           4. LABEL
        ====================================== */

        if (label) {

            timeline.to(label, {

                opacity: 1,

                x: 0,

                duration: 0.65,

                ease: "power3.out"

            }, "-=0.65");

        }


        /* ======================================
           5. TITLE
        ====================================== */

        if (title) {

            timeline.to(title, {

                opacity: 1,

                x: 0,

                duration: 0.85,

                ease: "power3.out"

            }, "-=0.42");

        }


        /* ======================================
           6. DESCRIPTION
        ====================================== */

        if (description) {

            timeline.to(description, {

                opacity: 1,

                x: 0,

                duration: 0.65,

                ease: "power3.out"

            }, "-=0.48");

        }


        /* ======================================
           7. CARDS
           ONE BY ONE
        ====================================== */

        if (cards.length) {

            timeline.to(cards, {

                opacity: 1,

                x: 0,

                y: 0,

                duration: 0.7,

                stagger: 0.16,

                ease: "power3.out"

            }, "-=0.25");

        }


        /* ======================================
           SUBTLE IMAGE FLOAT
           AFTER REVEAL
        ====================================== */

        if (image) {

            gsap.to(image, {

                y: -4,

                duration: 4.5,

                repeat: -1,

                yoyo: true,

                ease: "sine.inOut",

                delay: 1.5

            });

        }


        /* ======================================
           DECORATIVE SHAPE FLOAT
        ====================================== */

        if (imageShape) {

            gsap.to(imageShape, {

                y: -7,

                rotation: 25,

                duration: 4,

                repeat: -1,

                yoyo: true,

                ease: "sine.inOut",

                delay: 1.5

            });

        }

    }


    /* ==========================================
       START WHEN SECTION ENTERS VIEW
    ========================================== */

    let animationPlayed = false;


    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (
                        entry.isIntersecting &&
                        !animationPlayed
                    ) {

                        animationPlayed = true;

                        playRecoveryAnimation();

                        observer.disconnect();

                    }

                });

            },

            {
                threshold: 0.18
            }

        );


    observer.observe(section);


    /* ==========================================
       CARD HOVER
    ========================================== */

    cards.forEach(function (card) {

        const icon =
            card.querySelector(
                ".recovery-approach-icon"
            );


        card.addEventListener(
            "mouseenter",
            function () {

                gsap.to(card, {

                    x: 8,

                    duration: 0.35,

                    ease: "power2.out"

                });


                if (icon) {

                    gsap.to(icon, {

                        scale: 1.06,

                        duration: 0.3,

                        ease: "power2.out"

                    });

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                gsap.to(card, {

                    x: 0,

                    duration: 0.4,

                    ease: "power2.out"

                });


                if (icon) {

                    gsap.to(icon, {

                        scale: 1,

                        duration: 0.3,

                        ease: "power2.out"

                    });

                }

            }
        );

    });

});



/* =========================================================
   STACKLY BACKUP & RECOVERY
   SERVICES GSAP ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       GSAP CHECK
    ========================================== */

    if (typeof gsap === "undefined") {

        console.warn("GSAP is not loaded.");

        return;
    }


    /* ==========================================
       SECTION
    ========================================== */

    const section =
        document.querySelector(".backup-services");

    if (!section) {

        return;

    }


    /* ==========================================
       ELEMENTS
    ========================================== */

    const heading =
        section.querySelector(
            ".backup-services-heading"
        );


    const cards =
        section.querySelectorAll(
            ".backup-service-card"
        );


    const button =
        section.querySelector(
            ".backup-services-button"
        );


    /* ==========================================
       HEADING INITIAL STATE
    ========================================== */

    gsap.set(heading, {

        opacity: 0,

        y: 35

    });


    /* ==========================================
       CARDS INITIAL STATES
    ========================================== */

    cards.forEach(function (card, index) {

        gsap.set(card, {

            opacity: 0,

            x:
                index % 2 === 0
                    ? -100
                    : 100,

            y: 30,

            scale: 0.96

        });

    });


    /* ==========================================
       BUTTON
    ========================================== */

    if (button) {

        gsap.set(button, {

            opacity: 0,

            y: 25

        });

    }


    /* ==========================================
       CARD CONTENT INITIAL STATE
    ========================================== */

    cards.forEach(function (card) {

        const content =
            card.querySelector(
                ".backup-service-content"
            );


        if (content) {

            gsap.set(content, {

                opacity: 0,

                y: 25

            });

        }

    });


    /* ==========================================
       PLAY ANIMATION
    ========================================== */

    function playServicesAnimation() {

        const timeline =
            gsap.timeline({

                defaults: {

                    ease: "power3.out"

                }

            });


        /* ======================================
           HEADING
        ====================================== */

        timeline.to(heading, {

            opacity: 1,

            y: 0,

            duration: 0.8,

            ease: "power3.out"

        });


        /* ======================================
           CARDS
           LEFT / RIGHT
        ====================================== */

        timeline.to(cards, {

            opacity: 1,

            x: 0,

            y: 0,

            scale: 1,

            duration: 0.85,

            stagger: 0.12,

            ease: "power3.out"

        }, "-=0.35");


        /* ======================================
           CONTENT
           SMOOTH REVEAL
        ====================================== */

        cards.forEach(function (card, index) {

            const content =
                card.querySelector(
                    ".backup-service-content"
                );


            if (!content) return;


            timeline.to(content, {

                opacity: 1,

                y: 0,

                duration: 0.55,

                ease: "power3.out"

            }, "-=" + (
                0.65 - (index * 0.04)
            ));

        });


        /* ======================================
           VIEW BUTTON
        ====================================== */

        if (button) {

            timeline.to(button, {

                opacity: 1,

                y: 0,

                duration: 0.6,

                ease: "power3.out"

            }, "-=0.25");

        }

    }


    /* ==========================================
       INTERSECTION OBSERVER
    ========================================== */

    let animationPlayed = false;


    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting &&
                            !animationPlayed
                        ) {

                            animationPlayed = true;

                            playServicesAnimation();

                            observer.disconnect();

                        }

                    }
                );

            },

            {

                threshold: 0.15

            }

        );


    observer.observe(section);


    /* ==========================================
       CARD HOVER
    ========================================== */

    cards.forEach(function (card) {

        const icon =
            card.querySelector(
                ".backup-service-icon"
            );


        const image =
            card.querySelector(
                ".backup-service-image img"
            );


        card.addEventListener(
            "mouseenter",
            function () {

                if (icon) {

                    gsap.to(icon, {

                        scale: 1.12,

                        duration: 0.35,

                        ease: "power2.out"

                    });

                }


                if (image) {

                    gsap.to(image, {

                        scale: 1.08,

                        duration: 0.6,

                        ease: "power2.out"

                    });

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                if (icon) {

                    gsap.to(icon, {

                        scale: 1,

                        duration: 0.35,

                        ease: "power2.out"

                    });

                }


                if (image) {

                    gsap.to(image, {

                        scale: 1,

                        duration: 0.6,

                        ease: "power2.out"

                    });

                }

            }
        );

    });

});


document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded.");
        return;
    }

    const teamSection = document.querySelector(".backup-team");

    if (!teamSection) return;


    /* ================= INITIAL STATE ================= */

    const cards = gsap.utils.toArray(".backup-team-card");

    const images = gsap.utils.toArray(".backup-team-image");

    const contents = gsap.utils.toArray(".backup-team-content");


    gsap.set(cards, {
        opacity: 0,
        y: 70,
        scale: 0.94
    });


    gsap.set(images, {
        opacity: 0,
        scale: 0.65,
        rotation: -25
    });


    gsap.set(contents, {
        opacity: 0,
        y: 35
    });


    /* ================= HEADING ================= */

    gsap.set(".backup-team-label", {
        opacity: 0,
        y: 25,
        scale: 0.9
    });


    gsap.set(".backup-team-heading h2", {
        opacity: 0,
        y: 35
    });


    /* ================= INTERSECTION ================= */

    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;


            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });


            /* Label */

            tl.to(".backup-team-label", {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7
            });


            /* Heading */

            tl.to(".backup-team-heading h2", {
                opacity: 1,
                y: 0,
                duration: 0.8
            }, "-=0.4");


            /* Cards */

            tl.to(cards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.15
            }, "-=0.3");


            /* Round images */

            tl.to(images, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1.2,
                stagger: 0.16,
                ease: "back.out(1.4)"
            }, "-=0.6");


            /* Content */

            tl.to(contents, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12
            }, "-=0.7");


            obs.unobserve(entry.target);

        });

    }, {
        threshold: 0.15
    });


    observer.observe(teamSection);


    /* ================= IMAGE FLOAT ================= */

    images.forEach((image, index) => {

        gsap.to(image, {
            y: index % 2 === 0 ? -5 : 5,
            duration: 2.8 + index * 0.15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.5 + index * 0.15
        });

    });


    /* ================= CARD HOVER ================= */

    cards.forEach(card => {

        const image = card.querySelector(".backup-team-image");

        const img = card.querySelector(".backup-team-image img");


        card.addEventListener("mouseenter", () => {

            gsap.to(image, {
                scale: 1.04,
                duration: 0.45,
                ease: "power2.out"
            });


            gsap.to(img, {
                scale: 1.1,
                duration: 0.55,
                ease: "power2.out"
            });

        });


        card.addEventListener("mouseleave", () => {

            gsap.to(image, {
                scale: 1,
                duration: 0.45,
                ease: "power2.out"
            });


            gsap.to(img, {
                scale: 1.02,
                duration: 0.55,
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


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const section = document.querySelector(".backup-about");

    if (!section) return;


    const mainImage =
        section.querySelector(".backup-about-image-main");

    const secondImage =
        section.querySelector(".backup-about-image-secondary");

    const mainImg =
        section.querySelector(".backup-about-image-main img");

    const secondImg =
        section.querySelector(".backup-about-image-secondary img");

    const content =
        section.querySelector(".backup-about-content");

    const label =
        section.querySelector(".backup-about-label");

    const heading =
        section.querySelector(".backup-about-content h2");

    const description =
        section.querySelector(".backup-about-description");

    const features =
        section.querySelectorAll(".backup-about-feature");

    const progressItems =
        section.querySelectorAll(".backup-progress-item");

    const progressBars =
        section.querySelectorAll(".backup-progress-track span");

    const experience =
        section.querySelector(".backup-about-experience");

    const dots =
        section.querySelector(".backup-about-dots");


    /* =====================================================
       INITIAL STATES
    ===================================================== */

    /*
       Main image:
       reveal from LEFT -> RIGHT
    */

    gsap.set(mainImage, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 1
    });


    /*
       Secondary image:
       reveal from BOTTOM -> TOP
    */

    gsap.set(secondImage, {
        clipPath: "inset(100% 0 0 0)",
        opacity: 1
    });


    /*
       Image internal scale
    */

    gsap.set(mainImg, {
        scale: 1.12
    });


    gsap.set(secondImg, {
        scale: 1.12
    });


    /*
       Right content:
       enters from RIGHT
    */

    gsap.set(content, {
        opacity: 0,
        x: 100
    });


    /*
       Content children
    */

    gsap.set(
        [
            label,
            heading,
            description,
            ...features,
            ...progressItems
        ],
        {
            opacity: 0,
            y: 30
        }
    );


    /*
       Badge
    */

    gsap.set(experience, {
        opacity: 0,
        scale: 0.7,
        y: 30
    });


    /*
       Decorative dots
    */

    gsap.set(dots, {
        opacity: 0,
        scale: 0.7
    });


    /*
       Progress bars
    */

    gsap.set(progressBars, {
        width: "0%"
    });


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer = new IntersectionObserver(
        function (entries, observerInstance) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) return;


                /* =================================================
                   MASTER TIMELINE
                ================================================= */

                const tl = gsap.timeline({
                    defaults: {
                        ease: "power3.out"
                    }
                });


                /* ================================================
                   MAIN IMAGE
                   LEFT -> RIGHT
                ================================================ */

                tl.to(mainImage, {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 1.45,
                    ease: "power4.inOut"
                });


                /* Main image subtle zoom */

                tl.to(mainImg, {
                    scale: 1,
                    duration: 1.6,
                    ease: "power3.out"
                }, "<");


                /* ================================================
                   SECOND IMAGE
                   BOTTOM -> TOP
                ================================================ */

                tl.to(secondImage, {
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.35,
                    ease: "power4.inOut"
                }, "-=0.85");


                /* Secondary image zoom */

                tl.to(secondImg, {
                    scale: 1,
                    duration: 1.5,
                    ease: "power3.out"
                }, "<");


                /* ================================================
                   DECORATIVE DOTS
                ================================================ */

                tl.to(dots, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    ease: "back.out(1.5)"
                }, "-=1.0");


                /* ================================================
                   EXPERIENCE BADGE
                ================================================ */

                tl.to(experience, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "back.out(1.5)"
                }, "-=0.65");


                /* ================================================
                   RIGHT CONTENT
                   RIGHT -> LEFT
                ================================================ */

                tl.to(content, {
                    opacity: 1,
                    x: 0,
                    duration: 1.15,
                    ease: "power4.out"
                }, "-=1.1");


                /* ================================================
                   LABEL
                ================================================ */

                tl.to(label, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6
                }, "-=0.65");


                /* ================================================
                   HEADING
                ================================================ */

                tl.to(heading, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8
                }, "-=0.4");


                /* ================================================
                   DESCRIPTION
                ================================================ */

                tl.to(description, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7
                }, "-=0.45");


                /* ================================================
                   FEATURES
                ================================================ */

                tl.to(features, {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    stagger: 0.16
                }, "-=0.35");


                /* ================================================
                   PROGRESS
                ================================================ */

                tl.to(progressItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.12
                }, "-=0.4");


                /* ================================================
                   PROGRESS BAR VALUES
                ================================================ */

                progressBars.forEach(function (bar) {

                    const value =
                        bar.getAttribute("data-progress") || 0;

                    tl.to(bar, {
                        width: value + "%",
                        duration: 1.25,
                        ease: "power3.out"
                    }, "-=0.55");

                });


                /* ================================================
                   IMAGE FLOAT
                ================================================ */

                gsap.to(mainImage, {
                    y: -6,
                    duration: 3.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 2.2
                });


                gsap.to(secondImage, {
                    y: 6,
                    duration: 4,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 2.4
                });


                /* ================================================
                   IMAGE HOVER
                ================================================ */

                mainImage.addEventListener("mouseenter", function () {

                    gsap.to(mainImg, {
                        scale: 1.06,
                        duration: 0.7,
                        ease: "power2.out"
                    });

                });


                mainImage.addEventListener("mouseleave", function () {

                    gsap.to(mainImg, {
                        scale: 1,
                        duration: 0.7,
                        ease: "power2.out"
                    });

                });


                secondImage.addEventListener("mouseenter", function () {

                    gsap.to(secondImg, {
                        scale: 1.06,
                        duration: 0.7,
                        ease: "power2.out"
                    });

                });


                secondImage.addEventListener("mouseleave", function () {

                    gsap.to(secondImg, {
                        scale: 1,
                        duration: 0.7,
                        ease: "power2.out"
                    });

                });


                observerInstance.unobserve(entry.target);

            });

        },
        {
            threshold: 0.18
        }
    );


    observer.observe(section);

});



document.addEventListener("DOMContentLoaded", function () {

    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded.");
        return;
    }


    const section =
        document.querySelector(".backup-protection");

    if (!section) return;


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const content =
        section.querySelector(".backup-protection-content");

    const label =
        section.querySelector(".backup-protection-label");

    const heading =
        section.querySelector(".backup-protection-content h2");

    const description =
        section.querySelector(".backup-protection-description");

    const cards =
        section.querySelectorAll(".backup-protection-card");

    const image =
        section.querySelector(".backup-protection-image");

    const imageElement =
        section.querySelector(".backup-protection-image img");

    const dots =
        section.querySelectorAll(".backup-protection-dots");


    /* =====================================================
       INITIAL STATES
    ===================================================== */

    /* Left content */

    gsap.set(content, {
        opacity: 0,
        x: -100
    });


    gsap.set(label, {
        opacity: 0,
        x: -45
    });


    gsap.set(heading, {
        opacity: 0,
        x: -60
    });


    gsap.set(description, {
        opacity: 0,
        x: -50
    });


    /* Cards */

    gsap.set(cards, {
        opacity: 0,
        x: -55,
        y: 20
    });


    /* =====================================================
       IMAGE ROTATIONAL START
    ===================================================== */

    gsap.set(image, {
        opacity: 0,
        scale: 0.72,
        rotation: -25,
        transformOrigin: "center center"
    });


    gsap.set(imageElement, {
        scale: 1.08
    });


    /* Decorative dots */

    gsap.set(dots, {
        opacity: 0,
        scale: 0.5
    });


    /* =====================================================
       OBSERVER
    ===================================================== */

    const observer = new IntersectionObserver(
        function (entries, observerInstance) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) return;


                const tl = gsap.timeline({
                    defaults: {
                        ease: "power3.out"
                    }
                });


                /* ============================================
                   LEFT CONTENT
                ============================================ */

                tl.to(content, {
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                    ease: "power4.out"
                });


                /* Label */

                tl.to(label, {
                    opacity: 1,
                    x: 0,
                    duration: 0.6
                }, "-=0.55");


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


                /* ============================================
                   FEATURE CARDS
                ============================================ */

                tl.to(cards, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 0.65,
                    stagger: 0.12,
                    ease: "power3.out"
                }, "-=0.25");


                /* ============================================
                   RIGHT IMAGE
                   ROTATE + SCALE + REVEAL
                ============================================ */

                tl.to(image, {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1.6,
                    ease: "power4.out"
                }, "-=1.2");


                /* Image internal zoom */

                tl.to(imageElement, {
                    scale: 1,
                    duration: 1.6,
                    ease: "power3.out"
                }, "<");


                /* ============================================
                   DOTS
                ============================================ */

                tl.to(dots, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "back.out(1.5)"
                }, "-=1.1");


                /* ============================================
                   SUBTLE CONTINUOUS ROTATION
                ============================================ */

                gsap.to(image, {
                    y: -7,
                    duration: 3.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 2
                });


                /* ============================================
                   IMAGE HOVER
                ============================================ */

                image.addEventListener("mouseenter", function () {

                    gsap.to(imageElement, {
                        scale: 1.035,
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


                observerInstance.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15
        }
    );


    observer.observe(section);


    /* =====================================================
       CARD HOVER ANIMATION
    ===================================================== */

    cards.forEach(function (card) {

        const icon =
            card.querySelector(".backup-check");


        card.addEventListener("mouseenter", function () {

            gsap.to(icon, {
                rotation: 360,
                duration: 0.55,
                ease: "power2.out"
            });


            gsap.to(card, {
                y: -5,
                duration: 0.35,
                ease: "power2.out"
            });

        });


        card.addEventListener("mouseleave", function () {

            gsap.to(icon, {
                rotation: 0,
                duration: 0.45,
                ease: "power2.out"
            });


            gsap.to(card, {
                y: 0,
                duration: 0.35,
                ease: "power2.out"
            });

        });

    });

});


