import { Button, Layout, Radio, RadioGroup, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { TopBar } from "../../../components/topBar/topBar";
import { styles } from "../../../styles/home/home/quizStyle";

// data
import data from "../../../static/questions/data.json";
import { ProgressBar } from "../../../components/progressBar/progressBar";
import { ScrollView } from "react-native-gesture-handler";

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

const quizData = getRandomArrayElements(data.questionData, 10);

const Reviews = ({ result }) => {
  return (
    <View>
      {result.map((item, index) => {
        return (<View style={styles.quizCard} key={index}>
          <Text category="s1" style={styles.reviewTitle}>{`Question: ${quizData[index].Question}`}</Text>
          <Text category="s2" style={styles.reviewContent}>{`A. ${quizData[index].Answer1}`}</Text>
          <Text category="s2" style={styles.reviewContent}>{`B. ${quizData[index].Answer2}`}</Text>
          <Text category="s2" style={styles.reviewContent}>{`C. ${quizData[index].Answer3}`}</Text>
          <Text category="s2" style={styles.reviewContent}>{`D. ${quizData[index].Answer4}`}</Text>
          <Text>{`${item.res}`}</Text>
        </View>);
      })}
    </View>
  );
};

export const QuizScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [result, setResult] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const question = quizData[currentQuestion];

  const goNextQuestion = () => {
    if (result.length <= 10) {
      // add score
      if (selectedIndex === parseInt(question.CorrectAnswer)) {
        setScore(score + 10);
      }

      // each result
      const itemRes = {
        res: selectedIndex === parseInt(question.CorrectAnswer),
        pick: selectedIndex,
      };
      result.push(itemRes);
      setResult(result);
      console.log(result);
    }
    setSelectedIndex(-1);
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <React.Fragment>
      {!question ? (
        <View style={{ flex: 1 }}>
          <TopBar title="Quiz Review" navigation={navigation} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.quizCard}>
              <Text category="s1" style={styles.title}>
                Your Quiz Score:
              </Text>
              <Text category="h1" status="danger">
                {`${score}`}{" "}
                <Text category="h6" appearance="hint">
                  / 100
                </Text>
              </Text>
            </View>
            <Reviews result={result} />
          </ScrollView>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <TopBar
            title={"Question " + `${currentQuestion + 1}`}
            navigation={navigation}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.quizCard}>
              <ProgressBar finished={currentQuestion + 1} target="10" />
              <View>
                <Text category="s1" style={styles.questionTitle}>
                  Question: {`${question.Question}`}
                </Text>
              </View>
              <RadioGroup
                selectedIndex={selectedIndex}
                onChange={(index) => setSelectedIndex(index)}
              >
                <Radio>{`A. ${question.Answer1}`}</Radio>
                <Radio>{`B. ${question.Answer2}`}</Radio>
                <Radio>{`C. ${question.Answer3}`}</Radio>
                <Radio>{`D. ${question.Answer4}`}</Radio>
              </RadioGroup>
              <Button
                style={styles.button}
                onPress={goNextQuestion}
                disabled={selectedIndex === -1 ? true : false}
              >
                Next
              </Button>
            </View>
          </ScrollView>
        </View>
      )}
    </React.Fragment>
  );
};
