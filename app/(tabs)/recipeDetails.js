import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";

const RecipeDetails = () => {
  const { recipeId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipeId}</Text>
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
