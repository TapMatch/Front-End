import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {useHeaderHeight} from '@react-navigation/stack';

interface SloganParagraphProps {
  startModalVisible: [boolean, (x: boolean) => void];
}

const SloganParagraph = () => {
  const txt = useLocalizedTxt();
  const headerHeight = useHeaderHeight();

  return (
    <View style={_s.container}>
      <Text style={_s.paragraphTxt}>{txt.welcomeToTapMatch}</Text>
    </View>
  );
};

export default SloganParagraph;

const _s = StyleSheet.create({
  container: {},
  paragraphTxt: {
    color: _c.white,
    fontFamily: _f.regularAlt,
    fontSize: _fs.x4l,
  },
});
