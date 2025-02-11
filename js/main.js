document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function setActiveSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            setActiveSection(sectionId);
            window.history.pushState({}, '', `#${sectionId}`);
        });
    });

    // Set initial section based on URL hash
    const initialSection = window.location.hash ? window.location.hash.substring(1) : 'home';
    setActiveSection(initialSection);

    // Projects Slider
    const projectsData = [
        {
            title: 'Bleart 7 - E-commerce',
            description: 'Here you can buy everything',
            image: 'photos/1.png'
        },
        {
            title: 'Project2',
            description: 'Project2',
            image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000'
        },
        {
            title: 'Project3',
            description: 'Project3',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1000'
        }
    ];

    let currentSlide = 0;
    const projectsWrapper = document.querySelector('.projects-wrapper');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    function updateSlider() {
        const project = projectsData[currentSlide];
        projectsWrapper.innerHTML = `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-links">
                    <a href="https://github.com/Programmer-7stack" class="project-btn">GitHub</a>
                    <a href="https://programmer-7stack.github.io/bleart7/" class="project-btn">Preview</a>
                </div>
            </div>
        `;
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + projectsData.length) % projectsData.length;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % projectsData.length;
        updateSlider();
    });

    // Initialize slider
    updateSlider();

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            sections.forEach((section) => {
                section.classList.remove("fade-in", "slide-up", "zoom-in");
            });

            if (targetId === "home") {
                targetSection.classList.add("fade-in");
            } else if (targetId === "about") {
                targetSection.classList.add("slide-up");
            } else if (targetId === "projects") {
                targetSection.classList.add("zoom-in");
            }
            else if (targetId === "skills") {
                targetSection.classList.add("zoom-in");
            }

            else if (targetId === "contact") {
                targetSection.classList.add("zoom-in");
            }

            sections.forEach((section) => section.classList.remove("active"));
            targetSection.classList.add("active");
        });
    });
});
