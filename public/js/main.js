
let savedRecipesName = document.getElementById("savedRecipesName");
let savedMessage = document.getElementById("savedMessage");
let linkedMessage = document.getElementById("linkedMessage");
let accordion1 = document.getElementById("accordion1");
let accordion2 = document.getElementById("accordion2");
let srText = document.getElementById("savedRecipes");
let lrText = document.getElementById("linkedRecipes");
let firstLoad = true;
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
            let innerHTML = `<div class="card mb-2">
            <div class="card-header" id="${"heading" + index}">
                <h5 class="mb-0">
                    <button onmousedown="event.preventDefault()" class="btn btn-default collapsed" data-toggle="collapse" data-target="${"#collapse" + index}" aria-expanded="true" aria-controls="${"collapse" + index}">
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
            let innerHTML = `<div class="card mb-2">
            <div class="card-header" id="${"heading" + index}">
                <h5 class="mb-0">
                    <button onmousedown="event.preventDefault()" class="btn btn-default collapsed" data-toggle="collapse" data-target="${"#collapse2" + index}" aria-expanded="true" aria-controls="${"collapse2" + index}">
                        ${recipe.recipeName}
                    </button>
                </h5
            </div>
            <div id="${"collapse2" + index}" class="collapse" aria-labelledby="${"heading" + index}" data-parent="#accordion2">
              <div class="card-body">
                <div class="d-flex justify-content-center mb-2">
                    <iframe class="w-100" src="${recipe.link}" title="${recipe.recipeName}" height="500"></iframe>
                </div>
                <div class="d-flex justify-content-center">
                    <button onmousedown="event.preventDefault()" class="btn btn-outline-dark" id="${"link" + index}" onclick="window.open('${recipe.link}','_blank')">Go to ${recipe.recipeName}</button>
                </div
              </div>
            </div>
          </div>`
            accordion2.innerHTML += innerHTML;
            index++;
        });
    } else {
        linkedMessage.innerText = this.response.message;
    }
    console.log(this.response)
}
let openedR1 = false;
function showR1() {
    if (!openedR1) {
        accordion1.classList.remove("d-none");
        openedR1 = true;
    } else {
        accordion1.classList.add("d-none");
        openedR1 = false;
    }
}
let openedR2 = false;
function showR2() {
    if (!openedR2) {
        accordion2.classList.remove("d-none");
        openedR2 = true;
    } else {
        accordion2.classList.add("d-none");
        openedR2 = false;
    }
} 

function popupHandler() {
    if (firstLoad) {
        setTimeout(function() {
            document.getElementById("success").classList.add("d-none");
        }, 3000);
    }
    firstLoad = false;
}
window.addEventListener("load", popupHandler);
window.addEventListener("load", showRecipes);
srText.addEventListener("click", showR1);
lrText.addEventListener("click", showR2);