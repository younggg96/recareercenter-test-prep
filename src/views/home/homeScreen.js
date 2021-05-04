import React from "react";
import { Image, Linking, View } from "react-native";
// ui
import { Button, Input, Text, TopNavigation } from "@ui-kitten/components";
import { styles } from "../../components/topBar/topBar";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
// icon
import { SearchIcon } from "../../components/icons/icons";
// redux
import { useDispatch } from "react-redux";
import { homeStyles } from "../../styles/home/homeStyle";
import { ScrollView } from "react-native-gesture-handler";
// const
import { itemWidth, sliderWidth, slideHeight } from "../../constants";
// data
import { ENTRIES1 } from "../../static/entries";

export const HomeScreen = ({ navigation }) => {
  // const themeContext = React.useContext(ThemeContext);
  const dispatch = useDispatch();

  const navigateTo = (link) => Linking.openURL(link)

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
            <Button style={[homeStyles.button, homeStyles.exploreBtn]} onPress={() => navigateTo(item.link)}>
              {evaProps => <Text category="label" {...evaProps}>Explore</Text>}
            </Button>
          </View>
        </View>
      </View>
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
            <Button appearance="ghost" size="small">
              Adjust plan
            </Button>
          </View>
          <View style={homeStyles.plan}>
            <View style={homeStyles.contentItem}>
              <Text category="s2">To learn</Text>
              <Text category="h4" style={homeStyles.amount}>
                20
              </Text>
            </View>
            <View style={homeStyles.contentItem}>
              <Text category="s2">To Review</Text>
              <Text category="h4" style={homeStyles.amount}>
                60
              </Text>
            </View>
          </View>
          <Text category="s2" appearance="hint" style={homeStyles.time}>
            Estimated time 10 mins
          </Text>
          <Button style={homeStyles.button} onPress={navigateTo}>
            Let's Start a Quiz
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
