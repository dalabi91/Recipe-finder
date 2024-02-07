var currentDate = dayjs().format("DD/MM/YYYY");
$(".recipe-header-date").text(currentDate);

APIkey = "e7240985d24e036814dfc3709dd38d80";
var mainContainer = $("#main-container");
var recipeContainer = $(".col-lg-9 pb-3");

var rightRowsForCards = $("#rightColumnsForCards");

var searches = JSON.parse(localStorage.getItem("date")) || [];

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
        var card = $("<div>");
        card.addClass("card col-lg-3 col-md-3 px-0");

        var image = $("<img>");
        image.attr("class", "card-img-top");
        image.attr("src", result.recipe.image);

        var cardBody = $("<div>").addClass("col-lg-9 col-md-9");
        var cardTitle = $("<a>");
        cardTitle.addClass("card-title");
        var aText = cardTitle.text(result.recipe.label);
        cardTitle.attr("href", result.recipe.url);
        cardTitle.addClass("card-title");
        var cardText = $("<p>");
        cardText.text("Type of dish: " + result.recipe.dishType);
        var description = $("<p>");
        var descriptionList = [];
        result.recipe.ingredients.forEach((ingredient) => {
          descriptionList.push(" " + ingredient.text);
          description.text("Ingredients: " + descriptionList);
        });

        cardText.addClass("card-text");

        card.append(image);

        cardBody.append(cardTitle);
        cardBody.append(cardText);
        cardBody.append(description);

        cardCardContainerSection.append(card);
        cardCardContainerSection.append(cardBody);

        recipeContainer.append(cardCardContainerSection);
        cardContainer.append(cardCardContainerSection);
        rightRowsForCards.append(cardContainer);
        mainContainer.append(rightRowsForCards);
      }
    });

  console.log(search);
  return search;
}

function saveSearch(search) {
  searches.push(search);
  localStorage.setItem(currentDate, JSON.stringify(searches));
  createButtonSearches();
}
function createButtonSearches() {
  $(".list-recipe").empty();
  $(".list-menu").empty();
  for (var i = 0; i < searches.length; i++) {
    for (var key in localStorage) {
      $("#dropdownMenuButton").text(localStorage.key(i));
    }
    var searchButton = $("<button>");
    searchButton.addClass("btn btn-primary");
    searchButton.text(searches[i]);
    searchButton.attr("data-search", searches[i]);
    $(".dropdown-toggle").text(currentDate);
    $(".dropdown-toggle").attr("date", currentDate);

    if (searches.indexOf(searches[i]) === i) {
      $(".list-menu").append(searchButton);
    }

    $("#search-form").on("submit", function (event) {
      event.preventDefault();
      $("#search-input").val($(this).attr("data-search"));
      getRecipe();
    });

    searchButton.on("click", function (event) {
      event.preventDefault();
      $("#search-input").val($(this).attr("data-search"));
      getRecipe();
    });
  }
}

$("#search-button").on("click", function (event) {
  event.preventDefault();

  var search = $("#search-input").val().trim();
  if (!search) return;
  getRecipe();
});
createButtonSearches();
var clearSearch = $("#clear-button");
clearSearch.on("click", function (event) {
  event.preventDefault();
  window.localStorage.clear();
  searches = [];
  $(".list-menu").empty();
});
