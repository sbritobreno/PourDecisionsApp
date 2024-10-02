import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchCocktailRecipes } from "./api/apiService";
import { useRouter } from "expo-router";

const MainPage = () => {
  const [prompt, setPrompt] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSearch = async () => {
    setLoading(true);
    const fetchedRecipes = await fetchCocktailRecipes(prompt);
    setRecipes(fetchedRecipes);
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
          data={recipes}
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
