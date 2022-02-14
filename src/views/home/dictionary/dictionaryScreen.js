import React, { Component, useEffect } from "react";
// ui
import { View, Image } from "react-native";
import {
  Button,
  Card,
  Input,
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
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
import { homeStyles } from "../../../styles/home/homeStyle";
import { TopBar } from "../../../components/topBar/topBar";


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
  };

  // unsave
  const unSave = (did) => {
    dispatch(unSaveWord(userData.uid, did));
  };

  // filter
  const filterData = (text) => {
    const filtered = list.filter((ele) => {
      return ele.word.toLowerCase().indexOf(text.toLowerCase()) != -1;
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
  const { userData } = useSelector((state) => state.userReducer);

  // navigation
  const navigateTo = () => {
    navigation.navigate("SavedListScreen");
  };
  const navigateToMembership = () => {
    navigation.navigate("MembershipScreen");
  };

  // const renderRightActions = () => (
  //   <React.Fragment>
  //     <TopNavigationAction icon={ListIcon} onPress={navigateTo} />
  //   </React.Fragment>
  // );

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Dictionary" navigation={navigation} hasBack={false} hasRight={userData.membership != "1"} right={
        () => <Button appearance="ghost" accessoryRight={ListIcon} onPress={navigateTo}></Button>
      } />
      {
        userData.membership !== "1" ?
          <React.Fragment>
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
          </React.Fragment> :
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text category="h3" appearance="hint">
              No Access to Dictionary
            </Text>
            <Text category="h6" appearance="hint" style={{ marginBottom: 16 }}>Unlock your Dictionary?</Text>
            <Button
              onPress={() => {
                navigateToMembership();
              }}
            >
              Start Membership!
            </Button>
          </View>
      }
    </View>
  );
};
