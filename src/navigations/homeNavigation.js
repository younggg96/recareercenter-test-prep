import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons
import {
  ClipboardIcon,
  DicIcon,
  HomeIcon,
  PersonIcon,
} from "../components/icons/icons";
import { HomeScreen } from "../views/home/homeScreen";
import { ProfileScreen } from "../views/home/profileScreen";
import { ExamsScreen } from "../views/home/examsScreen";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { DictionaryScreen } from "../views/home/dictionaryScreen";

const BottomTab = createBottomTabNavigator();

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

export const HomeNavigation = () => (
  <BottomTab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <BottomTab.Screen name="Home" component={HomeScreen} />
    <BottomTab.Screen name="Exams" component={ExamsScreen} />
    <BottomTab.Screen name="Dictionary" component={DictionaryScreen} />
    <BottomTab.Screen name="Profile" component={ProfileScreen} />
  </BottomTab.Navigator>
);