import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import CircleRed from 'assets/svg/circle-red.svg';
import {_c} from 'ts/UIConfig/colors';

interface RedCircleBtnProps {
  onPress: any;
}

const RedCircleBtn = ({onPress}: RedCircleBtnProps) => {
  return (
    <View style={_s.container}>
      <TouchableOpacity onPress={onPress} style={_s.btn}>
        <CircleRed height={'100%'} width={'100%'} />
      </TouchableOpacity>
    </View>
  );
};

export default RedCircleBtn;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'indigo',
  },
  btn: {
    backgroundColor: _c.white,
    borderRadius: 120,
    justifyContent: 'center',
    padding: 10,
  },
});
