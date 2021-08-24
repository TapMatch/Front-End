import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {s} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_fs} from 'ts/UIConfig/fontSizes';
import {formatHeight, formatWidth} from 'ts/utils/format-size';

interface CloseButtonProps {
  onPress: () => void;
}
// fs * 1.3;
const SkipButton = ({onPress}: CloseButtonProps) => {
  const {top} = useSafeAreaInsets();
  const txt = useLocalizedTxt();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[_s.iconBtnStyle, {top: formatHeight(19) + top}]}>
      <Text style={_s.txt}>{txt.skip}</Text>
    </TouchableOpacity>
  );
};

export default SkipButton;

const _s = StyleSheet.create({
  iconBtnStyle: {
    borderRadius: formatWidth(100),
    position: 'absolute',
    paddingLeft: formatWidth(10),
    paddingRight: formatWidth(10),
    paddingTop: formatWidth(5),
    paddingBottom: formatWidth(5),
    right: formatWidth(16),
    zIndex: 8,
    backgroundColor: _c.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: _c.white,
    fontSize: _fs.l,
  },
});
