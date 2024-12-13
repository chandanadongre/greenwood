function initializeHeaderEvents() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    // Function to close all dropdowns
    const closeAllDropdowns = () => {
        mobileDropdownToggles.forEach(toggle => {
            const content = toggle.nextElementSibling;
            const arrow = toggle.querySelector('span');
            if (content) content.classList.add('hidden');
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        });
    };

    if (menuBtn && mobileMenu) {
        // Toggle mobile menu
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (mobileDropdownToggles.length > 0) {
        // Handle mobile dropdown toggles
        mobileDropdownToggles.forEach(toggle => {
            toggle.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                const content = toggle.nextElementSibling;
                const arrow = toggle.querySelector('span');
                
                // Close other dropdowns when a new one is hovered
                mobileDropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        const otherContent = otherToggle.nextElementSibling;
                        const otherArrow = otherToggle.querySelector('span');
                        if (otherContent) otherContent.classList.add('hidden');
                        if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                    }
                });

                // Toggle the current dropdown
                if (content && arrow) {
                    content.classList.toggle('hidden');
                    arrow.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                }
            });
        });
    }

    // Handle regular menu links
    if (mobileMenuLinks.length > 0) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                closeAllDropdowns();
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && menuBtn && !mobileMenu.contains(e.target) && e.target !== menuBtn) {
            mobileMenu.classList.add('hidden');
            closeAllDropdowns();
        }
    });
}

initializeHeaderEvents();



// Load header, footer and other content
Promise.all([
    fetch('header.html').then(response => response.text()),
    fetch('footer.html').then(response => response.text()),
    fetch('blog.html').then(response => response.text())
]).then(([headerData, footerData, blogsData]) => {
    // Insert the content
    document.getElementById('header-placeholder').innerHTML = headerData;
    document.getElementById('footer-placeholder').innerHTML = footerData;
    if (document.getElementById('blogs-placeholder')) {
        document.getElementById('blogs-placeholder').innerHTML = blogsData;
    }
    
    // Initialize header events after content is loaded
    initializeHeaderEvents();
    
    // Initialize other event listeners if needed
    initializeEventListeners();
}).catch(error => {
    console.error('Error loading content:', error);
});

    // Services animation on scroll
    const handleScrollAnimation = () => {
        const serviceBoxes = document.querySelectorAll('.service-box');

        serviceBoxes.forEach((box) => {
            const boxPosition = box.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (boxPosition < windowHeight - 100) {
                box.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);

    // Reviews scrolling functionality
    const dots = document.querySelectorAll('.dot');
    const reviews = document.querySelectorAll('.review-item');
    const itemsPerPage = 2;
    let currentPage = 0;

    function showReviews(page) {
        reviews.forEach((review, index) => {
            const startIndex = page * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            
            if (index >= startIndex && index < endIndex) {
                review.classList.remove('hidden');
                review.classList.add('opacity-100');
            } else {
                review.classList.add('hidden');
                review.classList.remove('opacity-100');
            }
        });
        dots.forEach((dot, index) => {
            if (index === page) {
                dot.classList.remove('bg-gray-400');
                dot.classList.add('bg-blue-500');
            } else {
                dot.classList.remove('bg-blue-500');
                dot.classList.add('bg-gray-400');
            }
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentPage = index;
            showReviews(currentPage);
        });
    });
    showReviews(0);


//about page scroll timeline:
const slides = document.querySelectorAll('.content-slide');
    const points = document.querySelectorAll('.timeline-point');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateSlide(index) {
        index = Math.max(0, Math.min(index, slides.length - 1));

        slides.forEach((slide, i) => {
            slide.classList.add('hidden');
            slide.style.opacity = '0';
        });
        slides[index].classList.remove('hidden');
        setTimeout(() => {
            slides[index].style.opacity = '1';
        }, 50);

        // Update timeline points
        points.forEach(point => {
            point.classList.remove('bg-yellow-500');
            point.classList.add('bg-green-800');
        });
        for (let i = 0; i <= index; i++) {
            points[i].classList.remove('bg-green-800');
            points[i].classList.add('bg-yellow-500');
        }

        const progress = (index / (points.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;

        currentIndex = index;

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === points.length - 1;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === points.length - 1 ? '0.5' : '1';
    }

    // Add click events to timeline points
    points.forEach((point, index) => {
        point.addEventListener('click', () => updateSlide(index));
    });
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            updateSlide(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < points.length - 1) {
            updateSlide(currentIndex + 1);
        }
    });
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                updateSlide(currentIndex - 1);
            }
        } else if (e.key === 'ArrowRight') {
            if (currentIndex < points.length - 1) {
                updateSlide(currentIndex + 1);
            }
        }
    });

    // Add touch support for mobile devices
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && currentIndex > 0) {
                updateSlide(currentIndex - 1);
            } else if (swipeDistance < 0 && currentIndex < points.length - 1) {
                updateSlide(currentIndex + 1);
            }
        }
    }
    updateSlide(0);
    window.addEventListener('resize', () => {
        updateSlide(currentIndex);
    });

