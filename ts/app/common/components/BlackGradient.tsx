import React from 'react';
import {StyleSheet} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Rect} from 'react-native-svg';
// const { width, height } = Dimensions.get('window');

const BlackGradient = () => (
  <Svg style={_s.contaiter} width={'100%'} height={8}>
    <Defs>
      <LinearGradient id="prefix__a" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="100%" stopColor="rgb(0,0,0)" stopOpacity="0" />
        <Stop offset="50%" stopColor="rgb(0,0,0)" stopOpacity=".05" />
        <Stop offset="0%" stopColor="rgb(0,0,0)" stopOpacity=".09" />
      </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width="100%" height="100%" fill="url(#prefix__a)" />
  </Svg>
);
const _s = StyleSheet.create({
  contaiter: {
    width: '100%',
    maxHeight: '100%',
  },
});
export default BlackGradient;
