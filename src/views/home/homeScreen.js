import React, { useEffect } from "react";
import { useRef } from "react";
// ui
import { ActivityIndicator, Alert, Image, Linking, Platform, TouchableOpacity, View } from "react-native";
import {
  Button,
  Card,
  Datepicker,
  Icon,
  IndexPath,
  Layout,
  Modal,
  Select,
  SelectItem,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import { styles } from "../../components/topBar/topBar";
import { homeStyles } from "../../styles/home/homeStyle";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

// redux
import { useDispatch, useSelector } from "react-redux";
import { FlatList, ScrollView } from "react-native-gesture-handler";
// constants
import Constants from 'expo-constants';
import { itemWidth, sliderWidth } from "../../constants";

import { refreshQuiz } from "../../redux/actions/questionAction";
import { LockVideoIcon, PlayIcon } from "../../components/icons/icons";
import { addClockIn, changeMembership, getCourseList, getQuestionCategories, getSliderData } from "../../helper/api";

import * as Notifications from 'expo-notifications';

// membership
import Toast from "react-native-simple-toast";
import {
  setPurchaseListener,
  finishTransactionAsync,
  IAPResponseCode,
  InAppPurchaseState
} from "expo-in-app-purchases";
// import RNRestart from "react-native-restart";
import { changeMembershipStatus, updateProfile } from "../../redux/actions/userAction";
import { useInterval } from "../../helper/hooks/useInterval";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { SettingList } from "../../components/settingList/settingList";
import { viewOurWebsite } from "../../components/settingList/settingConfig";

const chapters = [
  { id: "-1", name: "Choose chapter..", value: "0" },
  { id: "0", name: "chapter 1", value: "1" },
  { id: "1", name: "chapter 2", value: "2" },
  { id: "2", name: "chapter 3", value: "3" },
  { id: "3", name: "chapter 4", value: "4" },
  { id: "4", name: "chapter 5", value: "5" },
  { id: "5", name: "chapter 6", value: "6" },
  { id: "6", name: "chapter 7", value: "7" },
  { id: "7", name: "chapter 8", value: "8" },
  { id: "8", name: "chapter 9", value: "9" },
  { id: "9", name: "chapter 10", value: "10" },
  { id: "10", name: "chapter 11", value: "11" },
  { id: "11", name: "chapter 12", value: "12" },
  { id: "12", name: "chapter 13", value: "13" },
  { id: "13", name: "chapter 14", value: "14" },
  { id: "14", name: "chapter 15", value: "15" },
  { id: "15", name: "chapter 16", value: "16" },
  { id: "16", name: "chapter 17", value: "17" },
  { id: "17", name: "chapter 18", value: "18" },
  { id: "18", name: "chapter 19", value: "19" },
  { id: "19", name: "chapter 20", value: "20" },
  { id: "20", name: "chapter 21", value: "21" },
  { id: "21", name: "chapter 22", value: "22" },
  { id: "22", name: "chapter 23", value: "23" },
  { id: "23", name: "chapter 24", value: "24" },
  { id: "24", name: "chapter 25", value: "25" },
]

const studyHours = ["Choose hours", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Notifications.scheduleNotificationAsync({
//   content: {
//     title: "Time's up!",
//     body: 'Change sides!',
//   },
//   trigger: {
//     seconds: 60,
//   },
// });

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
    token = (await Notifications.getExpoPushTokenAsync({ experienceId: '@yanggg/CFREE-real-estate-exam-prep' })).data;
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
const sendPushNotification = async (expoPushToken, userData) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: "Don't forget to study!",
    body: `There are ${userData.targetPractice - userData.dailyPractice} questions waiting for you, come on!`,
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
  const [trackerVisible, setTrackerVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [submitError, setSubmitError] = React.useState(false);
  const [all, setAll] = React.useState(0);

  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [sliderData, setSliderData] = React.useState([]);
  const [notification, setNotification] = React.useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // selectedIndex
  const [courseList, setCourseList] = React.useState([{ courseName: '', id: -1 }]);
  const [selectedIndex1, setSelectedIndex1] = React.useState(new IndexPath(0));
  const [selectedIndex2, setSelectedIndex2] = React.useState(new IndexPath(0));
  const [selectedIndex3, setSelectedIndex3] = React.useState(new IndexPath(0));
  const [attendanceDate, setAttendanceDate] = React.useState(new Date());

  // loading
  const [attendanceLoading, setAttendanceLoading] = React.useState(false);
  const [questionLoading, setQuestionLoading] = React.useState(false);

  // redux
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  const uid = userData.uid;

  // push notification
  useInterval(() => {
    if (userData.notification.status) {
      if (new Date().getHours() == userData.notification.time.hours && new Date().getMinutes() == userData.notification.time.mins) {
        if (new Date().getSeconds() == 0) {
          (async () => {
            await sendPushNotification(expoPushToken, userData);
          })()
        }
      }
    }
  }, 1000)

  // async function logNextTriggerDate(hour, minute) {
  //   try {
  //     const nextTriggerDate = await Notifications.getNextTriggerDateAsync({
  //       hour,
  //       minute
  //     });
  //     console.log(nextTriggerDate === null ? 'No next trigger date' : new Date(nextTriggerDate));
  //   } catch (e) {
  //     console.warn(`Couldn't have calculated next trigger date: ${e}`);
  //   }
  // }

  setPurchaseListener(({ responseCode, results, errorCode }) => {
    if (responseCode === IAPResponseCode.OK) {
      results.forEach(async (purchase) => {
        if (!purchase.acknowledged) {
          // console.log('purchase', purchase)
          // in android, consumeItem should be set to false to acknowlege the purchase
          // in iOS this isn't needed because it's already specified in app store connect
          const consumeItem = Platform.OS === "ios";
          finishTransactionAsync(purchase, consumeItem);
          if (purchase.purchaseState == InAppPurchaseState.PURCHASED) {
            if (purchase.productId == 'cfree_member_silver') {
              const res = changeMembership(uid, '2');
              if (res) {
                res.then((data) => {
                  if (data) {
                    dispatch(changeMembershipStatus(data));
                  }
                })
              }
            } else if (purchase.productId == 'cfree_member_gold') {
              const res = changeMembership(uid, '3');
              if (res) {
                res.then((data) => {
                  if (data) {
                    dispatch(changeMembershipStatus(data));
                  }
                })
              }
            }
          }
          // RESTART
          Toast.show(
            "You're now subscribed!",
            Toast.LONG
          );

          // setTimeout(() => {
          //   RNRestart.Restart();
          // }, 3000);
        }
      });
    } else {
      Toast.show('Purchase error');
    }

    if (responseCode === IAPResponseCode.USER_CANCELED) {
      Toast.show("You cancelled. Please try again.");
    } else if (responseCode === IAPResponseCode.DEFERRED) {
      Toast.show("You don't have permission to subscribe. Please use a different account.");
    } else if (responseCode === IAPResponseCode.ERROR) {
      Toast.show("Error");
    }

    if (errorCode) {
      console.log(errorCode)
    }
    // InAppPurchaseState.RESTORED
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token)
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
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
    getSliderData().then((res) => {
      if (res) {
        setSliderData(res)
      }
    })
    setQuestionLoading(true);
    getQuestionCategories().then((res) => {
      if (res) {
        setAll(res.length);
        setCategories(res.slice(0, 9));
      }
    }).finally(() => {
      setQuestionLoading(false)
    })
  }, [])

  useEffect(() => {
    try {
      axios.get(BASE_URL + `/users/findUser?uid=${userData.uid}`).then((res) => {
        if (res.data) {
          dispatch(updateProfile(res.data));
        }
      })
    } catch (error) {
      Alert.alert("Error", `${error.message}`);
    }
  }, [])

  // navigations
  const navigateTo = (link) => Linking.openURL(link);

  // choose date cannot be over today
  const filter = (date) => Date.parse(date.toLocaleDateString()) <= Date.parse(new Date().toLocaleDateString());

  const openAttendanceModal = () => {
    setTrackerVisible(true);
    setAttendanceLoading(true);
    getCourseList().then((res) => {
      if (res) {
        setCourseList([{ courseName: "Choose your class", id: '0' }, ...res]);
      }
    }).finally(() => {
      setAttendanceLoading(false);
    })
  };

  const closeAttendanceModal = () => {
    setTrackerVisible(false);
    setSelectedIndex1(new IndexPath(0));
    setSelectedIndex2(new IndexPath(0));
    setAttendanceDate(new Date());
    setSubmitError(false);
  }

  const submitAttendanceRecord = () => {
    if (selectedIndex1.row == 0 || selectedIndex2.row == 0 || selectedIndex3.row == 0) {
      setSubmitError(true);
    } else {
      addClockIn(uid, courseList[selectedIndex1.row].id, chapters[selectedIndex2.row].value, studyHours[selectedIndex3.row], attendanceDate.toISOString().slice(0, 10)).then((res) => {
        if (res) {
          Toast.show(
            res
          );
          closeAttendanceModal();
        }
      })
      setSubmitError(false);
    }
  }

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

  const navigateToAttendanceList = () => {
    navigation.navigate("AttendanceListScreen");
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
              {item.subTitle}
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
        {userData.membership == 2 || userData.membership == 3 || item.id === 1 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigateToPractice(item.id, item.categoryName)
            }}
          >
            <Layout level="2" style={homeStyles.item}>
              <Text category="h6" style={homeStyles.categoryTitle} numberOfLines={3}>
                {item.categoryName}
              </Text>
              <View style={homeStyles.itemContent}>
                <Text category="s1" style={{ color: "#fff" }}>
                  Questions: {item.itemNum}
                </Text>
              </View>
            </Layout>
          </TouchableOpacity>
        ) : (
          <React.Fragment>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setVisible(true)}
            >
              <Layout level="4" style={homeStyles.item}>
                <Text category="h6" style={homeStyles.categoryTitle} numberOfLines={3}>
                  {item.categoryName}
                </Text>
                <View style={homeStyles.itemLockedContent}>
                  <Text category="s1" style={{ color: "#fff" }}>
                    Questions: {item.itemNum}
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

        )}
      </React.Fragment>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...styles.topBar, alignItems: 'center', backgroundColor: '#fff', paddingTop: 48 }}>
        <Image
          source={require("../../../assets/img/logo.png")}
          resizeMode="contain"
          style={{ height: 40 }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousel
          data={sliderData}
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
                {userData.targetPractice - userData.dailyPractice < 0 ? 0 : userData.targetPractice - userData.dailyPractice}
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
                Total {all} Categories
              </Text>
            </View>
            <Button appearance="ghost" onPress={navigateToAllQuestion}>
              View All
            </Button>
          </View>
          <View style={homeStyles.container}>
            {!questionLoading ? <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={ItemCard}
              keyExtractor={(item) => item.id.toString()}
            /> : <>
              <ActivityIndicator style={{ marginBottom: 6 }} />
              <Text category="s1" appearance="hint">
                Loading...
              </Text>
            </>
            }
          </View>
        </View>
        <View style={homeStyles.content}>
          <View style={homeStyles.header}>
            <Text category="h4" style={homeStyles.title}>
              Class attendance tracker
            </Text>
          </View>
          <View style={homeStyles.header}>
            <Image
              source={require("../../../assets/img/attendance.png")}
              style={{ width: '100%', height: 200 }}
              resizeMode="contain"
            />
          </View>
          <Button style={homeStyles.button} onPress={openAttendanceModal}>
            Submit record
          </Button>
          <Button appearance="ghost" style={{ ...homeStyles.button, marginTop: 8 }} onPress={navigateToAttendanceList}>
            Review Attendance
          </Button>
        </View>
        <View style={homeStyles.content}>
          <View style={homeStyles.header}>
            <Image
              source={require("../../../assets/img/ourWebsite.png")}
              style={{ width: '100%', height: 200 }}
              resizeMode="contain"
            />
          </View>
          <SettingList settings={viewOurWebsite} navigation={navigation} padding={false}/>
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
      <Modal
        style={homeStyles.modal}
        visible={trackerVisible}
        backdropStyle={homeStyles.backdrop}
        onBackdropPress={closeAttendanceModal}
      >
        <Card disabled={true} style={{ ...homeStyles.modalCard2 }}>
          {!attendanceLoading ?
            <>
              <Select
                style={homeStyles.modalSelect}
                label="Choose your class"
                placeholder='Choose your class'
                value={courseList[selectedIndex1.row].courseName}
                selectedIndex={selectedIndex1}
                onSelect={index => setSelectedIndex1(index)}>
                {courseList.map((course, index) => {
                  return <SelectItem title={course.courseName} key={course.id} />
                })}
              </Select>
              <Select
                style={homeStyles.modalSelect}
                label="Choose chapter"
                placeholder='Choose chapter..'
                value={chapters[selectedIndex2.row].name}
                selectedIndex={selectedIndex2}
                onSelect={index => setSelectedIndex2(index)}>
                {chapters.map((item, index) => {
                  return <SelectItem title={item.name} key={item.id} />
                })}
              </Select>
              <Select
                style={homeStyles.modalSelect}
                label="Choose study hours"
                placeholder='Choose hours..'
                value={studyHours[selectedIndex3.row]}
                selectedIndex={selectedIndex3}
                onSelect={index => setSelectedIndex3(index)}>
                {studyHours.map((item, index) => {
                  return <SelectItem title={item} key={item} />
                })}
              </Select>
              <Datepicker
                style={homeStyles.modalSelect}
                label="Choose date"
                date={attendanceDate}
                onSelect={nextDate => setAttendanceDate(nextDate)}
                filter={filter}
              />
              {submitError && <Text category="s2" style={{ color: 'red' }}>Submit error, please check it</Text>}
              <Button
                style={homeStyles.modalSubmit}
                onPress={submitAttendanceRecord}
              >
                Submit
              </Button>
            </>
            :
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 260 }}>
              <ActivityIndicator style={{ marginBottom: 6 }} />
              <Text category="s1" appearance="hint">
                Loading...
              </Text>
            </View>
          }
        </Card>
      </Modal>
    </View>
  );
};
