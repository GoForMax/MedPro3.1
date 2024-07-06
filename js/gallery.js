document.addEventListener("DOMContentLoaded", () => {
    fetch('../json/gallery.json')
        .then(response => response.json())
        .then(data => {
            loadGallery(data);
            createCheckboxes(data);
            addCheckboxListeners(data);
        })
        .catch(error => console.error('Error loading gallery:', error));
});

function loadGallery(data) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery

    for (const group in data) {
        data[group].forEach((image, index) => {
            const imgDiv = document.createElement('div');
            imgDiv.className = `galleryItem ${group}`;
            imgDiv.innerHTML = `<img src="${image.path}" alt="${image.description}" data-index="${index}" data-group="${group}">`;
            gallery.appendChild(imgDiv);
        });
    }

    document.querySelectorAll('.galleryItem img').forEach(img => {
        img.addEventListener('click', openModal);
    });
}

function createCheckboxes(data) {
    const checkboxContainer = document.getElementById('checkbox-container');
    checkboxContainer.innerHTML = ''; // Clear the checkboxes

    const allCheckbox = document.createElement('input');
    allCheckbox.type = 'checkbox';
    allCheckbox.id = 'allImages';
    allCheckbox.checked = true;
    const allLabel = document.createElement('label');
    allLabel.htmlFor = 'allImages';
    allLabel.innerText = 'All Images';
    checkboxContainer.appendChild(allCheckbox);
    checkboxContainer.appendChild(allLabel);

    for (const group in data) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `${group}Checkbox`;
        checkbox.dataset.group = group;
        checkbox.checked = true;
        const label = document.createElement('label');
        label.htmlFor = `${group}Checkbox`;
        label.innerText = group;
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
    }
}

function addCheckboxListeners(data) {
    document.getElementById('allImages').addEventListener('change', function () {
        const checkboxes = document.querySelectorAll('[data-group]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
            toggleGroupVisibility(checkbox.dataset.group, this.checked);
        });
    });

    document.querySelectorAll('[data-group]').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            toggleGroupVisibility(this.dataset.group, this.checked);
            if (!this.checked) {
                document.getElementById('allImages').checked = false;
            } else {
                const allChecked = Array.from(document.querySelectorAll('[data-group]')).every(cb => cb.checked);
                document.getElementById('allImages').checked = allChecked;
            }
        });
    });
}

function toggleGroupVisibility(group, visible) {
    const items = document.querySelectorAll(`.${group}`);
    items.forEach(item => {
        item.style.display = visible ? 'block' : 'none';
    });
}

let currentIndex;
let currentGroup;
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeModalBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function openModal(e) {
    modal.style.display = "flex";
    currentGroup = e.target.dataset.group;
    const images = document.querySelectorAll(`.galleryItem.${currentGroup} img`);
    currentIndex = Array.from(images).indexOf(e.target);
    updateModalImage(images);
}

function updateModalImage(images) {
    modalImg.src = images[currentIndex].src;
    modalImg.alt = images[currentIndex].alt;
    modalImg.dataset.group = currentGroup; // Add the group to the modal image dataset
}

closeModalBtn.onclick = () => {
    modal.style.display = "none";
}

prevBtn.onclick = () => {
    navigateModalImages(-1);
}

nextBtn.onclick = () => {
    navigateModalImages(1);
}

function navigateModalImages(direction) {
    const images = document.querySelectorAll(`.galleryItem.${currentGroup} img`);
    currentIndex = (currentIndex + direction + images.length) % images.length; // Loop around
    updateModalImage(images);
}

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

window.onkeydown = (e) => {
    if (modal.style.display === "flex") {
        if (e.key === "ArrowLeft") {
            navigateModalImages(-1);
        } else if (e.key === "ArrowRight") {
            navigateModalImages(1);
        } else if (e.key === "Escape") {
            modal.style.display = "none";
        }
    }
}

modal.style.display = "none";
