import React from "react";

import { Button, CheckBox, Input, Layout, LayoutElement, Text } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const signUp = () => {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Sign Up</Text>

      <Controller
        name="Fill Me"
        rules={{ required: true }}
        control={control}
        render={(props) => <Input {...props} />}
      />
    </View>
  );
};

export default signUp;
