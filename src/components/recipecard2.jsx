import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function RecipeCard2({ cwidth = "100%" }) {
  return (
    <View
      style={{
        width: cwidth,
        height: 106,
        paddingHorizontal: 20,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: "#DAE2B6",
        justifyContent: "center",
        marginVertical: 5,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          alert("img click");
        }}
      >
        <ImageBackground
          source={require("../../assets/welcome.jpg")}
          style={{
            height: 100,
            width: 100,
            position: "absolute",
            marginLeft: -17,
            marginTop: 3,
          }}
          imageStyle={{
            borderRadius: 15,
          }}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              flex: 1,
              marginTop: "2%",
              position: "absolute",
              paddingHorizontal: 1,
              justifyContent: "space-evenly",
              flexDirection: "column",
              borderRadius: 15,
              marginLeft: "25%",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "73%",
                height: 73,
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
                  width: "70%",
                }}
              >
                Spaghetti adaaff dfdsf asfsfasgsd asdadad adad
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "column",
              width: 20,
              height: 60,
              justifyContent: "flex-end",
              alignItems: "center",
              backgroundColor: "#ABC270",
              position: "absolute",
              marginLeft: "85%",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              paddingBottom: 10,
              elevation: 2,
            }}
          >
            <Ionicons
              name="bookmark-outline"
              size={35}
              color={"gray"}
              onPress={() => {
                alert("book mark click");
              }}
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              color: "white",
              alignItems: "flex-end",
              marginTop: 80,
              marginLeft: 100,
              position: "absolute",
            }}
          >
            30 mins | 1 Serving
          </Text>
        </View>
      </View>
    </View>
  );
}

export { RecipeCard2 };
