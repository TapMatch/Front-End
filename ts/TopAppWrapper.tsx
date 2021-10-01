import React, {useEffect} from 'react';
import TapMatch from './app/TapMatch';
import SplashScreen from 'react-native-splash-screen';
import {Text, View} from 'react-native';
import appCheck from '@react-native-firebase/app-check';
import extendDevSettingsAndMenu from 'ts/tools/DevSettings';
import {DEV_MODE} from 'ts/tools/devModeTrigger';

if (DEV_MODE) {
  extendDevSettingsAndMenu();
}

export default function TopAppWrapper() {
  useEffect(() => SplashScreen.hide(), []);
  useEffect(() => {
    appCheck().setTokenAutoRefreshEnabled(true);
    appCheck()
      .getToken(true)
      .then((appCheckToken) => {
        console.log('appCheckToken: ======', appCheckToken);
        appCheck()
          .activate(appCheckToken.token, true)
          .catch((error) => {
            console.log('appCheck: ====== error', error);
          });
      })
      .catch((error) => {
        console.log('appCheckToken: ====== error', error);
      });
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
