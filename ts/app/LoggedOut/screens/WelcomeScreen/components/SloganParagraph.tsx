import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import useLocalizedTxt, {
  formatLocalizedTxt,
} from 'ts/localization/useLocalizedTxt';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {formatWidth} from '../../../../../utils/format-size';

interface SloganParagraphProps {
  startModalVisible: [boolean, (x: boolean) => void];
}

const SloganParagraph = ({startModalVisible}: SloganParagraphProps) => {
  const txt = useLocalizedTxt();
  const isFocused = useIsFocused();

  return (
    <View
      style={[
        _s.container,
        {
          opacity: startModalVisible[0] || !isFocused ? 0 : 1,
        },
      ]}>
      <Text style={_s.paragraphTxt}>
        {formatLocalizedTxt(txt.slogan, {
          together: (key: string) => (
            <Text key={key} style={_s.linkStyle}>
              {txt.together}
            </Text>
          ),
        })}
      </Text>
    </View>
  );
};

export default SloganParagraph;

const _s = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: formatWidth(37),
  },
  linkStyle: {
    textDecorationLine: 'underline',
  },
  paragraphTxt: {
    width: 180,
    color: _c.black,
    fontFamily: _f.regular,
    fontSize: _fs.l,
    textAlign: 'center',
  },
});
