// Custom Cursor
class CustomCursor {
    constructor() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.init();
            });
        } else {
            this.init();
        }
    }
    
    init() {
        this.cursor = document.getElementById('cursor');
        this.cursorFollower = document.getElementById('cursorFollower');
        
        if (!this.cursor || !this.cursorFollower) {
            console.warn('Cursor elements not found');
            return;
        }
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.updateCursor(e.clientX, e.clientY);
        });
        
        // Add hover effects
        this.addHoverEffects();
        
        // Hide/show cursor when leaving/entering window
        document.addEventListener('mouseleave', () => {
            this.hideCursor();
        });
        
        document.addEventListener('mouseenter', () => {
            this.showCursor();
        });
    }
    
    updateCursor(x, y) {
        // Cursore principale: centrato perfettamente
        this.cursor.style.left = (x - 10) + 'px';
        this.cursor.style.top = (y - 10) + 'px';
        
        // Cursore follower: centrato e con movimento più fluido
        requestAnimationFrame(() => {
            this.cursorFollower.style.left = (x - 20) + 'px';
            this.cursorFollower.style.top = (y - 20) + 'px';
        });
    }
    
    addHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .work-item, .service');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
                this.cursorFollower.classList.add('cursor-follower-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
                this.cursorFollower.classList.remove('cursor-follower-hover');
            });
        });
    }
    
    hideCursor() {
        this.cursor.style.opacity = '0';
        this.cursorFollower.style.opacity = '0';
    }
    
    showCursor() {
        this.cursor.style.opacity = '1';
        this.cursorFollower.style.opacity = '1';
    }
    
}

