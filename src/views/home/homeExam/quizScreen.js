import { Layout, Text } from "@ui-kitten/components";
import React from "react";

export const QuizScreen = ({ navigation }) => (
  <Layout style={{ flex: 1 }}>
    <TopBar title="Question 1" navigation={navigation} />
  </Layout>
);
