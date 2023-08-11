import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { stylesdash } from "./dashboardStyle";
import { Ionicons } from "@expo/vector-icons";

function Dashboard({ navigation }) {
  return (
    <View style={stylesdash.mainview}>
      <View
        style={{
          height: 55,
          width: "100%",
          backgroundColor: "#ABC270",
          borderRadius: 15,
          marginBottom: 5,
          paddingHorizontal: 10,
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          top: 15,
        }}
      >
        <Ionicons name="settings-outline" size={30} color={"gray"} />
        <Text style={{ fontSize: 20 }}>Admin Dashboard</Text>
        <TouchableOpacity
          style={{
            marginLeft: 60,
            backgroundColor: "orange",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
          }}
          onPress={() => {}}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Logout </Text>
            <Ionicons name="log-out-outline" color={"green"} size={38} />
          </View>
        </TouchableOpacity>
      </View>
      <Text>Recipes | Category | Ingredients | Order Status | logout</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={stylesdash.card}>
          <Ionicons
            name="card-outline"
            size={80}
            color={"gray"}
            onPress={() => {
              navigation.navigate("recipe");
            }}
          />
          <Text style={stylesdash.cardText}>Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesdash.card}
          onPress={() => {
            navigation.navigate("orders");
          }}
        >
          <Ionicons name="list-circle-outline" size={80} color={"gray"} />
          <Text style={stylesdash.cardText}>My Orders</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={stylesdash.card}
          onPress={() => {
            navigation.navigate("ingredient");
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={80}
            color={"gray"}
          />
          <Text style={stylesdash.cardText}>Ingredients</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesdash.card}
          onPress={() => {
            navigation.navigate("category");
          }}
        >
          <Ionicons name="list-circle" size={80} color={"gray"} />
          <Text style={stylesdash.cardText}>Category</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={stylesdash.card}
          onPress={() => {
            navigation.navigate("users");
          }}
        >
          <Ionicons name="people-circle-outline" size={80} color={"gray"} />
          <Text style={stylesdash.cardText}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesdash.card}
          onPress={() => {
            navigation.navigate("asetting");
          }}
        >
          <Ionicons name="md-settings-outline" size={80} color={"gray"} />
          <Text style={stylesdash.cardText}>Setting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export { Dashboard };
