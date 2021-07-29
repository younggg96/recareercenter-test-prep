import React from "react";
import { useEffect } from "react";
import { Drawer, DrawerGroup, DrawerItem } from '@ui-kitten/components';
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TopBar } from "../../../components/topBar/topBar";
import { getExamData } from "../../../helper/api";
import { useSelector } from "react-redux";
import { Text } from "@ui-kitten/components";
import { styles } from "../../../styles/home/home/quizStyle";

// icons
import { ForwardSmallIcon } from "../../../components/icons/icons";

export const ExamHistoryScreen = ({ navigation }) => {

  const [exams, setExams] = React.useState([]);
  const { userData } = useSelector(state => state.userReducer);

  useEffect(() => {
    const res = getExamData(userData.uid);
    res.then((res) => {
      setExams(res);
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Exam History" hasBack={true} navigation={navigation} />
      {exams && exams.length ?
        <ScrollView showsVerticalScrollIndicator={false}>
          <Drawer>
            {exams.map((item, index) => {
              return (
                <DrawerGroup title={() => <Text category="h6" style={{ paddingHorizontal: 8 }}>{item.examDate}</Text>} key={item.id}>
                  {item.examList.map((item, index) => {
                    return (
                      <DrawerItem
                        title={<Text category="s2">{`Exam ${index + 1}. Score: ${item.examScore}`}</Text>}
                        key={item.id}
                        accessoryRight={ForwardSmallIcon}
                        onPress={() => {
                          console.log(item.id)
                        }} />)
                  })}
                </DrawerGroup>
              )
            })}
          </Drawer>
          <Text appearance="hint" style={{ ...styles.title, paddingHorizontal: 24, paddingVertical: 8, fontSize: 12, marginTop: 0 }}>(Only show up the exams you finished)</Text>
        </ScrollView> :
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text category="h3" appearance="hint">
            No Exam History
          </Text>
          <Text appearance="hint" style={{ ...styles.title, paddingHorizontal: 24, paddingVertical: 8, fontSize: 12, marginTop: 0 }}>(Only show up the exams you finished)</Text>
        </View>
      }
    </View>
  );
};
