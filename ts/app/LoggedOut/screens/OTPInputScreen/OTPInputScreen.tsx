import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import OTPInput from './components/OTPInput';
import Subtitle from './components/Subtitle';
import SwipeBackGuide from './components/SwipeBackGuide';
import Title from './components/Title';
import ReSendCode from './components/ReSendCode';
import {resendOTP} from './api/resendOTP';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';

interface OTPInputScreenProps {}

const OTPInputScreen = (props: OTPInputScreenProps) => {
  const OTP = useState<string>('');
  const ReSendCodeDisabled = useState<boolean>(true);
  const resendTimerTrigger = useState<boolean>(true);
  const {PHPSESSID} = useContext(TapMatchContext);

  useEffect(() => {
    const resendTimer = setTimeout(() => {
      ReSendCodeDisabled[1](false);
    }, 18000);
    return () => clearTimeout(resendTimer);
  }, [resendTimerTrigger[0]]);

  return (
    <View style={_s.container}>
      <View style={_s.content}>
        <SwipeBackGuide />
        <Title />
        <Subtitle />
        <OTPInput OTP={OTP} ReSendCodeDisabled={ReSendCodeDisabled} />
      </View>
      <ReSendCode
        disabled={ReSendCodeDisabled[0]}
        onPress={() => {
          ReSendCodeDisabled[1](true);
          resendTimerTrigger[1](!resendTimerTrigger[0]);
          resendOTP({PHPSESSID});
        }}
      />
    </View>
  );
};

export default OTPInputScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.white,
  },
  content: {flex: 1},
});
