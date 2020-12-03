import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ContinueBtnProps {}

const ContinueBtn = (props: ContinueBtnProps) => {
  const {navigate} = useNavigation();
  const txt = useLocalizedTxt();
  const {bottom} = useSafeAreaInsets();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigate('AllSet')}
      style={[_s.container, {height: vs(60) + bottom * 0.5}]}>
      <Text style={_s.txt}>{txt.tapToContinue}</Text>
    </TouchableOpacity>
  );
};

export default ContinueBtn;

const _s = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: _c.transparentBtn,
    minWidth: '100%',
    justifyContent: 'center',
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
