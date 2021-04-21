import React from "react";
// redux
import { useSelector } from "react-redux";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { HomeNavigation } from "./homeNavigation";
import { AuthNavigation } from "./authNavigation";

export const AppNavigator = () => {
  const user = useSelector((state) => state.userReducer);
  console.log(user);

  return (
    <NavigationContainer>
      {user.userData.signIn ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
