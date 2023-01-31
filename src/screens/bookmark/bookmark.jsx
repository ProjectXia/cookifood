import React from "react";
import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { BookMarkCard } from "../../components/bookmarkcard";
import { stylesbook } from "./bookmarkStyle";
import { Ionicons } from "@expo/vector-icons";

function Bookmark({ navigation }) {
  return (
    <View style={stylesbook.mainview}>
      <View
        style={{
          height: 55,
          width: "100%",
          backgroundColor: "#ABC270",
          borderRadius: 15,
          marginBottom: 20,
          padding: 10,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Ionicons name="bookmark-outline" size={30} color={"gray"} />
        <Text style={{ fontSize: 20 }}>Book Marked Recipes</Text>
      </View>
      <BookMarkCard
        imageclick={() => {
          navigation.navigate("detail");
        }}
      />
    </View>
  );
}

export { Bookmark };
