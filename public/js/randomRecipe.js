
let generateButton = document.getElementById("random")
let addRecipeButton = document.getElementById("addRandom")

let recipeName = document.getElementById("recipe-name")
let ingredients = document.getElementById("ingredients")
let instructions = document.getElementById("instructions")

function getRandom(){
    let message = document.getElementById("message");
    message.classList.add("invisible");
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    url = "https://www.themealdb.com/api/json/v1/1/random.php"
    xhr.responseType = "json"
    xhr.open("GET", url)
    xhr.send()
}

function responseHandler(){
    recipeName.style.display = "block"
    ingredients.style.display = "block"
    instructions.style.display = "block"


    mealArr = []
    for (var thing in this.response.meals[0]) {
        mealArr.push(this.response.meals[0][thing]);
    }
    if (this.status === 200) {
        recipeName.innerText = this.response.meals[0].strMeal
        let ingredientsList = ""
        for (let i = 9; i < 29; i++) {
            if (mealArr[i] != "" && mealArr[i] != null && mealArr[i] != undefined) {
                ingredientsList += mealArr[i] + ": " + mealArr[i+20] + "\n" 
            }
        }
        ingredients.innerText = ingredientsList
        instructions.innerText = this.response.meals[0].strInstructions

    } else {
        recipeName.innerText = "Error"
    }
    addRecipeButton.classList.remove("invisible");

}

function saveRandom(){
    let xhr2 = new XMLHttpRequest()
    xhr2.addEventListener("load", saveResponseHandler)
    query=`recipeName=${recipeName.innerText}&ingredients=${ingredients.innerText}&instructions=${instructions.innerText}`
    // when submitting a GET request, the query string is appended to URL
    // but in a POST request, do not attach the query string to the url
    // instead pass it as a parameter in xhr.send()
    url = "/saveRandom";
    xhr2.responseType = "json";   
    xhr2.open("POST", url)
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr2.send(query)
}

function saveResponseHandler(){
    let message = document.getElementById("message");
    message.classList.remove("invisible");
    if (this.response.success){    
        message.innerText = this.response.message;
        message.style.color = "green";
    }else{
        message.innerText = this.response.message;
        message.style.color = "red";
    }
}

generateButton.addEventListener("click", getRandom); //change name of button
addRecipeButton.addEventListener("click", saveRandom);