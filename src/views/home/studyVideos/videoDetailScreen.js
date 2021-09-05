import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
// redux
import { TopBar } from '../../../components/topBar/topBar';


export const VideosDetailScreen = ({ route, navigation }) => {
  const { videoDetail } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <TopBar title={videoDetail.title} navigation={navigation} hasBack={true} />
      <View style={{ flex: 1 }}>
        <Text category="p2">
          {JSON.stringify(videoDetail, null, 2)}
        </Text>
        {/* <Video
          ref={video}
          style={styles.video}
          source={{
            uri: videoDetail.address,
          }}
          useNativeControls
          resizeMode="cover"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
        </View> */}
      </View>
    </View>
  );
};