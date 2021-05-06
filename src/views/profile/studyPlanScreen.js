import React from "react";
import { Alert, View } from "react-native";
import {
  Button,
  Calendar,
  Card,
  Datepicker,
  Input,
  Modal,
  Text,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "../../components/topBar/topBar";
import { styles } from "../../styles/home/studyPlanStyle";
import { EditIcon, SettingsIcon } from "../../components/icons/icons";
import {
  changeDailyPractices,
  changeExamDate,
  setStartDay,
} from "../../redux/actions/userAction";
import { ScrollView } from "react-native-gesture-handler";

export const StudyPlanScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  // change data
  const [examDate, setExamDate] = React.useState(userData.examTargetDate);
  const [dailyTarget, setDailyTarget] = React.useState(userData.dailyTarget);
  const [date, setDate] = React.useState(userData.startDay);

  // modal
  const [visible, setVisible] = React.useState(false);
  const [praceticeVisible, setPraceticeVisible] = React.useState(false);
  const [errorInput, setErrorInput] = React.useState(false);
  const [errorInputNum, setErrorInputNum] = React.useState(false);
  const [errorSetDay, setErrorSetDay] = React.useState(false);

  const reg = /^[1-9]\d*$/;

  // exam date
  const editDate = () => {
    setVisible(false);
    successChangeExamDateAlert()
    dispatch(changeExamDate(examDate));
  };

  // daily target edit
  const submitDailyTarget = () => {
    setPraceticeVisible(false);
    successChangeTargetNumAlert();
    dispatch(changeDailyPractices(dailyTarget));
  };

  const onChangeTargetInput = (num) => {
    if (!reg.test(num)) {
      setErrorInput(true);
      setDailyTarget(0);
      return;
    }
    if (num > 300 || num <= 0) {
      setErrorInput(true);
      // setDailyTarget(0);
      return;
    }
    setErrorInput(false);
    if (num < userData.finishedQuestions) {
      setErrorInputNum(true);
      // setDailyTarget(0);
      return;
    }
    setErrorInputNum(false);
    setDailyTarget(num);
  };

  // start day
  const submitStartDay = () => {
    if (date.getTime() > examDate.getTime()) {
      setErrorSetDay(true);
      return;
    }
    setErrorSetDay(false);
    successSubmitAlert();
    dispatch(setStartDay(date));
  };

  const successSubmitAlert = () =>
    Alert.alert(
      "Your Start Day Changed",
      `${date.toString().substring(0, 10)}`,
      [{ text: "OK", style: "default" }]
    );

  const successChangeTargetNumAlert = () =>
    Alert.alert(
      "Your Daily Practice Changed",
      `${dailyTarget}`,
      [{ text: "OK", style: "default" }]
    );

  const successChangeExamDateAlert = () =>
    Alert.alert(
      "Your Daily Practice Changed",
      `${examDate.toString().substring(0, 10)}`,
      [{ text: "OK", style: "default" }]
    );

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Study Plan" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.title}>
            <View>
              <Text category="s1" style={styles.titleContent}>
                Your Daily Practice:{" "}
              </Text>
              <Text category="h2">{userData.dailyTarget}</Text>
            </View>
            <View>
              <Button
                appearance="outline"
                size="small"
                accessoryRight={EditIcon}
                onPress={() => setPraceticeVisible(true)}
              ></Button>
              <Modal
                visible={praceticeVisible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => {
                  setErrorInput(false);
                  setErrorInputNum(false);
                  setPraceticeVisible(false);
                }}
                style={styles.modal}
              >
                <Card disabled={true}>
                  <Text category="s1" style={styles.modalTitle}>
                    Change Daily Practices
                  </Text>
                  <Input
                    caption={
                      !errorInput
                        ? !errorInputNum
                          ? () => <Text category="s2">Range is 0-300</Text>
                          : () => (
                              <Text status="danger" category="s2">
                                Target cannot more than finished
                              </Text>
                            )
                        : () => (
                            <Text status="danger" category="s2">
                              Invlid input
                            </Text>
                          )
                    }
                    placeholder={`${userData.dailyTarget}`}
                    keyboardType={"numeric"}
                    onChangeText={onChangeTargetInput}
                  />
                  <Button
                    onPress={submitDailyTarget}
                    style={styles.submitBtn}
                    disabled={errorInput || errorInputNum}
                  >
                    Submit
                  </Button>
                </Card>
              </Modal>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.title}>
            <View>
              <Text category="s1" style={styles.titleContent}>
                Your exam date:
              </Text>
              <Text category="h2">
                {userData.examTargetDate.toString().substring(0, 10)}
              </Text>
            </View>
            <View>
              <Button
                appearance="outline"
                size="small"
                accessoryRight={EditIcon}
                onPress={() => setVisible(true)}
              ></Button>
              <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}
                style={styles.modal}
              >
                <Card disabled={true}>
                  <Text category="s1" style={styles.modalTitle}>
                    Change exam date
                  </Text>
                  <Datepicker
                    date={examDate}
                    onSelect={(nextDate) => setExamDate(nextDate)}
                    size="small"
                  />
                  <Button onPress={editDate} style={styles.submitBtn}>
                    Submit
                  </Button>
                </Card>
              </Modal>
            </View>
          </View>
          <Text category="s1" style={styles.titleContent}>
            Start Day:
          </Text>
          <Text category="h2" style={styles.startDay}>
            {userData.startDay.toString().substring(0, 10)}
          </Text>
          <Text
            category="s1"
            style={[styles.titleContent, styles.pickStartTitle]}
          >
            Pick your start day:{" "}
          </Text>
          <Calendar
            date={date}
            style={{ width: "100%" }}
            onSelect={(nextDate) => {
              setDate(nextDate);
            }}
          />
          {errorSetDay ? (
            <Text category="s2" style={styles.titleContent} status="danger">
              Cannot later than exam date
            </Text>
          ) : null}

          <Button style={styles.submitBtn} onPress={submitStartDay}>
            Submit
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
