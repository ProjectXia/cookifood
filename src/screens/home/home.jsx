import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { InputBox } from "../../components/input";
import { RecipeCard } from "../../components/recipecard";
import { RecipeCard2 } from "../../components/recipecard2";
import { stylehome } from "./homeStyle";
import { firebase } from "../../services/firebaseConfig";
import { clearUserSession, getUserId } from "../../services/storageService";
import LottieView from "lottie-react-native";

function Home({ navigation }) {
  const [userName, setUserName] = useState("");
  const [trandingRecipe, setTrandingRecipe] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [bookmarkId, setBookmarkId] = useState("");
  const UID = getUserId();

  const getCurrentProfile = () => {
    if (firebase.auth().currentUser == null) {
      clearUserSession("", "false");
      navigation.replace("Signin");
      return;
    }
    firebase
      .firestore()
      .collection("profiles")
      .where("uuid", "==", firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        // setUserName(response.docs.data());
        response.forEach((doc) => {
          setUserName(doc.data().fullname);
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const getTrandingRecipe = () => {
    setShowLoading(true);
    firebase
      .firestore()
      .collection("recipes")
      .limit(5)
      .get()
      .then((response) => {
        setTrandingRecipe(response.docs);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log({ error });
        setShowLoading(false);
      });
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
  const __renderCategory = ({ item }) => {
    const listing = item.data();
    const listId = item.id;

    return (
      <View>
        <RecipeCard2
          key={listId}
          title={listing.name}
          imgurl={listing.imgUrl}
          descrp={listing.detail}
          width="97%"
        />
      </View>
    );
  };
  const __renderTrandingRecipe = ({ item }) => {
    const listing = item.data();
    const listId = item.id;
    firebase
      .firestore()
      .collection("bookmark")
      .where("recipeId", "==", listId)
      .get()
      .then((response) => {
        // setBookmarkId(response.docs);
        response.forEach((doc) => {
          // setBookmark(doc.data().isbookmark);
          setBookmarkId(doc.id);
        });
      })
      .catch((error) => {
        console.log({ error });
      });

    return (
      <View>
        <RecipeCard
          key={listId}
          title={listing.name}
          imgurl={listing.imgUrl}
          mint={listing.cooktime}
          serving={listing.serving}
          trandingRecipeID={listId}
          catId={listing.catId}
          bookId={bookmarkId}
        />
      </View>
    );
  };

  useEffect(() => {
    getCurrentProfile();
    getTrandingRecipe();
    getCategory();
  }, [trandingRecipe]);

  return (
    <ScrollView>
      <View style={stylehome.mainview}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={stylehome.heading}>Hello {userName},</Text>
            <Text style={stylehome.subheading}>
              What you want to cook today?
            </Text>
          </View>
          {/* <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "red",
              width: 45,
              height: 45,
              borderRadius: 25,
            }}
          >
            <TouchableOpacity
              style={{
                textAlign: "center",
                fontSize: 30,
              }}
              onPress={() => {}}
            >
              <Text>@</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={{ marginVertical: 10 }}>
          <InputBox
            iconName={"search"}
            showIcon={true}
            placeholder={"Search Recipes"}
            iconSize={25}
            iconPress={() => {
              alert("icon press");
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#DAE2B6",
            width: "100%",
            height: 100,
            borderRadius: 15,
            paddingHorizontal: 15,
            marginVertical: 15,
          }}
        >
          <View style={{ flexDirection: "column", alignSelf: "center" }}>
            <Image
              source={require("../../../assets/recipe.png")}
              style={{ width: 70, height: 70, alignSelf: "center" }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 16 }}>You have 12 recipes that</Text>
            <Text style={{ fontSize: 16 }}>you haven't tried yet</Text>
            <TouchableOpacity
              style={{ marginTop: 15 }}
              onPress={() => {
                alert("see more");
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#584153",
                  textDecorationLine: "underline",
                }}
              >
                See Recipes
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={stylehome.heading}>Trending Recipe</Text>
          {/* <ScrollView horizontal={true}>
            <View
              style={{
                flexDirection: "row",
                height: "85%",
                justifyContent: "space-between",
              }}
            >
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
            </View>
          </ScrollView> */}
          <FlatList
            data={trandingRecipe}
            horizontal={true}
            renderItem={__renderTrandingRecipe}
            ListEmptyComponent={
              <Text style={{ color: "gray", fontSize: 16, fontWeight: "600" }}>
                No listing found !
              </Text>
            }
            refreshing={showLoading}
            onRefresh={() => getTrandingRecipe()}
          />
        </View>
        <View
          style={{ marginTop: 20, marginBottom: 20, justifyContent: "center" }}
        >
          <Text style={stylehome.heading}>Category</Text>
          <TouchableOpacity style={{ position: "absolute", right: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: "gray",
                fontWeight: "600",
              }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <FlatList
            data={category}
            initialNumToRender={5}
            renderItem={__renderCategory}
            horizontal={false}
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
            onRefresh={() => getCategory()}
          />
        </View>
        {showLoading && (
          <LottieView
            source={require("../../../assets/animations/recipes-book.json")}
            autoPlay
            loop
          />
        )}
      </View>
    </ScrollView>
  );
}

export { Home };
