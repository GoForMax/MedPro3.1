document.addEventListener('DOMContentLoaded', () => {
    fetch('json/testimonials.json')
        .then(response => response.json())
        .then(data => {
            const testimonialsContainer = document.querySelector('.testimonialsContainer');
            const testimonialsWrapper = document.querySelector('.testimonialsWrapper');
            let currentIndex = 0;

            const getTestimonialsToShow = () => {
                const width = window.innerWidth;
                if (width > 1200) return 4;
                if (width > 1000) return 3;
                if (width > 640) return 2;
                return 1;
            };

            const renderTestimonials = () => {
                testimonialsContainer.innerHTML = '';
                data.testimonials.forEach(({ id, text, author }) => {
                    const testimonialCard = document.createElement('div');
                    testimonialCard.classList.add('testimonialCard');

                    const testimonialText = document.createElement('p');
                    testimonialText.classList.add('testimonialText');
                    testimonialText.textContent = `"${text}"`;

                    const testimonialAuthor = document.createElement('p');
                    testimonialAuthor.classList.add('testimonialAuthor');
                    testimonialAuthor.textContent = `- ${author}`;

                    testimonialCard.appendChild(testimonialText);
                    testimonialCard.appendChild(testimonialAuthor);

                    testimonialsContainer.appendChild(testimonialCard);
                });
                updateTestimonialsPosition();
            };

            const updateTestimonialsPosition = () => {
                const testimonialsToShow = getTestimonialsToShow();
                const testimonialWidth = testimonialsWrapper.clientWidth / testimonialsToShow;
                testimonialsContainer.style.transform = `translateX(-${currentIndex * testimonialWidth}px)`;
                const testimonialCards = document.querySelectorAll('.testimonialCard');
                testimonialCards.forEach(card => {
                    card.style.flex = `1 0 calc(${100 / testimonialsToShow}% - 1.25rem)`;
                });
            };

            const showNextTestimonial = () => {
                const testimonialsToShow = getTestimonialsToShow();
                const totalItems = data.testimonials.length;
                currentIndex = (currentIndex + 1) % totalItems;
                updateTestimonialsPosition();
            };

            const showPreviousTestimonial = () => {
                const testimonialsToShow = getTestimonialsToShow();
                const totalItems = data.testimonials.length;
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateTestimonialsPosition();
            };

            document.querySelector('.leftArrow').addEventListener('click', showPreviousTestimonial);
            document.querySelector('.rightArrow').addEventListener('click', showNextTestimonial);

            window.addEventListener('resize', updateTestimonialsPosition);

            renderTestimonials();
        })
        .catch(error => console.error('Error loading testimonials:', error));
});
