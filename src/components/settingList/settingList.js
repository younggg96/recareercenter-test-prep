import React from "react";
import { Linking, Share, StyleSheet, Text } from "react-native";
import { Menu, MenuItem } from "@ui-kitten/components";

import Toast from "react-native-simple-toast";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  menuItem: {
    paddingHorizontal: 32,
    height: 60,
  },
  itemTitle: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: "400",
  },
});

export const SettingList = (props) => {
  const { settings, navigation } = props;

  const navigatorTo = (link) => {
    navigation.navigate(link);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'CFREE Real Estate Exam Prep APP help you learn everything real estate. IOS App available now!',
      });
      if (result.action === Share.sharedAction) {
        Toast.show(
          "Thank you for sharing",
          Toast.SHORT
        );
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        Toast.show(
          "Failed to share",
          Toast.SHORT
        );
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Menu style={styles.container}>
      {settings.map((setting, index) => {
        if (setting.url) {
          return (
            <MenuItem
              style={styles.menuItem}
              key={index}
              title={evaProps => <Text {...evaProps} style={styles.itemTitle}>{setting.title}</Text>}
              disabled={setting.disable}
              accessoryLeft={setting.icon}
              accessoryRight={setting.rightIcon}
              onPress={() => Linking.openURL(setting.url)}
            />
          )
        }
        return (
          <MenuItem
            style={styles.menuItem}
            key={index}
            title={evaProps => <Text {...evaProps} style={styles.itemTitle}>{setting.title}</Text>}
            disabled={setting.link ? setting.disable : null}
            accessoryLeft={setting.icon}
            accessoryRight={setting.rightIcon}
            onPress={setting.link ? () => navigatorTo(setting.link) : () => onShare()}
          />
        );
      })}
    </Menu>
  );
};
