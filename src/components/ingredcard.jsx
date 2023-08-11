import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IngredCard({ delClick, IngredientName, IngredientMsr, Item }) {
  return (
    <View
      style={{
        width: 350,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        marginVertical: 8,
      }}
    >
      {/* <View
        style={{
          width: 45,
          height: 45,
          backgroundColor: "#E9E8E8",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 16 }}>{iconName}</Text>
      </View> */}
      <TouchableOpacity onPress={delClick}>
        <Ionicons name={"md-trash-bin-outline"} color={"red"} size={35} />
      </TouchableOpacity>

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
          fontSize: 12,
          fontWeight: "500",
          position: "absolute",
          top: 25,
          left: 55,
          width: 200,
          color: "gray",
        }}
      >
        {Item}
      </Text>

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

export { IngredCard };
