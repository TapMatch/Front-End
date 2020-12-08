import React from 'react';
import {View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';

interface PlaceholderScreenProps {}

const PlaceholderScreen = (props: PlaceholderScreenProps) => {
  return <View style={_s.container} />;
};

export default PlaceholderScreen;

const _s = StyleSheet.create({
  container: {
    backgroundColor: _c.white,
    flex: 1,
  },
});
