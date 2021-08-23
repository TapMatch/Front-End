import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {formatHeight} from 'ts/utils/format-size';

interface BottomBtnProps {
  getUserLocation: any;
}

const BottomBtn = ({getUserLocation}: BottomBtnProps) => {
  const txt = useLocalizedTxt();
  const {bottom} = useSafeAreaInsets();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={getUserLocation}
      style={_s.container}>
      <Text style={_s.txt}>{txt.tapToContinue}</Text>
    </TouchableOpacity>
  );
};

export default BottomBtn;

const _s = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: formatHeight(33),
    backgroundColor: _c.black,
  },
  txt: {
    fontFamily: _f.regularAlt,
    fontSize: _fs.xl,
    color: _c.white,
    textAlign: 'center',
  },
});
