import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoggedOutPlaceholderScreen from './screens/LoggedOutPlaceholderScreen';

export default function LoggedOutStack() {
  const Stack = createStackNavigator();
  const {Navigator, Screen} = Stack;
  return (
    <Navigator headerMode={'none'}>
      <Screen
        name="LoggedOutPlaceholderScreen"
        options={{title: 'LoggedOutPlaceholderScreen'}}
        component={LoggedOutPlaceholderScreen}
      />
    </Navigator>
  );
}
