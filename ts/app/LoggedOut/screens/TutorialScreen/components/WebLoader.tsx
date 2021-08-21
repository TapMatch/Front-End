import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {isDefined} from 'ts/utils/is-defined';

interface WebLoaderProps {
  message?: string;
}

const WebLoader = (props: WebLoaderProps) => {
  const txt = useLocalizedTxt();
  const message = isDefined(props.message) ? props.message : txt.pleaseWait;
  return (
    <View
      style={_s.loader}
      children={<Text style={_s.txt} children={message} />}
    />
  );
};

export default WebLoader;

const _s = StyleSheet.create({
  txt: {
    color: _c.white,
    fontSize: _fs.l,
  },
  loader: {
    backgroundColor: _c.black,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
