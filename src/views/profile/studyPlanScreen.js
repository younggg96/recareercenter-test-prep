import React from 'react';
import { View } from 'react-native';
import { Button, Calendar, Card, Datepicker, Modal, Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { TopBar } from '../../components/topBar/topBar';
import { styles } from '../../styles/home/studyPlanStyle';
import { EditIcon, SettingsIcon } from '../../components/icons/icons';

export const StudyPlanScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);
  const [examDate, setExamDate] = React.useState(userData.examTargetDate);
  const [date, setDate] = React.useState(new Date());

  const [visible, setVisible] = React.useState(false);
  const [praceticeVisible, setPraceticeVisible] = React.useState(false);
  const editDate = () => {
    setVisible(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Study Plan" navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.title}>
          <View>
            <Text category='s1' style={styles.titleContent}>Your Daily Practice: </Text>
            <Text category='h2'>200</Text>
          </View>
          <View>
            <Button appearance="outline" size="small" accessoryRight={EditIcon} onPress={() => setPraceticeVisible(true)}></Button>
            <Modal
              visible={visible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setVisible(false)} style={styles.modal}>
              <Card disabled={true}>
                <Text category='s1' style={styles.modalTitle}>Change Daily Practices</Text>
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