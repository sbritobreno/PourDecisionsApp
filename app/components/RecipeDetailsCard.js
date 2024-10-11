import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES, SPACING, FAVORITES_KEY } from "../constants/constants";
import Icon from "react-native-vector-icons/FontAwesome";
import Loading from "./Loading";
import FloatingButton from "./FloatingButton";

const RecipeDetailsCard = ({ recipe, route = "/" }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const getFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error retrieving favorites:", error);
      return [];
    }
  };

  const checkIfFavorite = async () => {
    const favorites = await getFavorites();
    setIsFavorite(favorites.includes(recipe.id));
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await getFavorites();
      let updatedFavorites;

      if (isFavorite) {
        updatedFavorites = favorites.filter((id) => id !== recipe.id);
      } else {
        updatedFavorites = [...favorites, recipe.id];
      }

      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error saving to favorites:", error);
    }
  };

  useEffect(() => {
    if (recipe) {
      checkIfFavorite();
    }
  }, [recipe]);

  // Render each ingredient with its measure
  const renderIngredients = () => {
    return recipe.ingredients.map((item, index) => (
      <View key={index} style={styles.ingredientItem}>
        <Text style={styles.ingredientText}>
          {item.ingredient}: {item.measure}
        </Text>
      </View>
    ));
  };

  if (!recipe) {
    return <Loading />;
  }

  return (
    <>
      <Text style={[styles.message, { fontFamily: "IrishGrover" }]}>
        Cocktail details
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.thumbnail }} style={styles.thumbnail} />
          {isFavorite && (
            <Icon
              name="star"
              size={30}
              color="gold"
              style={styles.favoriteIcon}
            />
          )}
        </View>
        <Text style={[styles.name, { fontFamily: "IrishGrover" }]}>
          {recipe.name}
        </Text>
        <Text style={[styles.sectionTitle, { fontFamily: "IrishGrover" }]}>
          Ingredients
        </Text>
        {renderIngredients()}
        <Text style={[styles.sectionTitle, { fontFamily: "IrishGrover" }]}>
          Instructions
        </Text>
        <Text style={styles.instructions}>{recipe.instructions}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isFavorite ? "red" : "green" },
            ]}
            onPress={toggleFavorite}
          >
            <Text style={styles.buttonText}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FloatingButton icon={"arrow-back"} route={route} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.medium,
    backgroundColor: COLORS.primary,
  },
  message: {
    color: COLORS.white,
    textAlign: "center",
    marginTop: SPACING.medium,
    marginBottom: SPACING.small,
    fontSize: 18,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: SPACING.medium,
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 1.2,
    borderRadius: 8,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 40,
  },
  name: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: SPACING.small,
    color: COLORS.white,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SPACING.small,
    color: COLORS.white,
  },
  ingredientItem: {
    marginBottom: 2,
  },
  ingredientText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  instructions: {
    fontSize: SIZES.medium,
    lineHeight: 20,
    color: COLORS.white,
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: SPACING.large,
  },
  button: {
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.large,
    borderRadius: 8,
    width: "80%",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RecipeDetailsCard;
