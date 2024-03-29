import React, {useContext} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// @ts-ignore
import LibPhoneNumber from 'google-libphonenumber';
import {requestOTP} from '../api/requestOTP';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {CountryCode} from 'react-native-country-picker-modal';
import {signInWithPhoneNumber} from 'ts/store/auth/service';
import callAlert from 'ts/utils/callAlert';

interface DoneBtnProps {
  disabled: boolean;
  callingCode: [string, (x: string) => void];
  phoneNumber: [string, (x: string) => void];
  countryCode: [CountryCode, (x: CountryCode) => void];
}

const DoneBtn = ({
  disabled,
  callingCode,
  phoneNumber,
  countryCode,
}: DoneBtnProps) => {
  const {navigate} = useNavigation();
  const {PHPSESSID} = useContext(TapMatchContext);
  const txt = useLocalizedTxt();
  const KAVBehaviorObj = Platform.OS === 'ios' ? 'position' : undefined;
  const doneTxtColor: string = disabled ? _c.grey : _c.main_red;
  const {bottom} = useSafeAreaInsets();
  const phoneUtil = LibPhoneNumber.PhoneNumberUtil.getInstance();

  const handleSubmit = async () => {
    const number = phoneUtil.parse(phoneNumber[0], countryCode[0]);
    try {
      signInWithPhoneNumber(
        `+${callingCode[0]}${number.getNationalNumber()}`,
      ).then((data) => {
        console.log('data ======', data);
        if (data) {
          requestOTP({
            callingCode: callingCode[0],
            phoneNumber: number.getNationalNumber(),
            PHPSESSID,
          });
        }
      });

      navigate('OTPInput');
    } catch (error) {
      console.log('error: =================', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={KAVBehaviorObj}
      keyboardVerticalOffset={vs(60)}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={1}
        onPress={handleSubmit}
        style={[_s.container, {height: vs(60) + bottom * 0.5}]}>
        <Text style={[_s.txt, {color: doneTxtColor}]}>{txt.done}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default DoneBtn;

const _s = StyleSheet.create({
  container: {
    backgroundColor: _c.transparentBtn,
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontFamily: _f.regularAlt,
    fontSize: _fs.xl,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
