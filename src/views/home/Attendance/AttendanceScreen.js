import React from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, Image, View, Text } from 'react-native';
// ui
import { TopBar } from '../../../components/topBar/topBar';

// redux
import { useSelector } from 'react-redux';
import { homeStyles } from '../../../styles/home/homeStyle';
import { Button, Card, Datepicker, Divider, IndexPath, List, ListItem, Modal, NativeDateService, Select, SelectItem } from '@ui-kitten/components';
import { addClockIn, getCourseList } from '../../../helper/api';

import Toast from "react-native-simple-toast";
import { ScrollView } from 'react-native-gesture-handler';
import { additionalStudentsResources } from '../../../components/settingList/settingConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingList } from '../../../components/settingList/settingList';

// choose date cannot be over today
const filter = (date) => Date.parse(date.toLocaleDateString()) <= Date.parse(new Date().toLocaleDateString());
const formatDateService = new NativeDateService('en', { format: 'MM/DD/YYYY' });

const chapters = [
  { id: "-1", name: "Choose chapter..", value: "0" },
  { id: "0", name: "chapter 1", value: "1" },
  { id: "1", name: "chapter 2", value: "2" },
  { id: "2", name: "chapter 3", value: "3" },
  { id: "3", name: "chapter 4", value: "4" },
  { id: "4", name: "chapter 5", value: "5" },
  { id: "5", name: "chapter 6", value: "6" },
  { id: "6", name: "chapter 7", value: "7" },
  { id: "7", name: "chapter 8", value: "8" },
  { id: "8", name: "chapter 9", value: "9" },
  { id: "9", name: "chapter 10", value: "10" },
  { id: "10", name: "chapter 11", value: "11" },
  { id: "11", name: "chapter 12", value: "12" },
  { id: "12", name: "chapter 13", value: "13" },
  { id: "13", name: "chapter 14", value: "14" },
  { id: "14", name: "chapter 15", value: "15" },
  { id: "15", name: "chapter 16", value: "16" },
  { id: "16", name: "chapter 17", value: "17" },
  { id: "17", name: "chapter 18", value: "18" },
  { id: "18", name: "chapter 19", value: "19" },
  { id: "19", name: "chapter 20", value: "20" },
  { id: "20", name: "chapter 21", value: "21" },
  { id: "21", name: "chapter 22", value: "22" },
  { id: "22", name: "chapter 23", value: "23" },
  { id: "23", name: "chapter 24", value: "24" },
  { id: "24", name: "chapter 25", value: "25" },
]

