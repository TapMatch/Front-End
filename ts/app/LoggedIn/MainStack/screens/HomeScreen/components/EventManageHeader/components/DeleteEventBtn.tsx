import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';

interface DeleteEventBtnProps {
  setupDeleteEventUI: () => void;
}

const DeleteEventBtn = ({setupDeleteEventUI}: DeleteEventBtnProps) => {
  return (
    <TouchableOpacity
      onPress={() => setupDeleteEventUI()}
      style={_s.container}>
      <Image source={require('assets/png/bin-black.png')} style={_s.img} />
    </TouchableOpacity>
  );
};

export default DeleteEventBtn;

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
