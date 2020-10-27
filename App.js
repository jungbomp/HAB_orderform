import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// import BottomTabNavigator from 'navigation/BottomTabNavigator';
import MainContainer from './containers/MainScreenContainer';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
// import useLinking from 'navigation/useLinking';

import rootReducer from './reducers';

const Stack = createStackNavigator();
const store = configureStore({
  reducer: rootReducer
});

export default function App(props) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isLoadingComplete, setLoadingComplete] = React.useState(true);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  // const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    // async function loadResourcesAndDataAsync() {
    //   try {
    //     SplashScreen.preventAutoHide();

    //     // Load our initial navigation state
    //     let initState = await getInitialState();

    //     setInitialNavigationState(initState);

    //     console.log(`initialNavigationState: ${initState}`);

    //     // Load fonts
    //     await Font.loadAsync({
    //       ...Ionicons.font,
    //       'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    //     });
    //   } catch (e) {
    //     // We might want to provide this error information to an error reporting service
    //     console.warn(e);
    //   } finally {
    //     setLoadingComplete(true);
    //     SplashScreen.hide();
    //   }
    // }

    // loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" hidden="true" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator initialRouteName="Root" screenOptions={{headerShown: false}}>
              <Stack.Screen name="Root" component={LoginScreen} />
              <Stack.Screen name="Main" component={MainContainer} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
