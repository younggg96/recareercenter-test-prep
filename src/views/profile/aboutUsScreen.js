import React from "react";
import { Image, View } from "react-native";
import { Text } from "@ui-kitten/components";
// import { useDispatch, useSelector } from 'react-redux';
import { TopBar } from "../../components/topBar/topBar";
import { styles } from "../../styles/home/settings/aboutUsStyle";
import { ScrollView } from "react-native-gesture-handler";

const ABOUT_US = {
  title: "Who we are?",
  content:
    "The Center for Real Estate Education is a full service resource and training center for real estate agents across New Jersey and New York.  In our 4000 sq. ft., state-of-the-art facility, we offer dual NJ and NY licensing courses, master classes given by top professionals in real estate related fields, and seminars to help advance your career. All of our courses are interactive and offer real life training. All licensing graduates have a one year membership to the Center for Real Estate Education included in their tuition.Current real estate agents are able to join annually for a host of membership perks.",
};

export const AboutUsScreen = ({ navigation }) => {
  // const dispatch = useDispatch();
  // const { userData } = useSelector((state) => state.userReducer);

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="About Us" navigation={navigation} hasBack={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.title}>
            <Image
              source={require("../../../assets/img/logo.png")}
              style={styles.logo}
            />
            <Text category="h4" style={styles.titleContent}>
              {ABOUT_US.title}
            </Text>
            <Text category="s2">
              {"    "}
              {ABOUT_US.content}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
