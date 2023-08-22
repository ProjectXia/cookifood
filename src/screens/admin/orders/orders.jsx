import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { stylesorders } from "./ordersStyle";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../../../services/firebaseConfig";
import { Storage } from "expo-storage";
import Modal from "react-native-modal";
import { BButton } from "../../../components/bbutton";

function Orders({ navigation }) {
  const [order, setOrder] = useState([]);
  const [lineItems, setLineItems] = useState();
  const [showLoading, setShowLoading] = useState(false);

  const getAllOrder = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("order")
      .get()
      .then((response) => {
        setOrder(response.docs);
      })
      .catch((error) => {
        console.log({ error });
      });
    setShowLoading(false);
  };

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
