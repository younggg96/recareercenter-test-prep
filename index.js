// import * as InAppPurchases from 'expo-in-app-purchases';
import { registerRootComponent } from 'expo';

import App from './App';
// import {
//   connectAsync,
//   setPurchaseListener,
//   finishTransactionAsync,
//   IAPResponseCode,
// } from "expo-in-app-purchases";
// import { Alert } from 'react-native';

// (function init() {
//   // try {
//   const res = connectAsync();
//   res.then((data) => {

//     Alert.alert(data)
//   })
//   // } catch (err) {
//   //   Alert.alert("Error occurred: " + JSON.stringify(err));
//   // }
// })();
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
