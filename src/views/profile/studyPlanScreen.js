import React from "react";
import { Alert, View } from "react-native";
import {
  Button,
  Calendar,
  Card,
  Datepicker,
  Input,
  Modal,
  NativeDateService,
  Text,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "../../components/topBar/topBar";
import { styles } from "../../styles/home/studyPlanStyle";
import { EditIcon } from "../../components/icons/icons";
import {
  changeDailyPractices,
  changeExamDate,
  setStartDay,
} from "../../redux/actions/userAction";
import { ScrollView } from "react-native-gesture-handler";

const today = new Date();

export const StudyPlanScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  // change data
  const [examDate, setExamDate] = React.useState(new Date(userData.examStartDate));
  const [targetPractice, setTargetPractice] = React.useState(userData.targetPractice);
  const [date, setDate] = React.useState(new Date());

  // modal
  const [visible, setVisible] = React.useState(false);
  const [praceticeVisible, setPraceticeVisible] = React.useState(false);
  const [errorExamDay, setErrorExamDay] = React.useState(false);
  const [errorInput, setErrorInput] = React.useState(false);
  const [errorInputNum, setErrorInputNum] = React.useState(false);
  const [errorSetDay, setErrorSetDay] = React.useState(false);

  const reg = /^[1-9]\d*$/;

  // exam date 
  const editDate = () => {
    if (examDate.getTime() < today.getTime()) {
      setErrorExamDay(true);
      return;
    }
    setVisible(false);
    dispatch(changeExamDate(examDate, userData.uid));
  };

  // daily target edit
  const submitTargetPractice = () => {
    setPraceticeVisible(false);
    dispatch(changeDailyPractices(targetPractice, userData.uid));
  };

  const onChangeTargetInput = (num) => {
    if (!reg.test(num)) {
      setErrorInput(true);
      setTargetPractice(0);
      return;
    }
    if (num > 300 || num <= 0) {
      setErrorInput(true);
      return;
    }
    setErrorInput(false);
    if (num < userData.dailyPractice) {
      setErrorInputNum(true);
      return;
    }
    setErrorInputNum(false);
    setTargetPractice(num);
  };

  // start day
  const submitStartDay = () => {
    if (date.getTime() > examDate.getTime()) {
      setErrorSetDay(true);
      return;
    }
    setErrorSetDay(false);
    dispatch(setStartDay(date, userData.uid));
  };

  const formatDateService = new NativeDateService('en', { format: 'MM/DD/YYYY' });

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Study Plan" navigation={navigation} hasBack={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.title}>
            <View>
              <Text category="s1" style={styles.titleContent}>
                Your Daily Practice:{" "}
              </Text>
              <Text category="h2">{userData.targetPractice}</Text>
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
                <Card disabled={true} style={{ borderRadius: 16 }}>
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
                    placeholder={`${userData.targetPractice}`}
                    keyboardType={"numeric"}
                    onChangeText={onChangeTargetInput}
                  />
                  <Button
                    onPress={submitTargetPractice}
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
                {new Date(userData.examStartDate).getTime() ? new Date(userData.examStartDate).toISOString().substring(0, 10) : 'Unset'}
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
                onBackdropPress={() => {
                  setVisible(false);
                  setExamDate(new Date());
                }}
                style={styles.modal}
              >
                <Card disabled={true}>
                  <Text category="s1" style={styles.modalTitle}>
                    Change exam date
                  </Text>
                  <Datepicker
                    date={examDate.getTime() > 0 ? examDate : new Date()}
                    dateService={formatDateService}
                    onSelect={(nextDate) => setExamDate(nextDate)}
                    size="small"
                  />
                  {errorExamDay && (
                    <Text category="s2" style={styles.titleContent} status="danger">
                      Exam day should be later than today
                    </Text>
                  )}
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
          <Text category="h2" style={styles.practiceStartDate}>
            {new Date(userData.practiceStartDate).getTime() ? new Date(userData.practiceStartDate).toISOString().substring(0, 10) : 'Unset'}
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
          {errorSetDay && (
            <Text category="s2" style={{ ...styles.titleContent, paddingLeft: 8, paddingVertical: 4 }} status="danger">
              Start day cannot later than exam date
            </Text>
          )}
          <Button style={styles.submitBtn} onPress={submitStartDay}>
            Submit
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
