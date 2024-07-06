document.addEventListener("DOMContentLoaded", () => {
    fetch("../json/contact.json")
        .then(response => response.json())
        .then(data => {
            const branchesContainer = document.getElementById('branches');
            data.branches.forEach(branch => {
                const branchCard = document.createElement('div');
                branchCard.classList.add('branchCard');
                branchCard.innerHTML = `
                    <h3>${branch.name}</h3>
                    <p>Address: ${branch.address}</p>
                    <p>Phone: <a href="tel:${branch.phone.replace(/\s/g, '')}">${branch.phone}</a></p>
                     <a href="${branch.locationLink}" target="_blank">View on Map</a>
                `;
                branchesContainer.appendChild(branchCard);
            });
        })
        .catch(error => console.error('Error fetching contact data:', error));
});
