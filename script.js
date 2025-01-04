const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit-btn');
const resultsDiv = document.getElementById('results');
const certificateButton = document.getElementById('certificate-btn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

let userName = '';
let userEmail = '';
let userScore = 0;
let quizData = []; // Deklarasikan quizData sebagai array kosong

// Fungsi untuk mengambil data dari JSON file
async function fetchQuestions() {
    try {
        const response = await fetch('questions.json');
        const data = await response.json();
        quizData = data; // Isi array quizData dengan data dari JSON
        buildQuiz(); // Setelah data berhasil diambil, panggil buildQuiz()
    } catch (error) {
        console.error("Error fetching questions:", error);
        resultsDiv.textContent = "Gagal mengambil pertanyaan. Silakan coba lagi.";
    }
}


function buildQuiz() {
    quizContainer.innerHTML = ""; // Bersihkan konten quizContainer sebelum membangun kuis
    quizData.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<h3>${index + 1}. ${question.question}</h3>`;

        const answerOptions = document.createElement('div');
        answerOptions.classList.add('answer-options');

        question.answers.forEach((answer, answerIndex) => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="question${index}" value="${answerIndex}"> ${answer}`;
            answerOptions.appendChild(label);
        });

        questionDiv.appendChild(answerOptions);
        quizContainer.appendChild(questionDiv);
    });
}

function showResults() {

    userName = nameInput.value;
    userEmail = emailInput.value;

    if(!userName || !userEmail){
        alert("Please fill your name and email to proceed.")
        return;
    }


    let score = 0;
    let resultsHTML = `<h2>Quiz Review (Incorrect Answers)</h2>`;

    let hasIncorrect = false; // Flag to check if there are any incorrect answers

    quizData.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        let userAnswer = null;
        if(selectedOption) {
           userAnswer = parseInt(selectedOption.value)
        }


        if(selectedOption && userAnswer !== question.correctAnswer) {
              hasIncorrect = true;
                resultsHTML += `<div class="review-question">`;
                resultsHTML += `<h3>${index + 1}. ${question.question}</h3>`;
                resultsHTML += `<p>Your Answer: ${selectedOption ? question.answers[userAnswer] : 'Not answered' }</p>
                <p>Correct Answer: ${question.answers[question.correctAnswer]}
                <span style="color:red"> - Incorrect</span></p>
                `;
                resultsHTML += `</div>`;


        }

        if (selectedOption && userAnswer === question.correctAnswer) {
           score++;
        }

    });

   if(!hasIncorrect) {
    resultsHTML = `<h2>Quiz Review</h2><p>Congratulation, you've answered all correctly!</p>`
  }

    let feedback = "";
    if (score / quizData.length > 0.8) {
        feedback = "You are demonstrating great hospitality skills! Keep it up!";
    } else if (score / quizData.length > 0.4) {
        feedback = "You might need to focus on improving your empathy and active listening skills.";
    }else{
        feedback = "You may need to revisit customer service basics, focusing on how to positively interact with customers."
    }

     userScore = score;

    resultsDiv.innerHTML = `<p>You scored ${score} out of ${quizData.length}!</p>
                            <p>${feedback}</p>
                            ${resultsHTML}`;

    submitButton.style.display = "none";
    certificateButton.style.display = "block";

}

function goToCertificate() {
        window.location.href = `certificate.html?name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}&score=${userScore}&total=${quizData.length}`;
}


// Panggil fetchQuestions untuk mengambil data dari JSON
fetchQuestions();
submitButton.addEventListener('click', showResults);
certificateButton.addEventListener('click', goToCertificate);
