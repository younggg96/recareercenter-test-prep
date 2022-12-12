import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Button, Text, TopNavigation } from "@ui-kitten/components";
// redux
import { Audio, Video } from "expo-av";
import { BackIcon } from "../../../components/icons/icons";
import Constants from 'expo-constants';
import Toast from "react-native-simple-toast";

const triggerAudio = async (ref) => {
  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  ref.current.playAsync();
};

export const VideosDetailScreen = ({ route, navigation }) => {
  const { videoDetail } = route.params;
  const [status, setStatus] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    if (status.isBuffering) {
      Toast.show(
        "Video is loading...",
        Toast.SHORT
      );
    }
    if (status.isPlaying) triggerAudio(ref);
  }, [ref, status.isBuffering, status.isPlaying]);

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
        <Video
          source={{ uri: videoDetail.address }}
          shouldPlay
          useNativeControls
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
          ref={ref}
          onPlaybackStatusUpdate={(status) => setStatus(status)}
        />
      </View>
    </View>
  );
};
