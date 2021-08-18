import React, {useContext, useEffect} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import NameInputScreen from './screens/NameInputScreen/NameInputScreen';
import AvatarCameraScreen from './screens/AvatarCameraScreen/AvatarCameraScreen';
import AllSetScreen from './screens/AllSetScreen/AllSetScreen';
import MapDemoScreen from './screens/MapDemoScreen/MapDemoScreen';
import WebScreen from './screens/WebScreen/WebScreen';
import CommunitiesScreen from './screens/CommunitiesScreen/CommunitiesScreen';
import {patchUserTimeZone} from '../../common/api/patchUserTimeZone';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import CameraSettingScreen from './screens/CameraSettingScreen/CameraSettingScreen';

export default function OnboardingStack() {
  const {
    userToken,
    LoggedIn,
    userProfile,
    user_has_passed_onboarding,
  } = useContext(TapMatchContext);
  const Stack = createStackNavigator();
  const {Navigator, Screen} = Stack;
  const transitions =
    Platform.OS === 'ios'
      ? TransitionPresets.DefaultTransition
      : TransitionPresets.FadeFromBottomAndroid;
  const insets = Platform.OS === 'ios' ? {} : {safeAreaInsets: {top: 0}};

  useEffect(() => {
    patchUserTimeZone({
      userToken,
      LoggedIn,
      userProfile,
      user_has_passed_onboarding,
    });
  }, []);

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
        name="CameraSetting"
        component={CameraSettingScreen}
        options={() => {
          return {
            headerShown: false,
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

      <Screen
        name="Communities"
        component={CommunitiesScreen}
        options={() => {
          return {
            gestureEnabled: false,
            headerShown: false,
          };
        }}
      />
    </Navigator>
  );
}
