APIkey = "e7240985d24e036814dfc3709dd38d80";

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
      // console.log(data);
      $(".card-title").text(data.hits[0].recipe.label);
      $("img").attr("src", data.hits[0].recipe.image);
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

// function that allow more than one ingredient input

//function to display 5 recipe

//function to save & clear search input in local storage

// function to create fav recipe list/page - use quiz challenge as guide

// add another api for better quality image display
