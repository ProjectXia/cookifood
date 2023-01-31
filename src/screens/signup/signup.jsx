import React from "react";
import { useState } from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { ShowToast } from "../../utils/help";
// import { firebase } from "../../services/firebaseConfig";
import { InputBox } from "../../components/input";
import { TextButton } from "../../components/textbutton";
import { BButton } from "../../components/bbutton";
import { Ionicons } from "@expo/vector-icons";
// import { HeaderLogin } from "../../components/headerlogin";
// import LottieView from "lottie-react-native";

function SignUP({ navigation }) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [textPass, setTextPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleShowPass = () => {
    if (showPass === true) {
      setShowPass(false);
    } else if (showPass === false) {
      setShowPass(true);
    }
  };

  const handleConfirmPass = () => {
    console.log(confirmPass + email);
    if (confirmPass !== textPass) {
      alert("Password and Confirm Password does not match.");
    }
  };

  //   const onSignupPress = () => {
  //     //create a user account in firebase auth then upload image
  //     setShowLoading(true);
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, textPass)
  //       .then((authResponse) => {
  //         navigation.goBack();
  //         if (authResponse.user.uid) {
  //           const uid = authResponse.user.uid;
  //           // uploadImage(uid)
  //           //UPLOAD AN IMAGE PROCESS
  //           ShowToast("success", "Sign up Successfully", "top");
  //         }
  //       })
  //       .catch((authError) => {
  //         setShowLoading(false);
  //         ShowToast("error", authError.message, "top");
  //       });
  //   };

  return (
    <View style={{ flex: 1, backgroundColor: "#DFE8CC" }}>
      <View style={styles.formCon}>
        <View style={{ alignSelf: "flex-start" }}>
          {/* <HeaderLogin title={"Sign Up"} /> */}
        </View>

        <Ionicons
          name="person-circle"
          size={150}
          color={"white"}
          style={{
            alignSelf: "center",
          }}
          onPress={() => {
            // alert("camera click");
          }}
        />
        <InputBox
          placeholder={"Name"}
          iconName={"person-outline"}
          showIcon={true}
        />
        <InputBox
          placeholder={"Email"}
          iconName={"mail-outline"}
          showIcon={true}
          onTextChange={setEmail}
          value={email}
        />
        <InputBox
          placeholder={"Password"}
          isSecure={!showPass}
          iconName={showPass === false ? "eye-outline" : "eye-off-outline"}
          showIcon={true}
          iconPress={handleShowPass}
          onTextChange={setTextPass}
        />
        <InputBox
          placeholder={"Confirm Password"}
          isSecure={!showPass}
          iconName={showPass === false ? "eye-outline" : "eye-off-outline"}
          showIcon={true}
          iconPress={handleShowPass}
          onTextChange={setConfirmPass}
          onBlur={handleConfirmPass}
        />
        <View style={styles.textbtnCon}>
          <TextButton
            title="Already have an account?"
            onPressChange={() => {
              navigation.navigate("Signin");
            }}
          />
        </View>

        <BButton
          title="Sign UP"
          cwidth={"95%"}
          bgColor="#584153"
          borColor={"lightgreen"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textbtnCon: {
    alignItems: "flex-end",
    marginVertical: 15,
  },
});

export { SignUP };
