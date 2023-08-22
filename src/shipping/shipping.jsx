import React, { useState } from "react";
import { View, Text } from "react-native";
import { stylesshipping } from "./shippingStyle";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { InputBox } from "../components/input";
import { firebase } from "../services/firebaseConfig";
import { Storage } from "expo-storage";

function Shipping({ route, navigation }) {
  const { oidd, count, gtotal } = route.params;
  const [address, setAddress] = useState("");

  const updateShipAddress = () => {
    firebase
      .firestore()
      .collection("order")
      .doc(oidd)
      .update({
        shipaddress: address,
        status: "In Process",
        items: count,
        totalAmount: gtotal,
      })
      .then((response) => {})
      .catch((error) => {
        console.log({ error });
      });
    updateStatusAndId();
  };
  const updateStatusAndId = async () => {
    await Storage.setItem({
      key: "order_status",
      value: "",
    });
    await Storage.setItem({
      key: "order_id",
      value: "",
    });
  };
  return (
    <View style={stylesshipping.mainview}>
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
        <Text style={{ fontSize: 20 }}>Check Out(Shipping Address)</Text>
      </View>
      <Text>Shipping Address</Text>
      <InputBox
        placeholder={"Add Shipping Address"}
        value={address}
        onTextChange={setAddress}
        iconName={"home"}
      />
      <Text>Payment Method (COD)</Text>
      <Button
        mode="elevated"
        onPress={() => {
          updateShipAddress();
          navigation.replace("Home");
        }}
      >
        Complete Order
      </Button>
    </View>
  );
}

export { Shipping };
