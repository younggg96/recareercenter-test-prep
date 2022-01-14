import React from 'react';
import { useDispatch } from 'react-redux';

import { Button, Text } from "@ui-kitten/components";
import { Alert, Image, View } from 'react-native';
import { styles } from '../../styles/userAuth/landingStyle';
import { LoadingIndicator } from '../../components/loading/loadingIndicator';

import { USER_AUTH_INFO } from '../../storage/keys';
import { loginWithCache } from '../../redux/actions/userAction';
import { deleteValueFormStore, getValueFormStore } from '../../storage';
import { findUser } from '../../helper/api';

const Landing = ({ navigation }) => {
  const [spinner, setSpinner] = React.useState(false);
  const dispatch = useDispatch();

  const onStart = async () => {
    setSpinner(true);
    const userObj = JSON.parse(await getValueFormStore(USER_AUTH_INFO));
    if (userObj) {
      findUser(userObj.uid).then((res) => {
        if (res) {
          dispatch(loginWithCache(userObj, res));
          setSpinner(false);
        }
      }).catch((error) => {
        Alert.alert("Error", `${error.message}`)
      })
    } else {
      setTimeout(() => {
        setSpinner(false);
        navigation.navigate("SignIn");
      }, 500);
    }
  };

  const clear = () => {
    try {
      deleteValueFormStore(USER_AUTH_INFO).then((data) => {
        Alert.alert("Cleared cache", JSON.stringify(data));
      })
    } catch (error) {
      Alert.alert("Error", `${error.message}`);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../../../assets/img/logo.png")} style={styles.logo} />
        <Text style={styles.title} category="h5">Flexibility. Availability. Reliability.</Text>
        <Text style={styles.subTitle} category="s1">We are everything real estate. Let us share it with you!</Text>
      </View>
      <View>
        <Image source={require("../../../assets/img/LetsStartVector.png")} style={styles.start} />
        {!spinner ?
          <Button style={styles.button} onPress={onStart}>
            Let's Start
          </Button> :
          <Button style={styles.button} accessoryLeft={LoadingIndicator}>
            Loading...
          </Button>}
      </View>
      <Button style={{ position: "absolute", top: '30%', right: 0 }} appearance={"ghost"} onPress={clear}>
        Clear cache 
      </Button>
    </View>
  );
};

export default Landing;