import { Button, Radio, RadioGroup, Text } from "@ui-kitten/components";
import React from "react";
import { Image, View } from "react-native";
import { TopBar } from "../../../components/topBar/topBar";
import { styles } from "../../../styles/home/home/quizStyle";

import { ProgressBar } from "../../../components/progressBar/progressBar";
import { ScrollView } from "react-native-gesture-handler";
import { LikeIcon, UnlikeIcon } from "../../../components/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuizResult,
  saveQuestion,
  unsaveQuestion,
} from "../../../redux/actions/questionAction";
import { doQuestion } from "../../../redux/actions/userAction";

export const QuizScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const { quizData } = useSelector((state) => state.questionReducer);
  const { userData } = useSelector((state) => state.userReducer);
  // const arr = data.quizData;

  // redux
  const dispatch = useDispatch();

  // current question
  const question = quizData[currentQuestion];

  // next btn
  const goNextQuestion = () => {
    if (currentQuestion < 10) {
      // do question
      dispatch(doQuestion(userData.uid));
      // add score
      if (selectedIndex === parseInt(question.correct_ans) - 1) {
        setScore(score + 10);
      }
      // each result
      const itemRes = {
        res: selectedIndex === parseInt(question.correct_ans) - 1,
        pick: selectedIndex,
      };
      dispatch(getQuizResult(itemRes, currentQuestion));
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
                <Text category="s1" style={styles.reviewTitle}>{`Question ${index + 1
                  }: ${data[index].questionName}`}</Text>
                <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`A. ${data[index].answer_1}`}</Text>
                <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`B. ${data[index].answer_2}`}</Text>
                {data[index].answer_3 && <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`C. ${data[index].answer_3}`}</Text>}
                {data[index].answer_4 && <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`D. ${data[index].answer_4}`}</Text>}
                <Text
                  category="s1"
                  style={styles.answerReview}
                >{`Your answer: ${arr[item.result.pick]}`}</Text>
                <Text
                  category="s1"
                  style={styles.answerReview}
                >{`Correct answer: ${arr[parseInt(data[index].correct_ans) - 1]
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
                      ? () => dispatch(saveQuestion(item, userData.uid))
                      : () => dispatch(unsaveQuestion(item, userData.uid))
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
      {currentQuestion > 9 ? (
        <View style={{ flex: 1 }}>
          <TopBar title="Quiz Review" navigation={navigation} hasBack={true} />
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
            <Reviews data={quizData} />
          </ScrollView>
        </View>
      ) : question ? (
        <View style={{ flex: 1 }}>
          {/* question */}
          <TopBar
            title={"Question " + `${currentQuestion + 1}`}
            navigation={navigation}
            hasBack={true}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.quizCard}>
              <ProgressBar finished={currentQuestion + 1} target="10" />
              {/* <Text>{JSON.stringify(quizData, null, '\t')}</Text> */}
              <View>
                <Text category="s1" style={styles.questionTitle}>
                  Question: {`${question.questionName}`}
                </Text>
              </View>
              <RadioGroup
                selectedIndex={selectedIndex}
                onChange={(index) => setSelectedIndex(index)}
              >
                <Radio>{`A. ${question.answer_1}`}</Radio>
                <Radio>{`B. ${question.answer_2}`}</Radio>
                {question.answer_3 ? <Radio>{`C. ${question.answer_3}`}</Radio> : <></>}
                {question.answer_4 ? <Radio>{`D. ${question.answer_4}`}</Radio> : <></>}
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
      ) : <Text>loading...</Text>}
    </React.Fragment>
  );
};
