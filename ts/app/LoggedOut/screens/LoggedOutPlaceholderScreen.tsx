import React, {useContext} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Button} from 'react-native';
import SvgTest from 'ts/app/common/components/SvgTest';
import TapMatchLogoRed from 'assets/svg/TapMatchLogo-red.svg';

import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {fonts as _f} from 'ts/UIConfig/fonts';
interface LoggedOutPlaceholderScreenProps {}

const LoggedOutPlaceholderScreen = (props: LoggedOutPlaceholderScreenProps) => {
  const {LoggedIn} = useContext(TapMatchContext);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
      <Text style={_s.txt}>LoggedOutPlaceholderScreen</Text>
      <Button title={'Log In'} onPress={() => LoggedIn[1](true)} />
      <SvgTest />
      <TapMatchLogoRed width={220} height={220} />
    </SafeAreaView>
  );
};

export default LoggedOutPlaceholderScreen;

const _s = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'blue', height: 500},
  txt: {fontFamily: _f.italic, fontSize: 40},
});
