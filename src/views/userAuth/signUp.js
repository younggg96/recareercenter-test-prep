import React from "react";

import {
  Button,
  CheckBox,
  Icon,
  Input,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView, View } from "react-native";

import { TouchableWithoutFeedback } from "react-native";
import { styles } from "../../styles/userAuth/authStyle";
import { BackIcon } from "../../components/icons/icons";
import { TopBar } from "../../components/topBar/topBar";

const SignUp = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [checked, setChecked] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  // password input
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  // login submit
  const onSubmit = (data) => {
    setSubmitted(true);
    if (checked) {
      console.log(data);
      setSubmitted(false);
    }
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  // back button
  // const navigateBack = () => {
  //   navigation.goBack();
  // };

  // const BackAction = () => (
  //   <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  // );

  return (
    <>
      {/* <TopNavigation title={() => <Text category="s1" style={styles.topTitle}>Sign up</Text>} accessoryLeft={BackAction} style={styles.topBar} /> */}
      <TopBar title="Sign up" navigation={navigation} hasBack={true} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.paragraphSignup} category="h1">
          Sign Up and starting learning
        </Text>
        <View>
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
          <Controller
            name="username"
            rules={{ required: true, minLength: 4, maxLength: 8 }}
            defaultValue=""
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.input}
                label="Username"
                size="large"
                caption={
                  errors.username ? (
                    <Text status="danger" category="c2">
                      Should contain at least 4 symbols, No more than 8 symbols
                    </Text>
                  ) : (
                    ""
                  )
                }
                placeholder="Enter your Username"
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
                placeholder="Enter your Password"
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                onBlur={onBlur}
                onChangeText={(v) => onChange(v)}
                value={value}
              />
            )}
          />
          <CheckBox
            value={checked}
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
          >
            I've read and agree with Terms of Service and our Privacy Policy
          </CheckBox>
          {submitted ? (
            !checked ? (
              <Text status="danger" category="c2">
                please agree
              </Text>
            ) : null
          ) : null}
        </View>
        <Button style={styles.createAccBtn} onPress={handleSubmit(onSubmit)}>
          Create Account
        </Button>
      </SafeAreaView>
    </>
  );
};
export default SignUp;
