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
import { stylesingred } from "./ingreStyle";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { InputBox } from "../../../components/input";
import { BButton } from "../../../components/bbutton";
import { CustomCamera } from "../../../components/customecamera";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
import { firebase } from "../../../services/firebaseConfig";
import { makeBlob } from "../../../services/uploadImage";
import { getARandomIds, getARandomImageName } from "../../../utils/help";
import { CategoryCard } from "../../../components/categorycard";

function Ingredients() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCameraShown, setIsCameraShown] = useState(false);
  const [imageFromCamera, setImageFromCamera] = useState("");
  const [imageFromPicker, setImageFromPicker] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [listName, setListName] = useState("");

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
  const deleteCategory = (imageName, recipeID) => {
    setShowLoading(true);
    firebase
      .storage()
      .ref("category/" + imageName)
      .delete()
      .then((res) => {
        firebase
          .firestore()
          .collection("category")
          .doc(recipeID)
          .delete()
          .then((res) => {
            ToastAndroid.show("Category Deleted! ", ToastAndroid.LONG);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
    setShowLoading(false);
  };
  const __renderCategory = ({ item }) => {
    const listing = item.data();
    const listId = item.id;

    return (
      <View>
        <CategoryCard
          title={listing.name}
          imgurl={listing.imgUrl}
          descrp={listing.detail}
          deleteClick={() => {
            deleteCategory(listing.imgName, listId);
          }}
        />
      </View>
    );
  };
  const toggleModall = () => {
    setListName("");
    setListDetail("");
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
      .collection("category")
      .doc(docId)
      .set({
        name: listName,
        detail: listDetail,
        imgName: imgName,
        imgUrl: imageUrlOnServer,
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
        const userStorageRef = firebase.storage().ref("category/");
        const imageName = getARandomImageName();
        userStorageRef
          .child(imageName)
          .put(imageBlob)
          .then((uploadResponse) => {
            // will fetch uploaded image url for us
            firebase
              .storage()
              .ref("category/" + imageName)
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
      <Text>
        A mobile application that will facilitate the people to select a recipe
        to cook in daily hectic routine. It is very hard to go out and choose
        what to cook everyday particularly for professionals. This mobile
        application will help people to select meal of the day that they want to
        cook with all ingredients (spices, oil, vegetables, , meat, etc.)
      </Text>
    </View>
  );
}

export { Ingredients };
