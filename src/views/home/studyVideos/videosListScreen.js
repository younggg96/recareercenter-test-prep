import React, { useEffect } from 'react';
// ui
import { Image, ScrollView, View } from 'react-native';
import { Button, Card, ListItem, Modal } from '@ui-kitten/components';
import { Divider, List, Text } from '@ui-kitten/components';
// redux
import { useDispatch, useSelector } from 'react-redux';
// components
import { ForwardSmallIcon, LockVideoIcon, PlayIcon } from '../../../components/icons/icons';
import { TopBar } from '../../../components/topBar/topBar';
import { getAllVideos } from '../../../helper/api';
import { homeStyles } from '../../../styles/home/homeStyle';


export const VideosListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [videos, setVideos] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const { userData } = useSelector((state) => state.userReducer);
  const navigateToDetail = (data) => {
    navigation.navigate("VideosDetailScreen", { videoDetail: data });
  }
  const navigateToMembership = () => {
    navigation.navigate("MembershipScreen");
  };

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
      <TopBar title="Videos" navigation={navigation} hasBack={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={homeStyles.content}>
          <View style={homeStyles.header}>
            <Text category="h4" style={homeStyles.title}>
              NJ 21 Video Exam Cram
            </Text>
          </View>
          <View>
            <Image
              source={require("../../../../assets/img/21-videos.png")}
              style={{ width: '100%', height: 300, marginBottom: 8 }}
              resizeMode="contain"
            />
            <View style={{ justifyContent: 'center' }}>
              <Text category="p1" style={{ width: '100%', marginBottom: 8 }}>
                Our expert teachers guide you step by step through the key information you will need to know to pass your state real estate exam.
              </Text>
              {userData.membership === "1" && <Button
                accessoryLeft={LockVideoIcon}
                onPress={() => setVisible(true)}
                style={{ ...homeStyles.button, backgroundColor: '#666666', borderColor: '#fff' }}
              >
                Watch it now
              </Button>}
            </View>
          </View>
        </View>
        {(userData.membership !== "1") &&
          <View style={homeStyles.content}>
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
        }
      </ScrollView>
      <Modal
        style={homeStyles.modal}
        visible={visible}
        backdropStyle={homeStyles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={{ ...homeStyles.modalCard, height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Image
              source={require("../../../../assets/img/vip.jpg")}
              style={{ width: '100%', height: 200, marginBottom: 16 }}
            />
            <Text category="h5">Unlock Practice Questions?</Text>
            <Text category="h6" style={homeStyles.modalTitle}>
              Become A Membership Today!
            </Text>
          </View>
          <Button
            onPress={() => {
              setVisible(false);
              navigateToMembership()
            }}
          >
            Start Membership!
          </Button>
        </Card>
      </Modal>
    </View>
  );
};