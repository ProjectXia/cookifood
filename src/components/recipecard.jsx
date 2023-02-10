import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function RecipeCard() {
  return (
    <View
      style={{
        width: 200,
        marginVertical: 10,
        marginHorizontal: 5,
        height: 315,
      }}
    >
      <ImageBackground
        source={require("../../assets/welcome.jpg")}
        style={{ flex: 1 }}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View
            style={{
              backgroundColor: "#3D5656",
              width: "35%",
              margin: 20,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              padding: 5,
              borderRadius: 15,
            }}
          >
            <Text style={{ fontWeight: "800", color: "white" }}>Pasta</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#434242",
              width: "90%",
              height: "27%",
              alignSelf: "center",
              marginTop: "100%",
              position: "absolute",
              paddingHorizontal: 6,
              paddingVertical: 10,
              flexDirection: "column",
              borderRadius: 15,
            }}
          >
            <View
              style={{ flexDirection: "row", marginEnd: 10, marginBottom: 10 }}
            >
              <View style={{ flexDirection: "column", width: "90%" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "white" }}
                >
                  Spaghetti With Shrimp Sauce
                </Text>
              </View>
              <View
                style={{
                  width: "10%",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <Ionicons
                  name="bookmark-outline"
                  size={20}
                  color={"lightgreen"}
                />
              </View>
            </View>

            <Text style={{ fontWeight: "500", color: "white" }}>
              30 mins | 1 Serving
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

export { RecipeCard };
