import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import OTPInput from './components/OTPInput';
import Subtitle from './components/Subtitle';
import SwipeBackGuide from './components/SwipeBackGuide';
import Title from './components/Title';
import ReSendCode from './components/ReSendCode';
import {useNavigation} from '@react-navigation/native';
import {useBackHandler} from '@react-native-community/hooks';

interface OTPInputScreenProps {}

const OTPInputScreen = (props: OTPInputScreenProps) => {
  const OTP = useState<string>('');
  const {navigate} = useNavigation();
  useBackHandler(() => {
    if (false) {
      // handle it
      return true;
    }
    // let the default thing happen
    return false;
  });
  return (
    <View style={_s.container}>
      <View style={_s.content}>
        <SwipeBackGuide />
        <Title />
        <Subtitle />
        <OTPInput OTP={OTP} />
      </View>
      <ReSendCode
        hidden={false}
        onPress={() => {
          OTP[1]('');
          navigate('NameInput');
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
