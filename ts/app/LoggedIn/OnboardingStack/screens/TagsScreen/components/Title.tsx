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
    <>
      <Text numberOfLines={1} style={_s.txt}>
        {txt.chooseYourTags}
      </Text>
    </>
  );
};

export default Title;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  txt: {
    textAlign: 'center',
    alignSelf: 'center',
    color: _c.black,
    fontFamily: _f.regularAlt,
    fontSize: _fs.x3l,
  },
});
