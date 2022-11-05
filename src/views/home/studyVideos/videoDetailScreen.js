import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TopNavigation } from "@ui-kitten/components";
// redux
import { Video } from "expo-av";
import { BackIcon } from "../../../components/icons/icons";
import Constants from 'expo-constants';

export const VideosDetailScreen = ({ route, navigation }) => {
  const { videoDetail } = route.params;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setMounted(true)
    }, 1000);
    return () => clearTimeout(id);
  })

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <Button appearance='ghost' accessoryLeft={BackIcon} onPress={navigateBack} size="small" />
  );

  return (
    <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <TopNavigation
        title={() => (
          <Text category="s1" style={{ paddingHorizontal: 8 }}>
            {videoDetail.title}
          </Text>
        )}
        accessoryLeft={BackAction}
      />
      <View style={{ flex: 1 }}>
        {mounted ?

          <Video
            source={{ uri: videoDetail.address }}
            shouldPlay
            useNativeControls
            resizeMode="contain"
            ignoreSilentSwitch={'ignore'}
            style={{ width: "100%", height: "100%", backgroundColor: "#000" }}
          /> :
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text category="h3" appearance="hint">
              Loading...
            </Text>
          </View>
        }
      </View>
    </View>
  );
};
