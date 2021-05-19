import React, { useEffect } from "react";
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
import { SearchIcon, StarIcon } from "../../components/icons/icons";
import { styles } from "../../styles/home/dicStyle";
// data
import dic from "../../static/dic/dic.json";

const data = dic.dic;

console.log(dic.dic);

const RenderItem = (info) => {
  return (
    <Card style={styles.item}>
      <View style={styles.itemHeader}>
        <Text category="h5" style={{width: 200}}>{info.item.word}</Text>
        <Button
          style={styles.button}
          appearance="ghost"
          accessoryLeft={StarIcon}
        />
      </View>
      <Text category="s2">{info.item.value}</Text>
    </Card>
  );
};

export const DictionaryScreen = () => {
  const [seachShow, setSeachShow] = React.useState(false);
  const textIn = React.useRef(null);
  useEffect(() => {
    if (seachShow) {
      textIn.current.focus();
    }
  });

  const showSearch = () => {
    setSeachShow(true);
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
              accessoryLeft={StarIcon}
            />
          </View>
        )}
        style={styles.topBar}
      />
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={RenderItem}
      />
    </View>
  );
};
