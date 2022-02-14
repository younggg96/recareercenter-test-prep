import {
  Button,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";

import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { BackIcon } from "../icons/icons";
import { shadow } from "../../styles/shared/sharedStyle";
import { getExamData } from "../../helper/api";
import { useDispatch, useSelector } from "react-redux";
import { getExams } from "../../redux/actions/questionAction";

export const styles = StyleSheet.create({
  topBar: {
    paddingTop: Constants.statusBarHeight + 16,
    paddingBottom: 18,
    marginBottom: 8,
    ...shadow,
  },
  topTitle: {
    fontSize: 18,
    paddingHorizontal: 16,
  },
});

export const TopBar = (props) => {
  const { navigation, title, hasBack, type, hasRight = false, right = null } = props;
  const { userData } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigateBack = () => {
    if (type == "exam_review") {
      getExamData(userData.uid).then((res) => {
        dispatch(getExams(res.reverse()));
      })
    }
    navigation.goBack();
  };

  const BackAction = () => (
    <Button appearance='ghost' accessoryLeft={BackIcon} onPress={navigateBack} size="small" />
  );

  return (
    <TopNavigation
      title={() => (
        <Text category="s1" style={styles.topTitle} numberOfLines={2}>
          {title}
        </Text>
      )}
      accessoryLeft={hasBack && BackAction}
      accessoryRight={hasRight && right }
      style={styles.topBar}
    />
  );
};
