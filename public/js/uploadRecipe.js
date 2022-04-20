let saveLinkBtn = document.getElementById("saveLinkBtn");

let recipeLink = document.getElementById("recipeLink");
let recipeName = document.getElementById("recipeName");

function saveLink(event){
    event.preventDefault()
    let xhr = new XMLHttpRequest()
    xhr.addEventListener("load", responseHandler)
    query=`link=${recipeLink.value}&recipeName=${recipeName.value}`
    // when submitting a GET request, the query string is appended to URL
    // but in a POST request, do not attach the query string to the url
    // instead pass it as a parameter in xhr.send()
    url = "/saveLinkedRecipe";
    xhr.responseType = "json";   
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr.send(query)
}

function responseHandler(){
    let message = document.getElementById("message")
    message.classList.remove("invisible");
    if (this.response.success){    
        message.innerText = this.response.message
        message.style.color = "green";
    }else{
        message.innerText = this.response.message
        message.style.color = "red";
    }
}

saveLinkBtn.addEventListener("click", saveLink);