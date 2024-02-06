$(document).ready(function(){

  var myInterval = setInterval(function(){
      dayjs.extend(window.dayjs_plugin_advancedFormat);
      var currentDate = dayjs().format('dddd MMMM Do YYYY');
      var currentTime = dayjs()
      $('.recipe-header-date').text(currentDate + " " + currentTime.format('h:mm:ss a'))
  }, 1000);


APIkey = "e7240985d24e036814dfc3709dd38d80";
var mainContainer = $("#main-container");
var recipeContainer = $(".col-lg-9 pb-3");

var rightRowsForCards = $("#rightColumnsForCards");
// Delete this once once clear function is declared.
window.localStorage.clear();
var searches = JSON.parse(localStorage.getItem("ingredient")) || [];

function getRecipe() {
  var search = $("#search-input").val().trim();
  queryURL =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    search +
    "&app_id=6530dc18&app_key=e7240985d24e036814dfc3709dd38d80";
  rightRowsForCards.empty();
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.hits.length);
      saveSearch(search);
      var dataLength = data.hits.length;

      for (var i = 0; i < dataLength && i < 3; i++) {
        const result = data.hits[i];
        var cardCardContainerSection = $("<section>");
        cardCardContainerSection.addClass("row mt-3");
        var cardContainer = $("<div>");
        // cardContainer.addClass("col-lg-9 pb-3");

        var card = $("<div>");
        card.addClass("card col-lg-3 col-md-3 px-0");

        var image = $("<img>");
        image.attr("class", "card-img-top");
        image.attr("src", result.recipe.image);

        var cardBody = $("<div>").addClass("col-lg-9 col-md-9");
        var cardTitle = $("<a>");
        var aText = cardTitle.text(result.recipe.label);
        cardTitle.attr("target", "_blank")
        cardTitle.attr("href", result.recipe.url)
        cardTitle.addClass("card-title");
        cardBody.click(function(){
          window.location = $(this).attr("href", "target=_blank", data.hits[i].recipe.url)
        })
        // cardTitle.href = data.hits[i].recipe.url;
        var cardText = $("<p>");
        cardText.text("Type of dish: " + result.recipe.dishType);
        var descriptin = $("<p>");
        var descriptinList = [];
        result.recipe.ingredients.forEach((ingredient) => {
          descriptinList.push(" " + ingredient.text);
          descriptin.text("Ingredients: " + descriptinList);
        });

        // descriptin.text("Ingredients: " + data.hits[i].recipe.ingredients[i].food)
        cardText.addClass("card-text");

        // add image inside card div
        card.append(image);

        // add h5 inside card body
        cardBody.append(cardTitle);

        cardBody.append(cardText);
        cardBody.append(descriptin);

        // // add card inside card container section
        cardCardContainerSection.append(card);
        cardCardContainerSection.append(cardBody);

        // add section inside cardContainer
        recipeContainer.append(cardCardContainerSection);

        cardContainer.append(cardCardContainerSection);
        rightRowsForCards.append(cardContainer);
        mainContainer.append(rightRowsForCards);
      }
    });

  console.log(search);
  return search;
}
// attach click event to the element id
//function to save & clear search input in local storage

// var searches = JSON.parse(localStorage.getItem("ingredient")) || [];
function saveSearch(search) {
  searches.push(search); // don't repeat search buttons
  localStorage.setItem("ingredient", JSON.stringify(searches));
  createButtonSearches();
}
function createButtonSearches() {
  $(".list-recipe").empty();
  for (var i = 0; i < searches.length; i++) {
    var searchButton = $("<button>");
    searchButton.addClass("btn btn-primary");
    searchButton.text(searches[i]);
    searchButton.attr("data-search", searches[i]);
    //if it's already in the array, don't add it again
    if (searches.indexOf(searches[i]) === i) {
      $(".list-recipe").append(searchButton);
    }

    //add search functionality to the button
    $("#search-form").on("submit", function (event) {
      event.preventDefault();
      $("#search-input").val($(this).attr("data-search"));
      getRecipe();
    });
  }
}

$("#search-button").on("click", function (event) {
  event.preventDefault();
  //grab user ingredient/search input
  var search = $("#search-input").val().trim();
  if (!search) return;
  getRecipe();
});
createButtonSearches();
// function that allow more than one ingredient input

// function to create fav recipe list/page - use quiz challenge as guide
});