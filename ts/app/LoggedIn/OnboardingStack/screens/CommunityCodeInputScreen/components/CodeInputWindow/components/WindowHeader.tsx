import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import ChevronLeftBlack from 'assets/svg/chevron-left-black.svg';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {useNavigation} from '@react-navigation/native';

interface WindowHeaderProps {}

const iconSize = _fs.xxl * 1.4;

const WindowHeader = (props: WindowHeaderProps) => {
  const txt = useLocalizedTxt();
  const {goBack} = useNavigation();
  return (
    <View style={_s.container}>
      <TouchableOpacity style={_s.iconContainerBtn} onPress={goBack}>
        <ChevronLeftBlack height={iconSize} width={iconSize} />
      </TouchableOpacity>
      <View style={_s.txtContainer}>
        <Text style={_s.txt} numberOfLines={1}>
          {txt.enterCodeTo}
        </Text>
        <Text style={_s.txt} numberOfLines={1}>
          {txt.gainAccessTo}
        </Text>
      </View>
    </View>
  );
};

export default WindowHeader;

const _s = StyleSheet.create({
  container: {
    height: vs(55),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtContainer: {
    paddingRight: iconSize,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerBtn: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  txt: {
    color: _c.main_red,
    fontFamily: _f.regularAltBold,
    fontSize: _fs.m,
  },
});
