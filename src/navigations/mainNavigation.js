import React from "react";
import { useEffect, useState } from "react";
import { homeStyles } from "../styles/home/homeStyle";


import { View, Image } from "react-native";
import { Modal, Text, Card, Button } from "@ui-kitten/components";

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
  
  return (
    <NavigationContainer ref={navigationRef}>
      {user.signIn ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
