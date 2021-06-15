import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TopBar } from "../../../components/topBar/topBar";

const DATA = [
  {
    date: "03-20-2020",
    exams: [
      {
        id: 1,
        using_time: 30,
        score: 90,
      },
      {
        id: 1,
        using_time: 40,
        score: 70,
      },
    ],
  },
  {
    date: "03-20-2020",
    exams: [
      {
        id: 1,
        using_time: 30,
        score: 90,
      },
    ],
  },
];

export const ExamHistoryScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Exam History" hasBack={true} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View></View>
      </ScrollView>
    </View>
  );
};
