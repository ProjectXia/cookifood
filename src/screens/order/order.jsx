import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { stylesorder } from "./orderStyle";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../../services/firebaseConfig";
import { Storage } from "expo-storage";
import { List } from "react-native-paper";

function Order() {
  const [porder, setPOrder] = useState([]);
  const [lineItems, setLineItems] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  let orderID;
  let osid;
  const getuserId = async () => {
    osid = await Storage.getItem({ key: "user_uid" });
    console.log(osid);
  };
  const getAllLineItems = () => {
    console.log(orderID);
    firebase
      .firestore()
      .collection("orderlines")
      .where("oid", "==", orderID)
      .get()
      .then((response) => {
        setLineItems(response.docs);
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const getAllOrder = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("order")
      .where("usid", "==", osid)
      .get()
      .then((response) => {
        setPOrder(response.docs);
      })
      .catch((error) => {
        console.log({ error });
      });
    setShowLoading(false);
  };
  const __renderOrder = ({ item }) => {
    const listing = item.data();
    const listId = item.id;
    orderID = listId;

    return (
      <TouchableOpacity
        style={{
          width: 360,
          height: 50,
          backgroundColor: "white",
          // alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 5,
          borderRadius: 10,
        }}
        onPress={() => {
          if (showList) {
            setShowList(false);
          } else {
            getAllLineItems();
            setShowList(true);
          }
        }}
      >
        <Text>
          {listing.status +
            "(" +
            listing.items +
            ") - Total Amount: " +
            listing.totalAmount}
        </Text>
        <Ionicons
          name={showList ? "eye-outline" : "eye-off-outline"}
          size={25}
          style={{
            position: "absolute",
            right: 5,
          }}
        />
      </TouchableOpacity>
    );
  };
  const __renderOrderItem = ({ item }) => {
    const listing = item.data();
    const listId = item.id;

    return (
      <View
        style={{
          width: 355,
          height: 30,
          backgroundColor: "white",
          // alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 2,
          borderRadius: 10,
        }}
      >
        <Text>
          {listing.title +
            "(qty: " +
            listing.quantity +
            ") -Amount: " +
            listing.price}
        </Text>
      </View>
    );
  };
  useEffect(() => {
    getuserId();
    //   getAllOrder();
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
                There are no order Refresh page!
              </Text>
            </View>
          }
          refreshing={showLoading}
          onRefresh={() => getAllOrder()}
        />
        {showList && (
          <FlatList
            data={lineItems}
            renderItem={__renderOrderItem}
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
                  There are no Item!
                </Text>
              </View>
            }
            refreshing={showLoading}
            onRefresh={() => getAllLineItems()}
          />
        )}
      </View>
    </View>
  );
}

export { Order };
