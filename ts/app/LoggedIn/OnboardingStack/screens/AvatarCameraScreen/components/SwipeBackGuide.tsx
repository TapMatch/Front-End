import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import ChevronLeftBlack from 'assets/svg/chevron-left-black.svg';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {useNavigation} from '@react-navigation/native';
import {formatHeight} from 'ts/utils/format-size';

interface SwipeBackGuideProps {}

const iconSize = _fs.xxl * 1.8;

const SwipeBackGuide = (props: SwipeBackGuideProps) => {
  const txt = useLocalizedTxt();
  const {goBack} = useNavigation();
  return (
    <TouchableOpacity activeOpacity={1} onPress={goBack} style={_s.container}>
      <ChevronLeftBlack height={iconSize} width={iconSize} />
      <View style={_s.txtContainer}>
        <Text style={_s.txt} numberOfLines={1}>
          {Platform.OS === 'ios'
            ? txt.swipeLeftToGoBack
            : txt.pressBackToReturn}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SwipeBackGuide;

const _s = StyleSheet.create({
  container: {
    height: formatHeight(62),
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
  txt: {
    color: _c.grey,
    fontFamily: _f.eRegular,
    fontSize: _fs.m,
  },
});
