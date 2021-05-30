import { Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { TopBar } from "../../components/topBar/topBar";

export const ExamsScreen = () => (
  <View style={{ flex: 1 }}>
    <TopBar title="Exams" hasBack={false}/>
    <Text category="h1">Exams</Text>
  </View>
);
