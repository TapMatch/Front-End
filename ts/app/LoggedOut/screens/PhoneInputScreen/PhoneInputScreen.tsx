import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {CountryCode} from 'react-native-country-picker-modal';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import validatePhoneNumber from 'ts/utils/validatePhoneNumber';
import DoneBtn from './components/DoneBtn';
import PhoneInput from './components/PhoneInput';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import {useBackHandler} from '@react-native-community/hooks';
import {useNavigation} from '@react-navigation/native';
import {LoggedOutScreens} from 'ts/constants/screens';

interface PhoneInputScreenProps {}

const PhoneInputScreen = (props: PhoneInputScreenProps) => {
  const callingCode = useState<string>('376');
  const countryCode = useState<CountryCode>('AD');
  const phoneNumber = useState<string>('');
  const {navigate} = useNavigation();
  useBackHandler(() => {
    navigate(LoggedOutScreens.Welcome);
    return true;
  });
  const doneBtnDisabled =
    phoneNumber[0].length < 6 ||
    !validatePhoneNumber(`${phoneNumber[0]}`, countryCode[0]);
  return (
    <View style={_s.container}>
      <View style={_s.content}>
        <Title />
        <Subtitle />
        <PhoneInput
          callingCode={callingCode}
          countryCode={countryCode}
          phoneNumber={phoneNumber}
        />
      </View>
      <DoneBtn
        disabled={doneBtnDisabled}
        callingCode={callingCode}
        countryCode={countryCode}
        phoneNumber={phoneNumber}
      />
    </View>
  );
};

export default PhoneInputScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.white,
  },
  content: {
    flex: 1,
    paddingTop: vs(55),
  },
});
