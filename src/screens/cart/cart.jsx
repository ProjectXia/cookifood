import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { stylescart } from "./cartStyle";
import { Ionicons } from "@expo/vector-icons";
import { CartCard } from "../../components/cartcard";
import { Button } from "react-native-paper";
import { firebase } from "../../services/firebaseConfig";

function ShoppingCart({ navigation }) {
  const [items, setItems] = useState(0);
  const [total, setTotal] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [orderlines, setOrderlines] = useState([]);
  const [count, setCount] = useState(0);
  const [mprice, setMprice] = useState(0);

  let grandTotal = 0;

  const getOrderListing = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("orderlines")
      .get()
      .then((response) => {
        setOrderlines(response.docs);
        setItems(response.docs.length);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log({ error });
        setShowLoading(false);
      });
  };

  const __renderOrderlines = ({ item }) => {
    const listing = item.data();
    const listId = item.id;

    grandTotal = grandTotal + listing.price;
    setTotal(grandTotal);
    // setCount();
    // setMprice(listing.price);
    return (
      <CartCard
        title={listing.title}
        quantity={listing.quantity}
        price={listing.price}
        orderlId={listId}
      />
    );
  };

  useEffect(() => {
    getOrderListing();
  }, []);

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
        <FlatList
          data={orderlines}
          renderItem={__renderOrderlines}
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
                Shopping cart is empty!
              </Text>
            </View>
          }
          refreshing={showLoading}
          onRefresh={() => getOrderListing()}
        />
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
              <Text>{items}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: "25%",
            marginVertical: 3,
            marginBottom: 20,
          }}
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
              <Text>Rs. {total}</Text>
            </View>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("shipping");
          }}
        >
          Checkout
        </Button>
      </View>
    </View>
  );
}

export { ShoppingCart };