const studyHours = ["Choose hours", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const data = [
  "Fill this tracker out COMPLETELY. You must have a date for each chapter.",
  "When you have completed ALL 21 Chapters plus a Test Review.  You may go to recareercenter.com/test – READ ALL INSTRUCTIONS - and register for your school exam.",
  "Upload your Chapter Tracker at registration.",
  "Tracker must be signed and only needs to be submitted when you register for exam.",
  "Please allow up to 3 business days for processing. We will verify the information on your tracker with our system records of your attendance."
]

export const AttendanceScreen = ({ navigation }) => {
  const { userData } = useSelector((state) => state.userReducer);
  const uid = userData.uid;

  const [trackerVisible, setTrackerVisible] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(false);

  // selectedIndex
  const [courseList, setCourseList] = React.useState([{ courseName: '', id: -1 }]);
  const [selectedIndex1, setSelectedIndex1] = React.useState(new IndexPath(0));
  const [selectedIndex2, setSelectedIndex2] = React.useState(new IndexPath(0));
  const [selectedIndex3, setSelectedIndex3] = React.useState(new IndexPath(0));
  const [attendanceDate, setAttendanceDate] = React.useState(new Date());

  // loading
  const [attendanceLoading, setAttendanceLoading] = React.useState(false);

  const submitAttendanceRecord = () => {
    if (selectedIndex1.row == 0 || selectedIndex2.row == 0) {
      setSubmitError(true);
    } else {
      addClockIn(uid, courseList[selectedIndex1.row].id, chapters[selectedIndex2.row].value, studyHours[selectedIndex3.row], attendanceDate.toISOString().slice(0, 10)).then((res) => {
        if (res) {
          Toast.show(
            res
          );
          closeAttendanceModal();
        }
      })
      setSubmitError(false);
    }
  }

  const openAttendanceModal = () => {
    setTrackerVisible(true);
    setAttendanceLoading(true);
    getCourseList().then((res) => {
      if (res) {
        setCourseList([{ courseName: "Choose your class", id: '0' }, ...res]);
      }
    }).finally(() => {
      setAttendanceLoading(false);
    })
  };

  const closeAttendanceModal = () => {
    setTrackerVisible(false);
    setSelectedIndex1(new IndexPath(0));
    setSelectedIndex2(new IndexPath(0));
    setAttendanceDate(new Date());
    setSubmitError(false);
  }

  const navigateToAttendanceList = () => {
    navigation.navigate("AttendanceListScreen");
  };


  const renderItem = ({ item, index }) => (
    <ListItem title={`${index + 1}. ${item}`} disabled />
  );

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Resources for CFREE Students" navigation={navigation} hasBack={true} hasRight={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={homeStyles.header}>
          <Text style={{ ...homeStyles.title, fontSize: 24, paddingHorizontal: 20, paddingTop: 12, color: '#888'}}>
            Student Chapter Tracker
          </Text>
        </View>
        <View style={homeStyles.content}>
          {/* <Image
            source={require("../../../../assets/img/attendance.png")}
            style={{ width: '100%', height: 200 }}
            resizeMode="contain"
          /> */}
          <Text style={{ ...homeStyles.title, paddingHorizontal: 14, fontWeight: '500', fontSize: 24 }}>
            INSTRUCTIONS
          </Text>
          <View style={{ marginBottom: 8 }}>
            <List data={data} renderItem={renderItem} />
          </View>
          <Button style={homeStyles.button} onPress={openAttendanceModal}>
            Submit record
          </Button>
          <Button appearance="ghost" style={{ ...homeStyles.button, marginTop: 8, marginBottom: 12 }} onPress={navigateToAttendanceList}>
            Review Attendance
          </Button>
          <Divider />
          <View style={{ padding: 6, marginVertical: 6 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Note
            </Text>
            <Text style={{ padding: 6 }}>
              {"    "}I certify that the information submitted in this Chapter Tracker is true and correct. I certify that I have completed each of the 21 chapters plus a test review class. I understand that by submitting this form electronically I am giving my implied signature. I further understand that any false statements made on this Chapter Tracker may result in expulsion, denial, or revocation of my course completion under the “Good Moral Character” Qualification guideline of The New Jersey Real Estate Commission, without refund.
            </Text>
          </View>
        </View>
        <View style={homeStyles.header}>
          <Text style={{ ...homeStyles.title, fontSize: 24, paddingHorizontal: 20, paddingTop: 12, color: '#888' }}>
            Additional Student Resources
          </Text>
        </View>
        <View style={homeStyles.content}>
          <Image
            source={require("../../../../assets/img/resource.png")}
            style={{ width: '100%', height: 200 }}
            resizeMode="contain"
          />
          <SettingList settings={additionalStudentsResources} navigation={navigation} padding={false} />
        </View>
      </ScrollView>
      <Modal
        style={homeStyles.modal}
        visible={trackerVisible}
        backdropStyle={homeStyles.backdrop}
        onBackdropPress={closeAttendanceModal}
      >
        <Card disabled={true} style={{ ...homeStyles.modalCard2 }}>
          {!attendanceLoading ?
            <>
              <Select
                style={homeStyles.modalSelect}
                label="Choose your class"
                placeholder='Choose your class'
                value={courseList[selectedIndex1.row].courseName}
                selectedIndex={selectedIndex1}
                onSelect={index => setSelectedIndex1(index)}>
                {courseList.map((course, index) => {
                  return <SelectItem title={course.courseName} key={course.id} />
                })}
              </Select>
              <Select
                style={homeStyles.modalSelect}
                label="Choose chapter"
                placeholder='Choose chapter..'
                value={chapters[selectedIndex2.row].name}
                selectedIndex={selectedIndex2}
                onSelect={index => setSelectedIndex2(index)}>
                {chapters.map((item, index) => {
                  return <SelectItem title={item.name} key={item.id} />
                })}
              </Select>
              {/* <Select
                style={homeStyles.modalSelect}
                label="Choose study hours"
                placeholder='Choose hours..'
                value={studyHours[selectedIndex3.row]}
                selectedIndex={selectedIndex3}
                onSelect={index => setSelectedIndex3(index)}>
                {studyHours.map((item, index) => {
                  return <SelectItem title={item} key={item} />
                })}
              </Select> */}
              <Datepicker
                style={homeStyles.modalSelect}
                label="Choose date"
                date={attendanceDate}
                onSelect={nextDate => setAttendanceDate(nextDate)}
                dateService={formatDateService}
                filter={filter}
              />
              {submitError && <Text category="s2" style={{ color: 'red' }}>Submit error, please check it</Text>}
              <Button
                style={homeStyles.modalSubmit}
                onPress={submitAttendanceRecord}
              >
                Submit
              </Button>
            </>
            :
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 260 }}>
              <ActivityIndicator style={{ marginBottom: 6 }} />
              <Text category="s1" appearance="hint">
                Loading...
              </Text>
            </View>
          }
        </Card>
      </Modal>
    </View>
  );
};