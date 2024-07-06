// Existing JavaScript code...

// Add event listener for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Handle 404 error dynamically
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetUrl = event.target.href;

            // Simulate page load and check if it exists
            fetch(targetUrl, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        window.location.href = targetUrl;
                    } else {
                        // Load custom 404 page content dynamically
                        document.body.innerHTML = `
                            <div class="container">
                                <header>
                                    <h1>FHTD Academy</h1>
                                </header>
                                <main class="errorPage">
                                    <h2>404 - Page Not Found</h2>
                                    <p>Sorry, the page you are looking for does not exist.</p>
                                    <a href="index.html" class="homeButton">Go to Home Page</a>
                                </main>
                            </div>
                            <footer>
                                <p>&copy; 2024 FHTD Academy. All rights reserved.</p>
                            </footer>
                        `;
                    }
                })
                .catch(error => {
                    console.error('Error fetching page:', error);
                });
        });
    });
});
