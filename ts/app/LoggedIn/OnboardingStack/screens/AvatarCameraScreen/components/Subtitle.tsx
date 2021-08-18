import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {formatHeight, formatWidth} from 'ts/utils/format-size';

interface SubtitleProps {}

const Subtitle = (props: SubtitleProps) => {
  const txt = useLocalizedTxt();
  return (
    <>
      <Text numberOfLines={1} style={_s.txt}>
        {txt.youCanRetakeThisAnytime}
      </Text>
    </>
  );
};

export default Subtitle;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  txt: {
    textAlign: 'center',
    color: _c.main_red,
    fontFamily: _f.regularAlt,
    fontSize: _fs.l,
    marginTop: formatHeight(3),
  },
});
