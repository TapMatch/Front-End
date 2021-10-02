import React, {useEffect} from 'react';
import TapMatch from './app/TapMatch';
import SplashScreen from 'react-native-splash-screen';
import {Platform, Text} from 'react-native';
import extendDevSettingsAndMenu from 'ts/tools/DevSettings';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import appCheck from '@react-native-firebase/app-check';

if (DEV_MODE) {
  extendDevSettingsAndMenu();
}

export default function TopAppWrapper() {
  useEffect(() => SplashScreen.hide(), []);

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      appCheck()
        .activate('AIzaSyCOZVemK7mRw2RRtoqEFLTE4S_6BMoNjkE', true)
        .catch((error) => {
          console.log('appCheck: ====== error', error);
        });
    }
  }, []);

  // @ts-ignore
  Text.defaultProps = Text.defaultProps || {};
  // @ts-ignore
  Text.defaultProps.allowFontScaling = false;

  // return (
  //   <View onLayout={() => SplashScreen.hide()} style={{flex: 1}}>
  //     <TapMatch />
  //   </View>
  // );

  return <TapMatch />;
}
