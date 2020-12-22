import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';

interface SloganParagraphProps {
  startModalVisible: [boolean, (x: boolean) => void]
}

const SloganParagraph = ({startModalVisible}: SloganParagraphProps) => {
  const txt = useLocalizedTxt();
  const isFocused = useIsFocused()

  return (
    <View style={[_s.container, {
      opacity: startModalVisible[0] || !isFocused ? 0 : 1
    }]}>
      <Text numberOfLines={1} style={_s.paragraphTxt}>
        {txt.atTapMatchOurMain}
      </Text>
      <Text numberOfLines={1} style={_s.paragraphTxt}>
        {txt.focusIsBringingPeople}
      </Text>
      <Text numberOfLines={1} style={[_s.paragraphTxt, _s.linkStyle]}>
        {txt.together}
      </Text>
    </View >
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
  linkStyle: {
    textDecorationLine: 'underline',
    paddingBottom: '5%',
  },
  paragraphTxt: {
    height: 'auto',
    width: '75%',
    color: _c.black,
    fontFamily: _f.regular,
    fontSize: _fs.l,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
