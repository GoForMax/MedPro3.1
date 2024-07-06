document.addEventListener('DOMContentLoaded', function() {
    const branchListContainer = document.querySelector('.branchList');
    const socialMediaLinksContainer = document.querySelector('.socialMediaLinks');
  
    fetch('../json/contact.json')
      .then(response => response.json())
      .then(data => {
        const branches = data.branches;
  
        branches.forEach(branch => {
          const branchElement = document.createElement('div');
          branchElement.classList.add('branch');
  
          let branchContent = `<h3>${branch.branchName}</h3>`;
          branchContent += `<p>${branch.address}</p>`;
  
          // Add conditional rendering for optional state and postal code
          if (branch.state && branch.postalCode) {
            branchContent += `<p>${branch.city}, ${branch.state} ${branch.postalCode}</p>`;
          } else {
            branchContent += `<p>${branch.city}</p>`;
          }
  
          branchContent += `<p>${branch.contactNumber}</p>`;
          branchContent += `<p>${branch.email}</p>`;
          branchContent += `<p>${branch.description}</p>`;
  
          branchElement.innerHTML = branchContent;
          branchListContainer.appendChild(branchElement);
        });
      });
  
    fetch('../json/socialmedia.json')
      .then(response => response.json())
      .then(data => {
        const socialMediaLinks = data.socialMedia;
  
        socialMediaLinks.forEach(social => {
          const listItem = document.createElement('li');
          listItem.classList.add('socialItem'); // Updated class for styling
  
          const iconClass = `fab fa-${social.id}`;
  
          listItem.innerHTML = `<a href="${social.link}" target="_blank" rel="noreferrer noopener"><i class="${iconClass}"></i> ${social.name}</a>`; // Added social media name
          socialMediaLinksContainer.appendChild(listItem);
        });
      });
  });
  