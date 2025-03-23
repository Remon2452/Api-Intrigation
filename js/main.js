document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordion");
    accordions.forEach((accordion) => {
      const trigger = accordion.querySelector(".accordion-head");
      const content = accordion.querySelector(".accordion-content");
      const icon = trigger.querySelector(".icon");
      trigger.addEventListener("click", () => {
        const isActive = trigger.classList.contains("__active");
        document.querySelectorAll(".accordion-head").forEach((el) => {
          el.classList.remove("__active");
          el.nextElementSibling.style.display = "none";
          el.querySelector(".icon").textContent = "+";
        });
        if (!isActive) {
          trigger.classList.add("__active");
          content.style.display = "block";
          icon.textContent = "-";
        }
      });
    });
  });




  fetch("https://openapi.programming-hero.com/api/levels/all")
  .then(response => response.json())
  .then(data =>{  
    const lessonContainer = document.querySelector(".lesson-buttons");
    lessonContainer.innerHTML = data.data.map((level, index) => 
      `<button  class="lesson" data-id="${level.id}"><img src="assets/fa-book-open.png" alt=""> Lesson -${index + 1}</button>`
    ).join("");

  
    document.querySelectorAll(".lesson").forEach(button => {
      button.addEventListener("click", () => {
        const selectedLesson = data.data.find(level => level.id == button.dataset.id);
        document.querySelector(".lesson-select p").textContent = selectedLesson ? selectedLesson.name : "Lesson not found";
      });
    });
  });

  document.getElementById('load-lesson').addEventListener('click', () => {
    fetch('https://openapi.programming-hero.com/api/level/5')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const cardContainer = document.getElementById('card-container');
            cardContainer.innerHTML = ''; // Clear existing cards

            data.data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';

                const word = document.createElement('h3');
                word.textContent = item.word;

                const meaning = document.createElement('p');
                meaning.textContent = `"${item.meaning}"`;

                const audioDiv = document.createElement('div');
                audioDiv.className = 'audio';

                const audioIcon = document.createElement('img');
                audioIcon.src = 'assets/Group 10.png';
                audioIcon.alt = 'Audio Icon';
                audioIcon.style.cursor = 'pointer';

                const playIcon = document.createElement('img');
                playIcon.src = 'assets/Group 9.png';
                playIcon.alt = 'Play Icon';
                playIcon.style.cursor = 'pointer';

                // Play audio on click
                audioIcon.addEventListener('click', () => {
                    const audio = new Audio(item.audio);
                    audio.play();
                });

                playIcon.addEventListener('click', () => {
                    const audio = new Audio(item.audio);
                    audio.play();
                });

                audioDiv.appendChild(audioIcon);
                audioDiv.appendChild(playIcon);

                card.appendChild(word);
                card.appendChild(meaning);
                card.appendChild(audioDiv);

                cardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});