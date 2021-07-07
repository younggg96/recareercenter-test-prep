import React, { useEffect } from "react";

import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { Alert, Image, View } from "react-native";

import { TouchableWithoutFeedback } from "react-native";
import { styles } from "../../styles/userAuth/authStyle";

//form
import { useForm, Controller } from "react-hook-form";

// redux
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/userAction";

// icons
import { FaceBookIcon, GoogleIcon } from "../../components/icons/icons";
import { ScrollView } from "react-native-gesture-handler";

import { LoadingIndicator } from "../../components/loading/loadingIndicator";

const SignIn = ({ navigation }) => {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setSubmitted(true);
    dispatch(login(data.email, data.password));
    setTimeout(() => {
      setSubmitted(false);
    }, 2000);
  };

  const signUp = () => {
    navigation.navigate("SignUp");
  };

  const forgetPassword = () => {
    navigation.navigate("ResetPassword");
  };

  useEffect(() => {
    return () => {
      setSubmitted(null); 
    };
  }, []);

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
    <View style={styles.mainBody}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.paragraph} category="h1">
            Welcome Back!
          </Text>
          <Image
            source={require("../../../assets/img/WElcomebackvector.png")}
            style={{ width: 200, height: 180 }}
          />
        </View>
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
                autoCapitalize='none'
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
                textContentType="oneTimeCode"
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
              onPress={forgetPassword}
            >
              Forget password?
            </Button>
          </View>
        </View>
        <View>
          <Button
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            accessoryLeft={submitted ? LoadingIndicator : null}
          >
            Sign In
          </Button>
          <Button style={styles.button} onPress={signUp}>
            Sign Up
          </Button>
          <Text style={styles.otherTitle} category="c2">
            Or Sign In With
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
        </View>
      </View>
    </View>
  );
};

export default SignIn;
