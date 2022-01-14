import React from "react";
import { Image, Linking, Platform, View } from "react-native";
import { Button, Icon, Text } from "@ui-kitten/components";
// import { useDispatch, useSelector } from 'react-redux';
import { TopBar } from "../../components/topBar/topBar";
import { EmailIcon, LocationIcon, PhoneIcon } from "../../components/icons/icons";
import { styles } from "../../styles/home/settings/aboutUsStyle";
import { ScrollView } from "react-native-gesture-handler";

const ABOUT_US = {
  title: "Who we are?",
  content:
    "The Center for Real Estate Education is a full service resource and training center for real estate agents across New Jersey and New York.  In our 4000 sq. ft., state-of-the-art facility, we offer dual NJ and NY licensing courses, master classes given by top professionals in real estate related fields, and seminars to help advance your career. All of our courses are interactive and offer real life training. All licensing graduates have a one year membership to the Center for Real Estate Education included in their tuition.Current real estate agents are able to join annually for a host of membership perks.",
};

const CONTACT_US = {
  title: "How to contact us?",
  email: "Email: info@recareercenter.com",
  phone: "Phone: +1 201-343-6640",
  address: "66 Moore Street, Hackensack, NJ 07601"
};

const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
const latLng = "40.8799872,-74.0450989";
const label = "Center for Real Estate Education";
const url = Platform.select({
  ios: `${scheme}${label}@${latLng}`,
  android: `${scheme}${latLng}(${label})`
});

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
        <View style={styles.content}>
          <Text category="h4" style={styles.titleContent}>
            {CONTACT_US.title}
          </Text>
          <View style={{ flex: 1 }}>
            <Button onPress={() => Linking.openURL(`mailto:${CONTACT_US.email}`)} style={{ marginBottom: 16 }}
              accessoryLeft={EmailIcon} appearance={'outline'}>
              {CONTACT_US.email}
            </Button>
            <Button onPress={() => Linking.openURL(`tel:${CONTACT_US.phone}`)} style={{ marginBottom: 16 }}
              accessoryLeft={PhoneIcon} appearance={'outline'}>
              {CONTACT_US.phone}
            </Button>
            <Button onPress={() => Linking.openURL(url)} style={{ marginBottom: 16 }}
              accessoryLeft={LocationIcon} appearance={'outline'}>
              {CONTACT_US.address}
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
