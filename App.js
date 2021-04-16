import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

// theme
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as mainTheme } from './assets/theme/theme.json'; // <-- Import app theme
import { default as mapping } from './assets/theme/mapping.json'; // <-- Import app mapping

// assets
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { AppNavigator } from './src/navigations/mainNavigation';
import { ThemeContext } from './src/styles/themeContext';

// redux
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/redux/reducers';
// redux middleware
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";


export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  // theme
  const [theme, setTheme] = React.useState('light');

  // dark or light theme
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
      }),
    ]);
  };

  const _handleLoadingError = error => {
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    setIsLoaded(true);
  };

  // redux create store
  const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
    ReduxThunk
  )(createStore);

  if (!isLoaded) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ApplicationProvider
            {...eva} theme={{ ...eva[theme], ...mainTheme}}
            customMapping={mapping}>
            <Provider
              store={createStoreWithMiddleware(
                rootReducer,
                window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
              )}
            >
              <AppNavigator />
            </Provider>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </>
    );
  }
}


