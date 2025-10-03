const spoonacularAPIKEY = "3bcc4c318e6c41b4a2015b597b52c0ae";

// get
axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${spoonacularAPIKEY}`).then((response) => {
    console.log(response.data.recipes[0]);
});

// complex search
// need key again; it needs to be in the url
axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularAPIKEY}&cuisine=italian`).then((response) => {
    console.log(response.data.results.map((recipe) => recipe.title).join(", "));
})

axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularAPIKEY}&cuisine=italian&diet=vegetarian`).then((response) => {
    console.log(response.data.results.map((recipe) => recipe.title).join(", "));
})
