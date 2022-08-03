import React from "react";
// redux
import { useSelector } from "react-redux";

// navigation
import { NavigationContainer } from "@react-navigation/native";

import { AuthNavigation } from "./authNavigation";
import { HomeNavigation } from "./homeNavigation";
import { navigationRef } from "./RootNavigation";
import { StatusBar } from "expo-status-bar";

export const AppNavigator = () => {
  const user = useSelector((state) => state.userReducer);
  
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar animated={true} />
      {user.signIn ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
