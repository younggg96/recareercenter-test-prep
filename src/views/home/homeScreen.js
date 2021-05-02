import React from 'react';
import { View } from 'react-native';
// ui
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
// import { ThemeContext } from '../../styles/themeContext';

// redux
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userAction';
import Constants from "expo-constants";
import { TopBar } from '../../components/topBar/topBar';

export const HomeScreen = ({ navigation }) => {
  // const themeContext = React.useContext(ThemeContext);
  const dispatch = useDispatch();

  const navigateDetails = () => {
    // navigation.navigate('Details');
  };

  const signOut = () => {
    dispatch(logout());
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Study Plan" navigation={navigation} />
      {/* <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
        {/* <Button onPress={navigateDetails}>OPEN DETAILS</Button> */}
        {/* <Button onPress={signOut}>sign out</Button> */} 
        {/* <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>Change theme</Button> */}
      {/* </Layout> */}
    </View>
  );
};