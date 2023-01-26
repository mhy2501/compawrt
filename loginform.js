const form = document.getElementById("signup")
const username = document.getElementById("username1")
const firstname = document.getElementById("firstname")
const lastname = document.getElementById("lastname")
const email = document.getElementById("email")
const password = document.getElementById("password1")
const password2 = document.getElementById("password2")

const letters = /^[A-Za-z]+$/;

form.addEventListener("submit", e => {
    e.preventDefault();
    checkInputs();
})

function checkInputs() {
    const usernameValue = username.value.trim();
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === "") {
        setErrorFor(username, "Username cannot be blank");
    } else {
        setSuccessFor(username);
    }

    if (firstnameValue === "") {
        setErrorFor(firstname, "First Name cannot be blank");
    } else if (!letters.test(firstnameValue)) {
        setErrorFor(firstname, "First Name should only contain letters")
    } else {
        setSuccessFor(firstname);
    }
    if (lastnameValue === "") {
        setErrorFor(lastname, "Last Name cannot be blank");
    } else if (!letters.test(lastnameValue)) {
        setErrorFor(lastname, "Last Name should only contain letters")
    } else {
        setSuccessFor(lastname);
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

