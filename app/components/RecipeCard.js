import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, SIZES, SPACING } from "../constants/constants";

const RecipeCard = ({ item, handleRecipeClick, isFavorite }) => {
  return (
    <TouchableOpacity onPress={() => handleRecipeClick(item)}>
      <View style={styles.recipeCard}>
        {isFavorite && (
          <Ionicons
            name="star"
            size={24}
            color="#374C7B"
            style={styles.favoriteIcon}
          />
        )}
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <Text style={styles.recipeName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFDAB9",
    borderRadius: 10,
    padding: SPACING.small,
    marginHorizontal: SPACING.medium,
    marginVertical: SPACING.small,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: SPACING.medium,
  },
  recipeName: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontWeight: "bold",
  },
  favoriteIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});

export default RecipeCard;
