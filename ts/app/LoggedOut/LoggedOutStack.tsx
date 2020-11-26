import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoggedOutPlaceholderScreen from './screens/LoggedOutPlaceholderScreen';
import StartScreen from './screens/StartScreen/StartScreen';
import WebScreen from './screens/WebScreen/WebScreen';

export default function LoggedOutStack() {
  const Stack = createStackNavigator();
  const {Navigator, Screen} = Stack;
  return (
    <Navigator headerMode={'none'}>
      <Screen name="Start" options={{title: 'Start'}} component={StartScreen} />
      <Screen
        name="WebScreen"
        options={{title: 'WebScreen'}}
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
