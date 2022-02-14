import React from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
// ui
import { Divider, List, ListItem, Text } from '@ui-kitten/components';
import { TopBar } from '../../../components/topBar/topBar';

// redux
import { useSelector } from 'react-redux';
import { getUserClockInList } from '../../../helper/api';

export const AttendanceListScreen = ({ navigation }) => {
  const { userData } = useSelector((state) => state.userReducer);
  const [attendanceRecord, setAttendanceRecord] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
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
      style={{paddingVertical: 16, paddingRight: 20}}
      title={`${index + 1}. Date: ${item.date}`}
      accessoryRight={() => (
        <Text category="s2">
          Chapter {item.chapter}
        </Text>
      )}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Attendance Record" navigation={navigation} hasBack={true} />
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