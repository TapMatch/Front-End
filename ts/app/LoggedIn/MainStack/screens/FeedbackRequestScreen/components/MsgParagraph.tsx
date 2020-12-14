import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';

interface SloganParagraphProps {}

const SloganParagraph = (props: SloganParagraphProps) => {
  const txt = useLocalizedTxt();

  return (
    <View style={_s.container}>
      <Text numberOfLines={2} style={[_s.paragraphTxt, _s.paragraphOne]}>
        {`TAPMATCH is in\nit's infancy.`}
      </Text>
      <Text
        numberOfLines={2}
        style={[_s.paragraphTxt, _s.paragraphTwo, _s.offset]}>
        {`Every thought\nmatters to us.`}
      </Text>
    </View>
  );
};

export default SloganParagraph;

const _s = StyleSheet.create({
  container: {
    paddingVertical: '10%',
    width: '100%',
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offset: {
    marginTop: 30,
    paddingBottom: '5%',
  },
  paragraphTxt: {
    height: 'auto',
    width: '75%',
    color: _c.black,
    fontFamily: _f.regularAlt,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  paragraphOne: {fontSize: _fs.x7l},
  paragraphTwo: {fontSize: _fs.x5l},
});
