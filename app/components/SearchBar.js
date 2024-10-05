import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES, SPACING } from "../constants/constants";

const SearchBar = ({ prompt, setPrompt, handleSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="🔍 What kind of cocktail are you looking for?"
        placeholderTextColor={COLORS.gray}
        value={prompt}
        onChangeText={setPrompt}
        onSubmitEditing={handleSearch} 
        returnKeyType="search" // This shows a search icon on the keyboard
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING.medium,
    marginHorizontal: 30,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: SPACING.small,
    backgroundColor: "#FFFAFA",
  },
});

export default SearchBar;
