import React from 'react';
import { View } from 'react-native';
import { Button, Divider, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { BackIcon } from '../../components/icons/icons';
import { styles } from '../../styles/home/settingsStyle';
import { SettingList } from '../../components/settingList/settingList';
import { settings } from '../../components/settingList/settingConfig';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userAction';

export const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);
  const navigateBack = () => {
    navigation.goBack();
  };

  const logOut = () => {
    dispatch(logout());
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <View style={{ flex: 1 }}>
      <TopNavigation title={() => <Text category="s1" style={styles.topTitle}>Settings</Text>} accessoryLeft={BackAction} style={styles.topBar} />
      <View style={styles.settingsContent}>
        <Text category='s1' style={styles.accountTitle}>Account Info</Text>
        <Divider />
        <View style={styles.email}>
          <Text category='s1'>Email: {userData.email}</Text>
          <Button onPress={logOut} style={styles.logOutBtn}>Log Out</Button>
        </View>
        <SettingList settings={settings} />
      </View>
    </View>
  );
};