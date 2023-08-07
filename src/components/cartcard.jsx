import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import { firebase } from "../services/firebaseConfig";

function CartCard({ title, quantity, price, titleClick, orderlId }) {
  const [countq, setCountq] = useState();
  const [cprice, setCPrice] = useState();

  const updateCart = () => {
    firebase
      .firestore()
      .collection("orderlines")
      .doc(orderlId)
      .update({ quantity: countq, price: cprice })
      .then((response) => {})
      .catch((error) => {
        console.log({ error });
      });
  };
  const deleteCart = () => {
    firebase
      .firestore()
      .collection("orderlines")
      .doc(orderlId)
      .delete()
      .then((response) => {})
      .catch((error) => {
        console.log({ error });
      });
  };
  useEffect(() => {
    setCountq(quantity);
    setCPrice(price);
  }, []);
  return (
    <View
      style={{
        width: 370,
        height: 106,
        paddingHorizontal: 20,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: "#DAE2B6",
        justifyContent: "center",
        marginVertical: 5,
      }}
    >
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              flex: 1,
              marginTop: "1.2%",
              position: "relative",
              paddingHorizontal: 1,
              justifyContent: "space-evenly",
              marginLeft: "0%",
            }}
            onPress={titleClick}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#584153",
                paddingHorizontal: 5,
                alignSelf: "flex-start",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {title}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              width: "60%",
              height: 50,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>Quantity: </Text>
            <IconButton
              icon="minus"
              mode="outlined"
              // iconColor={MD3Colors.error50}
              size={20}
              onPress={() => {
                if (countq > 1) {
                  let sp = cprice / countq;
                  let plus = countq - 1;
                  setCountq(plus);
                  let p = sp * plus;
                  setCPrice(p);
                }
              }}
            />
            <Text
              style={{
                fontWeight: "500",
                fontSize: 24,
                color: "gray",
                alignItems: "flex-end",
                marginHorizontal: 10,
                position: "relative",
              }}
            >
              {countq}
            </Text>
            <IconButton
              icon="plus"
              mode="outlined"
              iconColor={MD3Colors.error50}
              size={20}
              onPress={() => {
                let sp = cprice / countq;
                let plus = countq + 1;
                setCountq(plus);
                let p = sp * plus;
                setCPrice(p);
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              right: -10,
              top: -27,
              flexDirection: "column",
            }}
          >
            <IconButton
              icon="content-save"
              mode="outlined"
              iconColor={MD3Colors.error50}
              size={20}
              onPress={updateCart}
            />
            <IconButton
              icon="delete"
              mode="outlined"
              iconColor={MD3Colors.error50}
              size={20}
              onPress={deleteCart}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 20,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Price: </Text>
          <Text
            style={{ fontSize: 18, fontWeight: "700", marginHorizontal: 30 }}
          >
            Rs. {cprice}
          </Text>
        </View>
      </View>
    </View>
  );
}

export { CartCard };
