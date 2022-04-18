let generateButton = document.getElementById("random")
let addRecipeButton = document.getElementById("addRandom")

function getRandom(){
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    url = "https://www.themealdb.com/api/json/v1/1/random.php"
    xhr.responseType = "json"
    xhr.open("GET", url)
    xhr.send()
}

function responseHandler(){
    let recipeName = document.getElementById("recipe-name")
    let ingredients = document.getElementById("ingredients")
    let instructions = document.getElementById("instructions")
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
            if (mealArr[i] != "") {
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

generateButton.addEventListener("click", getRandom) //change name of button