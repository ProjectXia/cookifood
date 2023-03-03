import React from "react";
import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { stylesearch } from "./searchStyle";
import { InputBox } from "../../components/input";
import { RecipeCard2 } from "../../components/recipecard2";
import { Ionicons } from "@expo/vector-icons";

function Search() {
  return (
    <View style={stylesearch.mainview}>
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
        }}
      >
        <Ionicons name="search-outline" size={30} color={"gray"} />
        <Text style={{ fontSize: 20 }}>Search Recipes</Text>
      </View>
      <InputBox
        placeholder={"Search recipes here!"}
        iconName={"search"}
        showIcon={true}
        iconSize={28}
      />

      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 5,
            paddingVertical: 15,
            marginBottom: 50,
          }}
        >
          <RecipeCard2 />
          <RecipeCard2 />
          <RecipeCard2 />
          <RecipeCard2 />
          <RecipeCard2 />
          <RecipeCard2 />
        </View>
      </ScrollView>
    </View>
  );
}

export { Search };