// Initialize scroll animations
function initScrollAnimations() {
    // Modern scroll animations with Intersection Observer
    const animationElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale');
    
    const animationOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const animationObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add appear class with a small delay for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('appear');
                }, 50);
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, animationOptions);
    
    // Observe all animation elements
    animationElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    
    if (!mobileMenuToggle || !mobileMenu || !mobileMenuClose) return;
    
    // Open menu
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close menu
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking on links
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded');
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize project preview
    initProjectPreview();
    
    // Initialize parallax effect for hero image
    initParallaxEffect();

    // Disintegration effect disattivato su richiesta
    
    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Page transition navigation
    initPageTransitions();

    // First-load intro
    initFirstLoadIntro();
    
    // Performance optimization: Throttle scroll events
    let scrollTimeout;
    function throttleScroll(callback, delay) {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            callback();
            scrollTimeout = null;
        }, delay);
    }
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #000, #666);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        throttleScroll(() => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }, 10);
    }, { passive: true });
    
    // Enhanced project preview hover effects
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Playground project modal functionality
    const playgroundProjects = document.querySelectorAll('.playground-project');
    const modal = document.getElementById('playgroundModal');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalYear = document.getElementById('modalYear');
    const modalTools = document.getElementById('modalTools');
    const modalGallery = document.getElementById('modalGallery');
    
    let currentProjectIndex = 0;
    
    // Function to update modal content
    function updateModalContent(projectIndex) {
        const project = playgroundProjects[projectIndex];
        if (!project) return;
        
        // Get project data
        const title = project.getAttribute('data-title');
        const subtitle = project.querySelector('.project-tags').textContent;
        const description = project.getAttribute('data-description');
        const year = project.getAttribute('data-year');
        const tools = project.getAttribute('data-tools');
        const images = project.getAttribute('data-images').split(',');
        const captions = project.getAttribute('data-captions').split(',');
        
        // Update modal content
        modalTitle.textContent = title;
        modalSubtitle.textContent = subtitle;
        modalDescription.textContent = description;
        modalYear.textContent = year;
        modalTools.textContent = tools;
        
        // Clear and populate gallery
        modalGallery.innerHTML = '';
        images.forEach((media, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'modal-gallery-item';
            
            // Check if it's a video file
                        if (media.toLowerCase().includes('.mp4') || media.toLowerCase().includes('.mov') || media.toLowerCase().includes('.webm')) {
                const video = document.createElement('video');
                video.src = media;
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;

                // Attributi per compatibilità iOS
                video.setAttribute('autoplay', '');
                video.setAttribute('muted', '');
                video.setAttribute('loop', '');
                video.setAttribute('playsinline', '');
                video.setAttribute('webkit-playsinline', '');

                // Prova a partire appena pronto
                video.addEventListener('canplay', () => {
                    const p = video.play();
                    if (p && typeof p.then === 'function') {
                        p.catch(() => { /* su iOS si sblocca al tocco (vedi sotto) */ });
                    }
                });
                video.load();

                video.style.width = '100%';
                video.style.height = '100%';
                video.style.objectFit = 'cover';
                galleryItem.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = media;
                img.alt = captions[index] || `Project image ${index + 1}`;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                galleryItem.appendChild(img);
            }
            
            modalGallery.appendChild(galleryItem);
        });
        
        // Add scroll indicator
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'modal-scroll-indicator';
        scrollIndicator.textContent = '↓';
        modalGallery.appendChild(scrollIndicator);
        
        // Add scroll listener to hide indicator when at bottom
        const modalRight = document.querySelector('.modal-right');
        
        const checkScroll = () => {
            const isAtBottom = modalRight.scrollTop + modalRight.clientHeight >= modalRight.scrollHeight - 10;
            if (isAtBottom) {
                scrollIndicator.style.opacity = '0';
                 // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Avvia i video nel modal (utile per Android, e iOS dopo un gesto)
            setTimeout(() => {
                document.querySelectorAll('#modalGallery video').forEach(v => {
                    const p = v.play();
                    if (p && typeof p.then === 'function') {
                        p.catch(() => { /* iOS potrebbe richiedere un gesto: verrà sbloccato sotto */ });
                    }
                });
            }, 0);
            } else {
                scrollIndicator.style.opacity = '1';
            }
        };
        
        modalRight.addEventListener('scroll', checkScroll);
    }
    
    playgroundProjects.forEach((project, index) => {
        project.addEventListener('click', function(e) {
            e.preventDefault();
            currentProjectIndex = index;
            updateModalContent(currentProjectIndex);
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal functionality
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking backdrop
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Navigation functionality
    if (modalPrev) {
        modalPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            currentProjectIndex = (currentProjectIndex - 1 + playgroundProjects.length) % playgroundProjects.length;
            updateModalContent(currentProjectIndex);
        });
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', function(e) {
            e.stopPropagation();
            currentProjectIndex = (currentProjectIndex + 1) % playgroundProjects.length;
            updateModalContent(currentProjectIndex);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                currentProjectIndex = (currentProjectIndex - 1 + playgroundProjects.length) % playgroundProjects.length;
                updateModalContent(currentProjectIndex);
            } else if (e.key === 'ArrowRight') {
                currentProjectIndex = (currentProjectIndex + 1) % playgroundProjects.length;
                updateModalContent(currentProjectIndex);
            }
        }
    });
    
    // Enhanced animations for different content types
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const services = document.querySelectorAll('.service');
    services.forEach((service, index) => {
        service.classList.add('fade-in');
        service.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Add specific animations to project elements
    const projectHeaders = document.querySelectorAll('.header-text');
    projectHeaders.forEach(header => {
        header.classList.add('fade-in-left');
    });
    
    const projectImages = document.querySelectorAll('.header-image');
    projectImages.forEach(image => {
        image.classList.add('fade-in-right');
    });
    
    const projectDetails = document.querySelectorAll('.details-grid .detail-item');
    projectDetails.forEach((detail, index) => {
        detail.classList.add('fade-in-scale');
        detail.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.2}s`;
        Sblocco autoplay mobile al primo gesto utente
    let mobileAutoplayUnlocked = false;
    const unlockAutoplay = () => {
        if (mobileAutoplayUnlocked) return;
        mobileAutoplayUnlocked = true;
        document.querySelectorAll('video[autoplay], #modalGallery video').forEach(v => {
            try {
                v.muted = true;
                const p = v.play();
                if (p && typeof p.then === 'function') { p.catch(() => {}); }
            } catch (e) {}
        });
        document.removeEventListener('touchstart', unlockAutoplay);
        document.removeEventListener('click', unlockAutoplay);
    };
    document.addEventListener('touchstart', unlockAutoplay, { passive: true });
    document.addEventListener('click', unlockAutoplay, { passive: true });
    });
    
    // Enhanced navbar background on scroll with smooth transitions
    const navbar = document.querySelector('.navbar');
    let ticking = false;
    
    function updateNavbar() {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 1);
        
        if (scrolled > 50) {
            navbar.style.background = `rgba(255, 255, 255, ${0.8 + opacity * 0.2})`;
            navbar.style.backdropFilter = `blur(${10 + opacity * 5}px)`;
            navbar.style.borderBottom = '1px solid rgba(238, 238, 238, 0.8)';
            navbar.style.boxShadow = `0 2px 20px rgba(0, 0, 0, ${0.05 + opacity * 0.1})`;
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.borderBottom = 'none';
            navbar.style.boxShadow = 'none';
        }
        
        ticking = false;
    }
    
    function requestNavbarUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
    
    // Mobile menu toggle (if needed in future)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const navLeft = document.querySelector('.nav-left');
            navLeft.classList.toggle('active');
        });
    }
});



// Page transition logic
function initPageTransitions() {
    const overlay = document.getElementById('pageTransition');
    const links = document.querySelectorAll('a[data-nav]');
    if (!overlay || links.length === 0) return;

    // On load, reveal content
    requestAnimationFrame(() => {
        overlay.classList.remove('is-active');
    });

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const url = link.getAttribute('href');
            if (!url || url.startsWith('#') || link.target === '_blank') return;
            e.preventDefault();
            overlay.classList.add('is-active');
            setTimeout(() => {
                window.location.href = url;
            }, 500);
        });
    });
}

// First time load intro overlay
function initFirstLoadIntro() {
    const intro = document.getElementById('introOverlay');
    const reveal = document.getElementById('revealStage');
    const introCta = document.getElementById('introCta');
    const manifestoEl = document.getElementById('introManifesto');
    if (!intro) return;

    // Disable intro overlay for now
    return;

    const STORAGE_KEY = 'vg_intro_seen_v1';
    const hasSeen = localStorage.getItem(STORAGE_KEY) === '1';

    if (!hasSeen) {
        // Show intro
        requestAnimationFrame(() => {
            intro.classList.add('is-active');
        });

        // Rotate manifesto phrases like Mugaritz vibe
        const phrases = [
            'Apri la mente, non solo gli occhi.',
            'Sii curioso. Metti in discussione le forme.',
            'Progetta dialoghi tra umani e tecnologia.',
            'Cerca, sbaglia, impara, ricomponi.',
            'Entra, il processo conta quanto la meta.'
        ];
        let i = 0;
        let rotator;
        if (manifestoEl) {
            rotator = setInterval(() => {
                i = (i + 1) % phrases.length;
                manifestoEl.textContent = phrases[i];
            }, 1600);
        }

        const finishIntro = () => {
            if (rotator) clearInterval(rotator);
            intro.classList.remove('is-active');
            if (reveal) {
                reveal.classList.add('is-active');
                setTimeout(() => {
                    reveal.classList.remove('is-active');
                }, 900);
            }
            localStorage.setItem(STORAGE_KEY, '1');

            const isHome = /index\.html?$/.test(window.location.pathname) || window.location.pathname.endsWith('/') || window.location.pathname === '';
            if (!isHome) {
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 250);
            }
        };

        // Allow user to click to enter
        if (introCta) {
            introCta.addEventListener('click', finishIntro, { once: true });
        }

        // Auto-finish after a short time if no click
        setTimeout(finishIntro, 4200);
    }
}

// Project Preview functionality
function initProjectPreview() {
    const projectItems = document.querySelectorAll('.project-item[data-preview]');
    const preview = document.getElementById('projectPreview');
    const previewImage = document.getElementById('previewImage');
    
    if (!preview || !previewImage) return;
    
    let currentHoveredItem = null;
    
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imageSrc = item.getAttribute('data-preview');
            previewImage.src = imageSrc;
            preview.classList.add('active');
            currentHoveredItem = item;
            
            // Calcola la posizione del progetto per allineare l'anteprima
            updatePreviewPosition(item, preview);
        });
        
        item.addEventListener('mouseleave', () => {
            preview.classList.remove('active');
            currentHoveredItem = null;
        });
    });
    
    // Aggiorna la posizione dell'anteprima quando si scorre la pagina
    window.addEventListener('scroll', () => {
        if (currentHoveredItem && preview.classList.contains('active')) {
            updatePreviewPosition(currentHoveredItem, preview);
        }
    });
    
    // Aggiorna la posizione quando si ridimensiona la finestra
    window.addEventListener('resize', () => {
        if (currentHoveredItem && preview.classList.contains('active')) {
            updatePreviewPosition(currentHoveredItem, preview);
        }
    });
}

function updatePreviewPosition(projectItem, preview) {
    const rect = projectItem.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const previewHeight = 200; // Altezza dell'anteprima
    
    // Calcola la posizione verticale del centro del progetto
    const projectCenter = rect.top + (rect.height / 2);
    
    // Calcola la posizione dell'anteprima per allinearla al centro del progetto
    let topPosition = projectCenter - (previewHeight / 2);
    
    // Assicurati che l'anteprima rimanga nella finestra
    const minTop = 20;
    const maxTop = windowHeight - previewHeight - 20;
    
    topPosition = Math.max(minTop, Math.min(topPosition, maxTop));
    
    // Applica la posizione
    preview.style.top = topPosition + 'px';
    preview.style.transform = 'none'; // Rimuovi il translateY(-50%) per usare la posizione calcolata
}

// Parallax effect for hero image
function initParallaxEffect() {
    const heroImage = document.querySelector('.hero-image img');
    if (!heroImage) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        const yPos = -(scrolled * parallaxSpeed);
        
        heroImage.style.transform = `translateY(${yPos}px)`;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}


// Image Carousel for Process Section
class ImageCarousel {
    constructor() {
        this.carousel = document.querySelector('.image-carousel');
        this.images = document.querySelectorAll('.carousel-image');
        this.currentIndex = 0;
        this.interval = null;
        this.init();
    }
    
    init() {
        if (!this.carousel || this.images.length === 0) return;
        
        // Start the carousel
        this.startCarousel();
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.pauseCarousel();
        });
        
        this.carousel.addEventListener('mouseleave', () => {
            this.startCarousel();
        });
    }
    
    startCarousel() {
        this.interval = setInterval(() => {
            this.nextImage();
        }, 800); // Change image every 0.8 seconds
    }
    
    pauseCarousel() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    nextImage() {
        // Hide current image
        this.images[this.currentIndex].classList.remove('active');
        
        // Move to next image
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        
        // Show next image
        this.images[this.currentIndex].classList.add('active');
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageCarousel();
});

// Initialize custom cursor
new CustomCursor();



