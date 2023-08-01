import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function HeaderLogin({ title }) {
  return (
    <View>
      {/* <Ionicons name="chevron-back" size={28} style={{ marginVertical: 10 }} /> */}
      <Text
        style={{
          marginHorizontal: 7,
          fontWeight: "bold",
          fontFamily: "sans-serif",
          marginVertical: 5,
          fontSize: 32,
          marginBottom: 50,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export { HeaderLogin };
