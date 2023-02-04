import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { ITEM_WIDTH } from "./utill";
import { AntDesign } from "@expo/vector-icons";

export default ({
  value,
  onChangeText,
  placeholder,
  onPressPlus,
  onSubmitEditing,
  onFocus,
}) => {
  return (
    <View
      style={{
        width: ITEM_WIDTH,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{ flex: 1, padding: 5, color: "#595959" }}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        onFocus={onFocus}
      ></TextInput>
      <TouchableOpacity style={{ padding: 5 }} onPress={onPressPlus}>
        <AntDesign name="plus" size={18} color="#595959"></AntDesign>
      </TouchableOpacity>
    </View>
  );
};
