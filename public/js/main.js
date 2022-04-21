let savedRecipes = document.getElementById("savedRecipes");
let linkedRecipes = document.getElementById("linkedRecipes");
let savedMessage = document.getElementById("savedMessage");
let linkedMessage = document.getElementById("linkedMessage");


function showRecipes() {
    console.log("loaded")
    let xhr = new XMLHttpRequest()
    xhr.addEventListener("load", responseHandlerSaved)
    
    url = "/getSaved";
    xhr.responseType = "json";   
    xhr.open("POST", url)
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    console.log("sending request")
    xhr.send()

    console.log("loaded")
    let xhr2 = new XMLHttpRequest()
    xhr2.addEventListener("load", responseHandlerLinked)
    
    url = "/getLinked";
    xhr2.responseType = "json";   
    xhr2.open("POST", url)
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    console.log("sending request")
    xhr2.send()
}

function responseHandlerSaved() {
    console.log("responseHandlerSaved")
        if (this.response.message === "loaded") {
        this.response.rows.forEach(recipe => {
            let name = document.createElement('p');
            let ingredients = document.createElement('p');
            let instructions = document.createElement('p');
            name.textContent = recipe.recipeName;
            ingredients.textContent = recipe.recipeIngredients;
            instructions.textContent = recipe.recipeInstructions;

            savedRecipes.append(name, ingredients, instructions);
        });
    } else {
        message.innerText = this.response.message;
    }
    console.log(this.response)
}

function responseHandlerLinked() {
    console.log("responseHandlerLinked")
    if (this.response.message === "loaded") {
        this.response.rows.forEach(recipe => {
            let link = document.createElement('iframe');

            link.src = recipe.link;
            link.title = recipe.recipeName;

            linkedRecipes.append(link);
        });
    } else {
        linkedMessage.innerText = this.response.message;
    }
    console.log(this.response)
}

window.addEventListener("load", showRecipes);