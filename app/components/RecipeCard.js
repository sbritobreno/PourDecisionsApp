import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES } from '../constants/constants';

const RecipeCard = ({ item, handleRecipeClick }) => {
  return (
    <TouchableOpacity onPress={() => handleRecipeClick(item)}>
      <View style={styles.recipeCard}>
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
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 5,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  recipeName: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontWeight: "bold",
  },
});

export default RecipeCard;
