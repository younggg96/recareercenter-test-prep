import React from "react";
// ui
import { Alert, View } from "react-native";
import { Button, Card, Divider, Input, Modal, Text } from "@ui-kitten/components";

import { styles } from "../../styles/home/settingsStyle";
// top bar
import { TopBar } from "../../components/topBar/topBar";
// components
import { SettingList } from "../../components/settingList/settingList";
import { settings } from "../../components/settingList/settingConfig";

// redux
import { useDispatch, useSelector } from "react-redux";
import { logout, updateProfile } from "../../redux/actions/userAction";
import { deleteItemAsync } from "expo-secure-store";
import { USER_AUTH_INFO } from "../../storage/keys";
import { EditIcon } from "../../components/icons/icons";
import { homeStyles } from "../../styles/home/homeStyle";
import Toast from "react-native-simple-toast";
import { findUser, updateUserProfile } from "../../helper/api";
import { connectAsync } from "expo-in-app-purchases";
import { LoadingIndicator } from "../../components/loading/loadingIndicator";

export const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);
  const [profileModalVisible, setProfileModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [spinner, setSpinner] = React.useState(false);
  const uid = userData.uid;

  const logoutAccount = async () => {
    try {
      deleteItemAsync(USER_AUTH_INFO);
    } catch (error) {
      Alert.alert("Error", `${error.message}`);
    }
    dispatch(logout());
  };

  const editProfile = () => {
    setProfileModalVisible(true);
  }

  const update = () => {
    if (!value) return;
    setSpinner(true);
    updateUserProfile(uid, value).then((res) => {
      if (res) {
        findUser(uid).then((res) => {
          if (res.data) {
            dispatch(updateProfile(res.data));
            Toast.show(
              "Profile updated!"
            );
            setSpinner(false);
            clear();
          }
        }).catch((error) => {
          Alert.alert("Error", `${error.message}`)
        })
      }
    })
  }

  const clear = () => {
    setValue('');
    setProfileModalVisible(false);
  }


  return (
    <View style={{ flex: 1 }}>
      <TopBar navigation={navigation} title="Settings" hasBack={true} />
      <View style={styles.settingsContent}>
        <Text category="s1" style={styles.accountTitle}>
          Account Info
        </Text>
        <View style={styles.email}>
          {userData.displayName && <Text category="s1">Name: {userData.displayName}</Text>}
          <Text category="s1">Email: {userData.email ? userData.email : "-"}</Text>
          <Button onPress={editProfile} style={styles.logOutBtn} size="small" appearance="outline" accessoryLeft={EditIcon}>
            Edit profile
          </Button>
          <Button onPress={logoutAccount} style={styles.logOutBtn} size="small">
            Log out
          </Button>
        </View>
        <SettingList settings={settings} navigation={navigation} padding={true} />
        <Modal
          style={homeStyles.modal}
          visible={profileModalVisible}
          backdropStyle={homeStyles.backdrop}
          onBackdropPress={() => {
            setProfileModalVisible(false);
            clear();
          }}
        >
          <Card disabled={true} style={{ ...homeStyles.modalCard2 }}>
            <Text category="s1" style={{ marginBottom: 12 }}>Update Profile</Text>
            <Input
              placeholder='Place your name *'
              caption={"(Include First name and Last name)"}
              onChangeText={nextValue => setValue(nextValue)}
              style={{ marginBottom: 12 }}
            ></Input>
            {!spinner ?
              <Button status="primary" onPress={update} size="small" disabled={!value}>
                Update
              </Button> :
              <Button status="primary" accessoryLeft={LoadingIndicator} size="small">
                Loading...
              </Button>
            }
          </Card>
        </Modal>
      </View>
    </View>
  );
};
