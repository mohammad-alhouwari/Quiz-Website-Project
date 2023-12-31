let allUsers = JSON.parse(localStorage.getItem("usersInfo"));
let loggedInUser = {};
let loginBtn = document.getElementById("login");
let logoutBtn = document.getElementById("logout");
let logoutCont = document.getElementById("logoutCont");
let loginCont = document.getElementById("loginCont");
let registerCont = document.getElementById("registerCont");
let headerUserName = document.getElementById("headerUserName");
let startQuizLink = document.getElementById("startQuizLink");

// 
let startQuizBtn = document.getElementById("startQuizBtn");
let seeResultBtn = document.getElementById("seeResultBtn");
let userIndex;

// 
for(let i = 0; i < allUsers.length; i++) {
    if(allUsers[i].isLoggedIn === true) {
        loggedInUser = allUsers[i];
        logoutCont.style.display = "block"
        loginCont.style.display = "none";
        registerCont.style.display = "none";
        headerUserName.style.display = "inline";
        userIndex=i;
        headerUserName.textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
        break;
    }

}

logoutBtn.onclick = () => {
    for (let i = 0; i < allUsers.length; i++) {
        allUsers[i].isLoggedIn = false;     
    }
    localStorage.setItem("usersInfo", JSON.stringify(allUsers));
    location.href = "/HTML/homePage.html";
}











let score = 0;
let userAnswers = allUsers[userIndex].userAnswers
let correctAnswers = [];
console.log(userAnswers)
Result = document.getElementById("result");
fetch('/JS/quizApp.json')
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("Error while fetching the data");
        }
    })
    .then((data) => {
        // Extract correct answers from each category and push them to correctAnswers array
        for (const category in data) {
            if (data.hasOwnProperty(category)) {
                const questions = data[category];
                for (const question of questions) {
                    correctAnswers.push(question.correct_answer);
                }
            }
        }
        compareUserAnswers();
        console.log(score)
    })
    .catch((err) => {
        console.log(err);
    });



function compareUserAnswers() {
    for(let i = 0; i < userAnswers.length; i++) {
        if(userAnswers[i] == correctAnswers[i]) {
            score++;
        }
    }
    if (score >= 10) {
        Result.innerHTML =
            ` <img src="/Images/check.PNG" width="200px" >
        <div class="congrats">Congratulation!</div>
        <div> We will arrange with you for an interview </div>
        <div> Your score is ${score} out of 20 <div>
        <button id="see">See Answers</button>`;
    
        let see = document.getElementById("see");
        see.addEventListener("click", () => {
            window.location.href = "/HTML/resultPage.html";
        })
    }
    
    else {
        Result.innerHTML =
            ` <img src="/Images/fail.png" width="200px">
        <div class="fail">You failed the quiz</div>
        <div> Work hard and keep trying </div>
        <div> Your score is ${score} out of 20 <div>
        <button id="see">See Answers</button>`
    
        let see = document.getElementById("see");
        see.addEventListener("click", () =>
            window.location.href = "/HTML/resultPage.html"
    
        )
    }
    localStorage.setItem("userScore", score);
}





