import { Button, Layout, Radio, RadioGroup, Text } from "@ui-kitten/components";
import React from "react";
import { Image, View } from "react-native";
import { TopBar } from "../../../components/topBar/topBar";
import { styles } from "../../../styles/home/home/quizStyle";

import { ProgressBar } from "../../../components/progressBar/progressBar";
import { ScrollView } from "react-native-gesture-handler";
import { LikeIcon, UnlikeIcon } from "../../../components/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getResult,
  saveQuestion,
  unsaveQuestion,
} from "../../../redux/actions/questionAction";
import { doQuestion } from "../../../redux/actions/userAction";

export const QuizScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);

  // redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.questionReducer);

  // current question
  const question = data.quizData[currentQuestion];

  // next btn
  const goNextQuestion = () => {
    if (currentQuestion < 10) {
      // do question 
      dispatch(doQuestion());
      // add score
      if (selectedIndex === parseInt(question.CorrectAnswer) - 1) {
        setScore(score + 10);
      }
      // each result
      const itemRes = {
        res: selectedIndex === parseInt(question.CorrectAnswer) - 1,
        pick: selectedIndex,
      };
      dispatch(getResult(itemRes, currentQuestion));
    }
    setSelectedIndex(-1);
    setCurrentQuestion(currentQuestion + 1);
  };

  const Reviews = ({ data }) => {
    const arr = ["A", "B", "C", "D"];
    return (
      <View>
        {data.map((item, index) => {
          return (
            <View
              style={
                item.result.res ? styles.correctCard : styles.inCorrectCard
              }
              key={index}
            >
              <View>
                <Text category="s1" style={styles.reviewTitle}>{`Question ${
                  index + 1
                }: ${data[index].Question}`}</Text>
                <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`A. ${data[index].Answer1}`}</Text>
                <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`B. ${data[index].Answer2}`}</Text>
                <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`C. ${data[index].Answer3}`}</Text>
                <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`D. ${data[index].Answer4}`}</Text>
                <Text
                  category="s1"
                  style={styles.answerReview}
                >{`Your answer: ${arr[item.result.pick]}`}</Text>
                <Text
                  category="s1"
                  style={styles.answerReview}
                >{`Correct answer: ${
                  arr[parseInt(data[index].CorrectAnswer) - 1]
                }`}</Text>
              </View>
              <View style={styles.controlBtn}>
                <Button
                  style={{ borderRadius: 16, paddingVertical: 6 }}
                  status="control"
                  appearance="outline"
                  accessoryLeft={!item.saved ? UnlikeIcon : LikeIcon}
                  onPress={
                    !item.saved
                      ? () => dispatch(saveQuestion(item))
                      : () => dispatch(unsaveQuestion(item))
                  }
                >
                  {!item.saved ? "Save" : "Saved"}
                </Button>
              </View>
            </View>
          );
        })}
      </View>
    );
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
              <Text
                category="h1"
                status="danger"
                style={{ marginBottom: 8, fontSize: 48 }}
              >
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
            <Reviews data={data.quizData} />
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
