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
import { Ionicons } from "@expo/vector-icons";
import {
  clearUserSession,
  getUserLoggedInStatus,
} from "../../services/storageService";
import LottieView from "lottie-react-native";
import { Storage } from "expo-storage";

function Home({ navigation }) {
  // const { user, userId } = route.params;

  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [userRole, setUserRole] = useState();
  const [trandingRecipe, setTrandingRecipe] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const [isbookM, setIsBookM] = useState(false);

  let user_id;
  let user_name = "";
  let user_role = "";
  const getCurrentProfile = async () => {
    //console.log(getUserId.toString());
    if (!getUserLoggedInStatus()) {
      clearUserSession("", "false");
      navigation.replace("Signin");
    }
    user_name = await Storage.getItem({ key: "user_name" });
    user_id = await Storage.getItem({ key: "user_uid" });
    user_role = await Storage.getItem({ key: "user_role" });
    setUserName(user_name);
    setUserId(user_id);
    setUserRole(user_role);
    console.log(user_role);
    console.log(user_id);
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
    getCurrentProfile();
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
      // .where("uuid", "==", user_id)
      .get()
      .then((response) => {
        // if (response.empty) {
        //   setIsBookM(false);
        // } else {
        //   setIsBookM(true);
        // }
        setBookmark(response.docs);
      })
      .catch((error) => {
        console.log({ error });
      });
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

    let catname;
    category.forEach((doc) => {
      if (doc.id == listing.catId) {
        catname = doc.data().name;
      }
    });

    let bookmarkis;
    let bookId;
    let recId;
    bookmark.forEach((doc) => {
      if (doc.data().recipeId == listId) {
        bookmarkis = doc.data().isbookmark;
        bookId = doc.id;
        recId = doc.data().recipeId;
      }
    });

    return (
      <View>
        <RecipeCard
          key={listId}
          title={listing.name}
          imgurl={listing.imgUrl}
          mint={listing.cooktime}
          serving={listing.serving}
          price={listing.price}
          category={catname}
          iconName={bookmarkis === true ? "bookmark" : "bookmark-outline"}
          iconClick={() => {
            // console.log("Bookm ID: " + bookId);
            if (bookmarkis === true) {
              updateBookmark(bookId, false);
            } else if (bookmarkis === false) {
              updateBookmark(bookId, true);
            }
          }}
          titleClick={() => {
            // storeRecipeId(recId);
            console.log("recipe select : " + recId);
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
      </View>
    );
  };

  useEffect(() => {
    getCurrentProfile();
    getTrandingRecipe();
    getCategory();
    getBookmark();
  }, [userName]);

  return (
    // <ScrollView>
    <View style={stylehome.mainview}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "column" }}>
          <Text style={stylehome.heading}>Hello {userName},</Text>
          <Text style={stylehome.subheading}>What you want to cook today?</Text>
        </View>
        {userRole === "Administrator" ? (
          <TouchableOpacity
            style={{
              marginLeft: 20,
              backgroundColor: "orange",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate("dashboard");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Admin Panel</Text>
              <Ionicons name="home-outline" color={"green"} size={38} />
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#DAE2B6",
          width: "100%",
          height: 100,
          borderRadius: 15,
          paddingHorizontal: 15,
          marginVertical: 5,
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
              navigation.navigate("Search");
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
        <View style={{ flexDirection: "row" }}>
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
      </View>
      <View
        style={{ marginTop: 0, marginBottom: 10, justifyContent: "center" }}
      >
        <Text style={stylehome.heading}>Category</Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 20 }}
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
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
      <ScrollView
        nestedScrollEnabled={true}
        bounces={false}
        showsVerticalScrollIndicator={true}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FlatList
            data={category}
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
      </ScrollView>
      {showLoading && (
        <LottieView
          source={require("../../../assets/animations/recipes-book.json")}
          autoPlay
          loop
        />
      )}
    </View>
    // </ScrollView>
  );
}

export { Home };
