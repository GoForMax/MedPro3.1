// Define function to create footer content
function createFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    footer.innerHTML = `
        <div class="footer-row copyright">
            <p>&copy;2024 FHTD Academy. All rights reserved.</p>
        </div>
        <div class="footer-row social-media">
            <a href="https://www.facebook.com" target="_blank" class="social-icon" aria-label="Facebook">
                <i class="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" class="social-icon" aria-label="Twitter">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" class="social-icon" aria-label="Instagram">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" class="social-icon" aria-label="Linkedin">
                <i class="fab fa-linkedin"></i>
            </a>
        </div>
    `;

    document.body.appendChild(footer);
}

// Call the function to create footer content
createFooter();
