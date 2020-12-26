import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CloseBlack from 'assets/svg/close-black.svg';
import {_fs} from 'ts/UIConfig/fontSizes';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';

interface CloseBtnProps { }

const CloseBtn = (props: CloseBtnProps) => {
  const {yesNoModalVisible} = useContext(CreateEventScreenContext);
  return (
    <TouchableOpacity onPress={() => yesNoModalVisible[1](true)} style={_s.container} >
      <CloseBlack height={_fs.xxl} width={_fs.xxl} />
    </TouchableOpacity >
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
