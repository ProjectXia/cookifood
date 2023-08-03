import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IngredientCard } from "../../components/ingredient";
import { Storage } from "expo-storage";
import { Button } from "react-native-paper";

function RecipesDetail({ route, navigation }) {
  const { recipeID, bookm, rname, mint, serving, price, imgUrl } = route.params;

  console.log("detail Recipe Id: " + recipeID);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ImageBackground
        source={{ uri: imgUrl }}
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
            onPress={() => {
              navigation.back();
            }}
          />
          <Ionicons
            name={bookm === true ? "bookmark" : "bookmark-outline"}
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
              left: 30,
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
          <View
            style={{
              position: "absolute",
              top: 15,
              left: 105,
            }}
          >
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
              Maria
            </Text>
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              alert("Recipe added successfully!");
            }}
          >
            <Ionicons
              name="cart-outline"
              size={35}
              style={{
                position: "absolute",
                top: 25,
                right: 10,
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                padding: 2,
              }}
              color={"white"}
            />
          </TouchableOpacity> */}
          <Text
            style={{
              fontSize: 24,
              color: "white",
              position: "absolute",
              top: 25,
              right: 25,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              paddingVertical: 5,
              paddingHorizontal: 20,
            }}
          >
            Rs.{price}
          </Text>
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
          {rname}
        </Text>
        <Text
          style={{ position: "absolute", top: 90, left: 22, color: "gray" }}
        >
          {mint} mins | {serving} Serving
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
          <TouchableOpacity
            onPress={() => {
              alert("Recipe added successfully!");
            }}
          >
            <Button mode="contained">Add to Cart</Button>
          </TouchableOpacity>
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
            IngredientName="Campari tomatoes"
            IngredientMsr={"100 g"}
          />
          <IngredientCard
            iconName={require("../../../assets/Ingredients/salt-shaker.png")}
            IngredientName="Salt"
            IngredientMsr={"3/4 tbsp"}
          />
          <IngredientCard
            iconName={require("../../../assets/Ingredients/pepper.png")}
            IngredientName="Black Pepper"
            IngredientMsr={"1/4 tbsp"}
          />
        </ScrollView>
      </View>
    </View>
  );
}

export { RecipesDetail };
