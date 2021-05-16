import React from "react";
// ui
import { View } from "react-native";
import { Button, Radio, RadioGroup, Text } from "@ui-kitten/components";

// icons
import { CorrectIcon, IncorrectIcon } from "../../../components/icons/icons";

import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "../../../components/topBar/topBar";
import { ScrollView } from "react-native-gesture-handler";
import { ProgressBar } from "../../../components/progressBar/progressBar";
import { styles } from "../../../styles/home/home/praceticeStyle";
import { Categories } from "../../../static/questions/category";

const Review = ({ result, question, currentQuestion }) => {
  const arr = ["A", "B", "C", "D"];
  const answer = arr[0];
  return (
    <View style={result.res ? styles.correctCard : styles.inCorrectCard}>
      <View style={{ padding: 16, position: "absolute", right: 0, bottom: 0 }} >
        {result.res ? <CorrectIcon /> : <IncorrectIcon />}
      </View>
      <Text category="s1" style={styles.reviewTitle}>{`Question ${
        currentQuestion + 1
      }: ${question.Question}`}</Text>
      <Text
        category="s2"
        style={styles.reviewContent}
      >{`A. ${question.Answer1}`}</Text>
      <Text
        category="s2"
        style={styles.reviewContent}
      >{`B. ${question.Answer2}`}</Text>
      <Text
        category="s2"
        style={styles.reviewContent}
      >{`C. ${question.Answer3}`}</Text>
      <Text
        category="s2"
        style={styles.reviewContent}
      >{`D. ${question.Answer4}`}</Text>
      <Text category="s1" style={styles.answerReview}>{`Your answer: ${
        arr[result.pick]
      }`}</Text>
      <Text category="s1" style={styles.answerReview}>{`Correct answer: ${
        arr[parseInt(question.CorrectAnswer) - 1]
      }`}</Text>
    </View>
  );
};

export const PracticeScreen = ({ route, navigation }) => {
  const { userData } = useSelector((state) => state.userReducer);
  /* states */
  // select item
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  // contorl the index of current question
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  // show result
  const [showResult, setShowResult] = React.useState(false);
  // show total result
  const [totalResult, setTotalResult] = React.useState({});
  // res includes pick item and correction
  const [res, setRes] = React.useState({});

  // feedback arr
  const [dontKnow, setDontKnow] = React.useState([]);
  const [familar, setFamilar] = React.useState([]);
  const [know, setKnow] = React.useState([]);

  const dispatch = useDispatch();

  // pass params from homeScreen
  const { practice, id } = route.params;
  const question = Categories[id].questions[currentQuestion];

  const getResult = () => {
    setSelectedIndex(-1);
    setShowResult(true);
    const itemRes = {
      res: selectedIndex === parseInt(question.CorrectAnswer) - 1,
      pick: selectedIndex,
    };
    setRes(itemRes);
  };

  const addDontKnowQuestion = () => {
    setShowResult(false);
    dontKnow.push(currentQuestion);
    setDontKnow(dontKnow);
    if (currentQuestion === Categories[id].questions.length - 1) {
      setTotalResult({ dontKnow: dontKnow, familar: familar, know: know });
      return;
    } else {
      setTotalResult({});
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const addFamilarQuestion = () => {
    setShowResult(false);
    familar.push(currentQuestion);
    setFamilar(familar);
    if (currentQuestion === Categories[id].questions.length - 1) {
      setTotalResult({ dontKnow: dontKnow, familar: familar, know: know });
      return;
    } else {
      setTotalResult({});
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const addKnowQuestion = () => {
    setShowResult(false);
    know.push(currentQuestion);
    setKnow(know);
    if (currentQuestion === Categories[id].questions.length - 1) {
      setTotalResult({ dontKnow: dontKnow, familar: familar, know: know });
      return;
    } else {
      setTotalResult({});
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <React.Fragment>
      {Object.keys(totalResult).length !== 0 ? (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <TopBar title="Total Reviews" navigation={navigation} />
            <Review
              result={res}
              question={question}
              currentQuestion={currentQuestion}
            />
          </View>
        </View>
      ) : !showResult ? (
        <View style={{ flex: 1 }}>
          <TopBar title={practice} navigation={navigation} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.questionCard}>
              <ProgressBar
                finished={currentQuestion + 1}
                target={Categories[id].questions.length}
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
                onPress={getResult}
                disabled={selectedIndex === -1 ? true : false}
              >
                Next
              </Button>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <TopBar
              title={`Question ${currentQuestion + 1} Answer`}
              navigation={navigation}
            />
            <Review
              result={res}
              question={question}
              currentQuestion={currentQuestion}
            />
          </View>
          <View>
            <Text
              category="s2"
              appearance="hint"
              style={{ paddingHorizontal: 24 }}
            >
              What's your feedback?
            </Text>
            <View
              style={{
                ...styles.questionCard,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                style={{ ...styles.button, marginTop: 0, minWidth: 100 }}
                onPress={addDontKnowQuestion}
                status="danger"
              >
                Don't Know
              </Button>
              <Button
                style={{ ...styles.button, marginTop: 0, minWidth: 100 }}
                onPress={addFamilarQuestion}
                status="warning"
              >
                Familar
              </Button>
              <Button
                style={{ ...styles.button, marginTop: 0, minWidth: 100 }}
                onPress={addKnowQuestion}
                status="success"
              >
                Know
              </Button>
            </View>
          </View>
        </View>
      )}
    </React.Fragment>
  );
};
