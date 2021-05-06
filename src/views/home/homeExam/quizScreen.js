import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { TopBar } from "../../../components/topBar/topBar";

export const QuizScreen = ({ navigation }) => (
  <Layout style={{ flex: 1 }}>
    <TopBar title="Question 1" navigation={navigation} />
    <View></View>
  </Layout>
);
