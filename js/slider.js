document.addEventListener('DOMContentLoaded', function() {
    fetch('json/slider.json') // Ensure the path is relative to the root
        .then(response => response.json())
        .then(data => {
            const slider = document.getElementById('slider');
            const navigationDots = document.getElementById('navigationDots');
            const leftArrow = document.getElementById('leftArrow');
            const rightArrow = document.getElementById('rightArrow');
            let currentIndex = 0;

            data.images.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.classList.add('slide');
                slide.style.backgroundImage = `url(${image.src})`; // Changed 'path' to 'src'
                slide.setAttribute('data-id', image.id);
                slider.appendChild(slide);

                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => showSlide(index));
                navigationDots.appendChild(dot);
            });

            function showSlide(index) {
                const slides = document.querySelectorAll('.slide');
                const dots = document.querySelectorAll('.dot');
                slides.forEach(slide => slide.style.transform = `translateX(-${index * 100}%)`);
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
                currentIndex = index;
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % data.images.length;
                showSlide(currentIndex);
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + data.images.length) % data.images.length;
                showSlide(currentIndex);
            }

            rightArrow.addEventListener('click', nextSlide);
            leftArrow.addEventListener('click', prevSlide);

            setInterval(nextSlide, 3300); // Change image every 3 seconds
        })
        .catch(error => console.error('Error loading slider images:', error));
});
