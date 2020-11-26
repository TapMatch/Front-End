import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';

interface WebLoaderProps {}

const WebLoader = (props: WebLoaderProps) => {
  const txt = useLocalizedTxt();
  return (
    <View
      style={_s.loader}
      children={<Text style={_s.txt} children={txt.pleaseWait} />}
    />
  );
};

export default WebLoader;

const _s = StyleSheet.create({
  txt: {
    color: _c.tapMatchRed,
    fontSize: _fs.l,
  },
  loader: {
    backgroundColor: _c.white,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
