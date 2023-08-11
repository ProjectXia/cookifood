import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";
import { stylesingred } from "./ingreStyle";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { InputBox } from "../../../components/input";
import { BButton } from "../../../components/bbutton";
import SelectDropdown from "react-native-select-dropdown";
import { firebase } from "../../../services/firebaseConfig";
import { getARandomIds } from "../../../utils/help";
import { IngredCard } from "../../../components/ingredcard";

function Ingredients() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [listName, setListName] = useState("");
  const [listQuantity, setListQuantity] = useState();
  const [recipeId, setRecipeId] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [ingred, setIngred] = useState([]);

  const getRecipes = () => {
    firebase
      .firestore()
      .collection("recipes")
      .get()
      .then((response) => {
        setRecipes(response.docs);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const getIngred = () => {
    firebase
      .firestore()
      .collection("ingrediants")
      .get()
      .then((response) => {
        setIngred(response.docs);
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const deleteIngred = (ingreId) => {
    setShowLoading(true);

    firebase
      .firestore()
      .collection("ingrediants")
      .doc(ingreId)
      .delete()
      .then((res) => {
        ToastAndroid.show("Ingrediant Deleted! ", ToastAndroid.LONG);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setShowLoading(false);
  };
  const __renderIngred = ({ item }) => {
    const listing = item.data();
    const listId = item.id;
    let matchRecipe;
    recipes.forEach((rec) => {
      if (listing.recipeId == rec.id) {
        matchRecipe = rec.data().name;
      }
    });
    return (
      <View>
        <IngredCard
          IngredientName={listing.name}
          IngredientMsr={listing.quantity}
          Item={matchRecipe}
          delClick={() => {
            deleteIngred(listId);
          }}
        />
      </View>
    );
  };
  const toggleModall = () => {
    setListName("");
    setListQuantity("");
    setModalVisible(!isModalVisible);
  };

  const saveListing = () => {
    const docId = getARandomIds();
    firebase
      .firestore()
      .collection("ingrediants")
      .doc(docId)
      .set({
        name: listName,
        quantity: listQuantity,
        recipeId: recipeId,
      })
      .then((response) => {
        ToastAndroid.show("Saved Recipe Successfully", ToastAndroid.SHORT);
        toggleModall();
        setShowLoading(false);
      })
      .catch((error) => {
        console.log("error: " + error);
        setShowLoading(false);
      });
  };

  useEffect(() => {
    getIngred();
    getRecipes();
  }, []);

  return (
    <View style={stylesingred.mainview}>
      <View
        style={{
          height: 55,
          width: "100%",
          backgroundColor: "#ABC270",
          borderRadius: 15,
          marginBottom: 5,
          paddingHorizontal: 10,
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          top: 15,
        }}
      >
        <Ionicons name="information-circle-outline" color={"gray"} size={38} />
        <Text style={{ fontSize: 20 }}>Ingredients</Text>
        <TouchableOpacity
          style={{
            marginLeft: 110,
            backgroundColor: "orange",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
          }}
          onPress={toggleModall}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Add New</Text>
            <Ionicons name="add-circle" color={"green"} size={38} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 70 }}>
        <FlatList
          data={ingred}
          horizontal={false}
          renderItem={__renderIngred}
          ListEmptyComponent={
            <Text style={{ color: "gray", fontSize: 16, fontWeight: "600" }}>
              No listing found !
            </Text>
          }
          refreshing={showLoading}
          onRefresh={() => getIngred()}
        />
      </View>

      <KeyboardAvoidingView>
        <Modal
          animationIn={"slideInRight"}
          animationOut={"slideOutDown"}
          animationOutTiming={1500}
          isVisible={isModalVisible}
        >
          <View
            style={{
              width: "100%",
              height: "90%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F1F6F5",
              borderRadius: 10,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "400" }}>
              Add New Category
            </Text>
            <InputBox
              placeholder={"Recipe Name"}
              iconName={"list-circle-outline"}
              showIcon={true}
              onTextChange={setListName}
              value={listName}
            />
            <InputBox
              placeholder={"Quantity of Ingrediant like 100g.. 2tbsp"}
              iconName={"list-circle-outline"}
              showIcon={true}
              onTextChange={setListQuantity}
              value={listQuantity}
            />
            <View style={{ width: "95%" }}>
              <SelectDropdown
                dropdownStyle={{ width: "80%", backgroundColor: "orange" }}
                data={recipes}
                defaultButtonText={" Select Recipe "}
                onSelect={(selectedItem, index) => {
                  //console.log(selectedItem.data().name, selectedItem.id);
                  setRecipeId(selectedItem.id);
                  console.log(recipeId);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected

                  return selectedItem.data().name;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.data().name;
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                marginVertical: 30,
                justifyContent: "space-around",
              }}
            >
              <BButton title="Save" onPressChange={saveListing} />
              <BButton title="Cancel" onPressChange={toggleModall} />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
}

export { Ingredients };
