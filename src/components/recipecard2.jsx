import { useState, useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../services/firebaseConfig";

function RecipeCard2({ cwidth = "100%", title, imgurl, descrp }) {
  return (
    <View
      style={{
        width: 360,
        height: 106,
        paddingHorizontal: 20,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: "#DAE2B6",
        justifyContent: "center",
        marginVertical: 5,
      }}
    >
      <ImageBackground
        source={{ uri: imgurl }}
        style={{
          height: 100,
          width: 100,
          position: "absolute",
          marginLeft: 7,
          marginTop: 3,
        }}
        imageStyle={{
          borderRadius: 15,
        }}
      />
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              flex: 1,
              marginTop: "1.2%",
              position: "absolute",
              paddingHorizontal: 1,
              justifyContent: "space-evenly",
              flexDirection: "column",
              borderRadius: 15,
              marginLeft: "30%",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                height: 53,
                justifyContent: "flex-start",
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
                {title}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 12,
              color: "gray",
              alignItems: "flex-end",
              marginTop: 45,
              marginLeft: 90,
              position: "absolute",
              flexWrap: "wrap",
            }}
          >
            {descrp}
          </Text>
        </View>
      </View>
    </View>
  );
}

export { RecipeCard2 };
