import React, { useState } from "react";
// ui
import { Button, Text } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { View, Image, Platform } from "react-native";
// redux
import { useDispatch, useSelector } from "react-redux";
// components
import { TopBar } from "../../components/topBar/topBar";
import { styles } from "../../styles/home/membershipStyle";
import { ScrollView } from "react-native-gesture-handler";
import { ChooseIcon } from "../../components/icons/icons";

// member
import { getProductsAsync, purchaseItemAsync } from "expo-in-app-purchases";
import { LoadingRedIndicator } from "../../components/loading/loadingIndicator";

export const MembershipScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);
  const member = userData.membership;

  const [purchaseButtonLoading, setPurchaseButtonLoading] = useState(false);
  const [purchaseGoldenButtonLoading, setPurchaseGoldenButtonLoading] = useState(false);

  const productIds = Platform.select({
    ios: [
      'cfree_member_silver',
      'cfree_member_gold'
    ],
    android: []
  });


  const purchase = async (type) => {
    // loading
    if (type == 2) {
      setPurchaseButtonLoading(true);
    } else if (type == 3) {
      setPurchaseGoldenButtonLoading(true);
    }
    // purchase
    try {
      const products = await getProductsAsync(productIds);
      if (products.results.length > 0) {
        if (type == 2) {
          await purchaseItemAsync('cfree_member_silver');
          setTimeout(() => {
            setPurchaseButtonLoading(false);
          }, 1000);
        } else if (type == 3) {
          await purchaseItemAsync('cfree_member_gold');
          setTimeout(() => {
            setPurchaseGoldenButtonLoading(false);
          }, 1000);
        }
      } else {
        if (type == 2) {
          setPurchaseButtonLoading(false);
        } else if (type == 3) {
          setPurchaseGoldenButtonLoading(false);
        }
      }
    } catch (err) {
      setPurchaseButtonLoading(false);
      setPurchaseGoldenButtonLoading(false);
      alert("error occured while trying to purchase: " + err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Membership" navigation={navigation} hasBack={true} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ ...styles.content, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <LinearGradient colors={["#fff", "#c28348"]} style={styles.background} start={{ x: 0.1, y: 1 }} end={{ x: 3, y: 1 }} />
          {member === "1" ? (
            <View style={{ padding: 16, position: "absolute", right: 0, top: 0 }}>
              <ChooseIcon />
            </View>
          ) : (
            <></>
          )}
          <Image source={require("../../../assets/img/membership-pic/Bronze.png")} style={{ width: "35%", height: 260 }}
          />
          <View style={{ width: "65%" }}>
            <Text style={styles.title}>BRONZE</Text>
            <Text style={styles.price}>
              Free{" "}
              <Text style={{ textDecorationLine: "line-through", fontSize: 26, color: "red" }} category="s1">
                $9.99
              </Text>
              <Text style={styles.subtitle} category="s2">
                {"  "}/ month
              </Text>
            </Text>
            <View style={{ width: "100%", flexDirection: "column", alignItems: "flex-start" }}>
              <Text category="s1">· 25 Free Review Questions</Text>
              <Text category="s1">· Create Your Own Study Plan</Text>
              <Text category="s1">· Real Estate Dictionary</Text>
              <Text category="s1">· CFREE Student Resources</Text>
              <Text category="s1">· Weekly Real Estate Podcast</Text>
            </View>
          </View>
        </View>
        <View style={{ ...styles.content, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <LinearGradient colors={["#fff", "#656565"]} style={styles.background} start={{ x: 0.1, y: 1 }} end={{ x: 3, y: 1 }} />
          {member === "2" ? (
            <View style={{ padding: 16, position: "absolute", right: 0, top: 0 }}>
              <ChooseIcon />
            </View>
          ) : (
            <></>
          )}
          <Image source={require("../../../assets/img/membership-pic/Silver.png")} style={{ width: "35%", height: 260 }} />
          <View style={{ width: "65%" }}>
            <Text style={styles.title}>SILVER</Text>
            <Text style={styles.price}>
              $19.99
              <Text style={styles.subtitle} category="s2">
                {" "}
                / month
              </Text>
            </Text>
            <View style={{ width: "100%", flexDirection: "column", alignItems: "flex-start" }}>
              <Text category="s1">· Everything in Bronze plus...</Text>
              <Text category="s1">· Unlimited Review Questions</Text>
              <Text category="s1">· Full Exams & Quiz Reviews</Text>
            </View>
            {member !== "2" ? (
              <Button style={styles.button} appearance="outline" onPress={() => purchase(2)} accessoryLeft={purchaseButtonLoading ? () => <LoadingRedIndicator style={{ color: '#E42425' }} /> : null}>
                {purchaseButtonLoading ? "Purchase..." : "Purchase"}
              </Button>
            ) : (
              <></>
            )}
          </View>
        </View>
        <View style={{ ...styles.content, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
          <LinearGradient colors={["#fff", "#ffb300"]} style={styles.background} start={{ x: 0.1, y: 1 }} end={{ x: 3, y: 1 }} />
          {member === "3" ? (
            <View style={{ padding: 16, position: "absolute", right: 0, top: 0 }}>
              <ChooseIcon />
            </View>
          ) : (
            <></>
          )}
          <Image source={require("../../../assets/img/membership-pic/Gold.png")} style={{ width: "35%", height: 260 }} />
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
              <Text category="s1">· Everything in Bronze & Silver plus...</Text>
              <Text category="s1">· Access to all 21 Cram Course Videos</Text>
              <Text category="s1">· Weekly Online Interactive Study Group </Text>
            </View>
            {member !== "3" ? (
              <Button style={styles.button} appearance="outline" onPress={() => purchase(3)} accessoryLeft={purchaseGoldenButtonLoading ? () => <LoadingRedIndicator style={{ color: '#E42425' }} /> : null}>
                {purchaseGoldenButtonLoading ? "Purchase..." : "Purchase"}
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
