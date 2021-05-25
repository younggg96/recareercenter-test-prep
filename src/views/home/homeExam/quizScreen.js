import { Button, Layout, Radio, RadioGroup, Text } from "@ui-kitten/components";
import React from "react";
import { Image, View } from "react-native";
import { TopBar } from "../../../components/topBar/topBar";
import { styles } from "../../../styles/home/home/quizStyle";

// data
import data from "../../../static/questions/data.json";
import { ProgressBar } from "../../../components/progressBar/progressBar";
import { ScrollView } from "react-native-gesture-handler";
import { CorrectIcon, IncorrectIcon } from "../../../components/icons/icons";

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
  const arr = ["A", "B", "C", "D"];
  return (
    <View>
      {result.map((item, index) => {
        const answer = arr[0];
        return (
          <View
            style={item.res ? styles.correctCard : styles.inCorrectCard}
            key={index}
          >
            <View
              style={{ padding: 16, position: "absolute", right: 0, bottom: 0 }}
            >
              {item.res ? <CorrectIcon /> : <IncorrectIcon />}
            </View>
            <Text category="s1" style={styles.reviewTitle}>{`Question ${
              index + 1
            }: ${quizData[index].Question}`}</Text>
            <Text
              category="s2"
              style={styles.reviewContent}
            >{`A. ${quizData[index].Answer1}`}</Text>
            <Text
              category="s2"
              style={styles.reviewContent}
            >{`B. ${quizData[index].Answer2}`}</Text>
            <Text
              category="s2"
              style={styles.reviewContent}
            >{`C. ${quizData[index].Answer3}`}</Text>
            <Text
              category="s2"
              style={styles.reviewContent}
            >{`D. ${quizData[index].Answer4}`}</Text>
            <Text category="s1" style={styles.answerReview}>{`Your answer: ${
              arr[item.pick]
            }`}</Text>
            <Text category="s1" style={styles.answerReview}>{`Correct answer: ${
              arr[parseInt(quizData[index].CorrectAnswer) - 1]
            }`}</Text>
          </View>
        );
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
      if (selectedIndex === parseInt(question.CorrectAnswer) - 1) {
        setScore(score + 10);
      }

      // each result
      const itemRes = {
        res: selectedIndex === parseInt(question.CorrectAnswer) - 1,
        pick: selectedIndex,
      };
      result.push(itemRes);
      setResult(result);
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
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={require("../../../../assets/img/QuizResultsVector.png")}
                  style={{ width: 200, height: 200, marginBottom: 16 }}
                />
              </View>
              <Text category="s1" style={styles.title}>
                Your Quiz Score:
              </Text>
              <Text category="h1" status="danger" style={{ marginBottom: 8 }}>
                {`${score}`}{" "}
                <Text category="h6" appearance="hint">
                  / 100
                </Text>
              </Text>
              {score >= 90 ? (
                <Text category="s1" status="success">
                  Good Job!!!
                </Text>
              ) : score < 90 && score >= 60 ? (
                <Text category="s1" status="warning">
                  Not bad, study hard can get a higher score.
                </Text>
              ) : (
                <Text category="s1" status="danger">
                  Should do more practices!!!
                </Text>
              )}
            </View>
            <Text
              category="s1"
              appearance="hint"
              style={{ ...styles.title, paddingHorizontal: 32 }}
            >
              Your Quiz Reviews:
            </Text>
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
