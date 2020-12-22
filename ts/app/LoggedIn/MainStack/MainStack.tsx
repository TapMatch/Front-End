import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import SecretScreen from './screens/SecretScreen';
import WebScreen from './screens/WebScreen/WebScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import FeedbackRequestScreen from './screens/FeedbackRequestScreen/FeedbackRequestScreen';
import CreateEventScreen from './screens/CreateEventScreen/CreateEventScreen';
import LocationPickerScreen from './screens/LocationPickerScreen/LocationPickerScreen';
import CommunitiesScreen from './screens/CommunitiesScreen/CommunitiesScreen';
import CommunityCodeInputScreen from './screens/CommunityCodeInputScreen/CommunityCodeInputScreen';

export default function MainStack() {
  console.log('HUHHHUJFURTDIYFUGIH:NULYKTJREYDTUFYGUHIJO')
  const Stack = createStackNavigator();
  const {Navigator, Screen} = Stack;
  const insets = Platform.OS === 'ios' ? {} : {safeAreaInsets: {top: 0}};
  return (
    <Navigator
      mode={'modal'}
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
        // ...transitions,
        ...insets,
      }}>
      <Screen
        name="Home"
        component={HomeScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
      />

      <Screen
        name="FeedbackRequest"
        component={FeedbackRequestScreen}
        options={() => {
          return {
            headerTitle: '',
          };
        }}
      />

      <Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
      />

      <Screen
        name="LocationPicker"
        component={LocationPickerScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
      />

      <Screen
        name="WebScreen"
        component={WebScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
      />

      <Screen
        name="Communities"
        component={CommunitiesScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
      />

      <Screen
        name="CommunityCodeInput"
        component={CommunityCodeInputScreen}
        options={() => {
          return {
            headerShown: false,
          };
        }}
      />

      <Screen
        name="SecretScreen"
        component={SecretScreen}
        options={{title: 'SecretScreen'}}
      />

    </Navigator>
  );
}
