import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import PlusBlack from 'assets/svg/plus-black.svg';
import {_fs} from 'ts/UIConfig/fontSizes';
import {useNavigation} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import callAlert from 'ts/utils/callAlert';

interface AddEventBtnProps {}

const AddEventBtn = (props: AddEventBtnProps) => {
  const {userProfile} = useContext(TapMatchContext);
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (userProfile[0].events.length < 5) {
          navigate('CreateEvent', {address: '', coordinates: {}});
        } else {
          callAlert(undefined, 'You can\'t create events with 5 or more events joined.');
        }
      }}
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
