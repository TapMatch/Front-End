import React, {useContext} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Button} from 'react-native';
import SvgTest from 'ts/app/common/components/SvgTest';
import TapMatchLogoRed from 'assets/svg/TapMatchLogo-red.svg';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {fonts as _f} from 'ts/UIConfig/fonts';
interface LoggedOutPlaceholderScreenProps {}
import {s} from 'react-native-size-matters';
const LoggedOutPlaceholderScreen = (props: LoggedOutPlaceholderScreenProps) => {
  const {LoggedIn} = useContext(TapMatchContext);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
      <Text style={_s.txt}>LoggedOutPlaceholderScreen</Text>
      <Button title={'Log In'} onPress={() => LoggedIn[1](true)} />
      <SvgTest />
      <TapMatchLogoRed width={50} height={5} />
      <OTPInputView
        style={{width: '80%', height: 200}}
        pinCount={4}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad
        codeInputFieldStyle={_s.underlineStyleBase}
        codeInputHighlightStyle={_s.underlineStyleHighLighted}
        onCodeFilled={(code: string) => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
    </SafeAreaView>
  );
};

export default LoggedOutPlaceholderScreen;

const _s = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'blue', height: 500},
  txt: {fontFamily: _f.italic, fontSize: s(40), color: 'white'},
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
