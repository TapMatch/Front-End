import React from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import ModalHeader from './components/ModalHeader/ModalHeader';
import ProfileBubble from './components/ProfileBubble';

interface ProfileModalProps {
  modalVisible: [boolean, (x: boolean) => void];
}

const ProfileModal = ({modalVisible}: ProfileModalProps) => {
  return (
    <Modal
      visible={modalVisible[0]}
      transparent={true}
      style={_s.modal}>
      <View style={_s.container}>
        <ModalHeader />
        <ProfileBubble />
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => modalVisible[1](false)}
          style={_s.closeArea}
        />
      </View>
    </Modal>
  );
};

export default ProfileModal;

const _s = StyleSheet.create({
  modal: {margin: 0},
  container: {
    backgroundColor: _c.modalbackground,
    flex: 1,
    alignItems: 'stretch',
    position: 'relative',
  },
  closeArea: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 10,
  },
});
