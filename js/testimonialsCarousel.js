document.addEventListener('DOMContentLoaded', function() {
    fetch('json/testimonials.json') // Ensure the path is relative to the root
        .then(response => response.json())
        .then(data => {
            const carouselContainer = document.querySelector('.carousel-container');
            const carouselTrack = document.querySelector('.carousel-track');
            const leftArrow = document.getElementById('carouselLeftArrow');
            const rightArrow = document.getElementById('carouselRightArrow');
            let currentIndex = 0;

            data.testimonials.forEach((testimonial, index) => {
                const testimonialCard = document.createElement('div');
                testimonialCard.classList.add('testimonial-card');

                const testimonialText = document.createElement('p');
                testimonialText.classList.add('testimonial-text');
                testimonialText.textContent = `"${testimonial.text}"`;

                const testimonialAuthor = document.createElement('p');
                testimonialAuthor.classList.add('testimonial-author');
                testimonialAuthor.textContent = `- ${testimonial.author}`;

                testimonialCard.appendChild(testimonialText);
                testimonialCard.appendChild(testimonialAuthor);

                const slide = document.createElement('div');
                slide.classList.add('carousel-slide');
                slide.appendChild(testimonialCard);
                carouselTrack.appendChild(slide);
            });

            const slides = document.querySelectorAll('.carousel-slide');

            function showSlide(index) {
                carouselTrack.style.transform = `translateX(-${index * 100}%)`;
                currentIndex = index;
            }

            function nextSlide() {
                if (currentIndex < slides.length - 1) {
                    showSlide(currentIndex + 1);
                }
            }

            function prevSlide() {
                if (currentIndex > 0) {
                    showSlide(currentIndex - 1);
                }
            }

            rightArrow.addEventListener('click', nextSlide);
            leftArrow.addEventListener('click', prevSlide);

            setInterval(() => {
                if (currentIndex < slides.length - 1) {
                    nextSlide();
                } else {
                    showSlide(0);
                }
            }, 5000); // Change slide every 5 seconds
        })
        .catch(error => console.error('Error loading testimonials:', error));
});
