APIkey = "e7240985d24e036814dfc3709dd38d80"
queryURL = "https://api.edamam.com/api/recipes/v2?type=public&app_id=6530dc18&app_key=e7240985d24e036814dfc3709dd38d80"


function getRecipe() {
    fetch(queryURL)
        .then(function (response) {
            return response.json();   
        })
        .then(function (data) {
            console.log(data);
        });

    var search = $('#search-input').val().trim();
    console.log(search);
    return search;
}

$('#search-button').on('click', getRecipe())