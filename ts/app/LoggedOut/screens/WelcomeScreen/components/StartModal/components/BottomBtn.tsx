import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface BottomBtnProps {
  moveOn: () => void;
}

const BottomBtn = ({moveOn}: BottomBtnProps) => {
  const txt = useLocalizedTxt();
  const {bottom} = useSafeAreaInsets();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={moveOn}
      style={[_s.container, {height: vs(60) + bottom * 0.5}]}>
      <Text style={_s.txt}>{txt.tapToContinue}</Text>
    </TouchableOpacity>
  );
};

export default BottomBtn;

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
    color: _c.black,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
