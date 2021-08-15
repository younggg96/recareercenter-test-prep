import React from "react";
import { View, Text, Image } from "react-native";
// import { Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "../../components/topBar/topBar";
import { styles } from "../../styles/home/membershipStyle";

export const MembershipScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Membership" navigation={navigation} hasBack={true} />
      <View style={{ flex: 1 }}>
        {/* <Text category="h3" appearance="hint">
          Wait, Coming soon...
        </Text> */}
        <View style={styles.content}>
          <Image source={require("../../../assets/img/vip.jpg")} style={styles.image} />
          <Text style={styles.title}>
            {userData.membership ? "You have membership" : "Unlock your membership"}
          </Text>
          <Text style={styles.subtitle}>
            Memberships give you full access to our exam library and so much more...
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>
            Benefits
          </Text>
        </View>
      </View>
    </View>
  );
};
