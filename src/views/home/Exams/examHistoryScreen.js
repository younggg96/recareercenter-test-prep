import React from "react";
import { Drawer, DrawerGroup, DrawerItem } from '@ui-kitten/components';
import { ActivityIndicator, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TopBar } from "../../../components/topBar/topBar";
import { Text } from "@ui-kitten/components";
import { styles } from "../../../styles/home/home/quizStyle";

// icons
import { ForwardSmallIcon } from "../../../components/icons/icons";
import { useEffect } from "react";

export const ExamHistoryScreen = ({ route, navigation }) => {
  // const { exams } = route.params;
  const [exams, setExams] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setExams(route.params.exams)
      setLoading(false);
    }, 500);
  }, [])

  const navigateToDetail = (id) => {
    navigation.navigate("ExamDetailsScreen", { id })
  }

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Exam History" hasBack={true} navigation={navigation} />
      <Text appearance="hint" style={{ ...styles.title, paddingHorizontal: 24, paddingBottom: 8, fontSize: 12, marginTop: 0, display: exams.length ? 'flex' : 'none' }}>(Only show up the exams you finished)</Text>
      {!loading ? exams && exams.length ?
        <View style={{ flex: 1 }}>
          <Drawer>
            <FlatList
              data={exams}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <DrawerGroup title={() => <Text category="h6" style={{ paddingHorizontal: 8 }}>{item.examDate}</Text>} key={item.id}>
                    {
                      item.examList.map((item, index) => {
                        return (
                          <DrawerItem
                            title={<Text category="s2">{`Exam ${index + 1}. Score: ${item.examScore}`}</Text>}
                            key={item.id}
                            accessoryRight={ForwardSmallIcon}
                            onPress={() => navigateToDetail(item.id)} />
                        )
                      })
                    }
                  </DrawerGroup>
                )
              }}
            />
          </Drawer>
        </View> :
        // no data
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text category="h3" appearance="hint">
            No Exam History
          </Text>
          <Text appearance="hint" style={{ ...styles.title, paddingHorizontal: 24, paddingVertical: 8, fontSize: 12, marginTop: 0 }}>(Only show up the exams you finished)</Text>
        </View> :
        // loading
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator style={{ marginBottom: 6 }} />
          <Text category="s1" appearance="hint">
            Loading...
          </Text>
        </View>
      }
    </View>
  );
};
