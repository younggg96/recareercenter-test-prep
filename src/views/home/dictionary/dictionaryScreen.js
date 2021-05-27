import React, { Component } from "react";
// ui
import { Alert, View, TextInput, SafeAreaView } from "react-native";
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
import { saveWord, unSaveWord } from "../../../redux/actions/dicAction";


const WordsList = ({ text }) => {
  const data = useSelector((state) => state.dicReducer);
  const dispatch = useDispatch();

  // alert
  const successAddedAlert = (item) =>
    Alert.alert(`${item.word}`, "Alread added to saved list", [
      { text: "OK", style: "default" },
    ]);

  // save
  const save = ({ index, item }) => {
    dispatch(saveWord({ index, item, saved: true }));
    successAddedAlert(item);
  };

  // unsave
  const unSave = ({ index }) => {
    dispatch(unSaveWord(index));
  };

  // filter
  const filterData = (text) => {
    const filtered = data.list.filter((ele) => {
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
          {info.item.saved ? (
            <Button
              style={styles.button}
              appearance="ghost"
              accessoryLeft={StarIcon}
              onPress={() => unSave(info)}
            />
          ) : (
            <Button
              style={styles.button}
              appearance="ghost"
              accessoryLeft={StarOutlineIcon}
              onPress={() => save(info)}
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
