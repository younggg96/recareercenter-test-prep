import React from "react";

import { Button, Card, Icon, Layout, Text } from "@ui-kitten/components";
import { styles } from "../../styles/home/profileStyle";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import { SettingsIcon } from "../../components/icons/icons";
import { ScrollView } from "react-native-gesture-handler";

const diffTime = (startDate,endDate) => {
  var diff = endDate.getTime() - startDate;
  var days = Math.floor(diff/(24*3600*1000));
  return days;
}


export const ProfileScreen = () => {
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <>
      <SafeAreaView style={styles.root}>
        <View style={styles.headerContainer}>
          <View style={styles.title}>
            <Text category="h1">Hi! {userData.user}</Text>
          </View>
          <View>
            <Button appearance="outline" size="medium" style={styles.settings} accessoryRight={SettingsIcon}>Settings</Button>
          </View>
        </View>
        <View style={styles.subHeaderContainer}>
          <View style={styles.card}>
            <View>
              <Icon style={styles.icon} name="calendar" fill='#000' />
            </View>
            <View style={styles.text}>
              <Text category="s1">Exam Day: {userData.examTargetDate.toString().substring(0, 10)}</Text>
              <Text category="s1">You have {diffTime(new Date(), userData.examTargetDate).toString().substring(0, 10)} days left</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.contentContainer}>
        <Text>aaaa</Text>
      </View>
    </>
  );
};

// new Date() - userData.examTargetDate