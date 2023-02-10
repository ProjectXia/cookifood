import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IngredientCard({ iconName, IngredientName, IngredientMsr }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        marginVertical: 8,
      }}
    >
      <View
        style={{
          width: 45,
          height: 45,
          backgroundColor: "#E9E8E8",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Image source={iconName} style={{ width: 30, height: 30 }} />
      </View>
      {/* <Ionicons name={iconName} size={35} /> */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          position: "absolute",
          top: 5,
          left: 55,
          width: 200,
        }}
      >
        {IngredientName}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          width: 100,
          textAlign: "right",
          position: "absolute",
          top: 5,
          right: 15,
          alignSelf: "flex-end",
        }}
      >
        {IngredientMsr}
      </Text>
    </View>
  );
}

export { IngredientCard };
