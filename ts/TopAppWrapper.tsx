import React from 'react';
import TapMatch from './app/TapMatch';
// import {DEV_MODE} from 'react-native-dotenv';
import {Text} from 'react-native';
import extendDevSettingsAndMenu from './tools/DevSettings';

// if (DEV_MODE === 'true') {
//   extendDevSettingsAndMenu();
// }

export default function TopAppWrapper() {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  return <TapMatch />;
}
