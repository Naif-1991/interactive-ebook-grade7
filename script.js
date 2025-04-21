document.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("userName");
    if (name) {
      document.getElementById("greeting").innerText = `Welcome, ${name}`;
    }
  
    loadLesson();
  });
  
  function loadLesson() {
    fetch('data/unit1.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('lesson-container').innerHTML = html;
      });
  }
  
  function loadQuiz() {
    fetch('data/quiz1.json')
      .then(res => res.json())
      .then(quiz => {
        const container = document.getElementById('quiz-container');
        container.innerHTML = '';
        quiz.questions.forEach((q, i) => {
          const question = document.createElement('div');
          question.innerHTML = `
            <p>${q.question}</p>
            ${q.options.map(opt => `
              <label><input type="radio" name="q${i}" value="${opt}">${opt}</label><br/>
            `).join('')}
          `;
          container.appendChild(question);
        });
  
        const submit = document.createElement('button');
        submit.textContent = 'Submit Quiz';
        submit.onclick = () => checkAnswers(quiz);
        container.appendChild(submit);
      });
  }
  
  function checkAnswers(quiz) {
    let score = 0;
    quiz.questions.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && selected.value === q.answer) {
        score++;
      }
    });
    alert(`You scored ${score} out of ${quiz.questions.length}`);
  }
  
  function setLang(lang) {
    const texts = {
      en: {
        unit1_title: "Unit 1: Reading"
      },
      ar: {
        unit1_title: "الوحدة 1: القراءة"
      }
    };
  
    for (let key in texts[lang]) {
      document.querySelectorAll(`[data-i18n=${key}]`).forEach(el => {
        el.textContent = texts[lang][key];
      });
    }
  }
  