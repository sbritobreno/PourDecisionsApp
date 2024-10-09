import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { fetchCocktailRecipes } from "../services/apiService";
import { COLORS, FAVORITES_KEY } from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Loading from "../components/Loading";
import FloatingButton from "../components/FloatingButton";
import { useFonts } from "expo-font";

const MainPage = () => {
  const [prompt, setPrompt] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useFonts({
    IrishGrover: require("../../assets/fonts/IrishGrover-Regular.ttf"),
  });

  // Fetch all recipes when the component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const fetchedRecipes = await fetchCocktailRecipes("");
      setAllRecipes(fetchedRecipes);
      setRecipes(fetchedRecipes);
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  // Fetch favorites every time the page comes into focus
  useFocusEffect(
    useCallback(() => {
      const fetchFavorites = async () => {
        try {
          const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
          const favoriteIds = storedFavorites
            ? JSON.parse(storedFavorites)
            : [];
          setFavorites(favoriteIds);
        } catch (error) {
          console.error("Error retrieving favorites:", error);
        }
      };

      fetchFavorites();
    }, [])
  );

  const handleSearch = async () => {
    if (prompt) {
      setPrompt(prompt.trim());
      const fetchedRecipes = await fetchCocktailRecipes(prompt);
      setRecipes(fetchedRecipes);
    } else {
      setRecipes(allRecipes);
    }
  };

  const handleClear = async () => {
    setPrompt("");
    setRecipes(allRecipes);
  };

  const handleRecipeClick = (recipe) => {
    router.push({
      pathname: "./recipeDetails",
      params: { recipeId: recipe.id, route: "/" },
    });
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.includes(item.id);
    return (
      <RecipeCard
        item={item}
        handleRecipeClick={handleRecipeClick}
        isFavorite={isFavorite}
      />
    );
  };

  return (
    <>
      <View style={styles.container}>
        <SearchBar
          prompt={prompt}
          setPrompt={setPrompt}
          handleSearch={handleSearch}
          handleClear={handleClear}
        />
        {loading ? (
          <Loading />
        ) : recipes.length > 0 ? (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        ) : (
          <Text style={styles.noRecipesText}>
            No Cocktail found for this search...
          </Text>
        )}
      </View>
      <FloatingButton icon={"bookmark"} route={"./favorites"} homebtn={true} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  noRecipesText: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "IrishGrover",
  },
});

export default MainPage;
