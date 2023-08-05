import { useState, useEffect } from "react";
import React from "react";
import { View, Text, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { stylesearch } from "./searchStyle";
import { InputBox } from "../../components/input";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../../services/firebaseConfig";
import { SearchCard } from "../../components/searchcard";

function Search({ navigation }) {
  const [category, setCategory] = useState("");
  const [searchRecipe, setSearchRecipe] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [select, setSelect] = useState("");
  const [bookmarkId, setBookmarkId] = useState("");
  const [bookmark, setBookmark] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  const getRecipeByCat = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("recipes")
      .where("catId", "==", select)
      .get()
      .then((response) => {
        setSearchRecipe(response.docs);
        // response.forEach((doc) => {
        //   setSearchRecipe(doc.data().fullname);
        // });
      })
      .catch((error) => {
        console.log({ error });
      });
    setShowLoading(false);
  };

  const __renderListingImage = ({ item }) => {
    const listing = item.data();
    const listId = item.id;
    firebase
      .firestore()
      .collection("bookmark")
      .where("recipeId", "==", listId)
      .get()
      .then((response) => {
        //setMybookmarkId(response.docs);
        response.forEach((doc) => {
          setBookmark(doc.data().isbookmark);
          setBookmarkId(doc.id);
        });
      })
      .catch((error) => {
        console.log({ error });
      });
    //////////////////////////////////////////

    return (
      <SearchCard
        title={listing.name}
        mint={listing.cooktime}
        serving={listing.serving}
        img={listing.imgUrl}
        recipeId={listId}
        bookId={bookmarkId}
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
    getCategory();
    getRecipeByCat();
  }, [select]);

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
            {/* <Button mode="outlined" onPress={() => {}}>
              Add New Item
            </Button> */}
          </View>
        }
        refreshing={showLoading}
        onRefresh={getRecipeByCat}
      />

      {/* <ScrollView>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 5,
            paddingVertical: 15,
            marginBottom: 50,
          }}
        ></View>
      </ScrollView> */}
    </View>
  );
}

export { Search };
