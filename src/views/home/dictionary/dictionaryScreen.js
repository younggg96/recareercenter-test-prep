import React, { Component, useEffect } from "react";
// ui
import { View } from "react-native";
import {
  Button,
  Card,
  Input,
  List,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import {
  ListIcon,
  SearchIcon,
  StarIcon,
  StarOutlineIcon,
} from "../../../components/icons/icons";
import { styles } from "../../../styles/home/dicStyle";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getSavedWord, saveWord, unSaveWord } from "../../../redux/actions/dicAction";


const WordsList = ({ text }) => {
  const { list, savedWord } = useSelector((state) => state.dicReducer);
  const { userData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedWord(userData.uid));
  }, [])

  // save
  const save = (did) => {
    dispatch(saveWord(userData.uid, did));
    // successAddedAlert(item);
  };

  // unsave
  const unSave = (did) => {
    dispatch(unSaveWord(userData.uid, did));
  };

  // filter
  const filterData = (text) => {
    const filtered = list.filter((ele) => {
      return ele.word.indexOf(text) != -1;
    });
    return filtered;
  };

  const renderItem = (info) => {
    return (
      <Card style={styles.item} disabled>
        <View style={styles.itemHeader}>
          <Text category="h5" style={{ width: 200 }}>
            {info.item.word}
          </Text>
          {savedWord.includes(info.item.id) ? (
            <Button
              style={styles.button}
              appearance="ghost"
              accessoryLeft={StarIcon}
              onPress={() => unSave(info.item.id)}
            />
          ) : (
            <Button
              style={styles.button}
              appearance="ghost"
              accessoryLeft={StarOutlineIcon}
              onPress={() => save(info.item.id)}
            />
          )}
        </View>
        <Text category="s2">{info.item.value}</Text>
      </Card>
    );
  };

  return (
    <React.Fragment>
      {!filterData(text).length ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text category="h3" appearance="hint">
            No Search Result
          </Text>
        </View>
      ) : (
        <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={filterData(text)}
          renderItem={renderItem}
        />
      )}
    </React.Fragment>
  );
};

export const DictionaryScreen = ({ navigation }) => {
  const [filterText, setFilterText] = React.useState("");

  // navigation
  const navigateTo = () => {
    navigation.navigate("SavedListScreen");
  };

  return (
    <View style={{ flex: 1 }}>
      <TopNavigation
        title={() => (
          <Text category="s1" style={styles.topTitle}>
            Dictionary
          </Text>
        )}
        accessoryRight={() => (
          <Button
            style={styles.button}
            appearance="ghost"
            accessoryLeft={ListIcon}
            onPress={navigateTo}
          />
        )}
        style={styles.topBar}
      />
      <Card disabled>
        <Input
          focusable
          autoCapitalize='none'
          placeholder={"Search..."}
          accessoryRight={SearchIcon}
          onChangeText={(e) => {
            setFilterText(e);
          }}
          value={filterText}
          style={{ borderRadius: 25 }}
        />
      </Card>
      <WordsList text={filterText} />
    </View>
  );
};
