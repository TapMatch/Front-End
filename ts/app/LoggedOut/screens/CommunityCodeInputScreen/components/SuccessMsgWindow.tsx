import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {vs} from 'react-native-size-matters';
import CheckCircleRed from 'assets/svg/check-circle-red.svg';
import LockOpenWhite from 'assets/svg/lock-open-white.svg';

interface CodeInputWindowProps {}

const CodeInputWindow = (props: CodeInputWindowProps) => {
  const code = useState<string>('');
  const txt = useLocalizedTxt();
  const circleCheckRedSize = vs(70);
  const lockOpenWhiteSize = vs(55);

  return (
    <View style={_s.container}>
      <CheckCircleRed height={circleCheckRedSize} width={circleCheckRedSize} />
      <Text style={[_s.txt, _s.msg]}>You are now a part of</Text>
      <View style={_s.txtContainer}>
        <Text style={[_s.txt, _s.title]}>UvA</Text>
        <Text style={[_s.txt, _s.city]}>Amsterdam</Text>
      </View>
      <LockOpenWhite height={lockOpenWhiteSize} width={lockOpenWhiteSize} />
    </View>
  );
};

export default CodeInputWindow;

const _s = StyleSheet.create({
  container: {
    paddingVertical: vs(40),
    paddingHorizontal: _fs.xs,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.6,
    maxHeight: '60%',
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
    fontSize: _fs.xxxxxl * 1.3,
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
