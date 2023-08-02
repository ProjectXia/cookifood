import React from "react";
import { View, Text } from "react-native";
import { stylesorder } from "./orderStyle";
import { Ionicons } from "@expo/vector-icons";

function Order() {
  return (
    <View style={stylesorder.mainview}>
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
        <Ionicons name="list-circle-outline" color={"gray"} size={38} />
        <Text style={{ fontSize: 20 }}>My Orders</Text>
      </View>
      <Text>Order is Empty</Text>
    </View>
  );
}

export { Order };
