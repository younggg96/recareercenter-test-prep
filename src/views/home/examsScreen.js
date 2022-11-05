import React from "react";
import { useEffect } from "react";
// style
import { styles } from "../../styles/home/examStyle";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getExams, refreshQuestionData } from "../../redux/actions/questionAction";
// components
import { Button, Card, Modal, Text } from "@ui-kitten/components";
import { Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TopBar } from "../../components/topBar/topBar";
import { LineChart } from "react-native-chart-kit";
import { doTodayExam, getExamData, getQualificationMockExam } from "../../helper/api";
import { homeStyles } from "../../styles/home/homeStyle";


const today = new Date();

export const ExamsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { userData } = useSelector(state => state.userReducer);
  const { exams } = useSelector(state => state.questionReducer);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    getExamData(userData.uid).then((res) => {
      dispatch(getExams(res.reverse()));
    })
  }, [])

  // navigation
  const navigateToMockExam = () => {
    getQualificationMockExam(userData.uid).then((res) => {
      if (res) {
        doTodayExam(userData.uid);
        dispatch(refreshQuestionData());
        navigation.navigate("MockExamScreen");
      } else {
        setVisible(true);
      }
    })
  };

  const navigateToMembership = () => {
    navigation.navigate("MembershipScreen");
  };

  const navigateToHistory = () => {
    navigation.navigate("ExamHistoryScreen", { exams });
  };

  // chart
  const getChartLabel = () => {
    let arr = [];
    exams.slice(0, 7).forEach(element => {
      arr.push(element.examDate.slice(5, 10))
    });
    if (arr.length < 7) {
      for (let i = 7 - arr.length; i > 0; i--) {
        arr.push("-");
      }
    }
    return arr;
  }

  const getNoDataLastWeekLabel = () => {
    let arr = [];
    arr.push(today.toISOString().slice(5, 10));
    let newDay = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    [0, 1, 2, 3, 4, 5].forEach(item => {
      arr.push(newDay.toISOString().slice(5, 10));
      newDay = new Date(newDay.getTime() - 24 * 60 * 60 * 1000);
    });
    return arr.reverse();
  }

  const getChartData = () => {
    let high = [];
    let low = [];
    exams.slice(0, 7).forEach(element => {
      high.push(element.highestScore);
      low.push(element.lowestScore);
    });
    while (high.length < 7 && low.length < 7) {
      high.push(0);
      low.push(0);
    }
    return { high: high.reverse(), low: low.reverse() }
  }


  const data = {
    labels: getChartLabel().reverse(),
    datasets: [
      {
        data: getChartData().high,
        color: () => "#E42425",
      },
      {
        data: getChartData().low,
        color: () => "#666666",
      },
    ],
  };

  const noData = {
    labels: getNoDataLastWeekLabel(),
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        color: () => "#666666",
      },
      {
        data: [100, 100, 100, 100, 100, 100, 100],
        color: () => "#E42425",
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: () => "#000",
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Exams" hasBack={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image
            source={require("../../../assets/img/mock-exam.png")}
            style={{
              width: 200,
              height: 200,
              marginBottom: 16,
              alignSelf: "center",
            }}
          />
          <Text category="h3" style={styles.title}>
            All Mock Exam
          </Text>
          <Text category="s2" appearance="hint" style={styles.time}>
            Within 100 mins, To complete 100 questions
          </Text>
          <Button style={{ ...styles.button, marginBottom: 8, borderRadius: 16 }} onPress={navigateToMockExam}>
            Let's Start Mock Exam
          </Button>
          <Text category="s2" appearance="hint" style={{...styles.time, color: 'red', fontSize: 12}}>
            {userData.membership === "1" && "(One Quiz Daily)" }
          </Text>
        </View>
        <Text
          category="h5"
          style={{ ...styles.title, paddingHorizontal: 24, marginBottom: 4 }}
          appearance="hint"
        >
          Exam History
        </Text>
        <View style={styles.content}>
          <View style={styles.history}>
            <View>
              <Text category="s1" style={styles.time}>
                Last 7 Days Exam Report
              </Text>
              <Text category="s2" appearance="hint" style={styles.time}>
                (Show daily highest & lowest scores)
              </Text>
            </View>
            <View>
              <Button
                appearance="ghost"
                onPress={navigateToHistory}
              >
                All Records
              </Button>
            </View>
          </View>
          {exams.length ? <View
            style={{ justifyContent: "center", display: "flex", marginTop: 16 }}
          >
            <LineChart
              data={data}
              width={300}
              height={280}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            />
          </View> :
            <View>
              <LineChart
                data={noData}
                width={300}
                height={280}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                bezier
              />
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", zIndex: 999, backgroundColor: '#666666', paddingHorizontal: 16, height: 40, top: -180, marginHorizontal: 10, position: 'relative' }}>
                <Text category="h6" appearance="hint" style={{ color: '#fff' }}>
                  No Exam History Reports
                </Text>
              </View>
            </View>
          }
        </View>
      </ScrollView>
      <Modal
        style={homeStyles.modal}
        visible={visible}
        backdropStyle={homeStyles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={{ ...homeStyles.modalCard, height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Image
              source={require("../../../assets/img/vip.jpg")}
              style={{ width: '100%', height: 200, marginBottom: 16 }}
            />
            <Text category="h6" style={homeStyles.modalTitle}>
              Become A Membership Today!
            </Text>
          </View>
          <Button
            onPress={() => {
              setVisible(false);
              navigateToMembership()
            }}
          >
            Start Membership!
          </Button>
        </Card>
      </Modal>
    </View>
  );
};
