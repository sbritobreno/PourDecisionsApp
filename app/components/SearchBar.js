import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ prompt, setPrompt, handleSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="🔍 What kind of cocktail are you looking for?"
        placeholderTextColor="gray"
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
    margin: 15,
    marginHorizontal: 30,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FFFAFA",
  },
});

export default SearchBar;
