import React from "react";
import { View, Text } from "react-native";
import { stylessearchr } from "./searchResultStyle";
import { Ionicons } from "@expo/vector-icons";

function SearchResult() {
  return (
    <View style={stylessearchr.mainview}>
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
        <Ionicons name="search-circle-outline" color={"gray"} size={38} />
        <Text style={{ fontSize: 20 }}>Search Result</Text>
      </View>
      <Text>Search Result is Empty</Text>
    </View>
  );
}

export { SearchResult };
