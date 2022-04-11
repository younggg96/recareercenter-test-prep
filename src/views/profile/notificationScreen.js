import React from "react";

// ui
import { View } from "react-native";
import { Button, Text, Toggle } from "@ui-kitten/components";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setNotification, updateProfile } from "../../redux/actions/userAction";

// component
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TopBar } from "../../components/topBar/topBar";

// style
import { styles } from "../../styles/home/settings/notificationStyle";

// api
import { updateNotification } from "../../helper/api";
import { useState } from "react";

export const NotificationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.userReducer);
  const { time } = userData.notification;

  const [status, setStatus] = useState(userData.notification.status);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);


  const onCheckedChange = (isChecked) => {
    setStatus(isChecked)
    updateNotification({ uid: userData.uid, status: isChecked, hours: new Date().getHours(), mins: new Date().getMinutes() }).then((res) => {
      dispatch(setNotification(isChecked));
    }).catch((err) => {
      if (err) {
        Alert.alert(err);
        setStatus(!isChecked);
      }
    })
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    hideTimePicker();
    updateNotification({ uid: userData.uid, status, hours: time.getHours(), mins: time.getMinutes() }).then((res) => {
      dispatch(updateProfile(res));
    })
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Study Alarm" navigation={navigation} hasBack={true} />
      <View style={styles.content}>
        <View style={styles.title}>
          <View>
            <Text category="s1">Study Alarm</Text>
          </View>
          <View>
            <Toggle checked={status} onChange={onCheckedChange}></Toggle>
          </View>
        </View>
        {status ? (
          <View style={styles.title}>
            <View>
              <Text category="s1">
                Time: {time.hours < 10 ? "0" + time.hours : time.hours} :{" "}
                {time.mins < 10 ? "0" + time.mins : time.mins}
              </Text>
            </View>
            <View>
              <Button onPress={showTimePicker}>Edit Time</Button>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                headerTextIOS="Pick a time"
                locale="en_GB"
                mode="time"
                date={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideTimePicker}
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};
