import React from "react";
import { View, Text } from "react-native";
import { stylescart } from "./cartStyle";
import { Ionicons } from "@expo/vector-icons";

function ShoppingCart() {
  return (
    <View style={stylescart.mainview}>
      <View
        style={{
          height: 55,
          width: "100%",
          backgroundColor: "#ABC270",
          borderRadius: 15,
          marginBottom: 5,
          padding: 10,
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          top: 15,
        }}
      >
        <Ionicons name="cart-outline" size={30} color={"gray"} />
        <Text style={{ fontSize: 20 }}>Shopping Cart</Text>
      </View>
      <Text>Shopping Cart is Empty</Text>
    </View>
  );
}

export { ShoppingCart };
