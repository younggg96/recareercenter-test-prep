import { Button, Card, Layout, List, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "../../../components/icons/icons";
import { TopBar } from "../../../components/topBar/topBar";
import { unSaveWord } from "../../../redux/actions/dicAction";
import { styles } from "../../../styles/home/dicStyle";

export const SavedListScreen = ({ navigation }) => {
  const savedWords = useSelector((state) => state.dicReducer);
  const dispatch = useDispatch();

  // unsave
  const unSave = ({ index }) => {
    dispatch(unSaveWord(index));
  };

  // items
  const renderItem = (info) => {
    return (
      <Card style={styles.item} disabled>
        <View style={styles.itemHeader}>
          <Text category="h5" style={{ width: 200 }}>
            {info.item.item.word}
          </Text>
          <Button
            style={styles.button}
            appearance="ghost"
            accessoryLeft={TrashIcon}
            onPress={() => unSave(info)}
          />
        </View>
        <Text category="s2">{info.item.item.value}</Text>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Saved List" navigation={navigation} />
      {!savedWords.savedWord.length ? (
        // not saved
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text category="h4" appearance="hint">
            No Saved Items
          </Text>
        </View>
      ) : (
        // list of saved item
        <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={savedWords.savedWord}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};
