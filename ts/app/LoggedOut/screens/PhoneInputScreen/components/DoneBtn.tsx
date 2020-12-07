import React, {useContext} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {requestOTP} from '../api/requestOTP';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';

interface DoneBtnProps {
  disabled: boolean;
  callingCode: [string, (x: string) => void];
  phoneNumber: [string, (x: string) => void];
}

const DoneBtn = ({disabled, callingCode, phoneNumber}: DoneBtnProps) => {
  const {navigate} = useNavigation();
  const {LoggedIn} = useContext(TapMatchContext);
  const txt = useLocalizedTxt();
  const KAVBehaviorObj = Platform.OS === 'ios' ? 'position' : undefined;
  const doneTxtColor: string = disabled ? _c.grey : _c.main_red;
  const {bottom} = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={KAVBehaviorObj}
      keyboardVerticalOffset={vs(60)}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={1}
        onPress={() => {
          Keyboard.dismiss();
          navigate('OTPInput');
          requestOTP({
            callingCode: callingCode[0],
            phoneNumber: phoneNumber[0],
            LoggedIn,
          });
        }}
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
