const quizData = [
  {
      question: "A customer walks into your store looking a bit lost. Which is the BEST first step to take?",
      answers: [
          "Immediately ask, 'Can I help you find something?'",
          "Ignore them and assume they'll ask if they need help.",
          "Make eye contact, smile warmly, and say, 'Welcome! Is there anything I can assist you with today?'",
          "Start talking about a product they might be near."
      ],
      correctAnswer: 2
  },
  {
      question: "A customer is clearly frustrated with a return policy. Which of these demonstrates the best active listening skills?",
      answers: [
         "Interrupt them to explain the policy again before they finish talking.",
         "Maintain eye contact, nod occasionally, and summarize their concerns to show you understand.",
         "Start taking their return immediately to show you are dealing with the issue.",
         "Tell them you understand and then start talking about something else."
     ],
      correctAnswer: 1
  },
{
      question: "You're helping a customer who is taking a long time to decide. What is the most appropriate action?",
      answers: [
        "Start hinting that you have other customers waiting.",
        "Become impatient and rush them through the decision-making process.",
        "Offer more information and options without being pushy, and let them take their time.",
        "Suggest they just buy something so you can move on."
      ],
      correctAnswer: 2
  },
   {
      question: "A regular customer brings in a small item that broke and is beyond the warranty. How should you respond?",
      answers: [
       "Point out that the item is outside of warranty and dismiss the issue.",
        "Offer a discount on a replacement or express empathy and offer alternative solutions (e.g., repair suggestion).",
        "Tell them it's their fault for breaking it.",
        "Pretend you don't remember them and treat them like a new customer."
    ],
      correctAnswer: 1
  },
  {
      question: "How should you handle a customer who is being overly chatty and disrupting the flow of the store?",
      answers: [
       "Be blunt and tell them to be quiet.",
       "Try to subtly disengage by completing tasks and moving on to other customers if necessary while remaining polite.",
       "Completely ignore them and focus on other customers.",
        "Join in the conversation for too long and ignore the other customers."
    ],
      correctAnswer: 1
  },
  {
      question: "When a customer compliments something in your store, what's a good way to build on that positive interaction?",
      answers: [
         "Just say 'thanks.'",
          "Agree quickly and move on.",
          "Engage by saying something like, 'Thank you! I'm glad you like it. It's a very popular item, and we just got a new shipment.'",
          "Don't respond and act like it's no big deal."
      ],
      correctAnswer: 2
  },
{
     question: "A customer has a complaint about a product. What is the FIRST thing you should do?",
      answers: [
          "Immediately defend your store and the product.",
         "Listen attentively and show empathy for their experience.",
          "Refer them to the manufacturer's website.",
          "Tell them you can't do anything about it."
     ],
      correctAnswer: 1
  },
  {
      question: "A customer asks for something you don't currently carry. What's the best response?",
      answers: [
        "Say, 'Sorry, we don't have that.' and leave it at that.",
          "Say, 'Sorry, we don't have that, but we can suggest another option.'",
         "Say, 'I don't know' and walk away.",
         "Act like they asked for something outrageous."
      ],
      correctAnswer: 1
  },
{
      question: "A child is being disruptive in the store. What's the best way to approach the situation?",
      answers: [
          "Yell at the child and tell them to be quiet.",
         "Ignore the child and their behavior.",
          "Politely address the parent/guardian and try to find a solution that is helpful.",
         "Ignore both the child and parent and hope they leave."
    ],
      correctAnswer: 2
  },
{
      question: "How should you end a positive transaction with a customer?",
      answers: [
       "Just hand them their bag and say 'next'.",
         "Simply say 'bye'.",
       "Offer a genuine smile, express gratitude for their business, and invite them to return (e.g., 'Thanks so much for shopping with us today! We hope to see you again soon!').",
        "Stare at them and hope they leave."
    ],
      correctAnswer: 2
  },

];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit-btn');
const resultsDiv = document.getElementById('results');
const certificateButton = document.getElementById('certificate-btn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

let userName = '';
let userEmail = '';
let userScore = 0;


function buildQuiz() {
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


buildQuiz();
submitButton.addEventListener('click', showResults);
certificateButton.addEventListener('click', goToCertificate)