async function searchRecipes() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a recipe name or ingredient</p>";
    return;
  }

  // First search by recipe name
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  let response = await fetch(url);
  let data = await response.json();

  // If not found by name, search by ingredient
  if (!data.meals) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
    response = await fetch(url);
    data = await response.json();
  }

  if (!data.meals) {
    resultsDiv.innerHTML = "<p>No recipes found</p>";
    return;
  }

  resultsDiv.innerHTML = data.meals
    .map(
      (meal) => `
      <div class="recipe">
        <img src="${meal.strMealThumb}" width="200">
        <h3>${meal.strMeal}</h3>
        <button onclick="getRecipe('${meal.idMeal}')">View Recipe</button>
      </div>
    `
    )
    .join("");
}

async function getRecipe(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = await response.json();

  const meal = data.meals[0];
  alert(meal.strInstructions);
}
