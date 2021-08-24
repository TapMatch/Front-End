import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import PhoneInputScreen from './screens/PhoneInputScreen/PhoneInputScreen';
import OTPInputScreen from './screens/OTPInputScreen/OTPInputScreen';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';
import WebScreen from './screens/WebScreen/WebScreen';
import TutorialScreen from './screens/TutorialScreen/TutorialScreen';
import AllSetScreen from './screens/AllSetScreen/AllSetScreen';
import {LoggedOutScreens} from '../../constants/screens';

export default function LoggedOutStack() {
  const Stack = createStackNavigator();
  const {Navigator, Screen} = Stack;
  const transitions =
    Platform.OS === 'ios'
      ? TransitionPresets.DefaultTransition
      : TransitionPresets.FadeFromBottomAndroid;
  const insets = Platform.OS === 'ios' ? {} : {safeAreaInsets: {top: 0}};
  return (
    <Navigator
      screenOptions={{
        headerTitleAllowFontScaling: false,
        headerBackAllowFontScaling: false,
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0,
          backgroundColor: _c.white,
          borderBottomColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        },
        // headerTitleStyle: {
        //   fontSize: fs * 1.2,
        // },
        ...transitions,
        ...insets,
      }}>
      <Screen
        name={LoggedOutScreens.Welcome}
        component={WelcomeScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
      />
      <Screen
        name={LoggedOutScreens.WebScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
        component={WebScreen}
      />
      <Screen
        name={LoggedOutScreens.TutorialScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
        component={TutorialScreen}
      />
      <Screen
        name={LoggedOutScreens.PhoneInput}
        component={PhoneInputScreen}
        options={() => {
          return {
            keyboardHandlingEnabled: false,
            headerTitle: '',
            headerLeft: () => null,
            headerRight: () => null,
          };
        }}
      />
      <Screen
        name={LoggedOutScreens.OTPInput}
        component={OTPInputScreen}
        options={() => {
          return {
            headerTitle: '',
            headerLeft: () => null,
            headerRight: () => null,
          };
        }}
      />
      <Screen
        name={LoggedOutScreens.AllSet}
        component={AllSetScreen}
        options={() => {
          return {
            headerTitle: '',
            headerLeft: () => null,
            headerRight: () => null,
          };
        }}
      />
    </Navigator>
  );
}
