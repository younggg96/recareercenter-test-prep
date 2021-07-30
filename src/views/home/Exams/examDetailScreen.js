import React, { useEffect } from 'react';
import { View } from 'react-native';
// ui
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { Text } from '@ui-kitten/components';
import { getExamDetails } from '../../../helper/api';
import { TopBar } from '../../../components/topBar/topBar';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuestion } from '../../../redux/actions/questionAction';
import { styles } from '../../../styles/home/home/quizStyle';
import { LikeIcon, UnlikeIcon } from '../../../components/icons/icons';

export const ExamDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [examDetails, setExamDetails] = React.useState([]);

  // redux
  const dispatch = useDispatch();
  const { savedIdList } = useSelector((state) => state.questionReducer);
  const { userData } = useSelector((state) => state.userReducer);

  const arr = ["A", "B", "C", "D"];

  useEffect(() => {
    const res = getExamDetails(id);
    res.then((res) => {
      setExamDetails(res);
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Exam Details" hasBack={true} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text category="h5" style={{ paddingHorizontal: 24, marginVertical: 8 }} appearance="hint">Your Incorrect Questions: </Text>
        {examDetails.length ? examDetails.map((item, index) => {
          const question = item.question;
          return (
            <View
              style={
                item.userChoice == question.correct_ans ? styles.correctCard : styles.inCorrectCard
              }
              key={index}
            >
              <View>
                <Text category="s1" style={styles.reviewTitle}>{`Question ${question.id}: ${question.questionName}`}</Text>
                <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`A. ${question.answer_1}`}</Text>
                <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`B. ${question.answer_2}`}</Text>
                {question.answer_3 && <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`C. ${question.answer_3}`}</Text>}
                {question.answer_4 && <Text
                  category="s2"
                  style={styles.reviewContent}
                >{`D. ${question.answer_4}`}</Text>}
                <Text
                  category="s1"
                  style={styles.answerReview}
                >{`Your answer: ${arr[item.userChoice - 1]}`}</Text>
                <Text
                  category="s1"
                  style={styles.answerReview}
                >{`Correct answer: ${arr[parseInt(question.correct_ans) - 1]
                  }`}</Text>
              </View>
              {savedIdList && (<View style={styles.controlBtn}>
                <Button
                  style={{ borderRadius: 16, paddingVertical: 6 }}
                  status="control"
                  appearance="outline"
                  accessoryLeft={!savedIdList.includes(question.id) ? UnlikeIcon : LikeIcon}
                  onPress={
                    !savedIdList.includes(question.id)
                      ? () => dispatch(saveQuestion(question, userData.uid))
                      : () => dispatch(unsaveQuestionReturnIds(question, userData.uid))
                  }
                >
                  {!savedIdList.includes(question.id) ? "Save" : "Saved"}
                </Button>
              </View>)}
            </View>
          );
        }) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text category="h6" style={{ paddingHorizontal: 24, marginVertical: 8 }} appearance="hint">Nothing, did a great job!</Text>
        </View>}
      </ScrollView>
    </View>
  );
};