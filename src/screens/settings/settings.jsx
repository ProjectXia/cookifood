import React from "react";
import { View, Text } from "react-native";
import { stylessetting } from "./settingStyle";

function Settings() {
  return (
    <View style={stylessetting.mainview}>
      <Text>Settings</Text>
    </View>
  );
}

export { Settings };
