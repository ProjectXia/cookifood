import { useState, useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../services/firebaseConfig";

function BookMarkCard({ title, mint, serving, img, recipeId, bookId, isbook }) {
  const [bookmark, setBookmark] = useState(false);
  const [bookmarkId, setBookmarkId] = useState("");
  const [bookmarkupdate, setBookmarkupdate] = useState(false);

  const toggleBookmark = () => {
    if (bookmark == true) {
      setBookmark(false);
    } else if (bookmark == false) {
      setBookmark(true);
    }
  };
  const updateBookmark = () => {
    firebase
      .firestore()
      .collection("bookmark")
      .doc(bookId)
      .update({ isbookmark: bookmarkupdate })
      .then((response) => {})
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    setBookmarkId(bookId);
    setBookmark(isbook);
  }, [bookmark]);

  return (
    <View
      style={{
        width: "47%",
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
      <TouchableOpacity>
        <ImageBackground
          source={{ uri: img }}
          style={{
            height: 170,
            width: 174,
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
              {title}
            </Text>
          </View>
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
            {bookmark && (
              <Ionicons
                name="bookmark"
                size={30}
                color={"red"}
                onPress={() => {
                  console.log("bookmark = " + bookmark);
                  setBookmarkupdate(false);
                  toggleBookmark();
                  updateBookmark();
                  // console.log("False bookmark = " + bookmark);
                }}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              width: 35,
              height: 45,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              position: "absolute",
              marginLeft: "70%",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              paddingBottom: 5,
              elevation: 2,
            }}
          >
            <Ionicons
              name="cart-outline"
              size={30}
              color={"white"}
              onPress={() => {}}
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
            {mint} mins | {serving} Serving
          </Text>
        </View>
      </View>
    </View>
  );
}

export { BookMarkCard };
