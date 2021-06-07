import { Button, Card, Icon, Layout, Text, Modal } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { TopBar } from "../../../components/topBar/topBar";
import { Categories } from "../../../static/questions/category";
import { homeStyles } from "../../../styles/home/homeStyle";

export const AllCategroyScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  const navigateToPractice = (id, name) => {
    navigation.navigate("PracticeScreen", {
      id: id,
      practice: name,
    });
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
            <Layout level="2" style={homeStyles.categoryItem}>
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
      <TopBar title="All Questions" navigation={navigation} hasBack={true} />
      <View style={homeStyles.categroyContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Categories}
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
          <Card disabled={true} style={homeStyles.modalCard}>
            <View>
              <Text category="h5">Unlock Practice Questions?</Text>
              <Text category="h6" style={homeStyles.modalTitle}>
                Become A Membership Today!
              </Text>
            </View>
            <Button onPress={() => setVisible(false)}>Start Membership!</Button>
          </Card>
        </Modal>
      </View>
    </View>
  );
};