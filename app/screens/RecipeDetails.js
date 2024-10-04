import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RecipeDetails = ({ route }) => {
  const { recipe } = route.params; 

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.category}>Category: {recipe.category}</Text>
      <Text style={styles.ingredients}>
        Ingredients: {recipe.ingredients.map(ing => `${ing.ingredient} (${ing.measure})`).join(', ')}
      </Text>
      <Text style={styles.instructions}>Instructions: {recipe.instructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFAFA',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  category: {
    fontSize: 18,
    marginVertical: 5,
  },
  ingredients: {
    fontSize: 16,
    marginVertical: 5,
  },
  instructions: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default RecipeDetails;
