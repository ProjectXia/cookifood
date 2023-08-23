import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { stylesbook } from "./bookmarkStyle";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../../services/firebaseConfig";
import { BookMarkCard } from "../../components/bookmarkcard";
import { Storage } from "expo-storage";

function Bookmark({ navigation }) {
  const [searchRecipe, setSearchRecipe] = useState("");
  const [bookmark, setBookmark] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [userId, setUserId] = useState();

  let user_id;
  const getUserId = async () => {
    user_id = await Storage.getItem({ key: "user_uid" });
    setUserId(user_id);
  };

  const getRecipe = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("recipes")
      .get()
      .then((response) => {
        setSearchRecipe(response.docs);
      })
      .catch((error) => {
        console.log({ error });
      });
    setShowLoading(false);
  };
  const getBookmark = () => {
    firebase
      .firestore()
      .collection("bookmark")
      .get()
      .then((response) => {
        setBookmark(response.docs);
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const deleteBookmark = (bId) => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("bookmark")
      .doc(bId)
      .delete()
      .then((res) => {
        getBookmark();
      })
      .catch((err) => {
        console.log(err.message);
      });
    setShowLoading(false);
  };
  const updateBookmark = (bId, updateB) => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("bookmark")
      .doc(bId)
      .update({ isbookmark: updateB })
      .then((response) => {
        getBookmark();
      })
      .catch((error) => {
        console.log({ error });
      });
    setShowLoading(false);
  };
  const __renderListingImage = ({ item }) => {
    const listing = item.data();
    const listId = item.id;

    let bookmarkis;
    let bookId;
    bookmark.forEach((doc) => {
      if (doc.data().recipeId == listId && doc.data().uuid == userId) {
        bookmarkis = doc.data().isbookmark;
        bookId = doc.id;
      }
    });
    if (bookmarkis === true) {
      return (
        <BookMarkCard
          title={listing.name}
          mint={listing.cooktime}
          serving={listing.serving}
          img={listing.imgUrl}
          iconName={"bookmark"}
          iconClick={() => {
            deleteBookmark(bookId);
          }}
          imgClick={() => {
            navigation.navigate("detail", {
              recipeID: recId,
              bookm: bookmarkis,
              rname: listing.name,
              mint: listing.cooktime,
              serving: listing.serving,
              price: listing.price,
              imgUrl: listing.imgUrl,
            });
          }}
        />
      );
    }
  };
  useEffect(() => {
    getUserId();
    getRecipe();
    getBookmark();
  }, [bookmark, userId]);

  return (
    <View style={stylesbook.mainview}>
      <View
        style={{
          height: 55,
          width: "100%",
          backgroundColor: "#ABC270",
          borderRadius: 15,
          marginBottom: 20,
          padding: 10,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Ionicons name="bookmark-outline" size={30} color={"gray"} />
        <Text style={{ fontSize: 20 }}>Book Marked Recipes</Text>
      </View>
      <FlatList
        data={searchRecipe}
        renderItem={__renderListingImage}
        horizontal={false}
        numColumns={2}
        ListEmptyComponent={
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "gray",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              No listing found !
            </Text>
            {/* <Button mode="outlined" onPress={() => {}}>
              Add New Item
            </Button> */}
          </View>
        }
        refreshing={showLoading}
        onRefresh={getRecipe}
      />
    </View>
  );
}

export { Bookmark };
