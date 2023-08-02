import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { stylessetting } from "./settingStyle";
import { Ionicons } from "@expo/vector-icons";
import { clearUserSession } from "../../services/storageService";

function Settings({ navigation }) {
  const signOutME = () => {
    clearUserSession("", "false");
    navigation.replace("Welcome");
  };

  return (
    <View style={stylessetting.mainview}>
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
        <Ionicons name="settings-outline" size={30} color={"gray"} />
        <Text style={{ fontSize: 20 }}>Settings</Text>
      </View>
      <Text>Profile | Order Status | About | logout</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={stylessetting.card}>
          <Ionicons
            name="card-outline"
            size={80}
            color={"gray"}
            onPress={() => {
              navigation.navigate("profile");
            }}
          />
          <Text style={stylessetting.cardText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylessetting.card}
          onPress={() => {
            navigation.navigate("order");
          }}
        >
          <Ionicons name="list-circle-outline" size={80} color={"gray"} />
          <Text style={stylessetting.cardText}>My Orders</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={stylessetting.card}
          onPress={() => {
            navigation.navigate("about");
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={80}
            color={"gray"}
          />
          <Text style={stylessetting.cardText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylessetting.card} onPress={signOutME}>
          <Ionicons name="log-out-outline" size={80} color={"gray"} />
          <Text style={stylessetting.cardText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export { Settings };
