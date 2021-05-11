import React from "react";
// ui
import {
  Image,
  Linking,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import { styles } from "../../components/topBar/topBar";
import { homeStyles } from "../../styles/home/homeStyle";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
// icon
import { SearchIcon } from "../../components/icons/icons";
// redux
import { useDispatch, useSelector } from "react-redux";
import { FlatList, ScrollView } from "react-native-gesture-handler";
// const
import { itemWidth, sliderWidth, slideHeight } from "../../constants";
// data
import { ENTRIES1 } from "../../static/entries";
import { Categories } from "../../static/questions/category";

export const HomeScreen = ({ navigation }) => {
  // const themeContext = React.useContext(ThemeContext);

  const { userData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const navigateTo = (link) => Linking.openURL(link);

  const navigateToQuiz = () => {
    navigation.navigate("QuizScreen");
  };

  const navigateToPractice = (name) => {
    navigation.navigate("PracticeScreen", {
      practice: name,
    });
  };

  const renderItem = ({ item, index }, parallaxProps) => {
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

  const itemCard = ({ item, index }) => {
    return (
      <React.Fragment>
        {item.lockStatus ? (
          <Layout level="4" style={homeStyles.item}>
            <Text category="h6" style={homeStyles.categoryTitle}>
              {item.name}
            </Text>
            <View style={homeStyles.itemLockedContent}>
              <Text category="s1" style={{ color: "#fff" }}>
                Items: {item.itemNum}
              </Text>
              <Icon name="lock" fill="#fff" style={{ width: 16, height: 16 }} />
            </View>
          </Layout>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={() => navigateToPractice(item.name)}
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
        accessoryRight={(props) => (
          <Input
            {...props}
            placeholder={"Search..."}
            style={{ borderRadius: 25, width: "80%" }}
            accessoryLeft={SearchIcon}
          />
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
          // hasParallaxImages={true}
        />
        <View style={homeStyles.content}>
          <View style={homeStyles.header}>
            <Text category="h3" style={homeStyles.title}>
              Today's Plan
            </Text>
            <Button appearance="ghost">Adjust plan</Button>
          </View>
          <View style={homeStyles.plan}>
            <View style={homeStyles.contentItem}>
              <Text category="s2">To learn</Text>
              <Text category="h4" style={homeStyles.amount}>
                {userData.dailyTarget - userData.finishedQuestions}
              </Text>
            </View>
            <View style={homeStyles.contentItem}>
              <Text category="s2">Finished</Text>
              <Text category="h4" style={homeStyles.amount}>
                {userData.finishedQuestions}
              </Text>
            </View>
          </View>
          <Text category="s2" appearance="hint" style={homeStyles.time}>
            Estimated time 10 mins
          </Text>
          <Button style={homeStyles.button} onPress={navigateToQuiz}>
            Let's Start a Quiz
          </Button>
        </View>
        <View style={homeStyles.content}>
          <View style={homeStyles.header}>
            <View>
              <Text category="h3" style={homeStyles.title}>
                Practice Questions
              </Text>
              <Text category="s2" style={{ marginBottom: 8 }}>
                65 Free of 555 Items
              </Text>
            </View>
            <Button appearance="ghost">View All</Button>
          </View>
          <View style={homeStyles.container}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={Categories}
              renderItem={itemCard}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
