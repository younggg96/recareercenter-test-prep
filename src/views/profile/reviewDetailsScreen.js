import React from 'react';
import { View, } from 'react-native';
import { Button, Icon, Layout, Radio, RadioGroup, Text } from '@ui-kitten/components';
import { ScrollView } from "react-native-gesture-handler";
import { TopBar } from '../../components/topBar/topBar';
import { styles } from '../../styles/home/reviewsScreenStyle';

export const ReviewDetailsScreen = ({ route, navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [viewAnswer, setViewAnswer] = React.useState(false);
  const { question } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <TopBar title={`Question ${question.id}`} navigation={navigation} hasBack={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.questionCard}>
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
            disabled={selectedIndex === -1 ? true : false}
            onPress={() => setViewAnswer(!viewAnswer)}
          >
            View Answer
          </Button>
        </View>
        {viewAnswer && <View style={styles.questionCard}>
          <Text category="s1" appearance="hint">Result:</Text>
          <Text category="h3">{JSON.stringify(selectedIndex + 1 === parseInt(question.correct_ans)).toUpperCase()}</Text>
        </View>}
      </ScrollView>
    </View>
  );
};