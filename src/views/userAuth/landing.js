import React from 'react';

import { Button, Spinner, Text } from "@ui-kitten/components";
import { Image, View } from 'react-native';
import { styles } from '../../styles/userAuth/landingStyle';
import { LoadingIndicator } from '../../components/loading/loadingIndicator';

// const LoadingIndicator = (props) => (
//   <View style={[props.style, styles.indicator]}>
//     <Spinner status='basic' size='small' />
//   </View>
// );

const Landing = ({ navigation }) => {
  const [spinner, setSpinner] = React.useState(false);
  
  const onStart = () => {
    setSpinner(true);
    setTimeout(() => {
      navigation.navigate("SignIn");
      setSpinner(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/img/logo.png")} style={styles.logo} />
      <Text style={styles.title} category="h5">Flexibility. Availability. Reliability.</Text>
      <Text style={styles.subTitle} category="s1">We are everything real estate. Let us share it with you!</Text>
      {!spinner ?
        <Button style={styles.button} onPress={onStart}>
          Let's Start
        </Button> :
        <Button style={styles.button} accessoryLeft={LoadingIndicator}>
          Loading...
      </Button>}
    </View>
  );
};

export default Landing;