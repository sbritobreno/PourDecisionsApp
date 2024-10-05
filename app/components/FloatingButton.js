import React from "react";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, SPACING } from "../constants/constants";

const FloatingButton = ({ icon, route }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(route);
  };
  return (
    <View style={styles.floatingButton}>
      <TouchableOpacity onPress={() => handlePress()}>
        <Ionicons name={icon} size={30} color="#374C7B" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: SPACING.small,
  },
});

export default FloatingButton;
