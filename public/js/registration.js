let registerButton = document.getElementById("register")
let username = document.getElementById("username")
let password = document.getElementById("password")
let confirmPassword = document.getElementById("confirm_password")
let main = document.getElementById("mainli");
let logout = document.getElementById("logoutli");
let random = document.getElementById("randomli");
let regCont = document.getElementById("regCont");
let messageCont = document.getElementById("messageCont");
let message = document.getElementById("message");

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
        messageCont.classList.remove("d-none");
        message.style.display = "block"
        message.innerText = "Passwords don't match! Please try again"
    } 
}

function responseHandler(){
    messageCont.classList.remove("d-none");
    if (this.response.success){    
        message.innerText = this.response.message;
        message.style.color = "green";
        main.classList.remove("d-none");
        random.classList.remove("d-none");
        logout.classList.remove("d-none");
        regCont.classList.add("d-none");
    }else{
        message.innerText = this.response.message
    }
}
console.log(username)
registerButton.addEventListener("click", register)