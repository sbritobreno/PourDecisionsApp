import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchCocktailRecipes } from "./services/apiService";
import { getCocktailRecommendationFromAI } from "./services/aiService";
import { useRouter } from "expo-router";

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
      pathname: "./RecipeDetails",
      params: { recipe },
    });
  };

  return (
    <View style={StyleSheet.container}>
      <TextInput
        style={styles.input}
        placeholder="What kind of cocktail are you looking for?"
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading ? (
        <Text>loading...</Text>
      ) : (
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleRecipeClick(item)}>
              <View style={styles.recipeItem}>
                <Text style={styles.recipeName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#555",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginHorizontal: 10,
    marginBottom: 16,
  },
  recipeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MainPage;
