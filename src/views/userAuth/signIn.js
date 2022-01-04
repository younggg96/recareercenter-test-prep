import React, { useEffect, useState } from "react";

import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { Image, Keyboard, SafeAreaView, View } from "react-native";

// import * as AppAuth from 'expo-app-auth';
// // When configured correctly, URLSchemes should contain your REVERSED_CLIENT_ID
// const { URLSchemes } = AppAuth;
// import * as Google from 'expo-google-app-auth';

import { TouchableWithoutFeedback } from "react-native";
import { styles } from "../../styles/userAuth/authStyle";

//form
import { useForm, Controller } from "react-hook-form";

// redux
import { useDispatch } from "react-redux";
import { login, loginWithCache, loginWithGoogle } from "../../redux/actions/userAction";

// icons
import { FaceBookIcon, GoogleIcon } from "../../components/icons/icons";
import { LoadingIndicator } from "../../components/loading/loadingIndicator";
import { GOOGLE_AUTH_CONFIG } from "../../../config";
import { getValueFormStore, setValueToStore } from "../../storage";
import { STORE_SIGNIN_GOOGLE_KEY } from "../../storage/keys";

// google sign in
import * as GoogleSignIn from 'expo-google-sign-in';


// // store key for config secure store setter/getter
// const STORE_SIGNIN_GOOGLE_KEY = 'recareercenter_exam_google_oauth_key';

// sign in with Google
// const signInWithGoogleAsync = async () => {
//   try {
//     const result = await Google.logInAsync({
//       androidClientId: '967088008445-6r18r61vnondm6nard1a73ldvoecps1u.apps.googleusercontent.com',
//       iosClientId: '967088008445-0g6j85pssuoq7phjd8fptmesgubgcu00.apps.googleusercontent.com',
//       scopes: ['profile', 'email'],
//     });

//     if (result.type === 'success') {
//       return result;
//     } else {
//       return { cancelled: true };
//     }
//   } catch (e) {
//     return { error: true };
//   }
// }

// const signInAsync = async () => {
//   let authState = await AppAuth.authAsync(GOOGLE_AUTH_CONFIG);
//   console.log(authState)
//   await setValueToStore(STORE_SIGNIN_GOOGLE_KEY, JSON.stringify(authState));
//   return authState;
// }

// // check token expired
// const checkIfTokenExpired = ({ accessTokenExpirationDate }) => {
//   return new Date(accessTokenExpirationDate) < new Date();
// }

// // refresh token
// const refreshAuthAsync = async ({ refreshToken }) => {
//   let authState = await AppAuth.refreshAsync(GOOGLE_AUTH_CONFIG, refreshToken);
//   await setValueToStore(STORE_SIGNIN_GOOGLE_KEY, JSON.stringify(authState));
//   return authState;
// }


export const SignIn = ({ navigation }) => {
  const [submitted, setSubmitted] = useState(false);
  const [authState, setAuthState] = useState(null);

  //  init google sign in
  useEffect(() => {
    initAsync()
  }, [])

  const initAsync = async () => {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId: '302752564422-ttvoi8gr43t42i3fvu38thaqckp0v4qo.apps.googleusercontent.com',
    });
    // _syncUserWithStateAsync();
  };

  const _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    console.log(user)
    const { uid, email, displayName } = user;
    dispatch(loginWithGoogle(uid, email, displayName));
    // this.setState({ user });
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        _syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(login(data.email, data.password));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 2000);
  };

  const getAuth = async () => {
    // whether store has token
    let authState = JSON.parse(await getValueFormStore(STORE_SIGNIN_GOOGLE_KEY));
    if (authState) {
      if (checkIfTokenExpired(authState)) {
        return refreshAuthAsync(authState);
      } else {
        return authState;
      }
    }
    return null;
  }

  useEffect(() => {
    (async () => {
      let cachedAuth = await getAuth();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  // navigation screen
  const signUp = () => {
    navigation.navigate("SignUp");
  };

  const forgetPassword = () => {
    navigation.navigate("ResetPassword");
  };

  // useEffect(() => {
  //   return () => {
  //     setSubmitted(null);
  //   };
  // }, []);

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainBody}>
        <View style={styles.header}>
          <Text style={styles.paragraph} category="h1">
            Welcome Back!
          </Text>
          <Image
            source={require("../../../assets/img/WElcomebackvector.png")}
            style={{ width: 200, height: 120 }}
            resizeMode="contain"
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
            onPress={
              handleSubmit(onSubmit)
            }
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
                onPress={signInAsync}
              >
                Google
              </Button>
            </Layout>
            {/* <Layout style={styles.otherBtnLayout}>
                <Button
                  style={styles.otherBtn}
                  appearance="outline"
                  accessoryLeft={FaceBookIcon}
                >
                  FaceBook
                </Button>
              </Layout> */}
          </Layout>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
