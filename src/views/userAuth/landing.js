import React from 'react';
import { useDispatch } from 'react-redux';

import { Button, Text } from "@ui-kitten/components";
import { Image, View } from 'react-native';
import { styles } from '../../styles/userAuth/landingStyle';
import { LoadingIndicator } from '../../components/loading/loadingIndicator';

import { USER_AUTH_INFO } from '../../storage/keys';
import { loginWithCache } from '../../redux/actions/userAction';
import { getValueFormStore } from '../../storage';

const Landing = ({ navigation }) => {
  const [spinner, setSpinner] = React.useState(false);
  const dispatch = useDispatch();
  
  const onStart = async () => {
    setSpinner(true);
    const auth = JSON.parse(await getValueFormStore(USER_AUTH_INFO));
    if (auth) {
      dispatch(loginWithCache(auth))
      setSpinner(false);
    } else {
      setTimeout(() => {
        navigation.navigate("SignIn");
        setSpinner(false);
      }, 1000);
    }
  };

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
    </View>
  );
};

export default Landing;