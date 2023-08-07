import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { stylesorder } from "./orderStyle";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../../services/firebaseConfig";
import { Storage } from "expo-storage";
import { List } from "react-native-paper";

function Order() {
  const [porder, setPOrder] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const getAllOrder = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("order")
      .where("status", "==", "Pending")
      .get()
      .then((response) => {
        setPOrder(response.docs);
        // response.ForEach((doc) => {
        //   if (doc.data().usid == Storage.getItem("user_uid")) {
        //     console.log("user pending order found");
        //   }
        // });
      })
      .catch((error) => {
        console.log({ error });
      });
    setShowLoading(false);
  };
  const __renderOrder = ({ item }) => {
    const listing = item.data();
    const listId = item.id;

    // setCount();
    // setMprice(listing.price);
    return (
      <View style={{ width: 360 }}>
        <List.AccordionGroup>
          <List.Accordion title="Pending Order (Rs. 4610)" id="1">
            <List.Item title="Item 1" />
            <List.Item title="Item 2" />
          </List.Accordion>
        </List.AccordionGroup>
      </View>
    );
  };
  useEffect(() => {
    getAllOrder();
  }, []);

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
      <View style={{ marginTop: 80 }}>
        <FlatList
          data={porder}
          renderItem={__renderOrder}
          horizontal={false}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                There are no order pending!
              </Text>
            </View>
          }
          refreshing={showLoading}
          onRefresh={() => getAllOrder()}
        />
      </View>
    </View>
  );
}

export { Order };
