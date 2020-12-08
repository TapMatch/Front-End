import React, {useContext} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {postUserFinishedOnboarding} from '../api/postUserFinishedOnboarding';

interface StartBtnProps {}

const StartBtn = (props: StartBtnProps) => {
  const txt = useLocalizedTxt();
  const {bottom} = useSafeAreaInsets();
  const {user_has_passed_onboarding, userProfile, userToken} = useContext(
    TapMatchContext,
  );

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        user_has_passed_onboarding[1](true);
        postUserFinishedOnboarding({userProfile, userToken: userToken[0]});
      }}
      style={[_s.container, {height: vs(60) + bottom * 0.5}]}>
      <Text style={_s.txt}>{txt.tapToStartThe}</Text>
      <Text style={_s.txt}>{txt.tapMatchExperience}</Text>
    </TouchableOpacity>
  );
};

export default StartBtn;

const _s = StyleSheet.create({
  container: {
    backgroundColor: _c.transparentBtn,
    minWidth: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  txt: {
    fontFamily: _f.regularAlt,
    fontSize: _fs.xl,
    textAlign: 'center',
    color: _c.black,
    textAlignVertical: 'center',
  },
});
