async function searchRecipes() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a recipe name or ingredient</p>";
    return;
  }

  let meals = [];

  // 1️⃣ Search by meal name
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  let response = await fetch(url);
  let data = await response.json();

  if (data.meals) {
    meals = data.meals;
  } else {
    // 2️⃣ If not found, search by ingredient
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
    response = await fetch(url);
    data = await response.json();

    if (data.meals) {
      meals = data.meals;
    }
  }

  if (meals.length === 0) {
    resultsDiv.innerHTML = "<p>No recipes found</p>";
    return;
  }

  resultsDiv.innerHTML = meals
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

  document.getElementById("recipeTitle").innerText = meal.strMeal;
  document.getElementById("recipeSteps").innerText = meal.strInstructions;

  const ingredientList = document.getElementById("ingredientList");
  ingredientList.innerHTML = "";

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = `${ingredient} - ${measure}`;
      ingredientList.appendChild(li);
    }
  }

  document.getElementById("recipePopup").style.display = "flex";
}

function closePopup() {
  document.getElementById("recipePopup").style.display = "none";
}

function closePopup() {
  document.getElementById("recipePopup").style.display = "none";
}
