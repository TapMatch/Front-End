import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CloseBlack from 'assets/svg/close-black.svg';
import {_fs} from 'ts/UIConfig/fontSizes';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';
import {useNavigation} from '@react-navigation/native';

interface CloseBtnProps {}

const CloseBtn = (props: CloseBtnProps) => {
  const {yesNoModalVisible,
    //  dateTime, coordinates, address
    eventName, joinLimit, description} = useContext(CreateEventScreenContext);

  const {goBack} = useNavigation();
  return (
    <TouchableOpacity onPress={() => {
      const condition =
        joinLimit[0] === 1
        && description[0] === ''
        && eventName[0] === '';
      if (condition) {
        goBack();
      } else {
        yesNoModalVisible[1](true);
      }
    }} style={_s.container} >
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
