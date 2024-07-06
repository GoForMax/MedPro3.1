document.addEventListener("DOMContentLoaded", () => {
    fetch('../json/gallery.json')
        .then(response => response.json())
        .then(data => loadGallery(data.generalImages))
        .catch(error => console.error('Error loading gallery:', error));
});

function loadGallery(images) {
    const gallery = document.getElementById('gallery');
    images.forEach((image, index) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'galleryItem';
        imgDiv.innerHTML = `<img src="${image.path}" alt="${image.description}" data-index="${index}">`;
        gallery.appendChild(imgDiv);
    });

    document.querySelectorAll('.galleryItem img').forEach(img => {
        img.addEventListener('click', openModal);
    });
}

let currentIndex;
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeModalBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function openModal(e) {
    modal.style.display = "block";
    currentIndex = parseInt(e.target.dataset.index);
    updateModalImage();
}

function updateModalImage() {
    const images = document.querySelectorAll('.galleryItem img');
    modalImg.src = images[currentIndex].src;
    modalImg.alt = images[currentIndex].alt;
    modalImg.style.transform = 'translateY(0)'; // Center the image
}

closeModalBtn.onclick = () => {
    modal.style.display = "none";
}

prevBtn.onclick = () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : document.querySelectorAll('.galleryItem img').length - 1;
    updateModalImage();
}

nextBtn.onclick = () => {
    currentIndex = (currentIndex < document.querySelectorAll('.galleryItem img').length - 1) ? currentIndex + 1 : 0;
    updateModalImage();
}

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

modal.style.display = "none";