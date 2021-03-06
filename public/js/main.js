
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
    xhr.send()

    let xhr2 = new XMLHttpRequest()
    xhr2.addEventListener("load", responseHandlerLinked)
    
    url = "/getLinked";
    xhr2.responseType = "json";   
    xhr2.open("POST", url)
    xhr2.send()
}


function responseHandlerSaved() {
    if (this.response.message === "loaded") {
        let index = 1
        this.response.rows.forEach(recipe => {
            let innerHTML = `<div class="card mb-2" id="${"card" + index}">
            <div class="card-header" id="${"heading" + index}">
                <h5 class="mb-0">
                    <button onmousedown="event.preventDefault()" class="btn btn-default collapsed w-100 text-left" data-toggle="collapse" data-target="${"#collapse" + index}" aria-expanded="true" aria-controls="${"collapse" + index}">
                        <h5>${recipe.recipeName}</h5>
                    </button>
                    <button type="button" class="btn btn-outline-secondary position-absolute" style="right: 10px; top: 15px" id="${"delete" + index}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                        </svg>
                    </button>
                </h5>
            </div>
            <div id="${"collapse" + index}" class="collapse" aria-labelledby="${"heading" + index}" data-parent="#accordion1">
              <div class="card-body">
                <img src = ${recipe.image} width ="30%" class="mx-auto d-block rounded mb-3">
                <p>${recipe.recipeIngredients}</p>
                <p>${recipe.recipeInstructions}</p>
                <form method="POST" action ="/saveComment">
                    <label for="${"comment"+ index}">Comments:</label>
                    <input type="text" class="form-control mb-3 overflow-auto" id=${"comment"+ index} rows="3" value="${recipe.comment}"></input> 
                    <button onmousedown="event.preventDefault()" type="submit" class="btn btn-outline-dark btn-sm" id=${"button"+index}>Save Comment</button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check d-none" viewBox="0 0 16 16" id="${"check" + index}">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
                    </svg>
                </form>
                <p id="${"message" + index}></p>
              </div>
            </div>
          </div>`
            accordion1.innerHTML += innerHTML;
            
            document.getElementById( "button"+index ).setAttribute( "onclick", `javascript: saveComment(event, "${recipe.recipeName}", "${index}");` );
            document.getElementById("delete"+index).setAttribute("onclick", `javascript: deleteRecipe("${recipe.recipeName}", "${index}");`);
            index++;
    });
    } else {
        savedMessage.innerText = this.response.message;
    }
}

var saveComment = function(event, recipeName, index){
    event.preventDefault();
    let xhr3 = new XMLHttpRequest()
    xhr3.addEventListener("load", function() {
        document.getElementById("check" + index).classList.remove("d-none");
        setTimeout(function() {
            document.getElementById("check" + index).classList.add("d-none");
        }, 3000);
    })
    query=`recipeName=${recipeName}&comment=${document.getElementById("comment" + index).value}`
    url = "/saveComment";
    xhr3.responseType = "json";   
    xhr3.open("POST", url)
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr3.send(query)
}

var deleteRecipe = function(recipeName, index) {
    let xhr4 = new XMLHttpRequest();
    xhr4.addEventListener("load", function () {
        document.getElementById("card"+index).remove();
    });
    query=`recipeName=${recipeName}`;
    url = "/deleteRecipe";
    xhr4.responseType = "json";   
    xhr4.open("POST", url)
    xhr4.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr4.send(query)
}


let savedCommentIndex = 1
function responseHandlerLinked() {
    let index = 1
    if (this.response.message === "loaded") {
        this.response.rows.forEach(recipe => {
            let innerHTML = `<div class="card mb-2" id="${"cardLinked" + index}">
            <div class="card-header" id="${"heading" + index}">
                <h5 class="mb-0">
                    <button onmousedown="event.preventDefault()" class="btn btn-default collapsed w-100 text-left" data-toggle="collapse" data-target="${"#collapse2" + index}" aria-expanded="true" aria-controls="${"collapse2" + index}" id=${"buttonCollapser" + index}>
                        <h5>${recipe.recipeName}</h5>
                    </button>
                    <button type="button" class="btn btn-outline-secondary position-absolute" style="right: 10px; top: 15px" id="${"deleteLinked" + index}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                        </svg>
                    </button>
                </h5>
            </div>
            <div id="${"collapse2" + index}" class="collapse" aria-labelledby="${"heading" + savedCommentIndex}" data-parent="#accordion2">
              <div class="card-body">
                <div class="d-flex justify-content-center mb-2">
                    <iframe class="w-100" src="" title="${recipe.recipeName}" height="500" id=${"iframe" + index}></iframe>
                </div>
                <form method="POST" action ="/linkComment">
                    <label for="${"linkcomment"+ index}">Comments:</label>
                    <input type="text" class="form-control mb-3 overflow-auto" id=${"linkcomment"+ index} rows="3" value="${recipe.comment}"></input> 
                    <button onmousedown="event.preventDefault()" type="submit" class="btn btn-outline-dark btn-sm" id=${"linkbutton"+index}>Save Comment</button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check d-none" viewBox="0 0 16 16" id="${"checkLinked" + index}">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
                    </svg>
                </form>
                <div class="d-flex justify-content-center">
                    <button onmousedown="event.preventDefault()" class="btn btn-outline-dark mt-3" id="${"link" + savedCommentIndex}" onclick="window.open('${recipe.link}','_blank')">Go to ${recipe.recipeName}</button>
                </div
                
              </div>
            </div>
          </div>`
            accordion2.innerHTML += innerHTML;
            document.getElementById( "linkbutton"+index ).setAttribute( "onclick", `javascript: linkComment(event, "${recipe.recipeName}", "${index}");` );
            document.getElementById("deleteLinked"+index).setAttribute("onclick", `javascript: deleteLinkedRecipe("${recipe.recipeName}", "${index}");`);
            document.getElementById( "buttonCollapser" + index ).setAttribute( "onclick", `javascript: createiFrame(event, "${recipe.link}", "${index}");` );
            index++;
            savedCommentIndex++;
        });
    } else {
        linkedMessage.innerText = this.response.message;
    }
}

var createiFrame = function(event, recipeLink, index) {
    document.getElementById("iframe" + index).src = recipeLink;
}

var linkComment = function(event, recipeName, index){
    event.preventDefault();
    let xhr5 = new XMLHttpRequest()
    xhr5.addEventListener("load", function () {
        document.getElementById("checkLinked" + index).classList.remove("d-none");
        setTimeout(function() {
            document.getElementById("checkLinked" + index).classList.add("d-none");
        }, 3000);
    })
    query=`recipeName=${recipeName}&comment=${document.getElementById("linkcomment" + index).value}`
    url = "/linkComment";
    xhr5.responseType = "json";   
    xhr5.open("POST", url)
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr5.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr5.send(query)
}

var deleteLinkedRecipe = function(recipeName, index) {
    let xhr4 = new XMLHttpRequest();
    xhr4.addEventListener("load", function () {
        document.getElementById("cardLinked"+index).remove();
    });
    query=`recipeName=${recipeName}`;
    url = "/deleteLinkedRecipe";
    xhr4.responseType = "json";   
    xhr4.open("POST", url)
    xhr4.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr4.send(query)
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


