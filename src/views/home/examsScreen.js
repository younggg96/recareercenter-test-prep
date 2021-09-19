import React from "react";
import { useEffect } from "react";
// style
import { styles } from "../../styles/home/examStyle";
// redux
import { useDispatch, useSelector } from "react-redux";
import { refreshQuestionData } from "../../redux/actions/questionAction";
// components
import { Button, Text } from "@ui-kitten/components";
import { Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TopBar } from "../../components/topBar/topBar";
import { LineChart } from "react-native-chart-kit";
import { getExamData } from "../../helper/api";


const today = new Date();

export const ExamsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [exams, setExams] = React.useState([]);
  const { userData } = useSelector(state => state.userReducer);

  useEffect(() => {
    const res = getExamData(userData.uid);
    res.then((res) => {
      setExams(res.reverse());
    })
  }, [])

  // navigation
  const navigateToMockExam = () => {
    dispatch(refreshQuestionData());
    navigation.navigate("MockExamScreen");
  };

  const navigateToHistory = () => {
    navigation.navigate("ExamHistoryScreen", { exams: exams });
  };

  // chart
  const getChartLabel = () => {
    let arr = [];
    exams.slice(0, 7).forEach(element => {
      arr.push(element.examDate.slice(5, 10))
    });
    while (arr.length < 7) {
      arr.push('unknown');
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
        data: [0,0,0,0,0,0,0],
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
            Within 30 mins, To complete 100 questions
          </Text>
          <Button style={{...styles.button, marginBottom: 8}} onPress={navigateToMockExam}>
            Let's Start A Real Mock Exam
          </Button>
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
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", zIndex: 999, backgroundColor: '#666666', paddingHorizontal: 16, height: 40, top: -180, marginHorizontal: 10, position: 'relative'}}>
                <Text category="h6" appearance="hint" style={{ color: '#fff'}}>
                  No Exam History Reports
                </Text>
              </View>
            </View>
          }
        </View>
      </ScrollView>
    </View>
  );
};
