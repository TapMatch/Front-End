import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {s} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface RedCircleBtnProps {
  onPress: any;
}

const RedCircleBtn = ({onPress}: RedCircleBtnProps) => {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View style={[_s.container, {paddingBottom: bottom, paddingTop: top}]}>
      <TouchableOpacity onPress={onPress} style={[_s.btn, _s.shadow]}>
        <View style={_s.redCircle} />
      </TouchableOpacity>
    </View>
  );
};

export default RedCircleBtn;

const _s = StyleSheet.create({
  container: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: _c.white,
    borderRadius: 120,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  redCircle: {
    height: '100%',
    width: '100%',
    borderRadius: 120,
    backgroundColor: _c.main_red,
  },
  shadow: {
    shadowColor: _c.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
