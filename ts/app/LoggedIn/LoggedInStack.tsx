import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoggedInPlaceholderScreen from './screens/LoggedInPlaceholderScreen';

export default function LoggedInStack() {
  const Stack = createStackNavigator();
  const {Navigator, Screen} = Stack;
  return (
    <Navigator headerMode={'none'}>
      <Screen
        name="LoggedInPlaceholderScreen"
        options={{title: 'LoggedInPlaceholderScreen'}}
        component={LoggedInPlaceholderScreen}
      />
    </Navigator>
  );
}
