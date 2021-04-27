import React from 'react';
import { View } from 'react-native';
import { Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { BackIcon } from '../../components/icons/icons';
import { styles } from '../../styles/home/settingsStyle';

export const SettingsScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <View style={{ flex: 1 }}>
      <TopNavigation title={() => <Text category="s1" style={styles.topTitle}>Settings</Text>} accessoryLeft={BackAction} style={styles.topBar} />
      <View style={styles.settingsContent}>
        <Text category='s1'>Account Info</Text>
      </View>
    </View>
  );
};