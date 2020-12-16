import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {vs} from 'react-native-size-matters';
import Slider from '@react-native-community/slider';

interface LimitSliderProps {
  joinLimit: [number, (x: number) => void];
}

const LimitSlider = ({joinLimit}: LimitSliderProps) => {
  const extraProps = Platform.OS === 'ios' ? {} : {thumbTintColor: _c.main_red};
  return (
    <View style={[_s.container]}>
      <Text style={[_s.txt, {alignSelf: 'flex-start'}]}>Set Join Limit</Text>
      <Slider
        {...extraProps}
        onValueChange={joinLimit[1]}
        style={_s.slider}
        minimumValue={1}
        maximumValue={100}
        step={1}
        minimumTrackTintColor={_c.main_red}
        maximumTrackTintColor={_c.main_red}
      />
      <Text style={_s.txt}>{joinLimit[0]}</Text>
    </View>
  );
};

export default LimitSlider;

const _s = StyleSheet.create({
  container: {
    paddingHorizontal: '6%',
    paddingVertical: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: vs(120),
    borderBottomColor: _c.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  slider: {
    width: '100%',
    height: 50,
  },

  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: _f.regular,
    fontSize: _fs.m,
    color: _c.black,
  },
});
