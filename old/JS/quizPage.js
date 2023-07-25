let questionsContainer = document.getElementById("questionConteiner");
let nextBtn = document.getElementById("next");
let quizTypeImage = document.getElementById("quizTypeImage");
let quizNames = ['english_quiz', 'iq_quiz', 'technical_quiz'];
let quizTypeIndex = 0; // Index to keep track of the current quiz type
let questionIndex = 0; // Index to keep track of the current question
let quizzes = {};
let answers = [];
let fixedAlerts = document.getElementById("fixed");
let fixedREADY = document.getElementById("READY");
let sure = true;


fetch(`/JSON/quizApp.json`)
.then((res) => {
    if (res.ok) {
        return res.json();
    } 
    else {
        throw new Error("Error while fetching the data");
    }
})
.then((data) => {
    quizzes = data;
    showQuiz(quizzes, quizNames[quizTypeIndex], questionIndex);
})
.catch((err) => {
    console.log(err);
});


function showQuiz(quizData, quizType, index) {

const quiz = quizData[quizType][index];

questionsContainer.innerHTML = `
    <div class="question" id="question">
        <p class="quizDescription h2">${quiz.question}</p>
        <div class="quizAnswers mt-4 p-4">
            <button id="a">${quiz.options[0]}</button>
            <button id="b">${quiz.options[1]}</button>
            <button id="c">${quiz.options[2]}</button>
            <button id="d">${quiz.options[3]}</button>
        </div>
    </div>
    
`;

let options = document.querySelectorAll(".quizContent .quizAnswers button");

options.forEach((option) => {
    option.addEventListener("click", () => {
        // Check if the clicked element already has the "active" class
        let isActive = option.classList.contains("active");

        // Remove the "active" class from all options
        options.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Add the "active" class only if the element wasn't already active
        if (!isActive) {
            option.classList.add("active");
        }
    });
});

}

document.body.style.overflow = "hidden";
nextBtn.style.display = "none";
fixedAlerts.innerHTML=`
<div>
<img src="/Images/EnglishFixed.svg" alt="">
<p class="quizDescription h2">The Start Of English Quiz</p>
<p class="quizDescription h3">Click "READY" to start</p>
<div>
<button  id="READY" onclick="fixedBTN()" >READY</button>
</div>
</div>
`;

function fixedBTN() {
    document.body.style.overflow = "scroll";
    fixedAlerts.style.display="none";
    nextBtn.style.display = "block";

}

