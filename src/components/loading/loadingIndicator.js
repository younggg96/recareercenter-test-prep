import React from "react";
import { Spinner } from "@ui-kitten/components";
import { View } from "react-native";
import { styles } from "../../styles/userAuth/landingStyle";

export const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner status='basic' size='small' />
  </View>
);

export const LoadingRedIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner status='basic' size='small' status='danger' />
  </View>
);