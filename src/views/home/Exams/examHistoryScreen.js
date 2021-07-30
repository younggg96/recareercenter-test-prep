import React from "react";
import { Drawer, DrawerGroup, DrawerItem } from '@ui-kitten/components';
import { View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TopBar } from "../../../components/topBar/topBar";
import { Text } from "@ui-kitten/components";
import { styles } from "../../../styles/home/home/quizStyle";

// icons
import { ForwardSmallIcon } from "../../../components/icons/icons";

export const ExamHistoryScreen = ({ route, navigation }) => {
  const { exams } = route.params;

  const navigateToDetail = (id) => {
    navigation.navigate("ExamDetailsScreen", { id })
  }

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Exam History" hasBack={true} navigation={navigation} />
      {exams && exams.length ?
        <View>
          <Text appearance="hint" style={{ ...styles.title, paddingHorizontal: 24, paddingBottom: 8, fontSize: 12, marginTop: 0 }}>(Only show up the exams you finished)</Text>
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
          </View>
        </View> :
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
