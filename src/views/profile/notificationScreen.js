import React from 'react';

// ui
import { View } from 'react-native';
import { Button, Text, Toggle } from '@ui-kitten/components';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { checkNotification, setNotificationTime } from '../../redux/actions/settingAction';

// component
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TopBar } from '../../components/topBar/topBar';

// style
import { styles } from '../../styles/home/settings/notificationStyle';

export const NotificationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.settingReducer);
  console.log(useSelector((state) => state.settingReducer))
  const { status, time } = notification;
  // const [checked, setChecked] = React.useState(status);
  const onCheckedChange = (isChecked) => {
    // console.log(isChecked)
    // setChecked(isChecked);
    dispatch(checkNotification(isChecked))
  };

  const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    hideTimePicker();
    dispatch(setNotificationTime(time.getHours(), time.getMinutes()))
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Notification" navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.title}>
          <View>
            <Text category="s1">
              Notification
            </Text>
          </View>
          <View>
            <Toggle checked={status} onChange={onCheckedChange}>
            </Toggle>
          </View>
        </View>
        {status ?
          <View style={styles.title}>
            <View>
              <Text category="s1">
                Time: {time.hours < 10 ? "0" + time.hours : time.hours} : {time.mins < 10 ? "0" + time.mins : time.mins}
              </Text>
            </View>
            <View>
              <Button onPress={showTimePicker}>Edit Time</Button>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                headerTextIOS="Pick a time"
                locale="en_US"
                mode="time"
                date={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideTimePicker}
              />
            </View>
          </View>
          : null}
      </View>
    </View>
  );
};
