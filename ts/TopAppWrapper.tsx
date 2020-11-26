import React, {useEffect} from 'react';
import TapMatch from './app/TapMatch';
import SplashScreen from 'react-native-splash-screen';
import {Text} from 'react-native';
import extendDevSettingsAndMenu from './tools/DevSettings';

const DEV_MODE = false;
if (DEV_MODE) {
  extendDevSettingsAndMenu();
}

export default function TopAppWrapper() {
  useEffect(() => SplashScreen.hide(), []);

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  return <TapMatch />;
}
