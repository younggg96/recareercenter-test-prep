import React from "react";

import { Button, Icon, Text } from "@ui-kitten/components";
import { styles } from "../../styles/home/profileStyle";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { SettingsIcon } from "../../components/icons/icons";
import { ProgressBar } from "../../components/progressBar/progressBar";
import { SettingList } from "../../components/settingList/settingList";
import { ScrollView } from "react-native-gesture-handler";
import { profileSettings } from "../../components/settingList/settingConfig";

const diffTime = (startDate, endDate) => {
  var diff = new Date(endDate).getTime() - new Date(startDate).getTime();
  var days = Math.floor(diff / (24 * 3600 * 1000));
  return days;
};

export const ProfileScreen = ({ navigation }) => {
  const { userData } = useSelector((state) => state.userReducer);
  const settingOnPress = () => {
    navigation.navigate("SettingsScreen");
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.headerContainer}>
            <View>
              <Text category="h1">Hi! {userData.displayName}</Text>
            </View>
            <View>
              <Button
                appearance="outline"
                size="medium"
                style={styles.settings}
                accessoryRight={SettingsIcon}
                onPress={settingOnPress}
              >
                Settings
              </Button>
            </View>
          </View>
          <View style={styles.subHeaderContainer}>
            <View style={styles.card}>
              <View>
                <Icon style={styles.icon} name="calendar" fill="#000" />
              </View>
              <View style={styles.text}>
                <Text category="s1">
                  Exam Day :{" "}
                  {userData.examStartDate ? new Date(userData.examStartDate).toISOString().substring(0, 10) : " - "}
                </Text>
                {(userData.examStartDate && userData.practiceStartDate) && <Text category="s1">'You have ' + diffTime(userData.practiceStartDate, userData.examStartDate) + ' days left ' </Text>}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.prograssBar}>
            <Text category="h6" style={styles.prograssTitle}>
              {" "}
              Today's Practice
            </Text>
            <ProgressBar
              finished={userData.dailyPractice}
              target={userData.targetPractice}
            />
          </View>
          <View style={styles.totalStats}>
            <Text category="h6" style={styles.prograssTitle}>
              {" "}
              Total Records
            </Text>
            <View style={styles.total}>
              <View style={styles.card}>
                <View>
                  <Icon name="clock-outline" fill="#000" style={styles.icon} />
                </View>
                <View style={styles.text}>
                  <Text category="label">Learning Days</Text>
                  <Text category="s1">
                    {userData.totalStudyDay}{" "}
                    Days
                  </Text>
                </View>
              </View>
              <View style={styles.card}>
                <View>
                  <Icon
                    name="checkmark-circle-outline"
                    fill="#000"
                    style={styles.icon}
                  />
                </View>
                <View style={styles.text}>
                  <Text category="label">Completed</Text>
                  <Text category="s1">{userData.totalPractice} Questions</Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <SettingList settings={profileSettings} navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
