import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';

interface SubtitleProps {}

const Subtitle = (props: SubtitleProps) => {
  const txt = useLocalizedTxt();
  return (
    <View style={_s.container}>
      <Text numberOfLines={1} style={_s.txt}>
        {txt.everyoneInYourCommunity}
      </Text>
      <Text numberOfLines={1} style={_s.txt}>
        {txt.willSeeYourName}
      </Text>
    </View>
  );
};

export default Subtitle;

const _s = StyleSheet.create({
  container: {
    minHeight: _fs.l,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '1.5%',
  },
  txt: {
    overflow: 'visible',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.main_red,
    fontFamily: _f.regularAlt,
    fontSize: _fs.l,
  },
});
