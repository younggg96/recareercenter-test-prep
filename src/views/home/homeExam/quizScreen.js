import { Layout, Radio, RadioGroup, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { TopBar } from "../../../components/topBar/topBar";
import { styles } from "../../../styles/home/home/quizStyle";

// data
import data from "../../../static/questions/data.json";

const getRandomArrayElements = (arr, count) => {
  let shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};

console.log(data);
const quizData = getRandomArrayElements(data.questionData, 10);

export const QuizScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  return (
    <Layout style={{ flex: 1 }}>
      <TopBar
        title={"Question " + `${currentQuestion + 1}`}
        navigation={navigation}
      />
      <View style={styles.quizCard}>
        <View>
          <Text category="s1" style={styles.questionTitle}>
            Question: {`${quizData[currentQuestion].Question}`}
          </Text>
        </View>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={(index) => setSelectedIndex(index)}
        >
          <Radio>{`${quizData[currentQuestion].Answer1}`}</Radio>
          <Radio>{`${quizData[currentQuestion].Answer2}`}</Radio>
          <Radio>{`${quizData[currentQuestion].Answer3}`}</Radio>
          <Radio>{`${quizData[currentQuestion].Answer4}`}</Radio>
        </RadioGroup>
      </View>
    </Layout>
  );
};
