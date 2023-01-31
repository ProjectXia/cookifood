import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/theme";

function TextButton({ title, onPressChange }) {
  return (
    <TouchableOpacity onPress={onPressChange} style={styles.btnStyle}>
      <Text style={styles.btnTitle}>{title}</Text>
      <Ionicons
        name="arrow-forward"
        size={24}
        color={"#584153"}
        style={styles.fIcon}
      />
    </TouchableOpacity>
  );
}

export { TextButton };

const styles = StyleSheet.create({
  btnStyle: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  btnTitle: {
    fontWeight: "medium",
  },
  fIcon: {
    marginLeft: 10,
  },
});
