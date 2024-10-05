import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, FlatList, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecipeCard from "../components/RecipeCard";
import { COLORS, FAVORITES_KEY, SPACING } from "../constants/constants";
import { fetchCocktailById } from "../services/apiService";

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const router = useRouter();

  const getFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error retrieving favorites:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites();
      const fetchedFavorites = await Promise.all(
        favorites.map((id) => fetchCocktailById(id))
      );

      // Flatten the array of arrays to a single array of objects
      const validFavorites = fetchedFavorites
        .flat()
        .filter((item) => item !== undefined);

      setFavoriteRecipes(validFavorites);
    };

    fetchFavorites();
  }, []);

  const handleRecipeClick = (recipe) => {
    router.push({
      pathname: "./recipeDetails",
      params: { recipeId: recipe.id },
    });
  };

  return (
    <View style={styles.container}>
      {favoriteRecipes.length > 0 ? (
        <>
          <Text style={[styles.message, { fontFamily: "IrishGrover" }]}>
            Saved cocktails recipes
          </Text>
          <FlatList
            data={favoriteRecipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RecipeCard
                item={item}
                handleRecipeClick={handleRecipeClick}
                isFavorite={false}
              />
            )}
          />
        </>
      ) : (
        <Text style={styles.message}>No favorite recipes found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  message: {
    color: COLORS.white,
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});

export default FavoritesPage;
