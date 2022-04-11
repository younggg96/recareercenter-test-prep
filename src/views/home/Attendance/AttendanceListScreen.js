import React from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
// ui
import { Button, Divider, List, ListItem, Text } from '@ui-kitten/components';
import { TopBar } from '../../../components/topBar/topBar';

// redux
import { useSelector } from 'react-redux';
import { getUserClockInList } from '../../../helper/api';
import { ShareIcon } from '../../../components/icons/icons';

import Toast from "react-native-simple-toast";
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

export const AttendanceListScreen = ({ navigation }) => {
  const { userData } = useSelector((state) => state.userReducer);
  const [attendanceRecord, setAttendanceRecord] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const shareRecord = async (body) => {
    console.log(userData)
    let str = "";
    if (body) {
      for (let index = 0; index < body.length; index++) {
        str += `<p>${index + 1}. Chapter: ${body[index].chapter}, ${body[index].date} checked.</p>`
      }
      let options = {
        html: `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          </head>
          <body>
            <img
              src="https://www.recareercenter.com/wp-content/uploads/2018/08/logo-school.png"
              style="width: 90vw;" />
            <div style="text-align: center;">
              <h1 style="font-size: 40px; font-family: Helvetica Neue; font-weight: normal; font-weight: bold">
                Student Attendance
              </h1>
              <h3 style="font-size: 26px; font-family: Helvetica Neue; font-weight: normal; ">
                Student Name: ${userData.displayName}
              </h3>
              ${str}
            </div>
            <div style="padding: 16px; margin-top: 12px; text-align: left;">
              <h3>Note:</h3>
              <p>
              I certify that the information submitted in this Chapter Tracker is true and correct. I certify that I have completed each of the 21 chapters plus a test review class. I understand that by submitting this form electronically I am giving my implied signature. I further understand that any false statements made on this Chapter Tracker may result in expulsion, denial, or revocation of my course completion under the “Good Moral Character” Qualification guideline of The New Jersey Real Estate Commission, without refund.
              </p>
            </div>
          </body>
        </html>
        `,
        fileName: 'Student Attendance',
        directory: 'Documents',
      };
      const { uri } = await Print.printToFileAsync({
        html: options.html
      });
      await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
    } else {
      Toast.show("No records found");
    }
  }

  useEffect(() => {
    setLoading(true);
    getUserClockInList(userData.uid).then((data) => {
      setAttendanceRecord(data);
    }).finally(() => {
      setLoading(false);
    })
  }, [])

  const renderItem = ({ item, index }) => (
    <ListItem
      style={{ paddingVertical: 16, paddingRight: 20 }}
      title={`${index + 1}. Chapter ${item.chapter}`}
      disabled
      accessoryRight={() => (
        <View>
          {/* <Text category="s2">
            Study hours: <Text category="s1">{item.hour}</Text>
          </Text> */}
          <Text category="s2">
            Date: <Text category="s1">{item.date}</Text>
          </Text>
        </View>
      )}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Attendance Record" navigation={navigation} hasBack={true} hasRight={true} right={() => <Button appearance="ghost" accessoryRight={ShareIcon} onPress={() => shareRecord(attendanceRecord)}></Button>} />
      {!loading ?
        attendanceRecord.length ?
          <List
            data={attendanceRecord}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
          :
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text category="h3" appearance="hint">
              No Attendance History
            </Text>
          </View> :
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
          <Text category="s1" appearance="hint">
            Loading...
          </Text>
        </View>
      }
    </View>
  );
};