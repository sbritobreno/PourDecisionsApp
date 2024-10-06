import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { View, FlatList, StyleSheet } from "react-native";
import { fetchCocktailRecipes, fetchCocktail } from "../services/apiService";
import { getCocktailRecommendationFromAI } from "../services/aiService";
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
  const [filteredRecipes, setFilteredRecipes] = useState([]);
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
      setFilteredRecipes(fetchedRecipes);
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
    if (!prompt) {
      setFilteredRecipes(allRecipes);
      return;
    }

    setLoading(true);

    try {
      const aiResponse = await getCocktailRecommendationFromAI(prompt);
      const cocktailNames = aiResponse
        .split("\n") // Split by new lines
        .map((line) => line.replace(/^\d+\.\s/, "").trim()) // Remove numbering (e.g., "1. ")
        .filter((name) => name.length > 0); // Filter out any empty lines

      const fetchedCocktails = await Promise.all(
        cocktailNames.map(async (name) => {
          const cocktail = await fetchCocktail(name);
          return cocktail;
        })
      );

      const validCocktails = fetchedCocktails.filter(
        (cocktail) => cocktail !== null
      );

      setFilteredRecipes(validCocktails);
    } catch (error) {
      console.error("Error getting AI recommendation:", error);
    } finally {
      setLoading(false);
    }
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
        />
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
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
});

export default MainPage;
