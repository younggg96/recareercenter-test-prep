import React from "react";
// ui
import { View } from "react-native";
import {
  Button,
  Input,
  Layout,
  Text,
  TopNavigation,
} from "@ui-kitten/components";

import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "../../../components/topBar/topBar";

export const PracticeScreen = ({ route, navigation }) => {
  const { userData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { practice } = route.params;

  console.log(practice)

  return (
    <View style={{ flex: 1 }}>
      <TopBar title={practice} navigation={navigation} />
    </View>
  );
};
