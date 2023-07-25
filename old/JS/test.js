let userEmail = document.querySelector("#userName");
let userPassword = document.querySelector("#password");
let sendBtn = document.querySelector("#sendData");

let users = [];
if (localStorage.getItem('users')   != undefined) {
    users =localStorage.getItem('users');
}


sendBtn.onclick = () => {

   users +=`
    {
        "email": "${userEmail.value}",
        "password": "${userPassword.value}"
    }
`  
    localStorage.setItem('users',users)
}

// localStorage.clear()


