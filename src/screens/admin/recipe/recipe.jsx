import { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";
import { stylesrecipe } from "./recipeStyle";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { InputBox } from "../../../components/input";
import { BButton } from "../../../components/bbutton";
import { CustomCamera } from "../../../components/customecamera";
import LottieView from "lottie-react-native";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
import { firebase } from "../../../services/firebaseConfig";
import { RecipeListCard } from "../../../components/recipelistItem";
import { makeBlob } from "../../../services/uploadImage";
import { getARandomIds, getARandomImageName } from "../../../utils/help";

function Recipe() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCameraShown, setIsCameraShown] = useState(false);
  const [imageFromCamera, setImageFromCamera] = useState("");
  const [imageFromPicker, setImageFromPicker] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [listName, setListName] = useState();
  const [category, setCategory] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [cooktime, setCooktime] = useState();
  const [price, setPrice] = useState();
  const [ccatId, setCCatId] = useState("");

  const getRecipes = () => {
    firebase
      .firestore()
      .collection("recipes")
      .get()
      .then((response) => {
        setRecipe(response.docs);
        // response.forEach((doc) => {
        //   setCategory({ name: doc.data().name, id: doc.id });
        // });
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const __renderRecipe = ({ item }) => {
    const listing = item.data();
    const listId = item.id;

    return (
      <View>
        <RecipeListCard
          key={listId}
          title={listing.name}
          imgurl={listing.imgUrl}
          cookt={listing.cooktime}
          price={listing.price}
        />
      </View>
    );
  };
  const getCategory = () => {
    firebase
      .firestore()
      .collection("category")
      .get()
      .then((response) => {
        setCategory(response.docs);
        // response.forEach((doc) => {
        //   setCategory({ name: doc.data().name, id: doc.id });
        // });
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const toggleModall = () => {
    setListName("");
    setCooktime("");
    setPrice("");
    setModalVisible(!isModalVisible);
  };
  const onImageCameFromGallery = (image) => {
    setImageFromPicker(image.uri);
  };

  const pickImageFromGallery = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })
      .then((response) => {
        // when users opens the picker and just comes back and does not select the image
        if (response.canceled) {
          alert("not selected");
        } else {
          onImageCameFromGallery(response.assets[0]);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const saveListing = (imgName, imageUrlOnServer) => {
    const docId = getARandomIds();
    firebase
      .firestore()
      .collection("recipes")
      .doc(docId)
      .set({
        name: listName,
        cooktime: cooktime,
        serving: 1,
        price: price,
        imageName: imgName,
        imageUrl: imageUrlOnServer,
        uuid: "oZ2uGYH3avYxPxplyjZaCE3IqvK2",
        catId: ccatId,
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

  const saveListingImage = () => {
    const imageUri = imageFromCamera || imageFromPicker;
    setShowLoading(true);
    makeBlob(imageUri)
      .then((imageBlob) => {
        const userStorageRef = firebase.storage().ref("recipes/");
        const imageName = getARandomImageName();
        userStorageRef
          .child(imageName)
          .put(imageBlob)
          .then((uploadResponse) => {
            // will fetch uploaded image url for us
            firebase
              .storage()
              .ref("recipes/" + imageName)
              .getDownloadURL()
              .then((downloadRes) => {
                const imageUrlOnServer = downloadRes;

                // passing the UID and url to add data to firestore function
                saveListing(imageName, imageUrlOnServer);
              })
              .catch((downlaodErr) => {
                console.log(downlaodErr.message);
                setShowLoading(false);
              });

            // get the url from response and then add it with the data to firebase with uid
          })
          .catch((uploadError) => {
            console.log(uploadError.message);
            setShowLoading(false);
          });
      })
      .catch((blobError) => {
        setShowLoading(false);
      });
  };
  useEffect(() => {
    getCategory();
    getRecipes();
  }, []);
  return (
    <View style={stylesrecipe.mainview}>
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
        <Text style={{ fontSize: 20 }}>Recipe</Text>
        <TouchableOpacity
          style={{
            marginLeft: 150,
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
          data={recipe}
          horizontal={false}
          renderItem={__renderRecipe}
          ListEmptyComponent={
            <Text style={{ color: "gray", fontSize: 16, fontWeight: "600" }}>
              No listing found !
            </Text>
          }
          refreshing={showLoading}
          onRefresh={() => getRecipes()}
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
              Add New Recipe
            </Text>
            <InputBox
              placeholder={"Recipe Name"}
              iconName={"list-circle-outline"}
              showIcon={true}
              onTextChange={setListName}
              value={listName}
            />
            <View
              style={{
                flexDirection: "row",
                width: 150,
                justifyContent: "center",
              }}
            >
              <InputBox
                placeholder={"Cooking Time"}
                iconName={"list-circle-outline"}
                showIcon={true}
                onTextChange={setCooktime}
                value={cooktime}
              />
              <Text>{"  "} </Text>
              <InputBox
                placeholder={"Price"}
                iconName={"list-circle-outline"}
                showIcon={true}
                onTextChange={setPrice}
                value={price}
              />
            </View>

            <SelectDropdown
              data={category}
              defaultButtonText={" Select Category "}
              onSelect={(selectedItem, index) => {
                //console.log(selectedItem.data().name, selectedItem.id);
                setCCatId(selectedItem.id);
                console.log(ccatId);
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
            <View
              style={{
                flexDirection: "row",
                width: "95%",
                backgroundColor: "white",
                marginVertical: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  height: "40%",
                  width: "50%",
                }}
              >
                <View style={styles.pickImgCircle}>
                  <Image
                    source={{ uri: imageFromPicker || imageFromCamera || null }}
                    style={{ width: 150, height: 150, borderRadius: 15 }}
                    resizeMode={"contain"}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  flex: 1,
                  width: "50%",

                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Upload Image</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    height: "20%",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setIsCameraShown(!isCameraShown);
                    }}
                  >
                    <Ionicons
                      name="camera-sharp"
                      size={50}
                      style={{
                        borderRadius: 50,
                        backgroundColor: "#F1F6F5",
                        padding: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    height: "20%",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={pickImageFromGallery}>
                    <Ionicons
                      name="images-sharp"
                      size={50}
                      style={{
                        borderRadius: 50,
                        backgroundColor: "#F1F6F5",
                        padding: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "50%",
                justifyContent: "space-around",
              }}
            >
              <BButton title="Save" onPressChange={saveListingImage} />
              <BButton title="Cancel" onPressChange={toggleModall} />
            </View>
          </View>
          {showLoading && (
            <LottieView
              source={require("../../../../assets/animations/recipes-book.json")}
              autoPlay
              loop
            />
          )}
        </Modal>
      </KeyboardAvoidingView>
      <CustomCamera
        show={isCameraShown}
        onClose={() => setIsCameraShown(false)}
        onPictureTaken={(response) => {
          setIsCameraShown(false);
          //setIsPickerShown(false);
          // if image came it will add the uri in our state
          setImageFromCamera(response.uri);
        }}
      />
    </View>
  );
}

export { Recipe };
const styles = StyleSheet.create({
  pickImgCircle: {
    backgroundColor: "#F1F6F5",
    height: 150,
    width: 150,
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
