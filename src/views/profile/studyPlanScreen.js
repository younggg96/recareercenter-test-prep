import React from 'react';
import { View } from 'react-native';
import { Button, Calendar, Card, Datepicker, Input, Modal, Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { TopBar } from '../../components/topBar/topBar';
import { styles } from '../../styles/home/studyPlanStyle';
import { EditIcon, SettingsIcon } from '../../components/icons/icons';
import { changeDailyPractices, changeExamDate } from '../../redux/actions/userAction';

export const StudyPlanScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  // change data
  const [examDate, setExamDate] = React.useState(userData.examTargetDate);
  const [dailyTarget, setDailyTarget] = React.useState(userData.dailyTarget);
  const [date, setDate] = React.useState(new Date());

  // modal
  const [visible, setVisible] = React.useState(false);
  const [praceticeVisible, setPraceticeVisible] = React.useState(false);
  const [errorInput, setErrorInput] = React.useState(false);
  const reg=/^[1-9]\d*$/;

  // exam date
  const editDate = () => {
    setVisible(false);
    dispatch(changeExamDate(examDate))
  }

  // daily target edit
  const submitDailyTarget = () => {
    setPraceticeVisible(false);
    console.log(dailyTarget)
    dispatch(changeDailyPractices(dailyTarget))
  }

  const onChangeTargetInput = (num) => {
    if(!reg.test(num)) {
      setErrorInput(true);
      setDailyTarget(0)
      return;
    }
    if(num > 300 || num <= 0) {
      setErrorInput(true);
      setDailyTarget(0)
      return;
    } 
    setErrorInput(false);
    setDailyTarget(num);
  }

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Study Plan" navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.title}>
          <View>
            <Text category='s1' style={styles.titleContent}>Your Daily Practice: </Text>
            <Text category='h2'>{userData.dailyTarget}</Text>
          </View>
          <View>
            <Button appearance="outline" size="small" accessoryRight={EditIcon} onPress={() => setPraceticeVisible(true)}></Button>
            <Modal
              visible={praceticeVisible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => {
                setErrorInput(false);
                setPraceticeVisible(false);
              }} style={styles.modal}>
              <Card disabled={true}>
                <Text category='s1' style={styles.modalTitle}>Change Daily Practices</Text>
                <Input caption={!errorInput ? "Range is 0-300" : "Invlid input"} placeholder={`${userData.dailyTarget}`} keyboardType={'numeric'} onChangeText={onChangeTargetInput}/>
                <Button onPress={submitDailyTarget} style={styles.submitBtn} disabled={errorInput}>
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
            <Text category='s1' style={styles.titleContent}>Your exam date: </Text>
            <Text category='h2'>{userData.examTargetDate.toString().substring(0, 10)}</Text>
          </View>
          <View>
            <Button appearance="outline" size="small" accessoryRight={EditIcon} onPress={() => setVisible(true)}></Button>
            <Modal
              visible={visible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setVisible(false)} style={styles.modal}>
              <Card disabled={true}>
                <Text category='s1' style={styles.modalTitle}>Change exam date</Text>
                <Datepicker
                  date={examDate}
                  onSelect={nextDate => setExamDate(nextDate)}
                />
                <Button onPress={editDate} style={styles.submitBtn}>
                  Submit
                </Button>
              </Card>
            </Modal>
          </View>
        </View>
        <Text category='s1' style={styles.titleContent}>Pick your start day: </Text>
        <Calendar
          date={date}
          onSelect={nextDate => {
            console.log(nextDate)
            setDate(nextDate)
          }}
        />
        <Button style={styles.submitBtn}>Submit</Button>
      </View>
    </View>
  );
};