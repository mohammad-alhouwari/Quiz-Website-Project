let userEmail = document.querySelector("#emailAddress");
let userPassword = document.querySelector("#Password");
let signInBtn = document.querySelector("#submit");
let allUsers = JSON.parse(localStorage.getItem("usersInfo"));
let errorMsg = document.getElementById("errorMsg");
const showPasswordIcons = document.querySelector(".showPassword");
const passwordInput = document.querySelector(".password");

document.getElementById("form").onclick = (e) => {
    e.preventDefault();
}
// Show - Hide password
showPasswordIcons.addEventListener("click", (e) => {
    e.preventDefault();
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});

// Login + set the value of isLoggedIn "true".
signInBtn.addEventListener("click", () => {

    for (let i = 0; i < allUsers.length; i++) {
        allUsers[i].isLoggedIn = false;
    }

    for (let i = 0; i < allUsers.length; i++) {
        if (userEmail.value === allUsers[i].email && userPassword.value === allUsers[i].password) {
            errorMsg.textContent = '';
            allUsers[i].isLoggedIn = true;
            localStorage.setItem("usersInfo", JSON.stringify(allUsers));
            window.location.href = '/HTML/homePage.html';
            break;
        }
        else {
            errorMsg.textContent = `Email or password incorrect`;
        }
    }
})




