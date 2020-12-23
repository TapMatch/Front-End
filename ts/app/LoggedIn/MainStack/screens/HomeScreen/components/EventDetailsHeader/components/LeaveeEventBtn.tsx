import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';

interface LeaveeEventBtnProps {
  setupLeaveEventUI: () => void;
}

const LeaveeEventBtn = ({setupLeaveEventUI}: LeaveeEventBtnProps) => {
  return (
    <TouchableOpacity
      onPress={() => setupLeaveEventUI()}
      style={_s.container}>
      <Image source={require('assets/png/logout-black.png')} style={_s.img} />
    </TouchableOpacity>
  );
};

export default LeaveeEventBtn;

const _s = StyleSheet.create({
  container: {
    padding: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: _fs.x6l,
    width: _fs.x6l
  }
});
