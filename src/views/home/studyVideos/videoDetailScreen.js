import React from "react";
import { View } from "react-native";
import { Button, Text, TopNavigation } from "@ui-kitten/components";
// redux
import { Video } from "expo-av";
import { BackIcon } from "../../../components/icons/icons";
import Constants from 'expo-constants';

export const VideosDetailScreen = ({ route, navigation }) => {
  const { videoDetail } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };
  
  const BackAction = () => (
    <Button appearance='ghost' accessoryLeft={BackIcon} onPress={navigateBack} size="small"/>
  );

  return (
    <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <TopNavigation
        title={() => (
          <Text category="s1">
            {videoDetail.title}
          </Text>
        )}
        accessoryLeft={BackAction}
      />
      <View style={{ flex: 1 }}>
        <Video
          source={{ uri: videoDetail.address }}
          shouldPlay
          useNativeControls
          resizeMode="contain"
          style={{ width: "100%", height: "100%", backgroundColor: "#000" }}
        />
      </View>
    </View>
  );
};
