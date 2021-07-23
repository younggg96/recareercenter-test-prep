import React from "react";
// ui
import { View } from "react-native";
import { Button, Card, Radio, RadioGroup, Text } from "@ui-kitten/components";

// icons
import { CorrectIcon, IncorrectIcon } from "../../../components/icons/icons";

import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "../../../components/topBar/topBar";
import { ScrollView } from "react-native-gesture-handler";
import { ProgressBar } from "../../../components/progressBar/progressBar";
import { styles } from "../../../styles/home/home/praceticeStyle";
import { Categories } from "../../../static/questions/category";

// chart
import { PieChart } from "react-native-chart-kit";
import {
  saveQuestion,
  unsaveQuestionReturnIds,
} from "../../../redux/actions/questionAction";
import { doQuestion } from "../../../redux/actions/userAction";

const Review = ({ result, question, currentQuestion }) => {
  const arr = ["A", "B", "C", "D"];
  return (
    <View style={result.res ? styles.correctCard : styles.inCorrectCard}>
      <View style={{ padding: 16, position: "absolute", right: 0, bottom: 0 }}>
        {result.res ? <CorrectIcon /> : <IncorrectIcon />}
      </View>
      <Text category="s1" style={styles.reviewTitle}>{`questionName ${
        currentQuestion + 1
      }: ${question.questionName}`}</Text>
      <Text
        category="s2"
        style={styles.reviewContent}
      >{`A. ${question.answer_1}`}</Text>
      <Text
        category="s2"
        style={styles.reviewContent}
      >{`B. ${question.answer_2}`}</Text>
      <Text
        category="s2"
        style={styles.reviewContent}
      >{`C. ${question.answer_3}`}</Text>
      <Text
        category="s2"
        style={styles.reviewContent}
      >{`D. ${question.answer_4}`}</Text>
      <Text category="s1" style={styles.answerReview}>{`Your answer: ${
        arr[result.pick]
      }`}</Text>
      <Text category="s1" style={styles.answerReview}>{`Correct answer: ${
        arr[parseInt(question.correct_ans) - 1]
      }`}</Text>
      {/* <View style={styles.controlBtn}>
        <Button
          style={{ borderRadius: 16, paddingVertical: 6 }}
          status="control"
          appearance="outline"
          accessoryLeft={!item.saved ? UnlikeIcon : LikeIcon}
          onPress={
            !item.saved
              ? () => dispatch(saveQuestion(item))
              : () => dispatch(unsaveQuestionReturnIds(item))
          }
        >
          {!item.saved ? "Save" : "Saved"}
        </Button>
      </View> */}
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

  // total review
  const TotalReview = ({ totalResult }) => {
    const [showIndex, setShowIndex] = React.useState(2);

    const showDontKnow = () => {
      setShowIndex(2);
    };
    const showFamilar = () => {
      setShowIndex(1);
    };
    const showKnow = () => {
      setShowIndex(0);
    };

    // chart data
    const data = [
      {
        name: "Know",
        population: totalResult.know.length,
        color: "#7EC13F",
        legendFontColor: "#666",
        legendFontSize: 12,
      },
      {
        name: "Familar",
        population: totalResult.familar.length,
        color: "#E2DC28",
        legendFontColor: "#666",
        legendFontSize: 12,
      },
      {
        name: "Don't Know",
        population: totalResult.dontKnow.length,
        color: "#E25D28",
        legendFontColor: "#666",
        legendFontSize: 12,
      },
    ];

    // chart config
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    };

    // correction
    const getCorrection = () => {
      let dontKnowTrueCount = 0;
      let knowTrueCount = 0;
      let familarTrueCount = 0;

      totalResult.dontKnow.forEach((element) => {
        if (element.res.res) {
          dontKnowTrueCount++;
        }
      });

      totalResult.know.forEach((element) => {
        if (element.res.res) {
          knowTrueCount++;
        }
      });

      totalResult.familar.forEach((element) => {
        if (element.res.res) {
          familarTrueCount++;
        }
      });
      return {
        dontKnow: `${dontKnowTrueCount} / ${totalResult.dontKnow.length}`,
        know: `${knowTrueCount} / ${totalResult.know.length}`,
        familar: `${familarTrueCount} / ${totalResult.familar.length}`,
      };
    };

    return (
      <React.Fragment>
        <View
          style={{
            ...styles.questionCard,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text category="s1" appearance="hint">
            Feedback
          </Text>
          <PieChart
            data={data}
            width={280}
            height={100}
            chartConfig={chartConfig}
            accessor={"population"}
            center={[10, 5]}
          />
          <Text category="s1" appearance="hint" style={{ marginVertical: 8 }}>
            Correction
          </Text>
          <View style={styles.correctionCards}>
            <Card
              style={styles.correctionCard}
              status="success"
              onPress={showKnow}
            >
              <Text category="s2" appearance="hint">
                Know:{" "}
              </Text>
              <Text category="s1">{getCorrection().know}</Text>
            </Card>
            <Card
              style={styles.correctionCard}
              status="warning"
              onPress={showFamilar}
            >
              <Text category="s2" appearance="hint">
                Familar:{" "}
              </Text>
              <Text category="s1">{getCorrection().familar}</Text>
            </Card>
            <Card
              style={styles.correctionCard}
              status="danger"
              onPress={showDontKnow}
            >
              <Text category="s2" appearance="hint">
                Don't Know:{" "}
              </Text>
              <Text category="s1">{getCorrection().dontKnow}</Text>
            </Card>
          </View>
        </View>
        <View
          style={{
            ...styles.questionCard,
            paddingHorizontal: 0,
            paddingVertical: 6,
          }}
        >
          {showIndex === 0 ? (
            <View>
              <Text
                category="h6"
                appearance="hint"
                style={{ marginVertical: 8, paddingHorizontal: 24 }}
              >
                Know Questions
              </Text>
              {totalResult.know.length ? (
                totalResult.know.map((item, index) => {
                  return (
                    <Review
                      result={item.res}
                      key={index}
                      question={Categories[id].questions[item.currentQuestion]}
                      currentQuestion={item.currentQuestion}
                    />
                  );
                })
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                  }}
                >
                  <Text category="h6" appearance="hint">
                    No Questions!
                  </Text>
                </View>
              )}
            </View>
          ) : showIndex === 1 ? (
            <View>
              <Text
                category="h6"
                appearance="hint"
                style={{ marginVertical: 8, paddingHorizontal: 24 }}
              >
                Familar Questions
              </Text>
              {totalResult.familar.length ? (
                totalResult.familar.map((item, index) => {
                  return (
                    <Review
                      result={item.res}
                      key={index}
                      question={Categories[id].questions[item.currentQuestion]}
                      currentQuestion={item.currentQuestion}
                    />
                  );
                })
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                  }}
                >
                  <Text category="h6" appearance="hint">
                    No Questions!
                  </Text>
                </View>
              )}
            </View>
          ) : showIndex === 2 ? (
            <View>
              <Text
                category="h6"
                appearance="hint"
                style={{ marginVertical: 8, paddingHorizontal: 24 }}
              >
                Don't Know Questions
              </Text>
              {totalResult.dontKnow.length ? (
                totalResult.dontKnow.map((item, index) => {
                  return (
                    <Review
                      result={item.res}
                      key={index}
                      question={Categories[id].questions[item.currentQuestion]}
                      currentQuestion={item.currentQuestion}
                    />
                  );
                })
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                  }}
                >
                  <Text category="h6" appearance="hint">
                    No Questions!
                  </Text>
                </View>
              )}
            </View>
          ) : null}
        </View>
      </React.Fragment>
    );
  };

  // result
  const getResult = () => {
    setSelectedIndex(-1);
    setShowResult(true);
    dispatch(doQuestion(userData.uid));
    const itemRes = {
      res: selectedIndex === parseInt(question.correct_ans) - 1,
      pick: selectedIndex,
    };
    setRes(itemRes);
  };

  // 3 categroies questions
  const addDontKnowQuestion = () => {
    setShowResult(false);
    dontKnow.push({ currentQuestion, res });
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
    familar.push({ currentQuestion, res });
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
    know.push({ currentQuestion, res });
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
        // total reviews
        <View style={{ flex: 1 }}>
          <TopBar
            title="Total Reviews"
            navigation={navigation}
            hasBack={true}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <TotalReview totalResult={totalResult} />
          </ScrollView>
        </View>
      ) : !showResult ? (
        // question
        <View style={{ flex: 1 }}>
          <TopBar title={practice} navigation={navigation} hasBack={true} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.questionCard}>
              <ProgressBar
                finished={currentQuestion + 1}
                target={Categories[id].questions.length}
              />
              <View>
                <Text category="s1" style={styles.questionTitle}>
                  questionName: {`${question.questionName}`}
                </Text>
              </View>
              <RadioGroup
                selectedIndex={selectedIndex}
                onChange={(index) => setSelectedIndex(index)}
              >
                <Radio>{`A. ${question.answer_1}`}</Radio>
                <Radio>{`B. ${question.answer_2}`}</Radio>
                <Radio>{`C. ${question.answer_3}`}</Radio>
                <Radio>{`D. ${question.answer_4}`}</Radio>
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
        // result
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <TopBar
              title={`questionName ${currentQuestion + 1} answer_`}
              navigation={navigation}
              hasBack={true}
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
