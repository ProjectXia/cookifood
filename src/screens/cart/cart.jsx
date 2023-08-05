import React from "react";
import { View, Text } from "react-native";
import { stylescart } from "./cartStyle";
import { Ionicons } from "@expo/vector-icons";
import { CartCard } from "../../components/cartcard";
import { Button } from "react-native-paper";

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
      <View
        style={{
          position: "absolute",
          top: 90,
          width: "100%",
          height: "60%",
          backgroundColor: "pink",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Shopping Cart is Empty</Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 80,
          backgroundColor: "#D8D9DA",
          width: "100%",
          height: "20%",
          borderRadius: 10,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{ flexDirection: "row", height: "25%", marginVertical: 3 }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
                height: "100%",
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text>Items:</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
                height: "100%",
                justifyContent: "center",
                paddingHorizontal: 20,
                alignItems: "flex-end",
              }}
            >
              <Text>2</Text>
            </View>
          </View>
        </View>
        <View
          style={{ flexDirection: "row", height: "25%", marginVertical: 3 }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
                height: "100%",
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text>Total Amount:</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "50%",
                height: "100%",
                justifyContent: "center",
                paddingHorizontal: 20,
                alignItems: "flex-end",
              }}
            >
              <Text>Rs. 300</Text>
            </View>
          </View>
        </View>

        <Button
          mode="contained"
          style={{
            position: "absolute",
            bottom: 5,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          Checkout
        </Button>
      </View>

      {/* <CartCard /> */}
    </View>
  );
}

export { ShoppingCart };
