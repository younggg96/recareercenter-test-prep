import React, { useEffect } from "react";
import { useRef } from "react";
// ui
import { Image, Linking, Platform, TouchableOpacity, View } from "react-native";
import {
  Button,
  Card,
  Icon,
  Layout,
  Modal,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import { styles } from "../../components/topBar/topBar";
import { homeStyles } from "../../styles/home/homeStyle";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

// redux
import { useDispatch, useSelector } from "react-redux";
import { FlatList, ScrollView } from "react-native-gesture-handler";
// const
import { itemWidth, sliderWidth } from "../../constants";
// data
import { ENTRIES1 } from "../../static/entries";
import { Categories } from "../../static/questions/category";
import { refreshQuiz } from "../../redux/actions/questionAction";
import { LockVideoIcon, PlayIcon } from "../../components/icons/icons";
import { getQuestionCategories } from "../../helper/api";

// import { Permissions, Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { connectAsync } from "expo-in-app-purchases";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
const sendPushNotification = async(expoPushToken) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export const HomeScreen = ({ navigation }) => {
  const [toPlanVisible, setToPlanVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // redux
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  useEffect(() => {
    (async function init() {

      try {
        const connect_res = await connectAsync();
        alert("connect: " + JSON.stringify(connect_res));
      } catch (err) {
        alert("general error for connect async: " + err);
      }

    })();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('222', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    // miss plan, modal show up
    if (!new Date(userData.examStartDate).getTime() || !new Date(userData.practiceStartDate).getTime) {
      setToPlanVisible(true);
    }
  }, [])

  useEffect(() => {
    getQuestionCategories().then((res) => {
      setCategories(res.slice(0, 4));
    })
  }, [])

  // navigations
  const navigateTo = (link) => Linking.openURL(link);

  const navigateToQuiz = () => {
    dispatch(refreshQuiz());
    navigation.navigate("QuizScreen");
  };

  const navigateToPlan = () => {
    navigation.navigate("StudyPlanScreen");
  };

  const navigateToAllQuestion = () => {
    navigation.navigate("AllCategroyScreen");
  };

  const navigateToReview = () => {
    navigation.navigate("ReviewsScreen");
  };

  const navigateToVideosList = () => {
    navigation.navigate("VideosListScreen");
  };

  const navigateToMembership = () => {
    navigation.navigate("MembershipScreen");
  };

  const navigateToPractice = (id, name) => {
    navigation.navigate("PracticeScreen", {
      id: id,
      practice: name,
    });
  };

  const renderItem = ({ item }, parallaxProps) => {
    return (
      <View>
        <View style={homeStyles.itemContainer}>
          <Image source={{ uri: item.img }} style={homeStyles.image} />
          {/* <ParallaxImage
            source={{ uri: item.img }}
            // containerStyle={styles.imageContainer}
            style={homeStyles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          /> */}
          <View style={homeStyles.text}>
            <Text category="h6" style={homeStyles.classTitle}>
              {item.title}
            </Text>
            <Text category="s2" style={homeStyles.classSubtitle}>
              {item.subtitle}
            </Text>
            <Button
              style={[homeStyles.button, homeStyles.exploreBtn]}
              onPress={() => navigateTo(item.link)}
            >
              {(evaProps) => (
                <Text category="label" {...evaProps}>
                  Explore
                </Text>
              )}
            </Button>
          </View>
        </View>
      </View>
    );
  };

  const ItemCard = ({ item }) => {
    return (
      <React.Fragment>
        {userData.membership === "1" ? (
          <React.Fragment>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setVisible(true)}
            >
              <Layout level="4" style={homeStyles.item}>
                <Text category="h6" style={homeStyles.categoryTitle}>
                  {item.categoryName}
                </Text>
                <View style={homeStyles.itemLockedContent}>
                  <Text category="s1" style={{ color: "#fff" }}>
                    Items: {item.itemNum}
                  </Text>
                  <Icon
                    name="lock"
                    fill="#fff"
                    style={{ width: 16, height: 16 }}
                  />
                </View>
              </Layout>
            </TouchableOpacity>
          </React.Fragment>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
              onPress={() => navigateToPractice(item.id, item.categoryName)}
          >
            <Layout level="2" style={homeStyles.item}>
              <Text category="h6" style={homeStyles.categoryTitle}>
                {item.categoryName}
              </Text>
              <View style={homeStyles.itemContent}>
                <Text category="s1" style={{ color: "#fff" }}>
                  Items: {item.itemNum}
                </Text>
              </View>
            </Layout>
          </TouchableOpacity>
        )}
      </React.Fragment>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TopNavigation
        title={() => (
          <Text category="s1" style={styles.topTitle}>
            Home
          </Text>
        )}
        style={styles.topBar}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousel
          data={ENTRIES1}
          renderItem={renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          loop={true}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          containerCustomStyle={homeStyles.slider}
          contentContainerCustomStyle={homeStyles.sliderContentContainer}
          activeSlideAlignment={"center"}
        />
        <View style={homeStyles.content}>
          <View style={homeStyles.header}>
            <Text category="h3" style={homeStyles.title}>
              Today's Plan
            </Text>
            <Button appearance="ghost" onPress={navigateToPlan}>
              Adjust plan
            </Button>
          </View>
          <View style={homeStyles.plan}>
            <View style={homeStyles.contentItem}>
              <Text category="s2">To learn</Text>
              <Text category="h4" style={homeStyles.amount}>
                {userData.targetPractice - userData.dailyPractice}
              </Text>
            </View>
            <View style={homeStyles.contentItem}>
              <Text category="s2">Finished</Text>
              <Text category="h4" style={homeStyles.amount}>
                {userData.dailyPractice}
              </Text>
            </View>
          </View>
          <Text category="s2" appearance="hint" style={homeStyles.time}>
            Estimated time 10 mins
          </Text>
          <Button style={homeStyles.button} onPress={navigateToQuiz}>
            Let's Start A Quiz
          </Button>
          <Button appearance="ghost" style={{ ...homeStyles.button, marginTop: 8 }} onPress={navigateToReview}>
            Review Questions
          </Button>
        </View>
        <View style={homeStyles.content}>
          <View style={homeStyles.header}>
            <View>
              <Text category="h3" style={homeStyles.title}>
                Questions
              </Text>
              <Text category="s2" style={{ marginBottom: 8 }}>
                65 Free of 555 Items
              </Text>
            </View>
            <Button appearance="ghost" onPress={navigateToAllQuestion}>
              View All
            </Button>
          </View>
          <View style={homeStyles.container}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={ItemCard}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
        <View style={homeStyles.content}>
          <View style={homeStyles.header}>
            <Text category="h4" style={homeStyles.title}>
              NJ 21 Video Exam Cram
            </Text>
          </View>
          <View style={homeStyles.header}>
            <Image
              source={require("../../../assets/img/21-videos.png")}
              style={{ width: '40%', height: 150 }}
            />
            <View style={{ width: '55%', justifyContent: 'center' }}>
              <Text category="p2" style={{ width: '100%', marginBottom: 8 }}>
                Our experts teachers guide you step by step through the key information you will need to know to pass your state real estate exam.
              </Text>
              <Button
                accessoryLeft={!userData.membership ? PlayIcon : LockVideoIcon}
                onPress={userData.membership === "2" || userData.membership === "3"  ? () => {
                  navigateToVideosList();
                } : () => setVisible(true)}
                size='small'
                style={userData.membership === "2" || userData.membership === "3" ? homeStyles.button : { ...homeStyles.button, backgroundColor: '#666666', borderColor: '#000' }}
              >
                Watch it now
              </Button>
            </View>
          </View>
        </View>
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
              source={require("../../../assets/img/vip.jpg")}
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
      <Modal
        style={homeStyles.modal}
        visible={toPlanVisible}
        backdropStyle={homeStyles.backdrop}
      >
        <Card disabled={true} style={{ ...homeStyles.modalCard, height: 420 }}>
          <View style={{ marginBottom: 8 }}>
            <Image
              source={require("../../../assets/img/empty-plan.jpg")}
              style={{ width: '100%', height: 200, marginBottom: 16 }}
            />
            <Text category="h5" style={{ ...homeStyles.modalTitle, textAlign: 'center' }}>
              Study Plan Is Not Completed!
            </Text>
          </View>
          <Button
            onPress={() => {
              setToPlanVisible(false);
              navigateToPlan();
            }}
            style={{ marginBottom: 12 }}
          >
            Set Your Study Plan
          </Button>
          <Button
            onPress={() => {
              setToPlanVisible(false);
            }}
            appearance='ghost'
          >
            Skip
          </Button>
        </Card>
      </Modal>
    </View>
  );
};
