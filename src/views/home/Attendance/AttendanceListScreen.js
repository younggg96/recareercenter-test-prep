import React from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, Linking, View } from 'react-native';
// ui
import { Button, Divider, List, ListItem, Text } from '@ui-kitten/components';
import { TopBar } from '../../../components/topBar/topBar';

// redux
import { useSelector } from 'react-redux';
import { getUserClockInList } from '../../../helper/api';
import { ShareIcon } from '../../../components/icons/icons';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const AttendanceListScreen = ({ navigation }) => {
  const { userData } = useSelector((state) => state.userReducer);
  const [attendanceRecord, setAttendanceRecord] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const shareRecord = async (body) => {
    console.log(body);
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    alert(file.filePath);
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
          <Text category="s2">
            Study hours: <Text category="s1">{item.hour}</Text>
          </Text>
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