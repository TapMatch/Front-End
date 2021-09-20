import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import ChevronLeftBlack from 'assets/svg/chevron-left-black.svg';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface BackBtnProps {}

const iconSize = _fs.xxl * 1.8;

const BackBtn = (props: BackBtnProps) => {
  const {top} = useSafeAreaInsets();
  const {goBack} = useNavigation();

  return (
    <View style={[_s.container, {top: top + vs(50)}]}>
      <TouchableOpacity onPress={goBack} style={_s.btn}>
        <ChevronLeftBlack height={iconSize} width={iconSize} />
      </TouchableOpacity>
    </View>
  );
};

export default BackBtn;

const _s = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    zIndex: 100,
    height: vs(55),
    justifyContent: 'center',
    alignItems: 'flex-start',
    minWidth: '100%',
  },
  btn: {
    height: '70%',
    width: iconSize + 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
