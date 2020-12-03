import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';

interface TitleProps {}

const Title = (props: TitleProps) => {
  const txt = useLocalizedTxt();
  return (
    <View style={_s.container}>
      <Text numberOfLines={1} style={_s.txt}>
        {txt.communities}
      </Text>
    </View>
  );
};

export default Title;

const _s = StyleSheet.create({
  container: {
    flex: 0.1,
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
