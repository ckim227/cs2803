let savedRecipes = document.getElementById("savedRecipes");
let message = document.getElementById("message");


function showSaved() {
    console.log("loaded")
    let xhr = new XMLHttpRequest()
    xhr.addEventListener("load", responseHandler)
    
    url = "/getSaved";
    xhr.responseType = "json";   
    xhr.open("POST", url)
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    console.log("sending request")
    xhr.send()
}

function responseHandler() {
    console.log("responseHandler")
    this.response.rows.forEach(recipe => {
        let name = document.createElement('p');
        let ingredients = document.createElement('p');
        let instructions = document.createElement('p');
        name.textContent = recipe.recipeName;
        ingredients.textContent = recipe.recipeIngredients;
        instructions.textContent = recipe.recipeInstructions;
        savedRecipes.append(name, ingredients, instructions);
    });
    if (this.response.message != "loaded") {
        message.innerText = this.response.message;
    }
    console.log(this.response)
}

window.addEventListener("load", showSaved);