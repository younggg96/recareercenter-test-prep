import React from "react";
import { View } from "react-native";
// ui
import { Layout } from "@ui-kitten/components";

// redux
import { useDispatch } from "react-redux";
import { TopBar } from "../../../components/topBar/topBar";
import { Text } from "@ui-kitten/components";

export const examHistoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Exam history" navigation={navigation} hasBack={true} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text category="h3" appearance="hint">
          Exam History
        </Text>
      </View>
    </View>
  );
};
