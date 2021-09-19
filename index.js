import { registerRootComponent } from 'expo';

import App from './App';

import Toast from "react-native-simple-toast";
import { connectAsync } from 'expo-in-app-purchases';

// membership
(async function init() {
    try {
        await connectAsync();
    } catch (err) {
        Toast.show("Error occurred: " + JSON.stringify(err));
    }
})();
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
