import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import Header from '../Header/Header';

interface EventDetailsModalProps {
  modalVisible: [boolean, (x: boolean) => void];
}
const EventDetailsModal = ({modalVisible}: EventDetailsModalProps) => {
  return (
    <Modal
      animationIn={'fadeIn'}
      animationInTiming={500}
      animationOut={'fadeOut'}
      backdropColor={'transparent'}
      animationOutTiming={500}
      isVisible={modalVisible[0]}
      style={_s.modal}>
      <View style={_s.container}>
        <Header />
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => modalVisible[1](false)}
          style={_s.closeArea}
        />
        <View style={_s.content}></View>
      </View>
    </Modal>
  );
};

export default EventDetailsModal;
const wh = Dimensions.get('screen');
const _s = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  closeArea: {
    flex: 1,
  },
  content: {
    borderRadius: 20,
    backgroundColor: _c.white,
    position: 'absolute',
    bottom: wh.width * 0.05,
    left: wh.width * 0.05,
    minWidth: wh.width * 0.9,
    height: (wh.height - vs(120)) * 0.5,
    // height: (wh.height - vs(120)) * 0.55,
  },
});
