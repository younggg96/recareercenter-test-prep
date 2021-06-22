import React from "react";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "../../components/topBar/topBar";

import { List, ListItem, Divider } from "@ui-kitten/components";

export const ReviewsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { savedList } = useSelector((state) => state.questionReducer);

  const renderItem = ({ item, index }) => (
    <ListItem title={`${item.Id}. ${" "}  ${item.Question}`} />
  );

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
              No Saved Item
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
