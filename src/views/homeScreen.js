import React from 'react';
import { View } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { ThemeContext } from '../styles/themeContext';

export const HomeScreen = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <View style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center' />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateDetails}>OPEN DETAILS</Button>
        <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>Change theme</Button>
      </Layout>
    </View>
  );
};