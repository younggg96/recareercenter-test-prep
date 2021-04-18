import React from "react";

import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { TouchableWithoutFeedback } from "react-native";
import { styles } from "../../styles/userAuth/signInStyle";

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;
const GoogleIcon = (props) => <Icon {...props} name="google" />;
const FaceBookIcon = (props) => <Icon {...props} name="facebook" />;

const signIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  // password input
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph} category="h1">
        Welcome Back!
      </Text>
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: {
            value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
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
            // captionIcon={errors.email ? AlertIcon : ''}
            placeholder="Enter your email"
            onBlur={onBlur}
            onChangeText={(v) => onChange(v)}
            value={value}
          />
        )}
      />
      <Controller
        name="password"
        rules={{ required: true, minLength: 8 }}
        defaultValue=""
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            style={styles.input}
            label="Password"
            size="large"
            caption={
              errors.password ? (
                <Text status="danger" category="c2">
                  Should contain at least 8 symbols
                </Text>
              ) : (
                ""
              )
            }
            // captionIcon={errors.password ? AlertIcon : ''}
            placeholder="Enter your Password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onBlur={onBlur}
            onChangeText={(v) => onChange(v)}
            value={value}
          />
        )}
      />
      <View style={styles.forgetBtn}>
        <Button
          style={{ width: 140 }}
          size="small"
          appearance="ghost"
          status="primary"
        >
          Forget password?
        </Button>
      </View>
      <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
        Sign In
      </Button>
      <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
        Sign Up
      </Button>

      <Text style={styles.otherTitle} category="c2">
        Or sign in with
      </Text>
      <Layout style={styles.other}>
        <Layout style={styles.otherBtnLayout}>
          <Button
            style={styles.otherBtn}
            appearance="outline"
            accessoryLeft={GoogleIcon}
          >
            Google
          </Button>
        </Layout>
        <Layout style={styles.otherBtnLayout}>
          <Button
            style={styles.otherBtn}
            appearance="outline"
            accessoryLeft={FaceBookIcon}
          >
            FaceBook
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default signIn;
