import React, { useState } from "react";
import { Alert, Text, View, SafeAreaView, TextInput } from "react-native";

export default () => {
  const [input, setInput] = useState("");

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 300,
          paddingHorizontal: 40,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "orange",
            width: 150,
            margin: 20,
            margintop: 46,
            borderRadius: 6,
          }}
        ></View>
        <View
          style={{
            backgroundColor: "green",
            width: 150,
            margin: 20,
            borderRadius: 6,
          }}
        ></View>
      </View>
      <View
        style={{
          backgroundColor: "skyblue",
          width: 330,
          height: 200,
          margin: 20,
          borderRadius: 6,
        }}
      ></View>

      <TextInput
        style={{ width: 220, alignSelf: "center" }}
        placeholder="텍스트를 입력해주세요"
        value={input}
        onChange={(val) => {
          setInput(val);
        }}
      ></TextInput>
    </SafeAreaView>
  );
};
