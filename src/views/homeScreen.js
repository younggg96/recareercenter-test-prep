import React from 'react';
import { View } from 'react-native';
// ui
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { ThemeContext } from '../styles/themeContext';

// redux
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userAction';

export const HomeScreen = ({ navigation }) => {

  return (
    <View style={{ flex: 1 }}>
    </View>
  );
};