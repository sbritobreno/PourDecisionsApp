import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchCocktailRecipes } from "../services/apiService";
import { getCocktailRecommendationFromAI } from "../services/aiService";
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
              <View style={styles.recipeCard}>
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                <Text style={styles.recipeName}>{item.name}</Text>
                <Text style={styles.category}>Category: {item.category}</Text>
                <Text style={styles.ingredients}>
                  Ingredients:{" "}
                  {item.ingredients
                    .map((ing) => `${ing.ingredient} (${ing.measure})`)
                    .join(", ")}
                </Text>
                <Text style={styles.instructions}>
                  Instructions: {item.instructions}
                </Text>
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
    marginBottom: 16,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  recipeName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
  category: {
    fontSize: 16,
    color: "#666",
  },
  ingredients: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  instructions: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
});

export default MainPage;
