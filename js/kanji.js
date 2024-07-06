document.addEventListener("DOMContentLoaded", () => {
    const kanjiContainer = document.getElementById('kanjiContainer');
    
    fetch('../json/kanji.json')
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(level => {
                const levelData = data[level];
                const levelSection = document.createElement('div');
                levelSection.className = 'levelSection';

                const levelHeader = document.createElement('div');
                levelHeader.className = 'levelHeader';
                levelHeader.innerText = level.charAt(0).toUpperCase() + level.slice(1);
                levelHeader.addEventListener('click', () => {
                    const content = levelSection.querySelector('.kanjiContent');
                    content.style.display = content.style.display === 'none' ? 'block' : 'none';
                });

                const kanjiIntro = document.createElement('div');
                kanjiIntro.className = 'kanjiIntro';
                kanjiIntro.innerText = levelData.kanji_list.map(kanji => kanji.kanji).join(' ');

                const kanjiContent = document.createElement('div');
                kanjiContent.className = 'kanjiContent';

                levelData.kanji_list.forEach(kanji => {
                    const kanjiItem = document.createElement('div');
                    kanjiItem.className = 'kanjiItem';

                    const kanjiText = document.createElement('div');
                    kanjiText.className = 'kanjiText';
                    kanjiText.innerText = `${kanji.id}. ${kanji.kanji} (${kanji.meaning})`;

                    const onyomiReadings = document.createElement('div');
                    onyomiReadings.innerText = `On'yomi: ${kanji.onyomi_readings.join(', ')}`;
                    const onyomiExamples = document.createElement('div');
                    onyomiExamples.innerText = `Examples: ${kanji.onyomi_example_words.join(', ')}`;

                    const kunyomiReadings = document.createElement('div');
                    kunyomiReadings.innerText = `Kun'yomi: ${kanji.kunyomi_readings.join(', ')}`;
                    const kunyomiExamples = document.createElement('div');
                    kunyomiExamples.innerText = `Examples: ${kanji.kunyomi_example_words.join(', ')}`;

                    kanjiItem.appendChild(kanjiText);
                    kanjiItem.appendChild(onyomiReadings);
                    kanjiItem.appendChild(onyomiExamples);
                    kanjiItem.appendChild(kunyomiReadings);
                    kanjiItem.appendChild(kunyomiExamples);

                    kanjiContent.appendChild(kanjiItem);
                });

                const story = createExampleSection('Story', levelData.story, levelData.story_translation);
                const fact = createExampleSection('Fact', levelData.fact, levelData.fact_translation);
                const news = createExampleSection('News', levelData.news, levelData.news_translation);

                kanjiContent.appendChild(story);
                kanjiContent.appendChild(fact);
                kanjiContent.appendChild(news);

                levelSection.appendChild(levelHeader);
                levelSection.appendChild(kanjiIntro);
                levelSection.appendChild(kanjiContent);
                kanjiContainer.appendChild(levelSection);
            });
        })
        .catch(error => console.error('Error loading kanji data:', error));
});

function createExampleSection(title, text, translation) {
    const exampleSection = document.createElement('div');
    exampleSection.className = 'exampleText';

    const exampleTitle = document.createElement('div');
    exampleTitle.innerHTML = `<strong>${title}:</strong> ${text}`;

    const translationText = document.createElement('div');
    translationText.className = 'translationText';
    translationText.innerText = translation;
    translationText.style.display = 'none';

    const toggleButton = document.createElement('button');
    toggleButton.innerText = 'Show Translation';
    toggleButton.addEventListener('click', () => {
        if (translationText.style.display === 'none') {
            translationText.style.display = 'block';
            toggleButton.innerText = 'Hide Translation';
        } else {
            translationText.style.display = 'none';
            toggleButton.innerText = 'Show Translation';
        }
    });

    exampleSection.appendChild(exampleTitle);
    exampleSection.appendChild(toggleButton);
    exampleSection.appendChild(translationText);

    return exampleSection;
}
