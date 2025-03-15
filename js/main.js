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
  .then(data => {    
    const lessonContainer = document.querySelector(".lesson-buttons");
    lessonContainer.innerHTML = data.levels.map((level, index) => 
      `<button class="lesson" data-id="${level.id}"><img src="assets/fa-book-open.png" alt=""> Lesson -${index + 1}</button>`
    ).join("");

    

    document.querySelectorAll(".lesson").forEach(button => {
      button.addEventListener("click", () => {
        const selectedLesson = data.levels.find(level => level.id == button.dataset.id);
        document.querySelector(".lesson-select p").textContent = selectedLesson ? selectedLesson.name : "Lesson not found";
      });
    });
  });