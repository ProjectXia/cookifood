import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function icons({ name }) {
  return (
    <View>
      <Ionicons name={name} size={30} />
    </View>
  );
}

export default icons;
