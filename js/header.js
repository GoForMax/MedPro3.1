// Define function to create header content
function createHeader() {
    const header = document.createElement('header');
    header.classList.add('header');

    header.innerHTML = `
        <div class="header-content">
            <span class="header-logo">
                <img src="../img/general/fthdLogo.png" alt="Foundation Logo">
            </span>
            
            <div class="header-text">
                <h1 id="header-title">FOUNDATION FOR HEALTH TRAINING AND DEVELOPMENT</h1>
                <h4 id="header-subtitle">Licensed by the Saudi Commission For Health Specialties</h4>
            </div>
            
            <span class="vision-2030-logo">
                <img src="../img/general/Vision-2030-logo.png" alt="Vision 2030 Logo">
            </span>
        </div>

        <nav class="main-navbar">
            <button class="hamburger" aria-label="Toggle menu">
                <span class="icon"></span>
            </button>
            <ul class="nav-list">
                <li>
                    <a href="index.html">
                        <img src="../img/icons/icon4.svg" alt="Home Icon">
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="pages/about.html">
                        <img src="../img/icons/icon2.svg" alt="About Icon">
                        <span>About</span>
                    </a>
                </li>
                <li>
                    <a href="pages/programs.html">
                        <img src="../img/icons/icon3.svg" alt="Programs Icon">
                        <span>Programs</span>
                    </a>
                </li>
                <li>
                    <a href="pages/gallery.html">
                        <img src="../img/icons/icon1.svg" alt="Gallery Icon">
                        <span>Gallery</span>
                    </a>
                </li>
                <li>
                    <a href="pages/contact.html">
                        <img src="../img/icons/icon8.svg" alt="Contact Icon">
                        <span>Contact</span>
                    </a>
                </li>
                <li>
                    <a href="pages/faqs.html">
                        <img src="../img/icons/icon7.svg" alt="Faqs Icon">
                        <span>FAQs</span>
                    </a>
                </li>
            </ul>
        </nav>
    `;

    document.body.prepend(header);
}

// Call the function to create header content
createHeader();
