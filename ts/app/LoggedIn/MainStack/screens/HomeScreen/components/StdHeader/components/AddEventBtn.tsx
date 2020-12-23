import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import PlusBlack from 'assets/svg/plus-black.svg';
import {_fs} from 'ts/UIConfig/fontSizes';
import {useNavigation} from '@react-navigation/native';

interface AddEventBtnProps { }

const AddEventBtn = (props: AddEventBtnProps) => {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate('CreateEvent', {address: null, coordinates: null})}
      style={_s.container}>
      <PlusBlack height={_fs.x6l} width={_fs.x6l} />
    </TouchableOpacity>
  );
};

export default AddEventBtn;

const _s = StyleSheet.create({
  container: {
    padding: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
