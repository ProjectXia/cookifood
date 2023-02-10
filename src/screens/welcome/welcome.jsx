import { View, Text, ImageBackground, Button } from "react-native";
import { BButton } from "../../components/bbutton";
import { styles } from "./welcomeStyle";

function Welcome({ navigation }) {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <ImageBackground
        style={{ width: "100%", height: "95%" }}
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
            bgColor="#584153"
            borColor={"lightgreen"}
            title={"SIGN IN"}
            onPressChange={() => {
              navigation.navigate("Signin");
            }}
          />
          <BButton
            bgColor="#1A120B"
            borColor={"lightgreen"}
            title={"SIGN UP"}
            onPressChange={() => {
              navigation.navigate("Signup");
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export { Welcome };
