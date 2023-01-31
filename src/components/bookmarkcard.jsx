import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function BookMarkCard({ imageclick }) {
  return (
    <View
      style={{
        width: "50%",
        height: 250,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: "#DAE2B6",
        justifyContent: "center",
        marginVertical: 5,
      }}
    >
      <TouchableOpacity onPress={imageclick}>
        <ImageBackground
          source={require("../../assets/welcome.jpg")}
          style={{
            height: 170,
            width: 185,
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
          {/* <TouchableOpacity
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
          > */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              height: 70,
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#584153",
                paddingHorizontal: 0,
                alignSelf: "flex-start",
                flexWrap: "wrap",
                width: "100%",
                position: "absolute",
                marginTop: 175,
              }}
            >
              Spaghetti adaaff dfdsf asfsfasgsd asdadad adad
            </Text>
          </View>
          {/* </TouchableOpacity> */}
          <View
            style={{
              flexDirection: "row",
              width: 35,
              height: 45,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ABC270",
              position: "absolute",
              marginLeft: "0%",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              paddingBottom: 5,
              elevation: 2,
            }}
          >
            <Ionicons
              name="bookmark"
              size={30}
              color={"red"}
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
              fontSize: 14,
              color: "gray",
              alignItems: "center",
              marginTop: 160,
              marginLeft: 15,
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

export { BookMarkCard };
