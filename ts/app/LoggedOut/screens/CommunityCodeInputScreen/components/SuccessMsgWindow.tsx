import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {vs} from 'react-native-size-matters';

interface SuccessMsgWindowProps {}

const SuccessMsgWindow = (props: SuccessMsgWindowProps) => {
  const txt = useLocalizedTxt();
  return (
    <View style={_s.container}>
      <Text>You are now part of</Text>
    </View>
  );
};

export default SuccessMsgWindow;

const _s = StyleSheet.create({
  container: {
    height: vs(60),
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.white,
    fontFamily: _f.regularAlt,
    fontSize: _fs.xxxl,
  },
});
