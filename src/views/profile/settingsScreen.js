import React from "react";
// ui
import { View } from "react-native";
import { Button, Divider, Text } from "@ui-kitten/components";

import { styles } from "../../styles/home/settingsStyle";
// top bar
import { TopBar } from "../../components/topBar/topBar";
// components
import { SettingList } from "../../components/settingList/settingList";
import { settings } from "../../components/settingList/settingConfig";

// redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userAction";

export const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  const logoutAccount = () => {
    dispatch(logout());
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar navigation={navigation} title="Settings" hasBack={true} />
      <View style={styles.settingsContent}>
        <Text category="s1" style={styles.accountTitle}>
          Account Info
        </Text>
        <View style={styles.email}>
          <Text category="s1">Email: {userData.email}</Text>
          <Button onPress={logoutAccount} style={styles.logOutBtn}>
            Log Out
          </Button>
        </View>
        <SettingList settings={settings} navigation={navigation} />
      </View>
    </View>
  );
};
