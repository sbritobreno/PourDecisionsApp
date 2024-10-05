import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { fetchCocktailRecipes } from "../services/apiService";
import { getCocktailRecommendationFromAI } from "../services/aiService";
import { COLORS } from "../constants/constants";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Loading from "../components/Loading";

const MainPage = () => {
  const [prompt, setPrompt] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleSearch = async () => {
    if (!prompt) {
      setFilteredRecipes(allRecipes);
      return;
    }

    setLoading(true);

    const aiResponse = await getCocktailRecommendationFromAI(prompt);

    const filtered = allRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(aiResponse.toLowerCase())
    );

    setFilteredRecipes(filtered);
    setLoading(false);
  };

  const handleRecipeClick = (recipe) => {
    router.push({
      pathname: "./recipeDetails",
      params: { recipeId: recipe.id },
    });
  };

  return (
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
          renderItem={({ item }) => (
            <RecipeCard item={item} handleRecipeClick={handleRecipeClick} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});

export default MainPage;
