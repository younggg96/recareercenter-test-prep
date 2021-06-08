import {
  Button,
  Card,
  Modal,
  Radio,
  RadioGroup,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { styles } from "../../../styles/home/home/quizStyle";
import { shadow } from "../../../styles/shared/sharedStyle";
import Constants from "expo-constants";

import { ProgressBar } from "../../../components/progressBar/progressBar";
import { ScrollView } from "react-native-gesture-handler";
import {
  BackIcon,
  LikeIcon,
  UnlikeIcon,
} from "../../../components/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getResult,
  saveQuestion,
  unsaveQuestion,
} from "../../../redux/actions/questionAction";
import { doQuestion } from "../../../redux/actions/userAction";
import { LoadingIndicator } from "../../../components/loading/loadingIndicator";
import { TopBar } from "../../../components/topBar/topBar";

const topStyles = StyleSheet.create({
  topBar: {
    paddingTop: Constants.statusBarHeight + 16,
    paddingBottom: 18,
    marginBottom: 8,
    ...shadow,
  },
  topTitle: {
    fontSize: 18,
    paddingHorizontal: 16,
  },
});

export const MockExamScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  // const [loading, setLoading] = React.useState(false);

  // redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.questionReducer);
  const arr = data.questionData;

  // quit display
  const [quitExamDisplay, setQuitExamDisplay] = React.useState(false);

  // timeout display
  const [timeoutDisplay, setTimeoutDisplay] = React.useState(false);

  // current question
  const question = arr[currentQuestion];

  // next btn
  const goNextQuestion = () => {
    if (currentQuestion < 100) {
      // do question
      dispatch(doQuestion());
      // add score
      if (selectedIndex === parseInt(question.CorrectAnswer) - 1) {
        setScore(score + 1);
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

  // time over result
  const notFinishedQuestions = () => {
    setCurrentQuestion(100);
  };

  // Reviews
  const Reviews = ({ data }) => {
    const arr = ["A", "B", "C", "D"];
    return (
      <View>
        {data.map((item, index) => {
          return (
            <View
              style={
                item.result.res === "unfinished"
                  ? styles.notFinishedCard
                  : item.result.res
                  ? styles.correctCard
                  : styles.inCorrectCard
              }
              key={index}
            >
              <View>
                {/* <Text>{JSON.stringify(item.result)}</Text> */}
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
                <Text category="s1" style={styles.answerReview}>
                  {item.result.pick !== null
                    ? `Your answer: ${arr[item.result.pick]}`
                    : "Your answer: Not Finished"}
                </Text>
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

  // Top bar
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={exitModal} />
  );

  const exitModal = () => {
    setQuitExamDisplay(true);
  };

  return (
    <React.Fragment>
      {currentQuestion > 99 ? (
        <View style={{ flex: 1 }}>
          {/* reviews */}
          <TopBar
            title="Real Mock Exam Review"
            navigation={navigation}
            hasBack={true}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.quizCard}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={require("../../../../assets/img/QuizResultsVector.png")}
                  style={{ width: 200, height: 200, marginBottom: 16 }}
                />
              </View>
              <Text category="s1" style={styles.title}>
                Your Mock Exam Score:
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
              Your Mock Exam Reviews:
            </Text>
            <Reviews data={data.questionData} />
          </ScrollView>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* questions */}
          <TopNavigation
            title={() => (
              <Text category="s1" style={topStyles.topTitle}>
                {"Question " + `${currentQuestion + 1}`}
              </Text>
            )}
            accessoryLeft={BackAction}
            style={topStyles.topBar}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.quizCard}>
              <ProgressBar
                target="2"
                isTimer={true}
                setTimeoutDisplay={setTimeoutDisplay}
                setQuitExamDisplay={setQuitExamDisplay}
              />
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
      {/* quit modal */}
      <Modal
        visible={quitExamDisplay}
        style={styles.modal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {
          setQuitExamDisplay(false);
        }}
      >
        <Card disabled={true} style={styles.modalCard}>
          <Image
            source={require("../../../../assets/img/quit_exit.png")}
            style={{
              width: 180,
              height: 120,
              marginBottom: 8,
              alignSelf: "center",
            }}
          />
          <Text
            category="h4"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            Exam Not Fanished
          </Text>
          <Text category="h6" style={styles.modalTitle}>
            Do you want to leave?
          </Text>
          <View
            style={{
              paddingHorizontal: 16,
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 8,
            }}
          >
            <Button
              onPress={() => {
                setQuitExamDisplay(false);
                
                setCurrentQuestion(100);
              }}
              style={{ marginTop: 8, width: 100 }}
            >
              Yes
            </Button>
            <Button
              onPress={() => {
                setQuitExamDisplay(false);
              }}
              appearance="ghost"
              style={{ marginTop: 8, width: 100 }}
            >
              Cancel
            </Button>
          </View>
        </Card>
      </Modal>
      {/* time over Modal */}
      <Modal
        visible={timeoutDisplay}
        style={styles.modal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {
          setTimeoutDisplay(false);
          notFinishedQuestions();
        }}
      >
        <Card disabled={true} style={styles.modalCard}>
          <Image
            source={require("../../../../assets/img/time-over.png")}
            style={{
              width: 180,
              height: 180,
              marginBottom: 8,
              alignSelf: "center",
            }}
          />
          <Text
            category="h3"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            Time Over
          </Text>
          <Text category="h6" style={styles.modalTitle}>
            Your Mock Exam Is Over
          </Text>
          <Button
            onPress={() => {
              setTimeoutDisplay(false);
              notFinishedQuestions();
            }}
            style={{ borderRadius: 25, marginTop: 8 }}
          >
            Exam Results
          </Button>
        </Card>
      </Modal>
    </React.Fragment>
  );
};
