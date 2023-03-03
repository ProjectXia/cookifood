import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

function TabIcon({ icon, focused }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 75,
        width: 75,
      }}
    >
      <Ionicons
        name={icon}
        size={35}
        color={focused ? "darkgreen" : "gray"}
        style={{
          width: 35,
          height: 35,
          marginBottom: 0,
        }}
      />
      {focused && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 5,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: focused ? "darkgreen" : "gray",
          }}
        />
      )}
    </View>
  );
}

export { TabIcon };
