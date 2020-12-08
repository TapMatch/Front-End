import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import PlaceholderScreen from './screens/PlaceholderScreen';

export default function PlaceholderStack() {
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
        name="Placeholder"
        options={() => {
          return {
            headerShown: false,
          };
        }}
        component={PlaceholderScreen}
      />
    </Navigator>
  );
}
