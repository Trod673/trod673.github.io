document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.service-card');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const carouselContainer = document.querySelector('.carousel-container');

    let cardWidth;
    let cardMargin;
    let currentPosition = 0;
    let maxPosition;
    let cardsToShow = 3;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentPosition}px)`;
    }

    function updateButtons() {
        prevButton.disabled = currentPosition === 0;
        nextButton.disabled = currentPosition >= maxPosition;
    }

    function calculateCarousel() {
        cardWidth = cards[0].offsetWidth;
        cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight);
        maxPosition = (cards.length - cardsToShow) * (cardWidth + cardMargin);
        if (maxPosition < 0) {
            maxPosition = 0;
        }
        currentPosition = Math.max(0, Math.min(currentPosition, maxPosition));
        updateCarousel();
        updateButtons();
    }

    window.addEventListener('resize', () => {
        calculateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentPosition = Math.max(0, currentPosition - (cardWidth + cardMargin));
        updateCarousel();
        updateButtons();
    });

    nextButton.addEventListener('click', () => {
        currentPosition = Math.min(maxPosition, currentPosition + (cardWidth + cardMargin));
        updateCarousel();
        updateButtons();
    });

    calculateCarousel();
    updateButtons();

    // Modal functionality
    const pricingLink = document.getElementById('pricing-link');
    const modal = document.getElementById('pricing-modal');
    const closeButton = document.querySelector('.close-button');

    pricingLink.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});
