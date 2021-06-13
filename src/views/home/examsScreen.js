import { Button, Text } from "@ui-kitten/components";
import React from "react";
import { Image, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import { TopBar } from "../../components/topBar/topBar";
import { styles } from "../../styles/home/examStyle";

export const ExamsScreen = ({ navigation }) => {
  const goMockExam = () => {
    navigation.navigate("MockExamScreen");
  };

  const data = {
    labels: [
      "Mon",
      "Tues",
      "Wed",
      "Thur",
      "Fir",
      "Sat",
      "Sun",
    ],
    datasets: [
      {
        data: [80, 65, 70, 80, 99, 83, 78],
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
          <Button style={styles.button} onPress={goMockExam}>
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
                Last Week Exam Report
              </Text>
              <Text category="s2" appearance="hint" style={styles.time}>
                (Pick daily highest score)
              </Text>
            </View>
            <View>
              <Button style={styles.button} appearance="ghost">
                View All Time
              </Button>
            </View>
          </View>
          <View style={{justifyContent: "center",display: "flex", marginTop: 16}}>
            <LineChart
              data={data}
              width={300}
              height={220}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
