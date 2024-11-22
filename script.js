const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?";

// f=b
// s=Arrabiata

const search = document.querySelector("#search-input");
const xMark = document.querySelector(".xmark");
const searchBtn = document.querySelector(".search-btn");
const recipeContainer = document.querySelector(".recipies");

let ordered = false;

// Getting the initial information from the API
async function getInfoFromAPI() {
    recipeContainer.innerHTML = "";
    xMark.classList.add("hidden");
    search.value = "";
    const response = await fetch(API_URL + "f=b");
    const data = await response.json();

    data.meals.forEach(meal => {
        let formattedTags = meal.strTags ? meal.strTags.replace(/,/g, ", ") : "No Tags";
        createRecipe(meal.strMealThumb, meal.strCategory, meal.strMeal, formattedTags, meal.strYoutube)
    });
    // console.log(data.meals[0]);
}

// Creating the structure of the recipies
function createRecipe(poster, catagory, name, tags, videoLink) {
    const recipe = document.createElement("div");
    recipe.classList.add("recipe", "border", "border-[#e85d04]", "rounded-lg", "p-1");
    recipeContainer.append(recipe);

    const recipePoster = document.createElement("div");
    recipe.append(recipePoster);

    const posterImg = document.createElement("img");
    posterImg.src = poster;
    posterImg.classList.add("rounded-tl-lg", "rounded-tr-lg");
    recipePoster.append(posterImg);

    const infoPart = document.createElement("div");
    infoPart.classList.add("info", "flex", "flex-col", "gap-1", "mt-4", "p-1");
    recipe.append(infoPart);

    const recipeCatagory = document.createElement("div");
    recipeCatagory.classList.add("recipe-catagory", "bg-gray-400", "text-gray-700", "w-fit", "px-3", "py-1", "rounded-full");
    recipeCatagory.textContent = catagory;
    infoPart.append(recipeCatagory);

    const recipeName = document.createElement("div");
    recipeName.classList.add("recipe-name", "text-[#e85d04]", "text-2xl", "font-semibold");
    recipeName.textContent = name;
    infoPart.append(recipeName);

    const recipeTags = document.createElement("div");
    recipeTags.classList.add("recipe-tags", "text-gray-400");
    recipeTags.textContent = tags;
    infoPart.append(recipeTags);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons", "flex", "justify-between", "mt-3");
    infoPart.append(buttons);

    const recipeVideoLink = document.createElement("a");
    recipeVideoLink.href = videoLink;
    recipeVideoLink.target = "_blank";
    buttons.append(recipeVideoLink);

    const watchVideoBtn = document.createElement("button");
    watchVideoBtn.classList.add("border", "border-gray-300", "px-3", "py-1", "rounded-full", "text-gray-500", "flex", "gap-2", "items-center", "transition", "hover:bg-gray-200");
    watchVideoBtn.innerHTML = "<i class='fa-regular fa-circle-play'></i> Watch video";
    recipeVideoLink.append(watchVideoBtn);

    const orderBtn = document.createElement("button");
    orderBtn.classList.add("bg-[#e85d04]", "px-3", "py-1", "rounded-full", "text-white", "flex", "gap-2", "items-center", "transition", "hover:bg-[#dc2f02]");
    orderBtn.innerHTML = "<i class='fa-regular fa-circle-check'></i> Order";
    buttons.append(orderBtn);

    orderBtn.addEventListener("click", () => {
        ordered = !ordered;

        if (ordered) {
            orderBtn.innerHTML = "<i class='fa-regular fa-circle-xmark'></i> Cancel";
            orderBtn.classList.replace("bg-[#e85d04]", "bg-[#dc2f02]");
        }
        else {
            orderBtn.innerHTML = "<i class='fa-regular fa-circle-check'></i> Order";
            orderBtn.classList.replace("bg-[#dc2f02]", "bg-[#e85d04]");
        }
    })
}

// Searching specific recipe
async function searchRecipe(recipe) {
    xMark.classList.remove("hidden");
    recipeContainer.innerHTML = "";
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
    const data = await response.json();

    if (data.meals) {
        data.meals.forEach(meal => {
            let formattedTags = meal.strTags ? meal.strTags.replace(/,/g, ", ") : "No Tags";
            createRecipe(meal.strMealThumb, meal.strCategory, meal.strMeal, formattedTags, meal.strYoutube)
        });
    } else {
        recipeContainer.innerHTML = "<p class='text-gray-500'>No recipes found. Try another search.</p>";
    }
}

window.addEventListener("load", getInfoFromAPI);
searchBtn.addEventListener("click", () => {
    searchRecipe(search.value)
});
search.addEventListener("change", () => searchRecipe(search.value));
xMark.addEventListener("click", getInfoFromAPI);