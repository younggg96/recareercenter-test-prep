import React from "react";
// redux
import { useSelector } from "react-redux";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// home screens
import { HomeScreen } from "../views/homeScreen";
import { DetailsScreen } from "../views/detailScreen";

// auth screens
import SignIn from "../views/userAuth/signIn";
import SignUp from "../views/userAuth/signUp";
import ForgetPassword from "../views/userAuth/forgetPassword";
import Landing from "../views/userAuth/landing";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Details" component={DetailsScreen} />
  </Navigator>
);

const AuthNavigator = () => (
  <Navigator headerMode="none" initialRouteName="Landing">
    <Screen name="Landing" component={Landing} />
    <Screen name="SignIn" component={SignIn} />
    <Screen name="SignUp" component={SignUp} />
    <Screen name='ResetPassword' component={ForgetPassword} />
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
