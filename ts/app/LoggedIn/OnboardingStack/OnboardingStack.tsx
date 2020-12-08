import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import NameInputScreen from './screens/NameInputScreen/NameInputScreen';
import AvatarCameraScreen from './screens/AvatarCameraScreen/AvatarCameraScreen';
import AllSetScreen from './screens/AllSetScreen/AllSetScreen';
import MapDemoScreen from './screens/MapDemoScreen/MapDemoScreen';
// import LoggedOutPlaceholderScreen from './screens/LoggedOutPlaceholderScreen';
import WebScreen from './screens/WebScreen/WebScreen';
import CommunitiesScreen from './screens/CommunitiesScreen/CommunitiesScreen';
import CommunityCodeInputScreen from './screens/CommunityCodeInputScreen/CommunityCodeInputScreen';

export default function OnboardingStack() {
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
        name="NameInput"
        component={NameInputScreen}
        options={() => {
          return {
            headerTitle: '',
            headerLeft: () => null,
            headerRight: () => null,
          };
        }}
      />
      <Screen
        name="AvatarCamera"
        component={AvatarCameraScreen}
        options={() => {
          return {
            headerTitle: '',
            headerLeft: () => null,
            headerRight: () => null,
          };
        }}
      />
      <Screen
        name="MapDemo"
        component={MapDemoScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
      />
      <Screen
        name="AllSet"
        component={AllSetScreen}
        options={() => {
          return {
            headerTitle: '',
            headerLeft: () => null,
            headerRight: () => null,
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
    </Navigator>
  );
}
