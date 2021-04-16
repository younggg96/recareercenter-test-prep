import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../views/homeScreen';
import { DetailsScreen } from '../views/detailScreen';
import { useSelector } from 'react-redux';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='Home' component={HomeScreen} />
    <Screen name='Details' component={DetailsScreen} />
  </Navigator>
);

const AuthNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='Home' component={HomeScreen} />
    <Screen name='Details' component={DetailsScreen} />
  </Navigator>
);


export const AppNavigator = () => {
  const {user, signIn} = useSelector((state) => state.userReducer);
  // console.log(signIn)

  return (
    <NavigationContainer>
      {signIn ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
};