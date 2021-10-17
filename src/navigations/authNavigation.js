import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

// auth screens
import SignIn from "../views/userAuth/signIn";
import SignUp from "../views/userAuth/signUp";
import ForgetPassword from "../views/userAuth/forgetPassword";
import Landing from "../views/userAuth/landing";
import TermsPage from '../views/userAuth/termsPage';

const Stack = createStackNavigator();

export const AuthNavigation = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Landing">
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name='ResetPassword' component={ForgetPassword} />
    <Stack.Screen name='TermsPage' component={TermsPage} />
  </Stack.Navigator>
);