import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { COLORS, SIZES, SPACING } from "../constants/constants";
import Loading from "./Loading";

const RecipeDetailsCard = ({ recipe }) => {
  if (!recipe) {
    return <Loading />;
  }

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.thumbnail }} style={styles.thumbnail} />
      </View>
      <Text style={styles.name}>{recipe.name}</Text>
      <Text style={styles.category}>Category: {recipe.category}</Text>
      <Text style={styles.sectionTitle}>Ingredients</Text>
      {renderIngredients()}
      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.instructions}>{recipe.instructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.medium,
    backgroundColor: COLORS.primary,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: SPACING.medium,
  },
  thumbnail: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  name: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.small,
    color: COLORS.white,
  },
  category: {
    fontSize: SIZES.medium,
    textAlign: 'center',
    marginBottom: SPACING.small,
    color: COLORS.white,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
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
});

export default RecipeDetailsCard;
