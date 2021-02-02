import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {_fs} from 'ts/UIConfig/fontSizes';

interface DeleteEventBtnProps {
  setupDeleteEventUI: () => void;
}

const DeleteEventBtn = ({setupDeleteEventUI}: DeleteEventBtnProps) => {
  return (
    <TouchableOpacity
      onPress={() => setupDeleteEventUI()}
      style={_s.container}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={_s.img}
        source={require('assets/png/bin-black.png')}
      />
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
