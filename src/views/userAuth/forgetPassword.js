import React from "react";

import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { Image, View } from "react-native";

import { TopBar } from "../../components/topBar/topBar";

import { styles } from "../../styles/userAuth/authStyle";
import { useDispatch } from "react-redux";

// icons
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const ForgetPassword = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    // dispatch();
  };

  return (
    <>
      <TopBar title="Reset password" navigation={navigation} hasBack={true} />
      <View style={styles.container}>
        <Text style={styles.paragraphReset} category="h1">
          Reset your password
        </Text>
        <View>
          <Image
            source={require("../../../assets/img/Forgotpwvector.png")}
            style={{ width: 150, height: 210 }}
          />
          <Text style={styles.paragraphReset} category="s1">
            Please specify your email address to receive instructions for
            resetting it. If an account exists by the email, we will send a
            password reset
          </Text>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: {
                value:
                  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                message: "Please enter a valid email address",
              },
            }}
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.input}
                label="Email"
                size="large"
                caption={
                  errors.email ? (
                    errors.email.type === "required" ? (
                      <Text status="danger" category="c2">
                        Email is required.
                      </Text>
                    ) : errors.email.type === "pattern" ? (
                      <Text status="danger" category="c2">
                        {errors.email.message}
                      </Text>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )
                }
                placeholder="Enter your email"
                onBlur={onBlur}
                onChangeText={(v) => onChange(v)}
                value={value}
              />
            )}
          />
        </View>
        <Button style={styles.createAccBtn} onPress={handleSubmit(onSubmit)}>
          Send
        </Button>
      </View>
    </>
  );
};

export default ForgetPassword;
