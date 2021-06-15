import React from "react";
// redux
import { useSelector } from "react-redux";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthNavigation } from "./authNavigation";
import { HomeNavigation } from "./homeNavigation";
import { navigationRef } from "./RootNavigation";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const user = useSelector((state) => state.userReducer);
  // console.log(user);
  // console.log(JSON.stringify(HomeNavigation));

  return (
    <NavigationContainer ref={navigationRef}>
      {user.signIn ? <HomeNavigation /> : <AuthNavigation />}
       {/* <AuthNavigation /> */}
      {/* <HomeNavigation /> */}
    </NavigationContainer>
  );
};
