import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ArrowRightBlack from 'assets/svg/arrow_right.svg';
import { _fs } from 'ts/UIConfig/fontSizes';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatHeight, formatWidth } from 'ts/utils/format-size';
interface PrevBtnProps { }

const iconSize = _fs.xxl * 0.8;

const PrevBtn = (props: PrevBtnProps) => {
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  return (
    <View style={[_s.container, { top:  top + formatHeight(4) }]}>
      <TouchableOpacity onPress={goBack}>
        <ArrowRightBlack height={iconSize} width={iconSize} />
      </TouchableOpacity>
    </View>
  );
};

export default PrevBtn;

const _s = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    right: formatWidth(32),

  },
});
