import React, {useContext} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {postUserName} from '../api/postUserName';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {OnBoardingScreens} from 'ts/constants/screens';

interface DoneBtnProps {
  disabled: boolean;
  name: string;
}

const DoneBtn = ({disabled, name}: DoneBtnProps) => {
  const {navigate} = useNavigation();
  const txt = useLocalizedTxt();
  const KAVBehaviorObj = Platform.OS === 'ios' ? 'position' : undefined;
  const doneTxtColor: string = disabled ? _c.grey : _c.main_red;
  const {bottom} = useSafeAreaInsets();
  const {
    userProfile,
    userToken,
    LoggedIn,
    user_has_passed_onboarding,
  } = useContext(TapMatchContext);

  return (
    <KeyboardAvoidingView
      behavior={KAVBehaviorObj}
      keyboardVerticalOffset={vs(60)}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={1}
        onPress={() => {
          postUserName({
            name,
            userProfile,
            userToken: userToken[0],
            LoggedIn,
            user_has_passed_onboarding,
          });
          navigate(OnBoardingScreens.MapDemo);
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
    height: vs(60),
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
