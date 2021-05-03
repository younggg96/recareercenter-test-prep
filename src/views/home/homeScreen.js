import React from 'react';
import { View } from 'react-native';
// ui
import { Button, Divider, Input, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { styles } from '../../components/topBar/topBar';
// icon
import { SearchIcon } from '../../components/icons/icons';
// redux
import { useDispatch } from 'react-redux';
import { homeStyles } from '../../styles/home/homeStyle';
import { ScrollView } from 'react-native-gesture-handler';

export const HomeScreen = ({ navigation }) => {
  // const themeContext = React.useContext(ThemeContext);
  const dispatch = useDispatch();

  const navigateTo = () => {
    // navigation.navigate('Details');
  };

  return (
    <View style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text category="s1" style={styles.topTitle}>Home</Text>}
        accessoryRight={(props) => <Input {...props} placeholder={'Search...'} style={{ borderRadius: 25, width: "80%" }} accessoryLeft={SearchIcon} />}
        style={styles.topBar} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={homeStyles.content}>
          <Text category="s2" appearance='hint' style={homeStyles.time}>Estimated time 10 mins</Text>
          <Button style={homeStyles.button} onPress={navigateTo}>
            Let's Quick Exam
          </Button>
        </View>
      </ScrollView>

    </View>
  );
};