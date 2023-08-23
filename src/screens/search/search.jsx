import { useState, useEffect } from "react";
import React from "react";
import { View, Text, FlatList, ToastAndroid } from "react-native";
import { Button } from "react-native-paper";
import { stylesearch } from "./searchStyle";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../../services/firebaseConfig";
import { SearchCard } from "../../components/searchcard";
import { Storage } from "expo-storage";
import { getARandomIds } from "../../utils/help";

function Search({ navigation }) {
  const [category, setCategory] = useState("");
  const [searchRecipe, setSearchRecipe] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [select, setSelect] = useState("");
  const [bookmarkId, setBookmarkId] = useState("");
  const [bookmark, setBookmark] = useState(false);
  const [bookmarkis, setBookmarkis] = useState(false);
  const [userId, setUserId] = useState();

  let user_id;
  const getUserId = async () => {
    user_id = await Storage.getItem({ key: "user_uid" });
    console.log("serch : " + user_id);
    setUserId(user_id);
  };
  const getCategory = () => {
    firebase
      .firestore()
      .collection("category")
      .get()
      .then((response) => {
        setCategory(response.docs);
      })
      .catch((error) => {
        console.log({ error });
      });
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
  const getRecipeByCat = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("recipes")
      .where("catId", "==", select)
      .get()
      .then((response) => {
        setSearchRecipe(response.docs);
      })
      .catch((error) => {
        console.log({ error });
      });
    setShowLoading(false);
  };
  const createBookmark = (recId) => {
    // setShowLoading(true);
    const docId = getARandomIds();
    console.log("create:" + docId);
    firebase
      .firestore()
      .collection("bookmark")
      .doc(docId)
      .set({
        isbookmark: true,
        recipeId: recId,
        uuid: userId,
      })
      .then((response) => {
        ToastAndroid.show("Bookmarked Successfully", ToastAndroid.SHORT);
        // setShowLoading(false);
        getRecipeByCat();
        getBookmark();
      })
      .catch((error) => {
        console.log("error: " + error);
        // setShowLoading(false);
      });
    // setShowLoading(false);
  };
  const deleteBookmark = (bId) => {
    console.log("remove:" + bId);
    firebase
      .firestore()
      .collection("bookmark")
      .doc(bId)
      .delete()
      .then((res) => {
        ToastAndroid.show("Bookmarked Removed", ToastAndroid.SHORT);
        getRecipeByCat();
        getBookmark();
        setBookmarkis(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const __renderListingImage = ({ item }) => {
    const listing = item.data();
    const listId = item.id;

    bookmark.forEach((doc) => {
      if (doc.data().recipeId == listId && doc.data().uuid == userId) {
        setBookmarkis(doc.data().isbookmark);
        setBookmarkId(doc.id);
        // console.log("bookm:" + bookmarkis + "------" + doc.data().recipeId);
      } else if (doc.data().uuid != userId && doc.data().recipeId == listId) {
        setBookmarkis(false);
      }
    });
    // console.log(listing.name);
    //////////////////////////////////////////

    return (
      <SearchCard
        title={listing.name}
        mint={listing.cooktime}
        serving={listing.serving}
        img={listing.imgUrl}
        iconName={bookmarkis === true ? "bookmark" : "bookmark-outline"}
        iconPress={() => {
          if (bookmarkis === true) {
            //console.log(bookId);
            deleteBookmark(bookmarkId);
          } else {
            createBookmark(listId);
          }
        }}
        imgClick={() => {
          alert("img click");
        }}
      />
    );
  };
  const __renderItem = ({ item }) => {
    const listing = item.data();
    const listId = item.id;

    return (
      <Button
        mode={select === listId ? "contained-tonal" : "outlined"}
        onPress={() => {
          //alert(listing.name);
          setShowLoading(true);
          setSelect(listId);
          setShowLoading(false);
          // console.log("Cat ID: " + item.id + " -- " + select);
        }}
        style={{
          marginHorizontal: 5,
          marginVertical: 8,
          borderColor: "#227C70",
        }}
        labelStyle={{ color: "#227C70" }}
      >
        {listing.name}
      </Button>
    );
  };

  useEffect(() => {
    getUserId();
    getCategory();
    getBookmark();
    getRecipeByCat();
  }, [select, userId, bookmarkis]);

  return (
    <View style={stylesearch.mainview}>
      <View
        style={{
          height: 55,
          width: "100%",
          backgroundColor: "#ABC270",
          borderRadius: 15,
          marginBottom: 5,
          padding: 10,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Ionicons name="search-outline" size={30} color={"gray"} />
        <Text style={{ fontSize: 20 }}>Search Recipes By Category</Text>
      </View>

      <View>
        <FlatList
          data={category}
          horizontal={true}
          renderItem={__renderItem}
          ListEmptyComponent={
            <Text style={{ color: "gray", fontSize: 16, fontWeight: "600" }}>
              No listing found !
            </Text>
          }
          refreshing={showLoading}
          onRefresh={() => getCategory()}
        />
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
          </View>
        }
        refreshing={showLoading}
        onRefresh={getRecipeByCat}
      />
    </View>
  );
}

export { Search };
