import {
  Button,
  Card,
  // Layout,
  Modal,
  Radio,
  RadioGroup,
  Text,
} from "@ui-kitten/components";
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
  setNotFinishedQuestions,
  unsaveQuestion,
} from "../../../redux/actions/questionAction";
import { doQuestion } from "../../../redux/actions/userAction";
import { getRandomArrayElements } from "../../../helper";
import { LoadingIndicator } from "../../../components/loading/loadingIndicator";

export const MockExamScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  // redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.questionReducer);
  const [arr] = React.useState(getRandomArrayElements(data.questionData, 100));

  // console.log(getRandomArrayElements(data.questionData, 100).length, arr.length)

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
  const notFinishedQuestions = (currentQuestion) => {
    if (selectedIndex !== -1) {
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
      dispatch(setNotFinishedQuestions({
        res: "unfinished",
        pick: null
      }, currentQuestion + 1))
    } else {
      dispatch(setNotFinishedQuestions({
        res: "unfinished",
        pick: null
      }, currentQuestion))
    }
    setCurrentQuestion(100)
  };

  // Reviews
  const Reviews = ({ d }) => {
    const arr = ["A", "B", "C", "D"];

    return (
      <View>
        {d.map((item, index) => {
          return (
            <View
              style={
                item.result.res === "unfinished" ? styles.notFinishedCard :  item.result.res ? styles.correctCard : styles.inCorrectCard
              }
              key={index}
            >
              <View>
                <Text category="s1" style={styles.reviewTitle}>{`Question ${
                  index + 1
                }: ${d[index].Question}`}</Text>
                <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`A. ${d[index].Answer1}`}</Text>
                <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`B. ${d[index].Answer2}`}</Text>
                <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`C. ${d[index].Answer3}`}</Text>
                <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`D. ${d[index].Answer4}`}</Text>
                <Text
                  category="s1"
                  style={styles.answerReview}
                >{item.result.pick ? `Your answer: ${arr[item.result.pick]}` : "Your answer: Not Finished"}</Text>
                <Text
                  category="s1"
                  style={styles.answerReview}
                >{`Correct answer: ${
                  arr[parseInt(d[index].CorrectAnswer) - 1]
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
          {/* reviews */}
          <TopBar title="Real Mock Exam Review" navigation={navigation} hasBack={true} />
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
            <Reviews d={data.questionData} />
          </ScrollView>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* questions */}
          <TopBar
            title={"Question " + `${currentQuestion + 1}`}
            navigation={navigation}
            hasBack={true}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.quizCard}>
              <ProgressBar
                target="10"
                isTimer={true}
                setTimeoutDisplay={setTimeoutDisplay}
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
      {/* time over Modal */}
      <Modal
        visible={timeoutDisplay}
        style={styles.modal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {
          setLoading(true);
          setTimeoutDisplay(false);
          notFinishedQuestions(currentQuestion);
          setLoading(false);
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
          <Text category="h3" style={{textAlign: "center", fontWeight: "bold"}}>Time Over</Text>
          <Text category="h6" style={styles.modalTitle}>
            Your Mock Exam Is Over
          </Text>
          <Button
            onPress={() => {
              setLoading(true);
              notFinishedQuestions(currentQuestion);
              setTimeoutDisplay(false);
              // setTimeout(() => {
              // }, 1000)
            }}
            style={{borderRadius: 25, marginTop: 8}}
            accessoryLeft={ loading ? LoadingIndicator : null }
          >
            Exam Results
          </Button>
        </Card>
      </Modal>
    </React.Fragment>
  );
};
