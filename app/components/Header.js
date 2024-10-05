import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; 
import { COLORS } from '../constants/constants';

const logo = require("../../assets/images/logo_header.png");

const Header = () => {
  const router = useRouter();
  const handlePress = () => {
    router.push("/");
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
    backgroundColor: COLORS.primary,
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
