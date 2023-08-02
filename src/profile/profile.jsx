import React from "react";
import { View, Text } from "react-native";
import { stylesprofile } from "./profileStyle";
import { Ionicons } from "@expo/vector-icons";

function Profile() {
  return (
    <View style={stylesprofile.mainview}>
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
        <Ionicons name="person-circle-outline" color={"gray"} size={38} />
        <Text style={{ fontSize: 20 }}>My Profile</Text>
      </View>
      <Text>Profile is Empty</Text>
    </View>
  );
}

export { Profile };
