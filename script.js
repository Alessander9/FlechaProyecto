document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.main-navbar');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Hero Carousel Logic
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (carouselContainer) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        let slideInterval;

        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll('.carousel-dots .dot');

        function updateCarousel() {
            carouselContainer.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Event listeners for buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }

        // Initial setup
        updateCarousel();
        startInterval();
    }

    // Featured Offers Carousel Logic (Desktop Only)
    if (window.innerWidth > 768) {
        const offerCarousel = document.querySelector('.offer-carousel-wrapper');
        if (offerCarousel) {
            const offerCards = Array.from(offerCarousel.querySelectorAll('.offer-card'));
            const cardWidth = offerCards[0].offsetWidth + 20; // card width + gap
            let currentIndex = 0;

            // Clone cards for infinite loop effect
            offerCards.forEach(card => {
                const clone = card.cloneNode(true);
                offerCarousel.appendChild(clone);
            });

            function nextOffer() {
                currentIndex++;
                offerCarousel.style.transition = 'transform 0.5s ease-in-out';
                offerCarousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

                // Reset to the beginning to create the infinite loop
                if (currentIndex >= offerCards.length) {
                    setTimeout(() => {
                        offerCarousel.style.transition = 'none';
                        offerCarousel.style.transform = 'translateX(0)';
                        currentIndex = 0;
                    }, 500);
                }
            }

            setInterval(nextOffer, 3000); // Automatic scroll every 3 seconds
        }
    }
});