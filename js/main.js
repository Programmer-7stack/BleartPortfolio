window.wpbingo = window.wpbingo || {};
wpbingo.strings = {};

wpbingo.settings = {
    enableReview: true,
    enablePreLoading: true,
    sidebarMultiChoise: true,
    enableQuickView: false,
    quickViewVariantType: "radio",
};

wpbingo.loading = `
  <div class="wpbingo-loading">
    <div class="wpbingo-loading__icon">
      <span></span><span></span><span></span><span></span>
    </div>
  </div>
`;


// Selektimi i elementeve me verifikim
const justBlack = document.querySelector("#just-black");
const enterSound = document.querySelector("#enter-sound");
const introWindow = document.querySelector(".intro-window");
const enterImage = document.querySelector(".enter-image");
const animationVideoContainer = document.querySelector(".animation");
const animationVideo = document.querySelectorAll(".animation video");
const mainContentEl = document.querySelector("#main-content");
const headerEl = document.querySelector("header");
const volumeIntro = 20;

if (sessionStorage.getItem("videoPlayed") && introWindow) {
    introWindow.style.display = "none";
}

if (animationVideoContainer) {
    animationVideoContainer.addEventListener("click", () => {
        animationVideo.forEach((vid) => vid.play());
        if (justBlack) justBlack.style.display = "none";
        if (enterSound) {
            enterSound.volume = volumeIntro / 100;
            enterSound.play();
        }
        if (mainContentEl) mainContentEl.style.transition = "opacity 0.5s ease-in";
        if (headerEl) headerEl.style.transition = "opacity 0.5s ease-in";
        if (mainContentEl) mainContentEl.style.opacity = "0";
        if (headerEl) headerEl.style.opacity = "0";
    });
}

function removeIntroWindow() {
    if (introWindow) {
        introWindow.classList.add("fade-out");
        sessionStorage.setItem("videoPlayed", true);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    // Portfolio Mobile Menu
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav .nav-link");

    function toggleMobileMenu() {
        if (mobileMenuBtn) mobileMenuBtn.classList.toggle("active");
        if (mobileMenu) mobileMenu.classList.toggle("active");
        document.body.style.overflow = mobileMenu?.classList.contains("active") ? "hidden" : "auto";
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", toggleMobileMenu);
    }

    mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            toggleMobileMenu();
            updateActiveSection(link.getAttribute("href").substring(1));
        });
    });

    // Navigation
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");

    function updateActiveSection(sectionId) {
        sections.forEach((section) => {
            section.classList.remove("active");
            if (section.id === sectionId) section.classList.add("active");
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
                link.classList.add("active");
            }
        });

        window.history.pushState({}, "", `#${sectionId}`);
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            updateActiveSection(link.getAttribute("href").substring(1));
        });
    });

    const initialSection = window.location.hash ? window.location.hash.substring(1) : "home";
    updateActiveSection(initialSection);


    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            if (mobileMenu) mobileMenu.classList.remove("active");
            if (mobileMenuBtn) mobileMenuBtn.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
});


 