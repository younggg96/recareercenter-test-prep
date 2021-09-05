import React, { useEffect } from 'react';
// ui
import { View } from 'react-native';
import { ListItem } from '@ui-kitten/components';
import { Divider, List, Text } from '@ui-kitten/components';
// redux
import { useDispatch } from 'react-redux';
// components
import { ForwardSmallIcon } from '../../../components/icons/icons';
import { TopBar } from '../../../components/topBar/topBar';
import { getAllVideos } from '../../../helper/api';


export const VideosListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [videos, setVideos] = React.useState([]);
  const navigateToDetail = (data) => {
    navigation.navigate("VideosDetailScreen", { videoDetail: data });
  }

  useEffect(() => {
    const res = getAllVideos();
    res.then((res) => {
      setVideos(res);
    })
  }, [])

  const renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={() => navigateToDetail(item)}
        title={`${item.id}. ${item.title}`}
        accessoryRight={ForwardSmallIcon}
      />
    )
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Videos" navigation={navigation} hasBack={true} />
      {/* <Text category="p2">
        {JSON.stringify(videos, null, 2)}
      </Text> */}
      <View style={{ flex: 1 }}>
        {videos.length ? (
          <List
            ItemSeparatorComponent={Divider}
            data={videos}
            renderItem={renderItem}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text category="h3" appearance="hint">
              Loading...
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};