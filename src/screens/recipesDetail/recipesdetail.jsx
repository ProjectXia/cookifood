import React from "react";
import { View, Text, ImageBackground, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IngredientCard } from "../../components/ingredient";

function RecipesDetail() {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/image.png")}
        style={{ width: "100%", height: 300, opacity: 0.9 }}
      >
        {/* <View
          style={{
            flex: 1,
            backgroundColor: "white",
            opacity: 0.5,
          }}
        > */}
        <View
          style={{
            width: "100%",
            height: 60,
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="arrow-back"
            size={30}
            style={{
              position: "absolute",
              left: 20,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: 2,
            }}
            color={"white"}
          />
          <Ionicons
            name="bookmark-outline"
            size={35}
            style={{ position: "absolute", left: "80%" }}
            color={"lightgreen"}
          />
        </View>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            width: "90%",
            height: 90,
            alignSelf: "center",
            position: "absolute",
            top: 200,
            borderRadius: 10,
            borderColor: "white",
            borderWidth: 0.2,
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: "orange",
              borderRadius: 30,
              position: "absolute",
              top: 15,
              left: 40,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Image
              source={require("../../../assets/re1.png")}
              style={{ width: 58, height: 58, borderRadius: 30 }}
            />
            {/* <Ionicons name="person-circle-outline" size={60} color={"white"} /> */}
          </View>
          <View style={{ position: "absolute", top: 15, left: 115 }}>
            <Text style={{ color: "gray", fontSize: 16, fontWeight: "400" }}>
              Recipe by:
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Fareeha ZiA
            </Text>
          </View>
          <Ionicons
            name="arrow-forward"
            size={30}
            style={{
              position: "absolute",
              top: 25,
              right: 20,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: 2,
            }}
            color={"white"}
          />
        </View>
        {/* </View> */}
      </ImageBackground>
      {/* ///////////////////////////////////////////BODY//////////////////////////////////////////////// */}
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 115,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ width: 200, fontSize: 24, fontWeight: "800" }}>
          Spaghetti With Shrimp Sauce
        </Text>
        <Text
          style={{ position: "absolute", top: 90, left: 22, color: "gray" }}
        >
          30 mins | 1 Serving
        </Text>
        <Text
          style={{ position: "absolute", top: 70, left: "88%", color: "gray" }}
        >
          4 people
        </Text>
        <Text
          style={{ position: "absolute", top: 90, left: "76%", color: "gray" }}
        >
          Already try this!
        </Text>
        <View
          style={{
            width: "40%",
            height: 55,
            position: "absolute",
            top: 15,
            left: "65%",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../../assets/p1.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 30,
              position: "absolute",
              left: 0,
              borderColor: "white",
              borderWidth: 1,
            }}
          />
          <Image
            source={require("../../../assets/p2.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 30,
              position: "absolute",
              left: 30,
              borderColor: "white",
              borderWidth: 1,
            }}
          />
          <Image
            source={require("../../../assets/p3.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 30,
              position: "absolute",
              left: 60,
              borderColor: "white",
              borderWidth: 1,
            }}
          />
          <Image
            source={require("../../../assets/p4.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 30,
              position: "absolute",
              left: 90,
              borderColor: "white",
              borderWidth: 1,
            }}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "800" }}>Ingredients</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            position: "absolute",
            left: "86%",
            color: "gray",
          }}
        >
          6 items
        </Text>
        <View style={{ height: 20 }} />
        <ScrollView>
          <IngredientCard
            iconName={require("../../../assets/Ingredients/pasta.png")}
            IngredientName="Spaghettti pasta"
            IngredientMsr={"100 g"}
          />
          <IngredientCard
            iconName={require("../../../assets/Ingredients/olive-oil.png")}
            IngredientName="Olive Oil"
            IngredientMsr={"2 tbsp"}
          />
          <IngredientCard
            iconName={require("../../../assets/Ingredients/lobster.png")}
            IngredientName="Fresh Shrimp"
            IngredientMsr={"100 g"}
          />
          <IngredientCard
            iconName={require("../../../assets/Ingredients/tomato.png")}
            IngredientName="Fresh Shrimp"
            IngredientMsr={"100 g"}
          />
          <IngredientCard
            iconName={require("../../../assets/Ingredients/salt-shaker.png")}
            IngredientName="Fresh Shrimp"
            IngredientMsr={"3/4 tbsp"}
          />
          <IngredientCard
            iconName={require("../../../assets/Ingredients/pepper.png")}
            IngredientName="Fresh Shrimp"
            IngredientMsr={"1/4 tbsp"}
          />
        </ScrollView>
      </View>
    </View>
  );
}

export { RecipesDetail };
