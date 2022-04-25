
let savedRecipesName = document.getElementById("savedRecipesName");
let savedMessage = document.getElementById("savedMessage");
let linkedMessage = document.getElementById("linkedMessage");
let accordion1 = document.getElementById("accordion1");
let accordion2 = document.getElementById("accordion2");


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
        let index = 1
        this.response.rows.forEach(recipe => {
            let innerHTML = `<div class="card">
            <div class="card-header" id="${"heading" + index}">
                <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="${"#collapse" + index}" aria-expanded="true" aria-controls="${"collapse" + index}">
                        ${recipe.recipeName}
                    </button>
                </h5
            </div>
            <div id="${"collapse" + index}" class="collapse" aria-labelledby="${"heading" + index}" data-parent="#accordion1">
              <div class="card-body">
                <p>${recipe.recipeIngredients}</p>
                <p>${recipe.recipeInstructions}</p>
              </div>
            </div>
          </div>`
            accordion1.innerHTML += innerHTML;
            index++;
    });
    } else {
        savedMessage.innerText = this.response.message;
    }
    console.log(this.response)
}

function responseHandlerLinked() {
    if (this.response.message === "loaded") {
        let index = 1
        this.response.rows.forEach(recipe => {
            let innerHTML = `<div class="card">
            <div class="card-header" id="${"heading" + index}">
                <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="${"#collapse2" + index}" aria-expanded="true" aria-controls="${"collapse2" + index}">
                        ${recipe.recipeName}
                    </button>
                </h5
            </div>
            <div id="${"collapse2" + index}" class="collapse" aria-labelledby="${"heading" + index}" data-parent="#accordion2">
              <div class="card-body">
                <div class="d-flex justify-content-center">
                    <iframe class="w-100" src="${recipe.link}" title="${recipe.recipeName}" height="500"></iframe>
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary" id="${"link" + index}" onclick="window.open('${recipe.link}','_blank')">Go to ${recipe.recipeName}</button>
                </div
              </div>
            </div>
          </div>`
          console.log(recipe.link);
            accordion2.innerHTML += innerHTML;
            index++;
        });
    } else {
        linkedMessage.innerText = this.response.message;
    }
    console.log(this.response)
}

window.addEventListener("load", showRecipes);