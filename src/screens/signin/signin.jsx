import { useState, useEffect } from "react";
import { View, Image, ToastAndroid } from "react-native";
import { ShowToast, showLoadingLottie } from "../../utils/help";
import { firebase } from "../../services/firebaseConfig";
import { InputBox } from "../../components/input";
import { TextButton } from "../../components/textbutton";
import { BButton } from "../../components/bbutton";
import { HeaderLogin } from "../../components/headinglogin";
import { Ionicons } from "@expo/vector-icons";
import { stylesignin } from "./signinStyle";
import LottieView from "lottie-react-native";
import {
  getUserId,
  storeUserSession,
  getUserLoggedInStatus,
} from "../../services/storageService";
// import LottieView from "lottie-react-native";

function SignIN({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [uuidd, setUUidd] = useState("");
  const [uname, setUname] = useState("");

  const handleShowPass = () => {
    if (showPass === true) {
      setShowPass(false);
    } else if (showPass === false) {
      setShowPass(true);
    }
  };
  const getCurrentProfile = (uuid) => {};
  const onSignin = () => {
    setShowLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((authResponse) => {
        firebase
          .firestore()
          .collection("profiles")
          .where("uuid", "==", authResponse.user.uid)
          .get()
          .then((response) => {
            // setUserName(response.docs.data());
            response.forEach((doc) => {
              setUUidd(doc.data().uuid);
              setUname(doc.data().fullname);
              console.log(
                "UUID: " +
                  doc.data().uuid +
                  "  ------- Name: " +
                  doc.data().fullname
              );
              storeUserSession(
                String(doc.data().uuid),
                "true",
                email,
                String(doc.data().fullname)
              );
              navigation.replace("Home");
              // }
            });
          })
          .catch((error) => {
            console.log({ error });
          });

        setShowLoading(false);

        ToastAndroid.showWithGravity(
          "you are the authentic user",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
        //  now we need a session of user and also take him to goToHome()
      })
      .catch((authError) => {
        setShowLoading(false);
        ToastAndroid.showWithGravity(
          authError.message,
          ToastAndroid.LONG,
          ToastAndroid.TOP
        );
        ShowToast("error", authError.message, "top");
      });
  };

  useEffect(() => {
    const loggedIn = getUserLoggedInStatus();
    const UID = getUserId();
  }, [uuidd, uname]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#DFE8CC",
      }}
    >
      <View style={stylesignin.formCon}>
        <HeaderLogin title={"Login"} />

        {/* <Image
          source={
            showPassword
              ? require("../../../assets/maria.jpg")
              : require("../../../assets/person.png")
          }
          style={{
            alignSelf: "center",
            borderRadius: 100,
            width: 150,
            height: 150,
            marginBottom: 20,
            borderColor: "white",
            borderWidth: 5,
          }}
          onPress={() => {
            // alert("camera click");
            // ShowToast("success", "you are the authentic useer CONGO", "top");
          }}
        /> */}
        <InputBox
          placeholder={"Email"}
          iconName={"mail-outline"}
          showIcon={true}
          onTextChange={setEmail}
          keyboard={"email"}
        />

        <InputBox
          placeholder={"Password"}
          isSecure={!showPass}
          iconName={showPass === false ? "eye-outline" : "eye-off-outline"}
          showIcon={true}
          iconPress={handleShowPass}
          onTextChange={setPassword}
          keyboard={"password"}
        />

        <View style={stylesignin.textbtnCon}>
          {/* <TextButton
            title="Forgot your password?"
            onPressChange={() => {
              navigation.navigate("forgot");
            }}
          /> */}
        </View>
        <BButton
          bgColor="#584153"
          title={"Sign IN"}
          cwidth={"100%"}
          borColor={"lightgreen"}
          onPressChange={() => {
            onSignin();
          }}
        />
        {/* <BButton
          // bgColor="#1A120B"
          borColor={"green"}
          title={"SIGN UP"}
          onPressChange={() => {
            navigation.navigate("Signup");
          }}
        /> */}
        <View style={stylesignin.gotoSignupStyle}>
          <TextButton
            title="Don't have an account?"
            onPressChange={() => {
              navigation.navigate("Signup");
            }}
          />
        </View>
      </View>
      {showLoading && (
        <LottieView
          source={require("../../../assets/animations/recipes-book.json")}
          autoPlay
          loop
        />
      )}
    </View>
  );
}

export { SignIN };
