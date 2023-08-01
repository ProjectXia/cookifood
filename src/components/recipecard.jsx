import { useState, useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../services/firebaseConfig";

function RecipeCard({
  title,
  imgurl,
  mint,
  serving,
  trandingRecipeID,
  catId,
  bookId,
}) {
  const [category, setCategory] = useState("");
  const [bookmark, setBookmark] = useState(false);
  const [bookmarkId, setBookmarkId] = useState("");
  const [bookmarkupdate, setBookmarkupdate] = useState(false);
  const [mybookmarkId, setMybookmarkId] = useState([]);

  const getCategory = () => {
    firebase
      .firestore()
      .collection("category")
      // .where(doc.id, "==", catId)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          if (doc.id == catId) {
            setCategory(doc.data().name);
          }
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const getBookmark = () => {
    firebase
      .firestore()
      .collection("bookmark")
      .where("recipeId", "==", trandingRecipeID)
      .get()
      .then((response) => {
        setMybookmarkId(response.docs);
        response.forEach((doc) => {
          setBookmark(doc.data().isbookmark);
          setBookmarkId(doc.id);
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  };
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
      .then((response) => {
        getBookmark();
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    getCategory();
    getBookmark();
  }, []);
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
              {bookmark == true ? (
                <Ionicons
                  name="bookmark"
                  size={30}
                  color={"lightgreen"}
                  onPress={() => {
                    console.log("bookmark = " + bookmark);
                    setBookmarkupdate(false);
                    toggleBookmark();
                    updateBookmark();
                    // console.log("False bookmark = " + bookmark);
                  }}
                />
              ) : (
                <Ionicons
                  name="bookmark-outline"
                  size={30}
                  color={"lightgreen"}
                  onPress={() => {
                    console.log("bookmark = " + bookmark);
                    setBookmarkupdate(true);
                    toggleBookmark();
                    updateBookmark();
                    // console.log("True bookmark = " + bookmark);
                  }}
                />
              )}
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
            onPress={() => {
              console.log(trandingRecipeID);
            }}
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
              {mint} mins | {serving} Serving
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

export { RecipeCard };
