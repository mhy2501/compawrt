const logIn = document.getElementById("login")
const signUp = document.getElementById("signup")
const toggleBtn = document.getElementById("btn")

function signup() {
    logIn.style.left = "-450px"
    signUp.style.left = "50px"
    toggleBtn.style.left = "90px"
}
        
function login() {
    logIn.style.left ="50px"
    signUp.style.left = "450px"
    toggleBtn.style.left = "0"
}

const form = document.getElementById("form2")
const username = document.getElementById("username1")
const fullname = document.getElementById("fullname1")
const email = document.getElementById("email1")
const password = document.getElementById("password1")
const password2 = document.getElementById("password2")

const letters = /^[A-Za-z]+$/;

form.addEventListener("submit", e => {
    e.preventDefault();
    checkInputs();
})

function checkInputs() {
    const usernameValue = username.value.trim();
    const fullnameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === "") {
        setErrorFor(username, "Username cannot be blank");
    } else {
        setSuccessFor(username);
    }

    if (fullnameValue === "") {
        setErrorFor(fullname, "Fullname cannot be blank");
    } else if (!letters.test(fullnameValue)) {
        setErrorFor(fullname, "Fullname should only contain letters")
    } else {
        setSuccessFor(fullname);
    }

    if (emailValue === "") {
        setErrorFor(email, "Email cannot be blank");
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, "Not a valid email");
    }else {
        setSuccessFor(email);
    }

    if (passwordValue === "") {
        setErrorFor(password, "Password cannot be blank");
    } else if (passwordValue.length <= 6) {
        setErrorFor(password, "Password should be longer than 6 characters");
    } else if (passwordValue.length > 20) {
        setErrorFor(password, "Password can't be longer than 20 characters");
    } else {
        setSuccessFor(password);
    }

    if (password2Value === "") {
        setErrorFor(password2, "Confirm Password cannot be blank");
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, "Passwords do not match");
    } else {
        setSuccessFor(password2);
    } 
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const error = formControl.querySelector(".errorMessage");
    formControl.className = "form-control-error"
    error.textContent = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
    formControl.className = 'form-control-success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// function register() {
//     window.location.href = "dashboard.html"
// }
// const form1 = document.getElementById(form1)

// form1.addEventListener("submit", e => {
//     e.preventDefault();
//     loginPage()
// })

// function loginPage() {
//     window.location.href = "dashboard.html"
// }