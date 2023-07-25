const passwordInput = document.querySelectorAll(".password");
const showPasswordIcons = document.querySelectorAll(".showPassword");
const emailAddressInput = document.getElementById("emailAddress");
const sumbitButton = document.getElementById("submit");
const form = document.getElementById("form");
let allUsers = []

if(localStorage.length !== 0) {
    allUsers = JSON.parse(localStorage.getItem("usersInfo"));
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
});

for (let i = 0; i < showPasswordIcons.length; i++) {
    showPasswordIcons[i].addEventListener("click", (e) => {
        e.preventDefault();
        if (passwordInput[i].type === "password") {
            passwordInput[i].type = "text"; // Use the assignment operator "=" instead of "===".
        } else {
            passwordInput[i].type = "password"; // Use the assignment operator "=" instead of "===".
        }
    });
}

/* Start Regx */

const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

let errorMsg = document.getElementById("errorMsg");
let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");

/* End Regx */

sumbitButton.onclick = () => {

    let exists = false;

    for(let i = 0; i < allUsers.length; i++) {
        if(emailAddressInput.value === allUsers[i].email) {
            exists = true;
            break;
        }
    }

    if (!nameRegex.test(firstNameInput.value)) {
        errorMsg.textContent = `The first name must only contains letters`;
    }

    else if (!nameRegex.test(lastNameInput.value)) {
        errorMsg.textContent = `The last name must only contains letters`;
    }

    else if (!emailRegex.test(emailAddressInput.value)) {
        errorMsg.textContent = `Use a valid email`;
    }

    else if(exists) {
        errorMsg.textContent = `This email is used`;
    }

    else if (!passwordRegex.test(passwordInput[0].value)) {
        console.log(passwordInput[0].value)
        errorMsg.textContent = `Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long`;
    }

    else if (passwordInput[0].value !== passwordInput[1].value) {
        errorMsg.textContent = `Passwords are not matched`;
    }
 
    else {
        errorMsg.textContent = '';

        const newUser = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailAddressInput.value,
            password: passwordInput[0].value,
            userAnswers: [],
            isLoggedIn: false
        };

        allUsers.push(newUser);

        localStorage.setItem("usersInfo", JSON.stringify(allUsers));
        window.location.href = '/HTML/signinPage.html';
    }
}





