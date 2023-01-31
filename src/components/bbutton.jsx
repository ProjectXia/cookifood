import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

function BButton({
  title = "title",
  bgColor = "green",
  onPressChange,
  cmargintop = 0,
  cwidth,
  borColor,
}) {
  return (
    <TouchableOpacity
      onPress={onPressChange}
      style={[
        styles.btnStyle,
        {
          backgroundColor: bgColor,
          marginTop: cmargintop,
          width: cwidth,
          borderColor: borColor,
          borderWidth: 1,
        },
      ]}
    >
      <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

export { BButton };

const styles = StyleSheet.create({
  btnStyle: {
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: "center",
  },
  btnTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textTransform: "uppercase",
  },
});
