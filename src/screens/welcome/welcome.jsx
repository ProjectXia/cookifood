import { useEffect } from "react";
import { View, Text, ImageBackground, Button } from "react-native";
import { BButton } from "../../components/bbutton";
import { styles } from "./welcomeStyle";
import { getUserLoggedInStatus } from "../../services/storageService";
import { firebase } from "../../services/firebaseConfig";

function Welcome({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      getUserLoggedInStatus()
        .then((response) => {
          if (response === "true") {
            navigation.navigate("Home");
          } else {
            navigation.navigate("Signin");
          }
        })
        .catch((error) => {
          ShowToast("error", error.message);
        });
    }, 3000);
  }, []);
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../../../assets/welcome.jpg")}
      >
        <View
          style={{
            flex: 0.8,
            justifyContent: "flex-end",
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.textHeading}>Cooking a</Text>
          <Text style={styles.textHeading}>Delicious Food</Text>
          <Text style={styles.textHeading}>Easily</Text>
          <Text style={styles.textDetail}>Discover more than 1200 food</Text>
          <Text style={styles.textDetail}>recipes in your hands and </Text>
          <Text style={styles.textDetail}>Cooking it easily</Text>
        </View>
        <View
          style={{
            justifyContent: "space-around",
            paddingHorizontal: 20,
            alignContent: "space-between",
            position: "absolute",
            bottom: 10,
            width: "100%",
          }}
        >
          <BButton
            // bgColor="#584153"
            borColor={"#584153"}
            title={"Get Started !"}
            onPressChange={() => {
              navigation.navigate("Signin");
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export { Welcome };
