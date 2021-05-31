import { Button, Text } from "@ui-kitten/components";
import React from "react";
import { Image, View } from "react-native";
import { TopBar } from "../../components/topBar/topBar";
import { styles } from "../../styles/home/examStyle";

export const ExamsScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Exams" hasBack={false} />
      <View style={styles.content}>
        <Image
          source={require("../../../assets/img/mock-exam.png")}
          style={{
            width: 200,
            height: 200,
            marginBottom: 16,
            alignSelf: "center",
          }}
        />
        <Text category="h3" style={styles.title}>
          All Mock Exam
        </Text>
        <Text category="s2" appearance="hint" style={styles.time}>
          Estimated time 10 mins
        </Text>
        <Button style={styles.button}>Let's Start A Real Mock Exam</Button>
      </View>
      
    </View>
  );
};
