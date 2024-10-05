import React from "react";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, SPACING } from "../constants/constants";

const FloatingButton = ({ icon, route, homebtn = false }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(route);
  };
  return (
    <View
      style={styles.floatingButton}
      backgroundColor={homebtn ? "#374C7B" : "white"}
    >
      <TouchableOpacity onPress={() => handlePress()}>
        {!homebtn ? (
          <Ionicons name={icon} size={30} color="#374C7B" />
        ) : (
          <Ionicons name={icon} size={30} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    borderRadius: 50,
    padding: SPACING.small,
  },
});

export default FloatingButton;
