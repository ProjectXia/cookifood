import { useState, useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../services/firebaseConfig";
import { IconButton, MD3Colors } from "react-native-paper";

function CartCard({ cwidth = "100%", title, imgurl, descrp }) {
  return (
    <View
      style={{
        width: "95%",
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
              {title}title
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
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              {descrp}Quantity:{" "}
            </Text>
            <IconButton
              icon="minus"
              mode="outlined"
              // iconColor={MD3Colors.error50}
              size={20}
              onPress={() => console.log("Pressed")}
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
              1
            </Text>
            <IconButton
              icon="plus"
              mode="outlined"
              iconColor={MD3Colors.error50}
              size={20}
              onPress={() => console.log("Pressed")}
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
              icon="delete"
              mode="outlined"
              iconColor={MD3Colors.error50}
              size={20}
              onPress={() => console.log("Pressed")}
            />
            <IconButton
              icon="delete"
              mode="outlined"
              iconColor={MD3Colors.error50}
              size={20}
              onPress={() => console.log("Pressed")}
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
            Rs. 300
          </Text>
        </View>
      </View>
    </View>
  );
}

export { CartCard };
