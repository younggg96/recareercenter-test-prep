import React from "react";
import { Linking, StyleSheet, Text } from "react-native";
import { Menu, MenuItem } from "@ui-kitten/components";

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
  const settings = props.settings
  return (
    <Menu style={styles.container}>
      {settings.map((setting, index) => {
        if (setting.title === "Visit Our Online Store") {
          return (
            <MenuItem
              style={styles.menuItem}
              key={index}
              title={evaProps => <Text {...evaProps} style={styles.itemTitle}>{setting.title}</Text>}
              disabled={setting.disable}
              accessoryLeft={setting.icon}
              accessoryRight={setting.rightIcon}
              onPress={() => Linking.openURL('http://recareercenter.com')}
            />
          )
        }
        return (
          <MenuItem
            style={styles.menuItem}
            key={index}
            title={evaProps => <Text {...evaProps} style={styles.itemTitle}>{setting.title}</Text>}
            disabled={setting.disable}
            accessoryLeft={setting.icon}
            accessoryRight={setting.rightIcon}
          />
        );
      })}
    </Menu>
  );
};
