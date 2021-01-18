import React, {useContext} from 'react';
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

interface CodeInputWindowProps {
  community: any;
  codeInputVisible: [boolean, (x: boolean) => void];

}

const SuccessMsgWindow = ({community, codeInputVisible}: CodeInputWindowProps) => {
  const txt = useLocalizedTxt();
  const {windowState} = useContext(CommunityCodeInputContext);
  const circleCheckRedSize = vs(70);
  const lockOpenWhiteSize = vs(55);
  const {height} = useDimensions().screen;
  const {name, city} = community;

  return (
    <TouchableOpacity
      onPress={() => {
        codeInputVisible[1](false);
        windowState[1](false);
      }}
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

export default SuccessMsgWindow;

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
