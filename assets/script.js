var apiKey = "e7240985d24e036814dfc3709dd38d80"
var apiURL = "https://api.edamam.com/api/recipes/v2?type=public&"
var app_id = "6530dc18"
var queryURL;

console.log("Hey");

// function getRecipe() {
//     fetch(queryURL)
//         .then(function (response) {
//             return response.json();   
//         })
//         .then(function (data) {
//             console.log(data);
//         });

//     var search = $('#search-input').val().trim();
//     console.log(search);
//     return search;
// }

// $('#search-button').on('click', getRecipe())

$("#search-button").on("click", function(){

    console.log("Hey");
    var search = $('#search-button').val().trim();
    queryURL = apiURL + "q=" + search + "&" + app_id + "&" + apiKey;
    console.log("Query: ", queryURL);
    fetch(queryURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                // console.log(data.articles);
});
});