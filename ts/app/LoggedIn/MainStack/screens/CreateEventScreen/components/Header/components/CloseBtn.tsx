import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PlusBlack from 'assets/svg/close-black.svg';
import {_fs} from 'ts/UIConfig/fontSizes';
import {useNavigation} from '@react-navigation/native';

interface CloseBtnProps {}

const CloseBtn = (props: CloseBtnProps) => {
  const {goBack} = useNavigation();
  return (
    <TouchableOpacity onPress={goBack} style={_s.container}>
      <PlusBlack height={_fs.xxl} width={_fs.xxl} />
    </TouchableOpacity>
  );
};

export default CloseBtn;

const _s = StyleSheet.create({
  container: {
    padding: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
