let loginButton = document.getElementById("login")
let username = document.getElementById("username")
let password = document.getElementById("password")
let main = document.getElementById("mainli");
let logout = document.getElementById("logoutli");
let random = document.getElementById("randomli");
let loginli = document.getElementById("loginli");
let logCont = document.getElementById("logCont");
let messageCont = document.getElementById("messageCont");

function login(event){
    event.preventDefault()
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
    let message = document.getElementById("message")
    messageCont.classList.remove("d-none");
    if (this.response.success){    
        message.innerText = this.response.message
        message.style.color = "green";
        main.classList.remove("d-none");
        random.classList.remove("d-none");
        logout.classList.remove("d-none");
        loginli.classList.add("d-none");
        logCont.classList.add("d-none");
        messageCont.classList.remove("d-none");
    }else{
        message.innerText = this.response.message
    }
}

loginButton.addEventListener("click", login)