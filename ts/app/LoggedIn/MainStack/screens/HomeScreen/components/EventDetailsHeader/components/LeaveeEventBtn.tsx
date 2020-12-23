import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {useNavigation} from '@react-navigation/native';

interface LeaveeEventBtnProps { }

const LeaveeEventBtn = (props: LeaveeEventBtnProps) => {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate('CreateEvent')}
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
