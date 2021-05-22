import React, { useEffect } from "react";
// ui
import { Alert, View } from "react-native";
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
// data
import dic from "../../../static/dic/dic.json";
import { useDispatch, useSelector } from "react-redux";
import { saveWord, unSaveWord } from "../../../redux/actions/dicAction";

const data = dic.dic;

export const DictionaryScreen = () => {
  const [seachShow, setSeachShow] = React.useState(false);
  const [pickedInList, setPickedInList] = React.useState(
    Array(data.length).fill(false)
  );
  const textIn = React.useRef(null);
  const dispatch = useDispatch();
  const savedWords = useSelector((state) => state.dicReducer);

  useEffect(() => {
    if (seachShow) {
      textIn.current.focus();
    }
  });

  const save = ({ index, item }) => {
    setPickedInList([
      ...pickedInList.slice(0, index),
      true,
      ...pickedInList.slice(index + 1, pickedInList.length),
    ]);
    dispatch(saveWord({ index, item }));
    successAddedAlert(item);
  };

  const unSave = ({ index, item }) => {
    setPickedInList([
      ...pickedInList.slice(0, index),
      false,
      ...pickedInList.slice(index + 1, pickedInList.length),
    ]);
    dispatch(unSaveWord(index));
  };

  const successAddedAlert = (item) =>
    Alert.alert(`${item.word}`, "Alread added to saved list", [
      { text: "OK", style: "default" },
    ]);

  const showSearch = () => {
    setSeachShow(true);
  };

  console.log(savedWords);

  const renderItem = (info) => {
    return (
      <Card style={styles.item}>
        <View style={styles.itemHeader}>
          <Text category="h5" style={{ width: 200 }}>
            {info.item.word}
          </Text>
          {pickedInList[info.index] ? (
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
    <View style={{ flex: 1 }}>
      <TopNavigation
        title={
          !seachShow
            ? () => (
                <Text category="s1" style={styles.topTitle}>
                  Dictionary
                </Text>
              )
            : null
        }
        accessoryRight={(props) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Input
              {...props}
              placeholder={"Search..."}
              onFocus={showSearch}
              onBlur={() => {
                setSeachShow(false);
              }}
              ref={textIn}
              style={
                !seachShow
                  ? { borderRadius: 25, width: "80%" }
                  : { borderRadius: 25, flex: 1 }
              }
              accessoryLeft={SearchIcon}
            />
            <Button
              style={styles.button}
              appearance="ghost"
              accessoryLeft={ListIcon}
            />
          </View>
        )}
        style={styles.topBar}
      />
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};