function nextQuestion() {
    let warningMsg = document.createElement("span");
    warningMsg.style = "position: absolute; font-size: 20px";
    nextBtn.addEventListener("click", () => {

        let quizTitle = document.getElementById("quizTitle");
        let width = document.getElementById("fill");


        let activeButton = document.querySelector(".quizContent .quizAnswers button.active");

        // If an active button is found, add its text content to the answers array
        if (activeButton) {
            answers.push(activeButton.textContent);

            questionIndex++; // Move to the next question

            sessionStorage.setItem("currentQuestionIndex", questionIndex);

            // Check if we have reached the end of the current quiz type
            if (questionIndex >= quizzes[quizNames[quizTypeIndex]].length) {
                    if (quizTypeIndex === quizNames.length - 1) {
                    // We have reached the last quiz (technical_quiz) and the quiz has ended
                    // Disable the "Next" button
                    nextBtn.disabled = true;
                    // Show a message indicating that the quiz has ended
                    questionsContainer.innerHTML = `
                    <div class="question" id="question">
                            <p id="finishParagraph">You finished the Quiz!</p>
                            <a><button id="finishQuiz">Submit Answers</button></a>
                    </div>
                    `;
    
                      // Add to local storage on submit
                    document.getElementById("finishQuiz").onclick = () => {
                        submitAnswers();
                        clearInterval(countdownInterval);
                    };

                    document.getElementById("next").style.display = "none";
                    quizTitle.textContent = 'Done';
                    return; // Exit the function to prevent going back to the first quiz
                } 

                    else {
                        // Move to the next quiz type
                        quizTypeIndex++;
                        // Reset the question index to start from the first question of the new quiz type
                        questionIndex = 0;
                        sessionStorage.setItem("currentQuestionIndex", questionIndex);
                        sessionStorage.setItem("currentQuizIndex", quizTypeIndex);
                    }
            }

                // Update the questionsContainer with the new question's content
                let progressWidth = ((questionIndex + 1) / quizzes[quizNames[quizTypeIndex]].length) * 100;
                fill.style.width = `${progressWidth}%`;   

                if(quizTypeIndex === 0 && sure == true) {
                    sure=false;
                    quizTitle.textContent = 'English Quiz';
                    width.style.width = `${progressWidth}%`;
                    
                }
                else if (quizTypeIndex === 1 && sure == false) {
                    fixedAlerts.innerHTML=`
                    <div>
                    <img src="/Images/iqFixed.svg" alt="">
                    <p class="quizDescription h2">The Start Of IQ Quiz</p>
                    <p class="quizDescription h3">Click "READY" to start</p>
                    <div>
                    <button  id="READY" onclick="fixedBTN()" >READY</button>
                    </div>
                    </div>
                    `;  
                    document.body.style.overflow = "hidden";

                    fixedAlerts.style.display="flex";
                    nextBtn.style.display = "none";

                    quizTitle.textContent = 'IQ Quiz';
                    quizTypeImage.src = '/Images/IQTest.svg'

                    sure = true;

                }
                else if(quizTypeIndex === 2 && sure == true) {
                    fixedAlerts.innerHTML=`
                    <div>
                    <img src="/Images/TechnicalFixed.svg" alt="">
                    <p class="quizDescription h2">The Start Of Technical Quiz</p>
                    <p class="quizDescription h3">Click "READY" to start</p>
                    <div>
                    <button  id="READY" onclick="fixedBTN()" >READY</button>
                    </div>
                    </div>
                    `;
                    document.body.style.overflow = "hidden";

                    quizTitle.textContent = 'Technical Quiz';
                    quizTypeImage.src = `/Images/techSkills.svg`

                    fixedAlerts.style.display="flex";
                    nextBtn.style.display = "none";

                    sure=false;
                }

                showQuiz(quizzes, quizNames[quizTypeIndex], questionIndex);
        }
        
        else {
            warningMsg.textContent = 'Please choose one of the options';
            warningMsg.style.color = "red";
            questionsContainer.appendChild(warningMsg);
        }
    });
}

nextQuestion();

// ... Your existing code ...

let countdownInterval; // Variable to store the interval for the countdown timer
const quizTimeLimit = 20 * 60; // 20 minutes in seconds for the entire quiz
let remainingTime = quizTimeLimit; // Remaining time in seconds

// Function to format time in MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Function to start the countdown timer
function startCountdown() {
    let timeLeft = sessionStorage.getItem("timeLeft");
    if (timeLeft) {
      remainingTime = parseInt(timeLeft);
    } else {
      remainingTime = quizTimeLimit;
    }
  
    countdownInterval = setInterval(() => {
      remainingTime -= 1;
      sessionStorage.setItem("timeLeft", remainingTime);
      if (remainingTime <= 0) {
        // Time's up!
        submitAnswers();
        clearInterval(countdownInterval);
        // Handle end of the quiz (e.g., disable buttons, show results, etc.)
        // Add your code here...
        document.getElementById("timer").textContent = "00:00"; // Optional, set the timer to 00:00 when the time is up
      }
      // Update the timer display
      document.getElementById("timer").textContent = formatTime(remainingTime);
    }, 1000);
  }

// Call the startCountdown function when the quiz starts
startCountdown();

function submitAnswers() {
    localStorage.setItem("userAnswers", JSON.stringify(answers));
}

