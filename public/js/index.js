let loginButton = document.getElementById("login")
let username = document.getElementById("username")
let password = document.getElementById("password")
let main = document.getElementById("mainli");
let logout = document.getElementById("logoutli");
let random = document.getElementById("randomli");
let loginli = document.getElementById("loginli");
let upload = document.getElementById("uploadli");
let logCont = document.getElementById("logCont");
let messageCont = document.getElementById("messageCont");
let invalidUsername = document.getElementById("invalidUsername");
let invalidPassword = document.getElementById("invalidPassword")

function login(event){
    event.preventDefault();
    let xhr = new XMLHttpRequest()
    xhr.addEventListener("load", responseHandler)
    query=`username=${username.value}&password=${password.value}`
    // when submitting a GET request, the query string is appended to URL
    // but in a POST request, do not attach the query string to the url
    // instead pass it as a parameter in xhr.send()
    url = `/attempt_login`
    xhr.responseType = "json";   
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr.send(query)
}

function responseHandler(){
    if (this.response) {
        if (this.response.success){    
            message.style.color = "green";
            main.classList.remove("d-none");
            random.classList.remove("d-none");
            logout.classList.remove("d-none");
            loginli.classList.add("d-none");
            logCont.classList.add("d-none");
            messageCont.classList.remove("d-none");
            upload.classList.remove("d-none");
            invalidUsername.classList.add("d-none");
            invalidPassword.classList.add("d-none");
            document.cookie = "true";
            document.location = "/main";
        } else {
            if (this.response.message == "Server error") {
                message.innerText = this.response.message
                message.style.color = "red";
                messageCont.classList.remove("d-none");
            }
            else {
                invalidUsername.classList.add("d-none");
                invalidPassword.classList.add("d-none");
                if (this.response.message == "This username does not exist!") {
                    invalidUsername.classList.remove("d-none");
                    invalidUsername.innerText = this.response.message;
                } else if (this.response.message == "This password is incorrect!") {
                    invalidPassword.classList.remove("d-none");
                    invalidPassword.innerText = this.response.message;
                }
                if (username.value.length == 0 && password.value.length == 0) {
                    invalidUsername.classList.remove("d-none");
                    invalidPassword.classList.remove("d-none");
                    invalidUsername.innerText = "Please enter your username!";
                    invalidPassword.innerText = "Please enter your password!";
                }
                else if (username.value.length == 0) {
                    invalidUsername.classList.remove("d-none");
                    invalidUsername.innerText = "Please enter your username!";
                } else if (password.value.length == 0) {
                    invalidPassword.classList.remove("d-none");
                    invalidPassword.innerText = "Please enter your password!";
                }
            }
        }
    }
}
function usernameInput(event){
    // event.preventDefault();
    // let xhr = new XMLHttpRequest()
    // xhr.addEventListener("load", uiHandler)
    // query=`username=${username.value}`
    // url = `/username`
    // xhr.responseType = "json";   
    // xhr.open("POST", url)
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // xhr.send(query)
    // let invalidUsername = document.getElementById("invalidUsername");
    // invalidUsername.classList.add("d-none");
    invalidUsername.classList.add("d-none");
}
function passwordInput(event) {
    invalidPassword.classList.add("d-none");
}
// function uiHandler(){
//     let invalidUsername = document.getElementById("invalidUsername");
//     if (this.response.success) {
//         let validUsername = document.getElementById("validUsername");
//         validUsername.innerText = this.response.message;
//         validUsername.classList.remove("d-none");
//         invalidUsername.classList.add("d-none");
//     } else {
//         invalidUsername.innerText = this.response.message;
//         invalidUsername.classList.remove("d-none");
//         validUsername.classList.add("d-none");
//     }
// }
loginButton.addEventListener("click", login);
username.addEventListener("input", usernameInput);
password.addEventListener("input", passwordInput);