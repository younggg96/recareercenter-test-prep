import {
  Button,
  Card,
  Modal,
  Radio,
  RadioGroup,
  Text,
  TopNavigation,
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
  unsaveQuestionReturnIds,
} from "../../../redux/actions/questionAction";
import { TopBar } from "../../../components/topBar/topBar";
import { addPractice, postExamRecord } from "../../../helper/api";
import { LoadingIndicator } from "../../../components/loading/loadingIndicator";

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
  const [spinner, setSpinner] = React.useState(false);

  // quit display
  const [quitExamDisplay, setQuitExamDisplay] = React.useState(false);

  // timeout display
  const [timeoutDisplay, setTimeoutDisplay] = React.useState(false);

  // redux
  const dispatch = useDispatch();
  const { questionData, savedIdList } = useSelector((state) => state.questionReducer);
  const { userData } = useSelector((state) => state.userReducer);

  // current question
  const question = questionData[currentQuestion];

  const getRecordQuestions = () => {
    let res = [];
    const arr = questionData.filter((item) => {
      return item.result.pick && item.result.pick !== parseInt(item.correct_ans);
    })
    arr.map((item) => {
      res.push({ qid: item.id, choice: item.result.pick });
    })
    return res;
  }

  // next btn
  const goNextQuestion = () => {
    console.log(currentQuestion)
    if (currentQuestion < 99) {
      // do question
      setSpinner(true);
      addPractice(userData.uid).then(result => {
        if (result) {
          setTimeout(() => {
            setSpinner(false);
          }, 300);
        }
      })

      // add score
      if (selectedIndex === parseInt(question.correct_ans) - 1) {
        setScore(score + 1);
      }
      // each result
      const itemRes = {
        res: selectedIndex === parseInt(question.correct_ans) - 1,
        pick: selectedIndex,
      };
      dispatch(getResult(itemRes, currentQuestion));
    } else {
      const data = { score, uid: userData.uid, recordQuestions: getRecordQuestions() }
      console.log(data);
      postExamRecord(data);
    }
    setSelectedIndex(-1);
    setCurrentQuestion(currentQuestion + 1);
  };

  // time over result
  const notFinishedQuestions = () => {
    setCurrentQuestion(100);
  };

  // Reviews
  const Reviews = () => {
    const arr = ["A", "B", "C", "D"];
    const data = questionData;

    return (
      <View>
        {data.map((item, index) => {
          if (item.result.pick !== null) {
            return (
              <View
                style={
                  item.result.res === "unfinished"
                    ? styles.notFinishedCard
                    : item.result.res
                      ? styles.correctCard
                      : styles.inCorrectCard
                }
                key={item.id}
              >
                <View>
                  <Text category="s1" style={styles.reviewTitle}>{`Question ${index + 1} : ${data[index].questionName}`}</Text>
                  <Text category="s2" style={styles.reviewContent}>{`A. ${data[index].answer_1}`}</Text>
                  <Text category="s2" style={styles.reviewContent}>{`B. ${data[index].answer_2}`}</Text>
                  {data[index].answer_3 ? <Text category="s2" style={styles.reviewContent}>{`C. ${data[index].answer_3}`}</Text> : <></>}
                  {data[index].answer_4 ? <Text category="s2" style={styles.reviewContent}>{`D. ${data[index].answer_4}`}</Text> : <></>}
                  <Text category="s1" style={styles.answerReview}>
                    {
                      item.result.pick !== null
                        ? `Your answer: ${arr[item.result.pick]}`
                        : "Your answer: Not Finished"
                    }
                  </Text>
                  <Text category="s1" style={styles.answerReview}>{`Correct answer: ${arr[parseInt(data[index].correct_ans) - 1]}`}</Text>
                </View>
                {savedIdList !== null && (<View style={styles.controlBtn}>
                  <Button
                    style={{ borderRadius: 16, paddingVertical: 6 }}
                    status="control"
                    appearance="outline"
                    accessoryLeft={!savedIdList.includes(item.id) ? UnlikeIcon : LikeIcon}
                    onPress={
                      !savedIdList.includes(item.id)
                        ? () => dispatch(saveQuestion(item, userData.uid))
                        : () => dispatch(unsaveQuestionReturnIds(item, userData.uid))
                    }
                  >
                    {!savedIdList.includes(item.id) ? "Save" : "Saved"}
                  </Button>
                </View>)}
              </View>
            );
          } else {
            return <React.Fragment key={item.id}></React.Fragment>
          }
        })}
      </View>
    );
  };

  // Top bar
  const BackAction = () => (
    <Button appearance='ghost' accessoryLeft={BackIcon} onPress={exitModal} size="small" />
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
            type="exam_review"
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
                Mock Exam Score:
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
                  You should do more practices!!!
                </Text>
              )}
            </View>
            <View>
              <Text
                category="s1"
                appearance="hint"
                style={{ ...styles.title, paddingHorizontal: 32 }}
              >
                Mock Exam Reviews:
              </Text>
              <Text appearance="hint" style={{ ...styles.title, paddingHorizontal: 32, fontSize: 12, marginTop: 0 }}>(Only show up the questions you finished)</Text>
            </View>
            <Reviews />
          </ScrollView>
        </View>
      ) : question ? (
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
                target="100"
                isTimer={true}
                setTimeoutDisplay={setTimeoutDisplay}
                setQuitExamDisplay={setQuitExamDisplay}
              />
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
                onPress={!spinner ? goNextQuestion : null}
                disabled={selectedIndex === -1 && !spinner ? true : false}
                accessoryLeft={spinner ? LoadingIndicator : null}
              >
                {!spinner ? "Next" : "Loading..."}
              </Button>
            </View>
          </ScrollView>
        </View>
      ) : <Text>loading...</Text>}
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
              width: 260,
              height: 150,
              marginBottom: 12,
              alignSelf: "center",
            }}
            resizeMode="contain"
          />
          <Text
            category="h4"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            Exam Not Finished
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
            Mock Exam Over
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
