let registerButton = document.getElementById("register")
let username = document.getElementById("username")
let password = document.getElementById("password")
let confirmPassword = document.getElementById("confirm_password")
let main = document.getElementById("mainli");
let logout = document.getElementById("logoutli");
let random = document.getElementById("randomli");
let registration = document.getElementById("registrationli");
let regCont = document.getElementById("regCont");
let messageCont = document.getElementById("messageCont");
let message = document.getElementById("message");
let upload = document.getElementById("uploadli");

function register(event){
    event.preventDefault();
    if (password.value === confirmPassword.value){
        let xhr = new XMLHttpRequest()
        xhr.addEventListener("load", responseHandler)
        query=`username=${username.value}&password=${password.value}`
        // when submitting a GET request, the query string is appended to URL
        // but in a POST request, do not attach the query string to the url
        // instead pass it as a parameter in xhr.send()
        url = `/register`
        xhr.responseType = "json";   
        xhr.open("POST", url)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        // notice the query string is passed as a parameter in xhr.send()
        // this is to prevent the data from being easily sniffed
        xhr.send(query)
    }
    else{
        let invalidPassword = document.getElementById("invalidPassword2");
        invalidPassword.innerHTML = "Passwords do not match!"
        invalidPassword.classList.remove("d-none");
    } 
}

function responseHandler(){
    let validUsername = document.getElementById("validUsername");
    let invalidUsername = document.getElementById("invalidUsername");
    let validPassword1 = document.getElementById("validPassword1");
    let invalidPassword = document.getElementById("invalidPassword1");
    messageCont.classList.remove("d-none");
    if (this.response.success){    
        message.innerText = this.response.message;
        message.style.color = "green"
        main.classList.remove("d-none");
        random.classList.remove("d-none");
        logout.classList.remove("d-none");
        regCont.classList.add("d-none");
        upload.classList.remove("d-none");
        invalidUsername.classList.add("d-none");
        invalidPassword.classList.add("d-none");
        validUsername.classList.remove("d-none");
        validPassword1.classList.remove("d-none");
    }else{
        if (this.response.message == "Server error") {
            message.innerText = this.response.message
            message.style.color = "red";
            messageCont.classList.remove("d-none");
        }
        else {
            invalidUsername.classList.add("d-none");
            invalidPassword.classList.add("d-none");
            if (this.response.message == "Username already taken! Please try another username") {
                invalidUsername.classList.remove("d-none");
                invalidUsername.innerText = this.response.message;
                validUsername.classList.add("d-none");
            }
            if (username.value.length == 0 && password.value.length == 0) {
                invalidUsername.classList.remove("d-none");
                invalidPassword.classList.remove("d-none");
                invalidUsername.innerText = "Please enter your username!";
                invalidPassword.innerText = "Please enter your password!";
                validUsername.classList.add("d-none");
                validPassword1.classList.add("d-none");
            }
            else if (username.value.length == 0) {
                invalidUsername.classList.remove("d-none");
                invalidUsername.innerText = "Please enter your username!";
                validUsername.classList.add("d-none");
                validPassword1.classList.remove("d-none");
            } else if (password.value.length == 0) {
                invalidPassword.classList.remove("d-none");
                invalidPassword.innerText = "Please enter your password!";
                validUsername.classList.remove("d-none");
                validPassword1.classList.add("d-none");
            } 
        }
    }
}
// function usernameInput(event){
//     event.preventDefault();
//     let xhr = new XMLHttpRequest()
//     xhr.addEventListener("load", uiHandler)
//     query=`username=${username.value}`
//     url = `/registerusername`
//     xhr.responseType = "json";   
//     xhr.open("POST", url)
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
//     xhr.send(query)
// }
// function uiHandler(){
//     let invalidUsername = document.getElementById("invalidUsername");
//     if (this.response.success) {
//         let validUsername = document.getElementById("validUsername");
//         validUsername.classList.remove("d-none");
//         invalidUsername.classList.add("d-none");
//     } else {
//         invalidUsername.innerText = this.response.message;
//         invalidUsername.classList.remove("d-none");
//         validUsername.classList.add("d-none");
//     }
// }
function usernameInput(event){
    let invalidUsername = document.getElementById("invalidUsername");
    invalidUsername.classList.add("d-none");
}
function passwordInput(event) {
    let invalidPassword = document.getElementById("invalidPassword1");
    invalidPassword.classList.add("d-none");
}
function confirmInput(event){
    console.log("hello");
    let validPassword = document.getElementById("validPassword2");
    let invalidPassword = document.getElementById("invalidPassword2");
    if (confirmPassword.value === password.value) {
        invalidPassword.innerHTML = "Passwords match!"
        validPassword.classList.remove("d-none");
        invalidPassword.classList.add("d-none");
    } else {
        invalidPassword.innerHTML = "Passwords do not match!"
        validPassword.classList.add("d-none");
        invalidPassword.classList.remove("d-none");
    }
}
console.log(username.innerText);
registerButton.addEventListener("click", register)
confirmPassword.addEventListener("input", confirmInput)
username.addEventListener("input", usernameInput);
password.addEventListener("input", passwordInput);