import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import PlusBlack from 'assets/svg/bin-black.svg';
import {_fs} from 'ts/UIConfig/fontSizes';
import {useNavigation} from '@react-navigation/native';

interface DeleteEventBtnProps { }

const DeleteEventBtn = (props: DeleteEventBtnProps) => {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate('CreateEvent')}
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
