// CARROSSEL
document.addEventListener("DOMContentLoaded", () => {
    const col1 = document.querySelector(".sec-2-col-1.js-scroll-animated-col");
    const col2 = document.querySelector(".sec-2-col-2.js-scroll-animated-col");
    const cardsWrapper = document.querySelector(".sec-2-cards-wrapper");

    if (!col1 || !col2 || !cardsWrapper) {
        console.warn("Elementos não encontrados para a animação de scroll.");
        return;
    }

    let scrollPosition = window.scrollY;
    let animationFrameId = null;

    const animateOnScroll = () => {
        const newScrollPosition = window.scrollY;
        const scrollDelta = newScrollPosition - scrollPosition;
        const wrapperRect = cardsWrapper.getBoundingClientRect();
        const wrapperTop = wrapperRect.top;
        const wrapperHeight = wrapperRect.height;
        const activationThreshold = window.innerHeight * 0.05; // 75% da altura da viewport
        const isActive =
            wrapperTop < window.innerHeight - activationThreshold && wrapperTop > -wrapperHeight + activationThreshold;

        if (isActive) {
            const speedFactor1 = 0.6;
            const speedFactor2 = 0.6;
            col1.style.transform = `translateY(${scrollDelta * speedFactor1}px)`;
            col2.style.transform = `translateY(${-scrollDelta * speedFactor2}px)`;
            const translateY1 = newScrollPosition * speedFactor1;
            const translateY2 = -newScrollPosition * speedFactor2; // Note o negativo para direção oposta
            const sectionScrollProgress = (window.innerHeight - wrapperRect.top) / (window.innerHeight + wrapperRect.height);
            const maxMovement = 1200; // Por exemplo, 300px de movimento total para cada coluna
            col1.style.transform = `translateY(${sectionScrollProgress * maxMovement}px)`;
            col2.style.transform = `translateY(${-sectionScrollProgress * maxMovement}px)`;
        } else {
            col1.style.transform = `translateY(0px)`;
            col2.style.transform = `translateY(0px)`;
        }
        scrollPosition = newScrollPosition; // Atualiza a posição para o próximo frame
    };

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    animateOnScroll();
});

// FIM CARROSSEL

// HEADER
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuTrigger = document.getElementById("mobile-menu-trigger");
    const navbar = document.getElementById("navbar");
    const navMenu = navbar.querySelector(".nav-menu");
    const contactButton = navbar.querySelector(".main-contact-btn");

    if (mobileMenuTrigger && navbar) {
        mobileMenuTrigger.addEventListener("click", function () {
            navbar.classList.toggle("is-active");

            if (navbar.classList.contains("is-active")) {
                document.body.classList.add("menu-open-no-scroll");
            } else {
                document.body.classList.remove("menu-open-no-scroll");
            }
        });
    }

    const navLinks = navMenu.querySelectorAll(".nav-links");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navbar.classList.contains("is-active")) {
                navbar.classList.remove("is-active");
                document.body.classList.remove("menu-open-no-scroll");
            }
        });
    });

    if (contactButton) {
        contactButton.addEventListener("click", () => {
            if (navbar.classList.contains("is-active") && window.innerWidth <= 768) {
                navbar.classList.remove("is-active");
                document.body.classList.remove("menu-open-no-scroll");
            }
        });
    }
});
// FIM HEADER