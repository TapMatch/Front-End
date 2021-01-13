import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {vs} from 'react-native-size-matters';
import CheckCircleRed from 'assets/svg/check-circle-red.svg';
import LockOpenWhite from 'assets/svg/lock-open-white.svg';
import {CommunityCodeInputContext} from 'ts/app/contexts/CommunityCodeInputContext';
import {useDimensions} from '@react-native-community/hooks';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {postUserFinishedOnboarding} from '../../../api/postUserFinishedOnboarding';
import {useIsFocused} from '@react-navigation/native';

interface CodeInputWindowProps {
  community: any;
}

const CodeInputWindow = ({community}: CodeInputWindowProps) => {
  const txt = useLocalizedTxt();
  const {windowState} = useContext(CommunityCodeInputContext);
  const isFocused = useIsFocused();
  const circleCheckRedSize = vs(70);
  const lockOpenWhiteSize = vs(55);
  const {height} = useDimensions().screen;
  const {name, city} = community;
  const {user_has_passed_onboarding, userProfile, userToken} = useContext(
    TapMatchContext,
  );
  const moveOn = () => {
    console.log('YYYYYYYYYYYYYYYYYYYY');
    user_has_passed_onboarding[1](true);
    postUserFinishedOnboarding({
      userProfile,
      userToken: userToken[0],
    });
    windowState[1](false);
  };

  useEffect(() => {
    console.log('kfkdfodfdfhsdifjJUHUHHUHUJHGTFTYDYTRERWQTEWZYRXUTCYVUBLIN');
    const redirect_timer = setTimeout(() => {
      console.log('fghupsdfugihpesri;ghesriughepri888888');
      if (isFocused) {
        console.log('OIUYOIUYOIUYOIUYOIUYOIUYOIU');
        moveOn();
      }
    }, 7000);
    // return clearTimeout(redirect_timer);
  }, []);

  return (
    <TouchableOpacity
      onPress={moveOn}
      style={[_s.container, {maxHeight: height * 0.52}]}>
      <CheckCircleRed height={circleCheckRedSize} width={circleCheckRedSize} />
      <Text style={[_s.txt, _s.msg]}>{txt.youAreNowAPartOf}</Text>
      <View style={_s.txtContainer}>
        <Text style={[_s.txt, _s.title]}>{name}</Text>
        <Text style={[_s.txt, _s.city]}>{city}</Text>
      </View>
      <LockOpenWhite height={lockOpenWhiteSize} width={lockOpenWhiteSize} />
    </TouchableOpacity>
  );
};

export default CodeInputWindow;

const _s = StyleSheet.create({
  container: {
    paddingVertical: vs(40),
    paddingHorizontal: _fs.xs,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    backgroundColor: _c.unlockedCommunityBtn,
    width: '80%',
    borderRadius: 20,
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: _f.regularAlt,
  },
  content: {
    flex: 1,
    minWidth: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  txtContainer: {
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: _fs.x5l * 1.3,
    color: _c.main_red,
    marginBottom: 2,
  },
  city: {
    fontSize: _fs.xxl * 1.1,
    color: _c.main_red,
  },
  msg: {
    fontSize: _fs.l,
    color: _c.white,
  },
});
