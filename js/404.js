document.addEventListener('DOMContentLoaded', function() {
    // Handle 404 error dynamically for multi-page navigation
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
                        // Redirect to custom 404 page
                        window.location.href = '/pages/404.html';
                    }
                })
                .catch(error => {
                    console.error('Error fetching page:', error);
                    // Redirect to custom 404 page
                    window.location.href = '/pages/404.html';
                });
        });
    });
});
