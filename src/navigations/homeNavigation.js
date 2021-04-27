import React from "react";

// navi
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";

// icons
import {
  ClipboardIcon,
  DicIcon,
  HomeIcon,
  PersonIcon,
} from "../components/icons/icons";

// screens
import { HomeScreen } from "../views/home/homeScreen";
import { ProfileScreen } from "../views/home/profileScreen";
import { ExamsScreen } from "../views/home/examsScreen";
import { DictionaryScreen } from "../views/home/dictionaryScreen";
import { SettingsScreen } from "../views/profile/settingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileNavigation = () => (
  <Stack.Navigator headerMode="none" initialRouteName="ProfileScreen">
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
  </Stack.Navigator>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" icon={HomeIcon} />
    <BottomNavigationTab title="Exams" icon={ClipboardIcon} />
    <BottomNavigationTab title="Dictionary" icon={DicIcon} />
    <BottomNavigationTab title="Profile" icon={PersonIcon} />
  </BottomNavigation>
);

export const HomeNavigation = () => {
  return(
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Exams" component={ExamsScreen} />
      <Tab.Screen name="Dictionary" component={DictionaryScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};


