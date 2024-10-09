import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SPACING } from "../constants/constants";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ prompt, setPrompt, handleSearch, handleClear }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="🔍 Which cocktail are you looking for?"
        placeholderTextColor={COLORS.gray}
        value={prompt}
        onChangeText={setPrompt}
        onSubmitEditing={handleSearch}
        returnKeyType="search" // This shows a search icon on the keyboard
      />
      {prompt ? (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={24} color={COLORS.gray} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: SPACING.medium,
    marginHorizontal: 30,
    position: "relative",
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
  clearButton: {
    position: "absolute",
    right: 10,
  },
});

export default SearchBar;
