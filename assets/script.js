APIkey = "e7240985d24e036814dfc3709dd38d80";
var mainContainer = $("#main-container");
var recipeContainer = $(".col-lg-9 pb-3");

function getRecipe() {
  var search = $("#search-input").val().trim();
  queryURL =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    search +
    "&app_id=6530dc18&app_key=e7240985d24e036814dfc3709dd38d80";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.hits.length);
      saveSearch();
      var dataLength = data.hits.length;

      for (var i = 0; i < dataLength && i < 3; i++) {
        const result = data.hits[i];

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
        image.attr("src", result.recipe.image);

        var cardBody = $("<div>");
        var cardTitle = $("<h5>");
        cardTitle.text(result.recipe.label);
        cardTitle.addClass("card-title");
        var cardText = $("<p>");
        cardText.text("Type of dish: " + result.recipe.dishType);
        var descriptin = $("<p>");
        var descriptinList = [];
        result.recipe.ingredients.forEach((ingredient) => {
          descriptinList.push(" " + ingredient.text);
          console.log(descriptinList);
          descriptin.text("Ingredients: " + descriptinList);
        });

        // console.log(ingredients);

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
}
// attach click event to the element id
$("#search-button").on("click", function (event) {
  event.preventDefault();
  //grab user ingredient/search input
  var search = $("#search-input").val().trim();
  if (!search) return;
  getRecipe();
});
//function to save & clear search input in local storage

var searches = JSON.parse(localStorage.getItem("ingredient")) || [];
function saveSearch(search) {
  searches.push(search); // don't repeat cities
  localStorage.setItem("ingredient", JSON.stringify(searches));
  createButtonSearches();
}
function createButtonSearches() {
  $("#history").empty();
  // function to loop over the searches and create buttons
  for (let i = searches.length - 1; i >= 0; i--) {
    //use let in for loops
    var button = $("<button>").text(searches[i]);
    button.on("click", function () {});
    $("#history").append(button);
  }
}
createButtonSearches();
// function that allow more than one ingredient input

// function to create fav recipe list/page - use quiz challenge as guide

// add another API for better quality image display
