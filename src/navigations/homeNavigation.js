import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// icons
import { ClipboardIcon, HomeIcon, SettingsIcon } from '../components/icons/icons';
import { HomeScreen } from '../views/home/homeScreen';

const BottomTab = createBottomTabNavigator();

export const HomeNavigation = () => (
  // <BottomTab.Navigator tabBar={props => <HomeTabBar {...props} />}>
  <BottomTab.Navigator>
    <BottomTab.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Home', tabBarIcon: HomeIcon }}
    />
    {/* <BottomTab.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Exams', tabBarIcon: ClipboardIcon }}
    />
    <BottomTab.Screen
      name="Setting"
      component={HomeScreen}
      options={{ title: 'Setting', tabBarIcon: SettingsIcon }}
    /> */}
  </BottomTab.Navigator>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={HomeScreen} />
    <Screen name='Orders' component={OrdersScreen} />
  </Navigator>
);

export const HomeNavigation = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='USERS' />
    <BottomNavigationTab title='ORDERS' />
  </BottomNavigation>
);