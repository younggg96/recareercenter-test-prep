import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { TopBar } from '../../components/topBar/topBar';
import { styles } from '../../styles/home/studyPlanStyle';

export const StudyPlanScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Study Plan" navigation={navigation} />
      <View style={styles.content}>
        <Text category='s1' style={styles.title}>Your exam date:</Text>
        <Text category="s1" style={styles.title}> {userData.examTargetDate.toString().substring(0, 10)}</Text>
      </View>
    </View>
  );
}; 