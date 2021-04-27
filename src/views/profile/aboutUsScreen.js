import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { TopBar } from '../../components/topBar/topBar';

export const AboutUsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="About Us" navigation={navigation} />
      <View>
        <Text category='s1'>aboutUsScreen</Text>
      </View>
    </View>
  );
};