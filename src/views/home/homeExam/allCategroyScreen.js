import { Button, Card, Icon, Layout, Text, Modal } from "@ui-kitten/components";
import React from "react";
import { useEffect } from "react";
import { Image, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { TopBar } from "../../../components/topBar/topBar";
import { getQuestionCategories } from "../../../helper/api";
// import { Categories } from "../../../static/questions/category";
import { homeStyles } from "../../../styles/home/homeStyle";

export const AllCategroyScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    getQuestionCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  const navigateToCategoryList = (id, name) => {
    navigation.navigate("AllCategroyListScreen", {
      id: id,
      categoryName: name,
    });
  };

  const navigateToMembership = () => {
    navigation.navigate("MembershipScreen");
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
              <Layout level="4" style={homeStyles.categoryItem}>
                <Text category="h6" style={homeStyles.categoryTitle}>
                  {item.categoryName}
                </Text>
                <View style={homeStyles.itemLockedContent}>
                  <Text category="s1" style={{ color: "#fff" }}>
                    Items: {item.questionList.length}
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
            activeOpacity={0.8}
            onPress={() => navigateToCategoryList(item.id, item.categoryName)}
          >
            <Layout level="2" style={homeStyles.categoryItem}>
              <Text category="h6" style={homeStyles.categoryTitle}>
                {item.categoryName}
              </Text>
              <View style={homeStyles.itemContent}>
                <Text category="s1" style={{ color: "#fff" }}>
                  Items: {item.questionList.length}
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
      <TopBar title="Categories" navigation={navigation} hasBack={true} />
      <View style={homeStyles.categoryContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={categories}
          renderItem={ItemCard}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
        />
        <Modal
          style={homeStyles.modal}
          visible={visible}
          backdropStyle={homeStyles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <Card
            disabled={true}
            style={{ ...homeStyles.modalCard, height: 400 }}
          >
            <View style={{ marginBottom: 8 }}>
              <Image
                source={require("../../../../assets/img/vip.jpg")}
                style={{ width: "100%", height: 200, marginBottom: 16 }}
              />
              <Text category="h5">Unlock Practice Questions?</Text>
              <Text category="h6" style={homeStyles.modalTitle}>
                Become A Membership Today!
              </Text>
            </View>
            <Button
              onPress={() => {
                setVisible(false);
                navigateToMembership();
              }}
            >
              Start Membership!
            </Button>
          </Card>
        </Modal>
      </View>
    </View>
  );
};
