import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "../../../styles/home/home/allCategroyListStyle";
import { Layout, Text, Tab, TabView } from "@ui-kitten/components";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { ForwardIcon } from "../../../components/icons/icons";
import { TopBar } from "../../../components/topBar/topBar";
import { getCategoryById, getStatusQuestions } from "../../../helper/api";
import { getStatusQuestionReduxStore } from "../../../redux/actions/questionAction";

export const AllCategroyListScreen = ({ route, navigation }) => {
  const { userData } = useSelector((state) => state.userReducer);
  const { withStatusList } = useSelector((state) => state.questionReducer);
  const dispatch = useDispatch();

  const [allQuestions, setAllQuestions] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const shouldLoadComponent = (index) => index === selectedIndex;

  const cid = route.params.id;

  useEffect(() => {
    const res = getCategoryById(cid);
    res.then((res) => {
      setAllQuestions(res);
    })
  }, [])

  useEffect(() => {
    dispatch(getStatusQuestionReduxStore(userData.uid, cid));
  }, [])

  const splitArr = (list) => {
    let unknowArr = [];
    let familiarArr = [];
    let knowArr = [];
    list.forEach(element => {
      if (element.status === 'unknow') {
        unknowArr.push(element.question);
      } else if (element.status === 'familiar') {
        familiarArr.push(element.question);
      } else if (element.status === 'know') {
        knowArr.push(element.question);
      }
    });
    return { unknowArr, familiarArr, knowArr }
  }

  const navigateToQuestion = (item) => {
    navigation.navigate("PracticeOneQuestionScreen", {
      data: item,
      cid: cid
    });
  }

  const ItemCard = ({ item }) => {
    const { id, questionName } = item;
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigateToQuestion(item)}>
        <View style={styles.ItemCard}>
          <Text category="s2" style={{ width: '90%' }}>{id}. {questionName}</Text>
          <ForwardIcon style={{ width: 20, height: 20 }} />
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title={route.params.categoryName} navigation={navigation} hasBack={true} />
      <View style={styles.content}>
        <TabView
          style={{ flex: 1 }}
          selectedIndex={selectedIndex}
          shouldLoadComponent={shouldLoadComponent}
          onSelect={index => setSelectedIndex(index)}>
          <Tab title={({ style }) => {
            return (
              <Text category="h5" style={{ ...style, fontSize: 20 }}>All</Text>)
          }}>
            <View style={styles.tabContainer}>
              <FlatList
                data={allQuestions}
                renderItem={ItemCard}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </Tab>
          <Tab title="Don' t Know">
            {splitArr(withStatusList).unknowArr.length ?
              <Layout style={styles.tabContainer}>
                <FlatList
                  data={splitArr(withStatusList).unknowArr}
                  renderItem={ItemCard}
                  keyExtractor={(item) => item.id.toString()}
                />
              </Layout>
              :
              <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text category="h4" appearance="hint" style={{ textAlign: 'center' }}>No Questions</Text>
              </Layout>
            }
          </Tab>
          <Tab title='Familiar'>
            {splitArr(withStatusList).familiarArr.length ?
              <Layout style={styles.tabContainer}>
                <FlatList
                  data={splitArr(withStatusList).familiarArr}
                  renderItem={ItemCard}
                  keyExtractor={(item) => item.id.toString()}
                />
              </Layout>
              :
              <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text category="h4" appearance="hint" style={{ textAlign: 'center' }}>No Questions</Text>
              </Layout>
            }
          </Tab>
          <Tab title='Know'>
            {splitArr(withStatusList).knowArr.length ?
              <Layout style={styles.tabContainer}>
                <FlatList
                  data={splitArr(withStatusList).knowArr}
                  renderItem={ItemCard}
                  keyExtractor={(item) => item.id.toString()}
                />
              </Layout>
              :
              <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text category="h4" appearance="hint" style={{ textAlign: 'center' }}>No Questions</Text>
              </Layout>
            }
          </Tab>
        </TabView>
      </View>
    </View>
  );
}