import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {vs} from 'react-native-size-matters';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {verifyOTPAndLogIn} from '../api/verifyOTPAndLogIn';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';

interface OTPInputProps {
  OTP: [string, (x: string) => void];
  ReSendCodeDisabled: [boolean, (x: boolean) => void];
}

const OTPInput = ({OTP, ReSendCodeDisabled}: OTPInputProps) => {
  const {PHPSESSID, LoggedIn, userProfile, userToken} = useContext(
    TapMatchContext,
  );
  return (
    <View style={_s.container}>
      <View style={_s.inputContainer}>
        <OTPInputView
          style={_s.OTPInputView}
          pinCount={7}
          code={OTP[0]}
          onCodeChanged={OTP[1]}
          autoFocusOnLoad={true}
          codeInputFieldStyle={_s.underlineStyleBase}
          codeInputHighlightStyle={_s.underlineStyleHighLighted}
          onCodeFilled={(code: string) => {
            verifyOTPAndLogIn({
              ReSendCodeDisabled,
              OTP: code,
              PHPSESSID,
              LoggedIn,
              userProfile,
              userToken,
            });
          }}
        />
      </View>
    </View>
  );
};

export default OTPInput;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.white,
    paddingTop: '15%',
  },
  inputContainer: {
    borderRadius: 4,
    paddingHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: _c.greyLight,
    height: vs(45),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '4.5%',
  },
  underlineStyleBase: {
    paddingVertical: 0,
    height: '100%',
    borderWidth: 0,
    borderBottomWidth: 0,
    borderColor: _c.grey,
    color: _c.black,
    fontFamily: _f.eRegular,
    fontSize: _fs.xl,
  },
  underlineStyleHighLighted: {
    borderColor: _c.grey,
  },
  OTPInputView: {
    height: '70%',
    flex: 1,
  },
});
