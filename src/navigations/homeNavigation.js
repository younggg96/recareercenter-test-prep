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
import { StudyPlanScreen } from "../views/profile/studyPlanScreen";
import { ReviewsScreen } from "../views/profile/reviewsScreen";
import { AboutUsScreen } from "../views/profile/aboutUsScreen";
import { NotificationScreen } from "../views/profile/notificationScreen";
import { ChangePasswordScreen } from "../views/profile/changePasswordScreen";
import { MembershipScreen } from "../views/profile/membershipScreen";
import { QuizScreen } from "../views/home/homeExam/quizScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileNavigation = () => (
  <Stack.Navigator headerMode="none" initialRouteName="ProfileScreen">
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
    <Stack.Screen
      name="ChangePasswordScreen"
      component={ChangePasswordScreen}
    />
    <Stack.Screen name="MembershipScreen" component={MembershipScreen} />
    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    <Stack.Screen name="ReviewsScreen" component={ReviewsScreen} />
    <Stack.Screen name="StudyPlanScreen" component={StudyPlanScreen} />
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
  </Stack.Navigator>
);
const HomeScreenNavigation = () => (
  <Stack.Navigator headerMode="none" initialRouteName="HomeScreen">
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="QuizScreen" component={QuizScreen} />
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
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreenNavigation} />
      <Tab.Screen name="Exams" component={ExamsScreen} />
      <Tab.Screen name="Dictionary" component={DictionaryScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};
