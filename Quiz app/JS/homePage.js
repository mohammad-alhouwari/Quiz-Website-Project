let allUsers = JSON.parse(localStorage.getItem("usersInfo"));
let loggedInUser = {};
let loginBtn = document.getElementById("login");
let logoutBtn = document.getElementById("logout");
let logoutCont = document.getElementById("logoutCont");
let loginCont = document.getElementById("loginCont");
let registerCont = document.getElementById("registerCont");
let headerUserName = document.getElementById("headerUserName");
let startQuizLink = document.getElementById("startQuizLink");

for(let i = 0; i < allUsers.length; i++) {
    if(allUsers[i].isLoggedIn === true) {
        loggedInUser = allUsers[i];
        document.getElementById("welcome").textContent = `Hello ${loggedInUser.firstName} ${loggedInUser.lastName}`;
        logoutCont.style.display = "block"
        loginCont.style.display = "none";
        registerCont.style.display = "none";
        headerUserName.style.display = "inline";
        startQuizLink.href="/HTML/quizPage.html"
        headerUserName.textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
        break;
    }
}

logoutBtn.onclick = () => {
    for (let i = 0; i < allUsers.length; i++) {
        allUsers[i].isLoggedIn = false;     
    }
    localStorage.setItem("usersInfo", JSON.stringify(allUsers));
    location.reload();
}
