import React from "react";

import { Button, Card, Icon, Text } from "@ui-kitten/components";
import { styles } from "../../styles/home/profileStyle";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { SettingsIcon } from "../../components/icons/icons";
import { ProgressBar } from '../../components/progressBar/progressBar'

const diffTime = (startDate,endDate) => {
  var diff = endDate.getTime() - startDate;
  var days = Math.floor(diff/(24*3600*1000));
  return days;
}


export const ProfileScreen = () => {
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <>
      <View style={styles.root}>
        <View style={styles.headerContainer}>
          <View>
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
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.prograssBar}>
          <Text category="h6" style={styles.prograssTitle}> Today's Practice</Text>
          <ProgressBar finished="50" target="200"/>
        </View>
        <View style={styles.totalStats}>
          <Text category="h6" style={styles.prograssTitle}> Total Records</Text>
          <View style={styles.total}>
            <View style={styles.card}>
              <View>
                <Icon name="clock-outline" fill='#000' style={styles.icon}/>
              </View>
              <View style={styles.text}>
                <Text category='label'>Learning Days</Text>
                <Text category='s1'>6 Days</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View>
                <Icon name="checkmark-circle-outline" fill='#000' style={styles.icon}/>
              </View>
              <View style={styles.text}>
                <Text category='label'>Completed</Text>
                <Text category='s1'>195 Questions</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};