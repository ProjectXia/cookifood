import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { stylesprofile } from "./profileStyle";
import { Ionicons } from "@expo/vector-icons";
import { InputBox } from "../../components/input";
import { Button } from "react-native-paper";
import { firebase } from "../../services/firebaseConfig";
import { Storage } from "expo-storage";

function Profile({ navigation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [profileId, setProfileId] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const getCurrentProfile = async () => {
    let uid = await Storage.getItem({ key: "user_uid" });
    firebase
      .firestore()
      .collection("profiles")
      .where("uuid", "==", uid)
      .get()
      .then((response) => {
        // setUserName(response.docs.data());
        response.forEach((doc) => {
          setName(doc.data().fullname);
          setAddress(doc.data().address);
          setProfileId(doc.id);
        });
        setShowLoading(false);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const updateProfile = () => {
    console.log(
      "username: " + name + " -------- " + address + " --- " + profileId
    );
    setShowLoading(true);
    firebase
      .firestore()
      .collection("profiles")
      .doc(profileId)
      .update({ fullname: name, address: address })
      .then((response) => {
        getCurrentProfile();
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const changePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            console.log("Password updated!");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <View style={stylesprofile.mainview}>
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
          position: "absolute",
          top: 15,
        }}
      >
        <Ionicons name="person-circle-outline" color={"gray"} size={38} />
        <Text style={{ fontSize: 20 }}>My Profile</Text>
      </View>
      <Text>Bio (Name and Address)</Text>
      <InputBox value={name} onTextChange={setName} placeholder={"Full Name"} />
      <InputBox
        value={address}
        onTextChange={setAddress}
        placeholder={"Address"}
      />
      <Text>change password (must have 6 to 8 digits)</Text>
      <InputBox
        placeholder={"current password"}
        value={currentPass}
        onTextChange={setCurrentPass}
      />
      <InputBox
        placeholder={"new password"}
        value={newPass}
        onTextChange={setNewPass}
      />
      <View style={{ width: "95%", marginVertical: 30 }}>
        <Button
          mode="elevated"
          labelStyle={{ color: "green", fontSize: 16 }}
          style={{ paddingHorizontal: 20, paddingVertical: 6 }}
          onPress={() => {
            console.log("profile Id: " + profileId);
            if (
              currentPass == "" ||
              newPass == "" ||
              currentPass.length < 6 ||
              newPass.length < 6
            ) {
              alert("c or n empty");
            }
            if (name == "" || name.length > 2) {
              alert("Full name is empty");
            } else {
              updateProfile();
            }
          }}
          loading={showLoading}
        >
          Update
        </Button>
      </View>
    </View>
  );
}

export { Profile };
