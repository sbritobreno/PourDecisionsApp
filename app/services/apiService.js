import { COCKTAIL_API_KEY } from "@env";

export const fetchCocktailById = async (id) => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v2/${COCKTAIL_API_KEY}/lookup.php?i=${id}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data) {
      return data.drinks.map((drink) => ({
        id: drink.idDrink,
        name: drink.strDrink,
        category: drink.strCategory,
        instructions: drink.strInstructions,
        thumbnail: drink.strDrinkThumb,
        ingredients: getIngredients(drink),
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching cocktail details:", error);
    return [];
  }
};

export const fetchCocktailRecipes = async (searchTerm = "") => {
  try {
    const url = searchTerm
      ? `https://www.thecocktaildb.com/api/json/v2/${COCKTAIL_API_KEY}/search.php?s=${searchTerm}`
      : `https://www.thecocktaildb.com/api/json/v2/${COCKTAIL_API_KEY}/popular.php`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.drinks) {
      return data.drinks.map((drink) => ({
        id: drink.idDrink,
        name: drink.strDrink,
        category: drink.strCategory,
        instructions: drink.strInstructions,
        thumbnail: drink.strDrinkThumb,
        ingredients: getIngredients(drink),
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching cocktail recipes:", error);
    return [];
  }
};

// Helper function to extract the ingredients from the drink object
const getIngredients = (drink) => {
  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    if (drink[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: drink[`strIngredient${i}`],
        measure: drink[`strMeasure${i}`] || "",
      });
    }
  }
  return ingredients;
};
