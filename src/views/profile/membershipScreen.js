import React from "react";
// ui
import { Button, Layout, Text, ViewPager } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { View, Image } from "react-native";
// redux
import { useDispatch, useSelector } from "react-redux";
// components
import { TopBar } from "../../components/topBar/topBar";
import { styles } from "../../styles/home/membershipStyle";
import { ScrollView } from "react-native-gesture-handler";
import { ChooseIcon } from "../../components/icons/icons";

const member = 1;

export const MembershipScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Membership" navigation={navigation} hasBack={true} />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            ...styles.content,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <LinearGradient
            colors={["#fff", "#c28348"]}
            style={styles.background}
            start={{ x: 0.1, y: 1 }}
            end={{ x: 3, y: 1 }}
          />
          {member === 1 ? (
            <View
              style={{ padding: 16, position: "absolute", right: 0, top: 0 }}
            >
              <ChooseIcon />
            </View>
          ) : (
            <></>
          )}
          <Image
            source={require("../../../assets/img/membership-pic/Bronze.png")}
            style={{
              width: "35%",
              height: 260,
            }}
          />
          <View style={{ width: "65%" }}>
            <Text style={styles.title}>BRONZE</Text>
            <Text style={styles.price}>
              Free{" "}
              <Text
                style={{
                  textDecorationLine: "line-through",
                  fontSize: 32,
                  color: "red",
                }}
                category="s1"
              >
                $9.99
              </Text>
              <Text style={styles.subtitle} category="s2">
                {"  "}/ month
              </Text>
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Text category="s1">· Access to App</Text>
              <Text category="s1">· 25 Review Questions</Text>
              <Text category="s1">· Center for Real Estate Update</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.content,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <LinearGradient
            colors={["#fff", "#656565"]}
            style={styles.background}
            start={{ x: 0.1, y: 1 }}
            end={{ x: 3, y: 1 }}
          />
          {member === 2 ? (
            <View
              style={{ padding: 16, position: "absolute", right: 0, top: 0 }}
            >
              <ChooseIcon />
            </View>
          ) : (
            <></>
          )}
          <Image
            source={require("../../../assets/img/membership-pic/Silver.png")}
            style={{
              width: "35%",
              height: 260,
            }}
          />
          <View style={{ width: "65%" }}>
            <Text style={styles.title}>SILVER</Text>
            <Text style={styles.price}>
              $19.99
              <Text style={styles.subtitle} category="s2">
                {" "}
                / month
              </Text>
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Text category="s1">· Access to Real Estate Dictionary</Text>
              <Text category="s1">· Unlimited Review Questions</Text>
              <Text category="s1">· Full Exams & Quiz Reviews</Text>
            </View>
            {member !== 2 ? (
              <Button style={styles.button} appearance="outline">
                Purchase
              </Button>
            ) : (
              <></>
            )}
          </View>
        </View>
        <View
          style={{
            ...styles.content,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <LinearGradient
            colors={["#fff", "#ffb300"]}
            style={styles.background}
            start={{ x: 0.1, y: 1 }}
            end={{ x: 3, y: 1 }}
          />
          {member === 3 ? (
            <View
              style={{ padding: 16, position: "absolute", right: 0, top: 0 }}
            >
              <ChooseIcon />
            </View>
          ) : (
            <></>
          )}
          <Image
            source={require("../../../assets/img/membership-pic/Gold.png")}
            style={{
              width: "35%",
              height: 260,
            }}
          />
          <View style={{ width: "65%" }}>
            <Text style={styles.title}>GOLD</Text>
            <Text style={styles.price}>
              $39.99
              <Text style={styles.subtitle} category="s2">
                {" "}
                / month
              </Text>
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Text category="s1">· Access to Real Estate Dictionary</Text>
              <Text category="s1">· Unlimited Review Questions</Text>
              <Text category="s1">· Full Exams & Quiz Reviews</Text>
              <Text category="s1">· Access to all 21 cram course videos</Text>
            </View>
            {member !== 3 ? (
              <Button style={styles.button} appearance="outline">
                Purchase
              </Button>
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
