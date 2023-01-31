import { View, Text, Image, TouchableOpacity } from "react-native";
import { InputBox } from "../../components/input";
import { RecipeCard } from "../../components/recipecard";
import { RecipeCard2 } from "../../components/recipecard2";
import { stylehome } from "./homeStyle";

function Home() {
  return (
    <View style={stylehome.mainview}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "column" }}>
          <Text style={stylehome.heading}>Hello SomeNAME,</Text>
          <Text style={stylehome.subheading}>What you want to cook today?</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "red",
            width: 45,
            height: 45,
            borderRadius: 25,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
            }}
          >
            @
          </Text>
        </View>
      </View>
      <View style={{ marginVertical: 10 }}>
        <InputBox
          iconName={"search"}
          showIcon={true}
          placeholder={"Search Recipes"}
          iconSize={25}
          iconPress={() => {
            alert("icon press");
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#DAE2B6",
          width: "100%",
          height: 100,
          borderRadius: 15,
          paddingHorizontal: 15,
          marginVertical: 15,
        }}
      >
        <View style={{ flexDirection: "column", alignSelf: "center" }}>
          <Image
            source={require("../../../assets/recipe.png")}
            style={{ width: 70, height: 70, alignSelf: "center" }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>You have 12 recipes that</Text>
          <Text style={{ fontSize: 16 }}>you haven't tried yet</Text>
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              alert("see more");
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#584153",
                textDecorationLine: "underline",
              }}
            >
              See Recipes
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={stylehome.heading}>Trending Recipe</Text>
        <View
          style={{
            flexDirection: "row",
            height: "85%",
            justifyContent: "space-between",
          }}
        >
          <RecipeCard />
          <RecipeCard />
        </View>
      </View>
    </View>
  );
}

export { Home };
