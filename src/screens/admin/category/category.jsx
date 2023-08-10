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
import { stylescat } from "./categoryStyle";
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

function Category() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCameraShown, setIsCameraShown] = useState(false);
  const [imageFromCamera, setImageFromCamera] = useState("");
  const [imageFromPicker, setImageFromPicker] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [listName, setListName] = useState("");
  const [category, setCategory] = useState([]);
  const [listDetail, setListDetail] = useState("");

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
    <View style={stylescat.mainview}>
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
        <Text style={{ fontSize: 20 }}>Category</Text>
        <TouchableOpacity
          style={{
            marginLeft: 130,
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
          data={category}
          horizontal={false}
          renderItem={__renderCategory}
          ListEmptyComponent={
            <Text style={{ color: "gray", fontSize: 16, fontWeight: "600" }}>
              No listing found !
            </Text>
          }
          refreshing={showLoading}
          onRefresh={() => getCategory()}
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
              placeholder={"Detail"}
              iconName={"list-circle-outline"}
              showIcon={true}
              onTextChange={setListDetail}
              value={listDetail}
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

export { Category };
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
