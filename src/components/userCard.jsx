import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function UserCard({ serialNo, name, email, address, created }) {
  return (
    <View
      style={{
        width: 390,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        marginVertical: 8,
      }}
    >
      <View
        style={{
          width: 55,
          height: 55,
          backgroundColor: "#E9E8E8",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 16 }}>{serialNo}</Text>
      </View>
      {/* <TouchableOpacity onPress={delClick}>
        <Ionicons name={"md-trash-bin-outline"} color={"red"} size={35} />
      </TouchableOpacity> */}

      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          position: "absolute",
          top: 0,
          left: 60,
          width: 200,
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "500",
          position: "absolute",
          top: 35,
          left: 60,
          width: 200,
          color: "gray",
        }}
      >
        {address}
      </Text>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "400",
          position: "absolute",
          top: 18,
          left: 60,
          width: 200,
        }}
      >
        {email}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          width: 100,
          textAlign: "right",
          position: "absolute",
          top: 5,
          right: 45,
          alignSelf: "flex-end",
        }}
      >
        {created}
      </Text>
    </View>
  );
}

export { UserCard };
