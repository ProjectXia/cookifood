import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { stylesorders } from "./ordersStyle";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../../../services/firebaseConfig";
import { Storage } from "expo-storage";
import Modal from "react-native-modal";
import { BButton } from "../../../components/bbutton";
import SelectDropdown from "react-native-select-dropdown";

let orderID;
function Orders({ navigation }) {
  const [order, setOrder] = useState([]);
  const [lineItems, setLineItems] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState("");

  const orderStaus = [
    "Approved",
    "Awaiting Shipment",
    "Shipped",
    "Completed",
    "Canceled",
  ];

  const toggleModall = () => {
    setModalVisible(!isModalVisible);
    if (isModalVisible) {
      getAllLineItems();
    }
  };
  const updateOrderStatus = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("order")
      .doc(orderID)
      .update({ status: status })
      .then((response) => {
        getAllOrder();
      })
      .catch((error) => {
        console.log({ error });
      });
    setShowLoading(false);
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
      .get()
      .then((response) => {
        setOrder(response.docs);
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
          toggleModall();
        }}
      >
        <Text>
          {listing.status +
            "(" +
            listing.items +
            ") - Total Amount: " +
            listing.totalAmount +
            "\n" +
            listing.orderdate.toDate().toDateString()}
        </Text>
        <Ionicons
          name={isModalVisible ? "eye-outline" : "eye-off-outline"}
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
      <View style={{ marginTop: 80 }}>
        <FlatList
          data={order}
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
      </View>
      <Modal
        animationIn={"slideInRight"}
        animationOut={"slideOutDown"}
        animationOutTiming={1500}
        isVisible={isModalVisible}
      >
        <View
          style={{
            width: "100%",
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F1F6F5",
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "400" }}>Change Status</Text>

          <SelectDropdown
            data={orderStaus}
            defaultButtonText={"Select Status"}
            onSelect={(selectedItem, index) => {}}
            buttonTextAfterSelection={(selectedItem, index) => {
              setStatus(selectedItem);
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
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

          <View
            style={{
              flexDirection: "row",
              width: "50%",
              justifyContent: "space-around",
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              width: "50%",
              justifyContent: "space-around",
            }}
          >
            <BButton
              title="Save"
              bgColor="green"
              onPressChange={() => {
                updateOrderStatus();
                toggleModall();
              }}
            />
            <BButton
              title="Cancel"
              bgColor="red"
              onPressChange={toggleModall}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export { Orders };
