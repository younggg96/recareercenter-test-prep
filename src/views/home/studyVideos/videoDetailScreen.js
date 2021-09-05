import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
// redux
import { TopBar } from '../../../components/topBar/topBar';
import { Video } from 'expo-av';


export const VideosDetailScreen = ({ route, navigation }) => {
  const { videoDetail } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <TopBar title={videoDetail.title} navigation={navigation} hasBack={true} />
      <View style={{ flex: 1 }}>
        <Video
          source={{ uri: videoDetail.address }}
          shouldPlay
          useNativeControls
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
};