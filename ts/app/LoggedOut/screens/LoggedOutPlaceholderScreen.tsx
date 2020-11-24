import React, {useContext} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Button} from 'react-native';
import SvgTest from 'ts/app/common/components/SvgTest';
import TapMatchLogoRed from 'assets/svg/TapMatchLogo-red.svg';

import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';

interface LoggedOutPlaceholderScreenProps {}

const LoggedOutPlaceholderScreen = (props: LoggedOutPlaceholderScreenProps) => {
  const {LoggedIn} = useContext(TapMatchContext);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
      <Text>LoggedOutPlaceholderScreen</Text>
      <Button title={'Log In'} onPress={() => LoggedIn[1](true)} />
      <SvgTest />
      <TapMatchLogoRed width={220} height={220} />
    </SafeAreaView>
  );
};

export default LoggedOutPlaceholderScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'blue', height: 500},
});
