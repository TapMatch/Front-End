import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {s} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import CloseRed from 'assets/svg/close-red.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface CloseButtonProps {
  onPress: () => null;
}
// fs * 1.3;
const CloseButton = ({onPress}: CloseButtonProps) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[_s.iconBtnStyle, {bottom: bottom + 15}]}>
      <CloseRed height={s(20)} width={s(20)} />
    </TouchableOpacity>
  );
};

export default CloseButton;

const _s = StyleSheet.create({
  iconBtnStyle: {
    borderRadius: 100,
    borderColor: _c.main_red,
    borderWidth: StyleSheet.hairlineWidth,
    position: 'absolute',
    padding: 10,
    height: 'auto',
    width: 'auto',
    left: 5,
    zIndex: 8,
    backgroundColor: _c.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
