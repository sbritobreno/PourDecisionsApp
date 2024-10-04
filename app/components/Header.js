import React from "react";
import { View, StyleSheet, Image } from "react-native";

const logo = require("../../assets/images/logo_header.png");

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
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
