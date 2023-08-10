import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

function RecipeListCard({ title, cookt, price, imgurl, deleteClick }) {
  return (
    <View
      style={{
        width: 370,
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
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#584153",
              paddingHorizontal: 5,
              alignSelf: "flex-start",
              flexWrap: "wrap",
              marginLeft: 83,
              width: "80%",
            }}
          >
            {title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 5,
            marginLeft: 88,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
            Time: {cookt} mint
          </Text>
          <Text> | </Text>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
            Price: Rs.{price}
          </Text>

          <View
            style={{
              position: "absolute",
              right: -50,
              top: -40,
              flexDirection: "column",
            }}
          >
            <IconButton
              icon="delete"
              mode="outlined"
              iconColor={MD3Colors.error50}
              size={20}
              onPress={deleteClick}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export { RecipeListCard };
