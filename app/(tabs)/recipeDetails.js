import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchCocktailById } from "../services/apiService";
import { COLORS } from "../constants/constants";
import RecipeDetailsCard from "../components/RecipeDetailsCard";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const { recipeId, route } = useLocalSearchParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      const fetchedRecipe = await fetchCocktailById(recipeId);
      setRecipe(fetchedRecipe);
    };

    fetchRecipe();
  }, [recipeId]);

  return (
    <View style={styles.container}>
      <RecipeDetailsCard recipe={recipe[0]} route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});

export default RecipeDetails;
