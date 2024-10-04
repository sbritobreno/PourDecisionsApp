import { COCKTAIL_API_KEY } from "@env";

export const fetchCocktailRecipes = async (searchTerm = "") => {
  try {
    const url = searchTerm
      ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      : `https://www.thecocktaildb.com/api/json/v1/1/random.php`;

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
