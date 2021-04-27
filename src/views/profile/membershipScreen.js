import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { TopBar } from '../../components/topBar/topBar';

export const MembershipScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Membership" navigation={navigation} />
      <View>
        <Text category='s1'>membershipScreen</Text>
      </View>
    </View>
  );
};