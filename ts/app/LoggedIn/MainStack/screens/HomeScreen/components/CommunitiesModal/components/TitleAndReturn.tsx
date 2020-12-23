import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {vs} from 'react-native-size-matters';
import ChevronWhite from 'assets/svg/chevron-left-white.svg';

interface TitleAndReturnProps {
  modalVisible: [boolean, (x: boolean) => void];
}

const TitleAndReturn = ({modalVisible}: TitleAndReturnProps) => {
  const txt = useLocalizedTxt();

  return (
    <View style={_s.container}>
      <TouchableOpacity onPress={() => modalVisible[1](false)} style={_s.btn}>
        <ChevronWhite height={_fs.x9l} width={_fs.x9l} />
      </TouchableOpacity>
      <Text numberOfLines={1} style={_s.txt}>
        {txt.communities}
      </Text>
    </View>
  );
};

export default TitleAndReturn;

const _s = StyleSheet.create({
  container: {
    paddingRight: _fs.x9l,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100%',
    height: vs(60),
    borderRadius: 20,
    flexDirection: 'row',
  },
  btn: {
    alignItems: 'center',
    paddingVertical: '3%',
    paddingLeft: '3%',
    paddingRight: 8,
    justifyContent: 'center',
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.white,
    fontFamily: _f.regularAlt,
    fontSize: _fs.x3l,
  },
});
