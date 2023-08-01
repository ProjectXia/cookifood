import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  TurboModuleRegistry,
} from "react-native";
import { stylesbook } from "./bookmarkStyle";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../../services/firebaseConfig";
import { BookMarkCard } from "../../components/bookmarkcard";

function Bookmark({ navigation }) {
  const [searchRecipe, setSearchRecipe] = useState("");
  const [isBookmark, setIsBookmark] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const getRecipeByCat = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("recipes")
      .get()
      .then((response) => {
        response.forEach((doc) => {
          // setSearchRecipe(doc.data().fullname);
          firebase
            .firestore()
            .collection("bookmark")
            .where("recipeId", "==", doc.id)
            .get()
            .then((response) => {
              //setMybookmarkId(response.docs);
              response.forEach((doc) => {
                setIsBookmark(true);
                if (isBookmark == true) {
                  setSearchRecipe(response.docs);
                  setIsBookmark(false);
                }
              });
            })
            .catch((error) => {
              console.log({ error });
            });
        });
      })
      .catch((error) => {
        console.log({ error });
      });
    setShowLoading(false);
  };

  const __renderListingImage = ({ item }) => {
    const listing = item.data();
    const listId = item.id;
    //////////////////////////////////////////

    return (
      <BookMarkCard
        title={listing.name}
        mint={listing.cooktime}
        serving={listing.serving}
        img={listing.imgUrl}
        recipeId={listId}
      />
    );
  };
  useEffect(() => {
    getRecipeByCat();
  }, []);

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
        onRefresh={getRecipeByCat}
      />
    </View>
  );
}

export { Bookmark };
