import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function InputBox({
  placeholder,
  onTextChange,
  iconName,
  showIcon,
  isSecure,
  iconPress,
  iconColor,
  onBlur,
  value,
  iconSize = 20,
  keyboard,
}) {
  return (
    <View style={styles.inputStyle}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onTextChange}
        secureTextEntry={isSecure}
        style={styles.input}
        onBlur={onBlur}
        value={value}
        keyboardType={keyboard}
      />
      {showIcon === true ? (
        <Ionicons
          style={styles.icon}
          name={iconName}
          size={iconSize}
          color={iconColor}
          onPress={iconPress}
        />
      ) : (
        <View />
      )}
    </View>
  );
}

export { InputBox };

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "#fff",
    marginHorizontal: 0,
    marginVertical: 5,
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  icon: {
    alignSelf: "center",
  },
  input: {
    width: "95%",
  },
});
