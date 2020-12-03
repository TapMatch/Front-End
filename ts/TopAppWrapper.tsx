import React, {useEffect} from 'react';
import TapMatch from './app/TapMatch';
import SplashScreen from 'react-native-splash-screen';
import {Text, View} from 'react-native';
import extendDevSettingsAndMenu from 'ts/tools/DevSettings';
import {DEV_MODE} from 'ts/tools/devModeTrigger';

if (DEV_MODE) {
  extendDevSettingsAndMenu();
}

export default function TopAppWrapper() {
  useEffect(() => SplashScreen.hide(), []);

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  // return (
  //   <View onLayout={() => SplashScreen.hide()} style={{flex: 1}}>
  //     <TapMatch />
  //   </View>
  // );

  return <TapMatch />;
}
