import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import PhoneInputScreen from './screens/PhoneInputScreen/PhoneInputScreen';
import OTPInputScreen from './screens/OTPInputScreen/OTPInputScreen';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';
import WebScreen from './screens/WebScreen/WebScreen';
import TutorialScreen from './screens/TutorialScreen/TutorialScreen';

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
        name="Welcome"
        component={WelcomeScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
      />
      <Screen
        name="WebScreen"
        options={() => {
          return {
            headerShown: false,
          };
        }}
        component={WebScreen}
      />
      <Screen
        name="TutorialScreen"
        options={() => {
          return {
            headerShown: false,
          };
        }}
        component={TutorialScreen}
      />
      <Screen
        name="PhoneInput"
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
        name="OTPInput"
        component={OTPInputScreen}
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
