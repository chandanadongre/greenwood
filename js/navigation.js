// Initialize all other event listeners
function initializeEventListeners() {
    // Service boxes animation
    const serviceBoxes = document.querySelectorAll('.service-box');
    if (serviceBoxes.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('hidden-on-load');
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, { threshold: 0.1 });

        serviceBoxes.forEach(box => observer.observe(box));
    }

    // Reviews carousel
    const reviewItems = document.querySelectorAll('.review-item');
    const dots = document.querySelectorAll('.dot');
    if (reviewItems.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        const itemsPerPage = 2;
        const maxPages = Math.ceil(reviewItems.length / itemsPerPage);

        function showSlide(index) {
            reviewItems.forEach((item, i) => {
                const startIndex = index * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                item.classList.toggle('hidden', i < startIndex || i >= endIndex);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-blue-500', i === index);
                dot.classList.toggle('bg-gray-400', i !== index);
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Initialize first slide
        showSlide(0);
    }
}