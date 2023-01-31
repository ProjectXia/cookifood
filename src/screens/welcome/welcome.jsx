import { View, Text, ImageBackground, Button } from "react-native";
import { BButton } from "../../components/bbutton";
import { styles } from "./welcomeStyle";

function Welcome({ navigation }) {
  return (
    <View>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../../../assets/welcome.jpg")}
      >
        <View
          style={{
            flex: 0.7,
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
            flex: 0.2,
            justifyContent: "space-around",
            paddingHorizontal: 20,
            alignContent: "space-between",
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
