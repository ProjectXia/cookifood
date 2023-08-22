import React from "react";
import { View, Text } from "react-native";
import { stylesorders } from "./ordersStyle";
import { Ionicons } from "@expo/vector-icons";

function Orders() {
  return (
    <View style={stylesorders.mainview}>
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
        <Ionicons name="information-circle-outline" color={"gray"} size={38} />
        <Text style={{ fontSize: 20 }}>Orders</Text>
      </View>
      <Text>Order</Text>
    </View>
  );
}

export { Orders };
