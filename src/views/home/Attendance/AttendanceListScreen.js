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

export const AttendanceListScreen = ({ navigation }) => {
  const { userData } = useSelector((state) => state.userReducer);
  const [attendanceRecord, setAttendanceRecord] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const shareRecord = (body) => {
    let str = "";
    console.log(body[0]);
    for (let index = 0; index < body.length; index++) {
      str += `${index + 1}. Chapter: ${body[index].chapter}, Study hours: ${body[index].hour}, ${body[index].date} checked.\n`
    }
    return Linking.openURL(`mailto:info@recareercenter.com?subject=Attendance Record&&body=${str}`);
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