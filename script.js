async function searchRecipes() {
  const ingredient = document.getElementById("searchInput").value;
  const resultsDiv = document.getElementById("results");

  if (!ingredient) {
    resultsDiv.innerHTML = "<p>Please enter an ingredient</p>";
    return;
  }

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.meals) {
    resultsDiv.innerHTML = "<p>No recipes found</p>";
    return;
  }

  resultsDiv.innerHTML = data.meals
    .map(
      (meal) => `
    <div class="recipe">
      <img src="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3>
      <button onclick="getRecipe('${meal.idMeal}')">View Recipe</button>
    </div>
  `,
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
