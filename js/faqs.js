document.addEventListener('DOMContentLoaded', function() {
    fetch('../json/faqs.json')
        .then(response => response.json())
        .then(data => {
            const faqContent = document.getElementById('faqContent');
            data.forEach(faq => {
                const faqDiv = document.createElement('div');
                faqDiv.classList.add('faq');
                
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');
                questionDiv.innerHTML = `<i class="fas fa-chevron-right"></i> ${faq.id}. ${faq.question}`;
                questionDiv.onclick = () => toggleAnswer(questionDiv);
                
                const answerDiv = document.createElement('div');
                answerDiv.classList.add('answer');
                answerDiv.innerText = faq.answer;
                
                faqDiv.appendChild(questionDiv);
                faqDiv.appendChild(answerDiv);
                faqContent.appendChild(faqDiv);
            });
        })
        .catch(error => console.error('Error loading FAQs:', error));
});

function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');

    if (answer.style.display === "none" || answer.style.display === "") {
        answer.style.display = "block";
        icon.classList.remove('fa-chevron-right');
        icon.classList.add('fa-chevron-down');
    } else {
        answer.style.display = "none";
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-right');
    }
}
