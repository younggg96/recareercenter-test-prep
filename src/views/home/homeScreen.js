import React, { useEffect } from "react";
// ui
import { Image, Linking, TouchableOpacity, View } from "react-native";
import {
  Button,
  Card,
  Icon,
  Input,
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

export const HomeScreen = ({ navigation }) => {
  const [toPlanVisible, setToPlanVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  // redux
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  useEffect(() => {
    // miss plan, modal show up
    if (!new Date(userData.examStartDate).getTime() || !new Date(userData.practiceStartDate).getTime) {
      setToPlanVisible(true);
    }
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
        {item.lockStatus ? (
          <React.Fragment>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setVisible(true)}
            >
              <Layout level="4" style={homeStyles.item}>
                <Text category="h6" style={homeStyles.categoryTitle}>
                  {item.name}
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
            onPress={() => navigateToPractice(item.id, item.name)}
          >
            <Layout level="2" style={homeStyles.item}>
              <Text category="h6" style={homeStyles.categoryTitle}>
                {item.name}
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
          <Button appearance="ghost" style={{...homeStyles.button, marginTop: 8}} onPress={navigateToReview}>
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
            <Modal
              style={homeStyles.modal}
              visible={visible}
              backdropStyle={homeStyles.backdrop}
              onBackdropPress={() => setVisible(false)}
            >
              <Card disabled={true} style={homeStyles.modalCard}>
                <View>
                  <Text category="h5">Unlock Practice Questions?</Text>
                  <Text category="h6" style={homeStyles.modalTitle}>
                    Become A Membership Today!
                  </Text>
                </View>
                <Button
                  onPress={() => {
                    setVisible(false);
                    navigateTo("")
                  }}
                >
                  Start Membership!
                </Button>
              </Card>
            </Modal>
          </View>
          <View style={homeStyles.container}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={Categories}
              renderItem={ItemCard}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </ScrollView>
      <Modal
        style={homeStyles.modal}
        visible={toPlanVisible}
        backdropStyle={homeStyles.backdrop}
      >
        <Card disabled={true} style={{ ...homeStyles.modalCard, height: 400 }}>
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
