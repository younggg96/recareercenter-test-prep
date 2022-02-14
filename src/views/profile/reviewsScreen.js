import React from "react";
import { View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "../../components/topBar/topBar";

import { List, ListItem, Divider } from "@ui-kitten/components";
import { useEffect } from "react";
import { getSavedQuestions, unsaveQuestionReturnDetails } from "../../redux/actions/questionAction";
import { styles } from "../../styles/home/reviewsScreenStyle";
import { TrashIcon } from "../../components/icons/icons";

export const ReviewsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);
  const { savedList } = useSelector((state) => state.questionReducer);

  useEffect(() => {
    dispatch(getSavedQuestions(userData.uid));
  }, [])

  const navigateToDetail = (data) => {
    navigation.navigate("ReviewDetailsScreen", { question: data });
  }

  const unsaveItem = (item) => {
    dispatch(unsaveQuestionReturnDetails(item, userData.uid));
  }

  const renderItem = ({ item, index }) => {
    let content = item.questionName;
    if (content.charAt(content.length - 1) !== '.' && content.charAt(content.length - 1) !== '?') {
      content = item.questionName + '...';
    }
    return (
      <ListItem style={{ height: 80 }} onPress={() => navigateToDetail(item)} children={
        <View style={styles.item}>
          <Text category="s2" style={{ width: 300 }}>{`Question ${item.id}. ${content}`}</Text>
          <Button appearance='ghost' accessoryLeft={TrashIcon} onPress={() => unsaveItem(item)} />
        </View>
      } />
    )
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Reviews" navigation={navigation} hasBack={true} />
      <View style={{ flex: 1 }}>
        {savedList.length ? (
          <List
            ItemSeparatorComponent={Divider}
            data={savedList}
            renderItem={renderItem}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text category="h3" appearance="hint">
              No Saved Items
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
