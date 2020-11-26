import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import CloseBlack from 'assets/svg/close-black.svg';
interface CloseButtonProps {
  onPress: () => null;
}
// fs * 1.3;
const CloseButton = ({onPress}: CloseButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={_s.iconBtnStyle}>
      <CloseBlack height={vs(40)} width={vs(40)} />
    </TouchableOpacity>
  );
};

export default CloseButton;

const _s = StyleSheet.create({
  iconBtnStyle: {
    position: 'absolute',
    top: vs(65),
    right: 10,
    zIndex: 8,
    backgroundColor: _c.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
