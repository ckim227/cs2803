
let savedRecipesName = document.getElementById("savedRecipesName");
let savedMessage = document.getElementById("savedMessage");
let linkedMessage = document.getElementById("linkedMessage");
let accordion1 = document.getElementById("accordion1");
let accordion2 = document.getElementById("accordion2");
let srText = document.getElementById("savedRecipes");
let lrText = document.getElementById("linkedRecipes");
function showRecipes() {
    let xhr = new XMLHttpRequest()
    xhr.addEventListener("load", responseHandlerSaved)
    
    url = "/getSaved";
    xhr.responseType = "json";   
    xhr.open("POST", url)
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr.send()

    let xhr2 = new XMLHttpRequest()
    xhr2.addEventListener("load", responseHandlerLinked)
    
    url = "/getLinked";
    xhr2.responseType = "json";   
    xhr2.open("POST", url)
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr2.send()
}


function responseHandlerSaved() {
    if (this.response.message === "loaded") {
        let index = 1
        this.response.rows.forEach(recipe => {
            let innerHTML = `<div class="card mb-2">
            <div class="card-header" id="${"heading" + index}">
                <h5 class="mb-0">
                    <button onmousedown="event.preventDefault()" class="btn btn-default collapsed w-100 text-left" data-toggle="collapse" data-target="${"#collapse" + index}" aria-expanded="true" aria-controls="${"collapse" + index}">
                        ${recipe.recipeName}
                    </button>
                    <button type="button" class="close position-absolute" aria-label="Close" style="right: 10px; top: 18px">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </h5
            </div>
            <div id="${"collapse" + index}" class="collapse" aria-labelledby="${"heading" + index}" data-parent="#accordion1">
              <div class="card-body">
                <img src = ${recipe.image} width ="30%" class="mx-auto d-block rounded mb-3">
                <p>${recipe.recipeIngredients}</p>
                <p>${recipe.recipeInstructions}</p>
                <label for="${"comment"+ index}">Comments:</label>
                <textarea class="form-control mb-3 overflow-auto" id="${"comment"+ index}" rows="3" value="${recipe.comment}"></textarea> 
                <button class="btn btn-outline-dark btn-sm" id=${"button"+index}>Save Comments</button>
              </div>
            </div>
          </div>`
            accordion1.innerHTML += innerHTML;
            console.log(document.getElementById("button"+index));
            console.log(document.getElementById("comment" + index).value)
            console.log(recipe.recipeName) 
            
            document.getElementById( "button"+index ).setAttribute( "onclick", `javascript: saveComment("${recipe.recipeName}", "${document.getElementById("comment" + index).value}");` );

            index++;
    });
    } else {
        savedMessage.innerText = this.response.message;
    }
    console.log(this.response)
}

var saveComment = function(recipeName, comment){
    console.log(recipeName + comment)
    let xhr3 = new XMLHttpRequest()
    xhr3.addEventListener("load", responseHandlerComment)
    query=`recipeName=${recipeName}&comment=${comment}`
    console.log(query)
    url = "/saveComment";
    xhr3.responseType = "json";   
    xhr3.open("POST", url)
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr3.send(query)
}

function responseHandlerComment() {

}
let savedCommentIndex = 1
function responseHandlerLinked() {
    if (this.response.message === "loaded") {
        this.response.rows.forEach(recipe => {
            let innerHTML = `<div class="card mb-2">
            <div class="card-header" id="${"heading" + index}">
                <h5 class="mb-0">
                    <button onmousedown="event.preventDefault()" class="btn btn-default collapsed w-100 text-left" data-toggle="collapse" data-target="${"#collapse2" + index}" aria-expanded="true" aria-controls="${"collapse2" + index}">
                        ${recipe.recipeName}
                    </button>
                </h5
            </div>
            <div id="${"collapse2" + index}" class="collapse" aria-labelledby="${"heading" + savedCommentIndex}" data-parent="#accordion2">
              <div class="card-body">
                <div class="d-flex justify-content-center mb-2">
                    <iframe class="w-100" src="${recipe.link}" title="${recipe.recipeName}" height="500"></iframe>
                </div>
                <label for="exampleFormControlTextarea1">Comments:</label>
                <textarea class="form-control mb-3" id="exampleFormControlTextarea1" rows="3"></textarea> 
                <button class="btn btn-outline-dark btn-sm">Save Comments</button>
                <div class="d-flex justify-content-center">
                    <button onmousedown="event.preventDefault()" class="btn btn-outline-dark" id="${"link" + savedCommentIndex}" onclick="window.open('${recipe.link}','_blank')">Go to ${recipe.recipeName}</button>
                </div
                
              </div>
            </div>
          </div>`
            accordion2.innerHTML += innerHTML;
            savedCommentIndex++;
        });
    } else {
        linkedMessage.innerText = this.response.message;
    }
    console.log(this.response)
}
let openedR1 = true;
function showR1() {
    if (!openedR1) {
        accordion1.classList.remove("d-none");
        openedR1 = true;
    } else {
        accordion1.classList.add("d-none");
        openedR1 = false;
    }
}
let openedR2 = true;
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
    console.log(document.cookie);
    if (document.cookie === "true") {
        document.getElementById("success").classList.remove("d-none");
        setTimeout(function() {
            document.getElementById("success").classList.add("d-none");
        }, 3000);
        document.cookie = "false"
    } 
}

function bringToRandom() {
    document.location = "/randomRecipe";
}

function bringToLinked() {
    document.location = "/uploadRecipe";
}

function addEventHandlers() {
    for (let i = 1; i <= savedCommentIndex; i++) {
        document.getElementById("button" + i).addEventListener("click", function () {
            document.getElementById("comment" + i)
        })
    }
}
window.addEventListener("load", popupHandler);
window.addEventListener("load", showRecipes);
srText.addEventListener("click", showR1);
lrText.addEventListener("click", showR2);
savedMessage.addEventListener("click", bringToRandom);
linkedMessage.addEventListener("click", bringToLinked);


