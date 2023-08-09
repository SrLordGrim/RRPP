// scripts.js

let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.querySelectorAll(".slide"); // Usar querySelectorAll para obtener todos los slides
  if (slides.length === 0) {
    return; // Salir si no hay slides
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
  // Obtener todas las preguntas
  const questions = document.querySelectorAll('.question');

  // Agregar el evento de clic a cada pregunta
  questions.forEach((question) => {
    question.addEventListener('click', function () {
      question.classList.toggle('active');
      const answer = question.querySelector('.answer');
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
      } else {
        answer.style.display = 'block';
      }
    });
  });
});




