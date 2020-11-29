import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoggedOutPlaceholderScreen from './screens/LoggedOutPlaceholderScreen';
import StartScreen from './screens/StartScreen/StartScreen';
import WebScreen from './screens/WebScreen/WebScreen';
import {Platform} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import PhoneInputScreen from './screens/PhoneInputScreen/PhoneInputScreen';
import OTPInputScreen from './screens/OTPInputScreen/OTPInputScreen';
import NameInputScreen from './screens/NameInputScreen/NameInputScreen';

export default function LoggedOutStack() {
  const transitions =
    Platform.OS === 'ios'
      ? TransitionPresets.DefaultTransition
      : TransitionPresets.FadeFromBottomAndroid;
  const Stack = createStackNavigator();
  const {Navigator, Screen} = Stack;
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
          },
        },
        // headerTitleStyle: {
        //   fontSize: fs * 1.2,
        // },
        ...transitions,
        ...insets,
      }}>
      <Screen
        name="Start"
        component={StartScreen}
        options={() => {
          return {
            headerTitle: '',
          };
        }}
      />
      <Screen
        name="PhoneInput"
        component={PhoneInputScreen}
        options={() => {
          return {
            headerTitle: '',
            headerLeft: () => null,
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
          };
        }}
      />
      <Screen
        name="NameInput"
        component={NameInputScreen}
        options={() => {
          return {
            headerTitle: '',
            headerLeft: () => null,
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
        name="LoggedOutPlaceholderScreen"
        options={{title: 'LoggedOutPlaceholderScreen'}}
        component={LoggedOutPlaceholderScreen}
      />
    </Navigator>
  );
}
