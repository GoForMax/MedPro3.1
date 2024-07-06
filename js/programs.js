document.addEventListener("DOMContentLoaded", () => {
    fetch("../json/programs.json")
      .then(response => response.json())
      .then(data => {
        const diplomaProgramsList = document.getElementById("diplomaProgramsList");
        const certificateProgramsList = document.getElementById("certificateProgramsList");
  
        data.diplomaPrograms.forEach(program => {
          const programCard = document.createElement("div");
          programCard.classList.add("programCard");
          programCard.innerHTML = `
            <h3>${program.programName}</h3>
            <p><strong>Duration:</strong> ${program.duration}</p>
            <p><strong>Schedule:</strong> ${program.schedule}</p>
          `;
          diplomaProgramsList.appendChild(programCard);
        });
  
        data.certificatePrograms.forEach(program => {
          const programCard = document.createElement("div");
          programCard.classList.add("programCard");
          programCard.innerHTML = `
            <h3>${program.programName}</h3>
            <p><strong>Duration:</strong> ${program.duration}</p>
            <p><strong>Schedule:</strong> ${program.schedule}</p>
          `;
          certificateProgramsList.appendChild(programCard);
        });
      })
      .catch(error => console.error("Error loading programs:", error));
  });
  