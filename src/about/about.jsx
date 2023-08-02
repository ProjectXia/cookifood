import React from "react";
import { View, Text } from "react-native";
import { stylesabout } from "./aboutStyle";
import { Ionicons } from "@expo/vector-icons";

function AboutUs() {
  return (
    <View style={stylesabout.mainview}>
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
        <Text style={{ fontSize: 20 }}>About Us</Text>
      </View>
      <Text>
        A mobile application that will facilitate the people to select a recipe
        to cook in daily hectic routine. It is very hard to go out and choose
        what to cook everyday particularly for professionals. This mobile
        application will help people to select meal of the day that they want to
        cook with all ingredients (spices, oil, vegetables, , meat, etc.)
      </Text>
    </View>
  );
}

export { AboutUs };
