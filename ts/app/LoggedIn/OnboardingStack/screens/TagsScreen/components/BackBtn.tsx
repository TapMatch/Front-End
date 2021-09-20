import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ArrowLeftBlack from 'assets/svg/arrow-left.svg';
import {_fs} from 'ts/UIConfig/fontSizes';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {formatHeight, formatWidth} from 'ts/utils/format-size';
interface BackBtnProps {}

const iconSize = _fs.xxl * 1.8;

const BackBtn = (props: BackBtnProps) => {
  const {top} = useSafeAreaInsets();
  const {goBack} = useNavigation();

  return (
    <View style={[_s.container, {top: formatHeight(6) + top}]}>
      <TouchableOpacity onPress={goBack} style={_s.btn}>
        <ArrowLeftBlack height={iconSize} width={iconSize} />
      </TouchableOpacity>
    </View>
  );
};

export default BackBtn;

const _s = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    left: formatWidth(32),
  },
  btn: {
    height: formatHeight(24),
    width: formatHeight(24),
  },
});
