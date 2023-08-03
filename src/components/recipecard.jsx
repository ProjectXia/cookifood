import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function RecipeCard({
  title,
  imgurl,
  mint,
  serving,
  price,
  category,
  iconName,
  iconClick,
  titleClick,
}) {
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
        source={{ uri: imgurl }}
        style={{ flex: 1 }}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
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
              <Text style={{ fontWeight: "800", color: "white" }}>
                {category}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#3D5656",
                width: "25%",
                margin: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                padding: 5,
                borderRadius: 15,
              }}
            >
              <Ionicons
                name={iconName}
                size={30}
                color={"lightgreen"}
                onPress={iconClick}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#434242",
              width: "95%",
              height: "27%",
              alignSelf: "center",
              marginTop: "100%",
              position: "absolute",
              paddingHorizontal: 6,
              paddingVertical: 10,
              flexDirection: "column",
              borderRadius: 15,
            }}
            onPress={titleClick}
          >
            <View
              style={{ flexDirection: "row", marginEnd: 10, marginBottom: 10 }}
            >
              <View style={{ flexDirection: "column", width: "100%" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "white" }}
                >
                  {title}
                </Text>
              </View>
            </View>

            <Text style={{ fontWeight: "500", color: "white" }}>
              {mint} mins | {serving} Serving | {"Rs."}
              {price}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

export { RecipeCard };
