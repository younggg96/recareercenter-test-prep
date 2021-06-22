import React from "react";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "../../components/topBar/topBar";

export const MembershipScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Membership" navigation={navigation} hasBack={true} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text category="h3" appearance="hint">
          Wait, Coming soon...
        </Text>
        <Text category="h5" appearance="hint">
          {userData.membership ? "You have membership" : "You Don't have membership"}
        </Text>
      </View>
    </View>
  );
};
