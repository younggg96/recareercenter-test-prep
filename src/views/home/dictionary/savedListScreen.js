import { Button, Card, Layout, List, Text } from "@ui-kitten/components";
import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "../../../components/icons/icons";
import { TopBar } from "../../../components/topBar/topBar";
import { getSavedWord, getSavedWordList, unSaveWord } from "../../../redux/actions/dicAction";
import { styles } from "../../../styles/home/dicStyle";

export const SavedListScreen = ({ navigation }) => {
  const { list, savedWordList } = useSelector((state) => state.dicReducer);
  const { userData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedWordList(userData.uid));
  }, [])

  // unsave
  const unSave = (did) => {
    dispatch(unSaveWord(userData.uid, did));
    setTimeout(() => {
      dispatch(getSavedWordList(userData.uid));
    }, 200)
  };

  const getDicSavedList = () => {
    let arr = []
    savedWordList.forEach(element => {
      list.forEach(el => {
        if (element.id === el.id) {
          arr.push(el);
        }
      });
    });
    return arr;
  }

  // items
  const renderItem = (item) => {
    // console.log(item)
    return (
      <Card style={styles.item} disabled>
        <View style={styles.itemHeader}>
          <Text category="h5" style={{ width: 200 }}>
            {item.item.word}
          </Text>
          <Button
            style={styles.button}
            appearance="ghost"
            accessoryLeft={TrashIcon}
            onPress={() => unSave(item.item.id)}
          />
        </View>
        <Text category="s2">{item.item.value}</Text>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Saved List" navigation={navigation} hasBack={true} />
      {!savedWordList.length ? (
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
          data={getDicSavedList()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};
