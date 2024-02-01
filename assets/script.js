APIkey = "e7240985d24e036814dfc3709dd38d80";
<<<<<<< HEAD


function getRecipe() {
    var search = $('#search-input').val().trim();
    queryURL = "https://api.edamam.com/api/recipes/v2?type=public&q=" + search + "&app_id=6530dc18&app_key=e7240985d24e036814dfc3709dd38d80";
=======
var mainContainer = $("#main-container");
var recipeContainer = $(".col-lg-9 pb-3");

function getRecipe() {
  var search = $("#search-input").val().trim();
  queryURL =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    search +
    "&app_id=6530dc18&app_key=e7240985d24e036814dfc3709dd38d80";
>>>>>>> 267c0a93a8fc6d454ebd85f69aba940a8f7a26a2

    fetch(queryURL)
        .then(function (response) {
            return response.json();   
        })
        .then(function (data) {
<<<<<<< HEAD
            // console.log(data);
            $('.card-title').text(data.hits[0].recipe.label);
            $('img').attr('src', data.hits[0].recipe.image);
        });

    console.log(search);
    return search;
=======
            console.log(data);
            console.log(data.hits.length);
            var dataLength = data.hits.length;
        
            for (var i = 0; i < dataLength && i < 3; i++) {
                
                var cardContainer = $("<div>");
                cardContainer.addClass("col-lg-9 pb-3");
                // $('img').attr('src', data.hits[i].recipe.image);

                var cardCardContainerSection = $("<section>");
                cardCardContainerSection.addClass("row mt-3");
                console.log(cardCardContainerSection);

                var card = $("<div>");
                card.addClass("card mb-3");

                var image = $("<img>");
                console.log(image);
                // image.addClass("");
                // image.attr('class', 'card-img-top')
                image.attr('src', data.hits[i].recipe.image);
                

                var cardBody = $("<div>");
                var cardTitle = $("<h5>");
                cardTitle.text(data.hits[i].recipe.label)
                cardTitle.addClass("card-title");
                var cardText = $("<p>");
                cardText.text("Type of dish: " + data.hits[i].recipe.dishType)
                var descriptin = $("<p>");
                var ingredients = data.hits[i].recipe.ingredients.forEach(element => {
                    console.log(element);
                    descriptin.text(element.text);
                    
                    
                });
                console.log(ingredients);
                
                // descriptin.text("Ingredients: " + data.hits[i].recipe.ingredients[i].food)
                cardText.addClass("card-text");

                // add image inside card div
                card.append(image);
                
                // add card body inside card
                card.append(cardBody);

                // add h5 inside card body
                cardBody.append(cardTitle);
                
                cardBody.append(cardText);
                cardBody.append(descriptin);

                // // add card inside card container section 
                cardCardContainerSection.append(card);

               

                 // add section inside cardContainer
                 recipeContainer.append(cardCardContainerSection);

            

                 cardContainer.append(cardCardContainerSection);
                 mainContainer.append(cardContainer);
                
            }
            
        });

  console.log(search);
  return search;
>>>>>>> 267c0a93a8fc6d454ebd85f69aba940a8f7a26a2
}
// attach click event to the element id
$("#search-button").on("click", function (event) {
  event.preventDefault();
  //grab user ingredient/search input
  var search = $("#search-input").val().trim();
  if (!search) return;
  getRecipe();
});

// function that allow more than one ingredient input

//function to display 5 recipe

//function to save & clear search input in local storage

// function to create fav recipe list/page - use quiz challenge as guide

<<<<<<< HEAD
$('#search-button').on('click', function(event) {
    event.preventDefault();
    var search = $('#search-input').val().trim();
    if (!search) return;
    getRecipe();
})
=======
// add another API for better quality image display
>>>>>>> 267c0a93a8fc6d454ebd85f69aba940a8f7a26a2
