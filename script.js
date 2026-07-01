document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. LOADING SCREEN HANDLER
    // ==========================================================================
    const loadingScreen = document.getElementById('loadingScreen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    });
    if (document.readyState === 'complete') {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    }

    // ==========================================================================
    // 2. STICKY NAVBAR & MOBILE MENU
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Shrink navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // Scroll Spy: Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const scrollSpyOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => scrollSpyObserver.observe(section));

    // ==========================================================================
    // 3. THEME & LANGUAGE SYSTEMS
    // ==========================================================================
    const htmlNode = document.documentElement;

    // --- THEME HANDLER ---
    const themeToggle = document.getElementById('themeToggle');

    const getSavedTheme = () => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) return localTheme;
        const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        return systemPrefersLight ? 'light' : 'dark';
    };

    const applyTheme = (theme) => {
        htmlNode.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    let currentTheme = getSavedTheme();
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        currentTheme = htmlNode.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
    });

    // --- LANGUAGE HANDLER ---
    const langToggle = document.getElementById('langToggle');

    const getSavedLang = () => {
        const localLang = localStorage.getItem('lang');
        if (localLang) return localLang;
        const userLang = navigator.language || navigator.userLanguage;
        return userLang.startsWith('ar') ? 'ar' : 'en';
    };

    const updateMetadata = (lang) => {
        if (lang === 'ar') {
            document.title = "أحمد دياب | خبير سيو وتسويق رقمي";
            document.querySelector('meta[name="description"]').setAttribute("content", "تصدر نتائج بحث جوجل وضاعف زوار موقعك مع أحمد دياب، أخصائي سيو وصانع محتوى بخبرة تزيد عن 4 سنوات.");
        } else {
            document.title = "Ahmed Diab | SEO Specialist & Digital Marketing Expert";
            document.querySelector('meta[name="description"]').setAttribute("content", "Dominate Google rankings, drive organic traffic, and accelerate revenue with Ahmed Diab, a premier SEO specialist and content strategist with 4+ years of experience.");
        }
    };

    const applyLang = (lang) => {
        htmlNode.setAttribute('lang', lang);
        if (lang === 'ar') {
            htmlNode.setAttribute('dir', 'rtl');
        } else {
            htmlNode.setAttribute('dir', 'ltr');
        }
        localStorage.setItem('lang', lang);
        updateMetadata(lang);
    };

    let currentLang = getSavedLang();
    applyLang(currentLang);

    langToggle.addEventListener('click', () => {
        const nextLang = htmlNode.getAttribute('lang') === 'en' ? 'ar' : 'en';
        applyLang(nextLang);
    });

    // ==========================================================================
    // 4. METRIC COUNTER ANIMATIONS
    // ==========================================================================
    const counterNumbers = document.querySelectorAll('.counter-num');
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(easeProgress * target);
            
            if (target >= 1000) {
                element.innerText = currentValue.toLocaleString() + '+';
            } else if (target === 4 || target === 100 || target === 500) {
                element.innerText = currentValue + '+';
            } else {
                element.innerText = currentValue;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };
        
        requestAnimationFrame(updateCount);
    };

    const counterObserverOptions = {
        root: null,
        threshold: 0.2
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, counterObserverOptions);

    counterNumbers.forEach(counter => counterObserver.observe(counter));

    // ==========================================================================
    // 5. BILLING SWITCHER (REMOVED - Packages now use price ranges)
    // ==========================================================================

    // ==========================================================================
    // 6. PORTFOLIO FILTERING WITH ANIMATIONS
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================================================
    // 7. TESTIMONIALS SLIDER WITH ABSOLUTE FADE & DRAG/SWIPE
    // ==========================================================================
    const track = document.getElementById('testimonialsTrack');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('sliderNext');
    const prevButton = document.getElementById('sliderPrev');
    const dotsContainer = document.getElementById('sliderDots');
    const dots = Array.from(dotsContainer.children);
    
    let currentIndex = 0;
    let autoPlayTimer = null;
    
    const updateSlider = (index) => {
        currentIndex = index;
        
        // Toggle opacity active class on slides
        slides.forEach((slide, idx) => {
            if (idx === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Sync Dots
        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };
    
    const nextSlide = () => {
        let index = currentIndex + 1;
        if (index >= slides.length) index = 0;
        updateSlider(index);
    };

    const prevSlide = () => {
        let index = currentIndex - 1;
        if (index < 0) index = slides.length - 1;
        updateSlider(index);
    };

    // Button controls
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Dot controls
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateSlider(idx);
            resetAutoPlay();
        });
    });

    // Autoplay routines
    const startAutoPlay = () => {
        autoPlayTimer = setInterval(nextSlide, 6000);
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    };

    startAutoPlay();

    const sliderContainer = document.querySelector('.testimonials-slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    sliderContainer.addEventListener('mouseleave', startAutoPlay);

    // Swipe Gesture Support (swapping direction index for RTL)
    let startX = 0;
    let endX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
        const threshold = 50;
        const isAr = htmlNode.getAttribute('lang') === 'ar';
        
        if (startX - endX > threshold) {
            // Dragged left
            isAr ? prevSlide() : nextSlide();
            resetAutoPlay();
        } else if (endX - startX > threshold) {
            // Dragged right
            isAr ? nextSlide() : prevSlide();
            resetAutoPlay();
        }
    };

    // ==========================================================================
    // 8. CONTACT FORM SUBMISSION & VALIDATION
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const formSubmitBtn = document.getElementById('formSubmitBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('formName');
        const emailInput = document.getElementById('formEmail');
        const messageInput = document.getElementById('formMessage');
        
        formFeedback.style.display = 'none';
        formFeedback.className = 'form-feedback';
        
        const isAr = htmlNode.getAttribute('lang') === 'ar';
        
        // Bilingual Validations
        if (!nameInput.value.trim()) {
            const errorMsg = isAr ? 'يرجى إدخال الاسم الكامل.' : 'Please enter your full name.';
            showFormFeedback(errorMsg, 'error');
            nameInput.focus();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            const errorMsg = isAr ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.';
            showFormFeedback(errorMsg, 'error');
            emailInput.focus();
            return;
        }

        if (!messageInput.value.trim()) {
            const errorMsg = isAr ? 'يرجى كتابة تفاصيل رسالتك أو مشروعك.' : 'Please write a brief message about your project.';
            showFormFeedback(errorMsg, 'error');
            messageInput.focus();
            return;
        }

        // Send simulation
        formSubmitBtn.disabled = true;
        formSubmitBtn.textContent = isAr ? 'جاري إرسال الرسالة...' : 'Sending Message...';
        
        setTimeout(() => {
            const successMsg = isAr 
                ? `شكراً لك، ${nameInput.value.trim()}! تم إرسال رسالتك بنجاح. سيتواصل معك أحمد قريباً.`
                : `Thank you, ${nameInput.value.trim()}! Your message has been sent successfully. Ahmed will contact you shortly.`;
                
            showFormFeedback(successMsg, 'success');
            contactForm.reset();
            formSubmitBtn.disabled = false;
            formSubmitBtn.textContent = isAr ? 'إرسال الرسالة' : 'Send Message';
        }, 1500);
    });

    const showFormFeedback = (message, type) => {
        formFeedback.textContent = message;
        formFeedback.classList.add(type);
        formFeedback.style.display = 'block';
    };

    // ==========================================================================
    // 9. SCROLL REVEAL TRIGGERS
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserverOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // 10. HERO ANALYTICS INTERACTION (MOCK DATA FLUCTUATIONS)
    // ==========================================================================
    const mockVisitors = document.getElementById('mockVisitors');
    if (mockVisitors) {
        let visitorsNum = 124800;
        setInterval(() => {
            const change = Math.floor(Math.random() * 21) - 10;
            visitorsNum += change;
            const formatted = (visitorsNum / 1000).toFixed(1) + 'K';
            mockVisitors.textContent = formatted;
        }, 3000);
    }
    
    // Set Footer Years Dynamically
    const footerYear = document.getElementById('footerYear');
    const footerYearAr = document.getElementById('footerYearAr');
    const currentYr = new Date().getFullYear();
    
    if (footerYear) footerYear.textContent = currentYr;
    if (footerYearAr) footerYearAr.textContent = currentYr;
});
