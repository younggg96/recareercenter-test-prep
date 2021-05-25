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
import { SettingsScreen } from "../views/profile/settingsScreen";
import { StudyPlanScreen } from "../views/profile/studyPlanScreen";
import { ReviewsScreen } from "../views/profile/reviewsScreen";
import { AboutUsScreen } from "../views/profile/aboutUsScreen";
import { NotificationScreen } from "../views/profile/notificationScreen";
import { ChangePasswordScreen } from "../views/profile/changePasswordScreen";
import { MembershipScreen } from "../views/profile/membershipScreen";
import { QuizScreen } from "../views/home/homeExam/quizScreen";
import { PracticeScreen } from "../views/home/homeExam/practiceScreen";
import { DictionaryScreen } from "../views/home/dictionary/dictionaryScreen";
import { SavedListScreen } from "../views/home/dictionary/savedListScreen";
import { AllCategroyScreen } from "../views/home/homeExam/allCategroyScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DictionaryNavigation = () => (
  <Stack.Navigator headerMode="none" initialRouteName="ProfileScreen">
    <Stack.Screen name="DictionaryScreen" component={DictionaryScreen} />
    <Stack.Screen name="SavedListScreen" component={SavedListScreen} />
  </Stack.Navigator>
);

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
    <Stack.Screen name="PracticeScreen" component={PracticeScreen} />
    <Stack.Screen name="StudyPlanScreen" component={StudyPlanScreen} />
    <Stack.Screen name="AllCategroyScreen" component={AllCategroyScreen} />
  </Stack.Navigator>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    style={{ paddingBottom: 16, paddingTop: 8 }}
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
      <Tab.Screen name="Dictionary" component={DictionaryNavigation} />
      <Tab.Screen name="Profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};
