import {
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";

import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { BackIcon } from "../icons/icons";
import { shadow } from "../../styles/shared/sharedStyle";

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
  const { navigation, title, hasBack } = props;
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <TopNavigation
      title={() => (
        <Text category="s1" style={styles.topTitle}>
          {title}
        </Text>
      )}
      accessoryLeft={hasBack ? BackAction : null}
      style={styles.topBar}
    />
  );
};
