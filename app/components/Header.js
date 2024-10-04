import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter from expo-router

const logo = require("../../assets/images/logo_header.png");

const Header = () => {
  const router = useRouter(); // Initialize the router

  const handlePress = () => {
    router.push("/"); // Navigate to index.js (home screen)
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: "#374C7B",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 280,
    height: 40,
    marginTop: 40,
  },
});

export default Header;
