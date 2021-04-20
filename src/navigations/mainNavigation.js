import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../views/homeScreen";
import { DetailsScreen } from "../views/detailScreen";
import { useSelector } from "react-redux";
import signIn from "../views/userAuth/signIn";
import signUp from "../views/userAuth/signUp";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Details" component={DetailsScreen} />
  </Navigator>
);

const AuthNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="SignIn" component={signIn} />
    <Screen name="SignUp" component={signUp} />
  </Navigator>
);

export const AppNavigator = () => {
  const user = useSelector((state) => state.userReducer);
  console.log(user);

  return (
    <NavigationContainer>
      {user.userData.signIn ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
