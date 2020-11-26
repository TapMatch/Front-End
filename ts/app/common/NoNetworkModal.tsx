import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';

const NoNetworkModal = () => {
  const [modalIsVisible, setModalVisibility] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) =>
      handleConnectionStateChange(state),
    );
    return () => unsubscribe();
  }, []);

  const handleConnectionStateChange = (state: NetInfoState) => {
    setModalVisibility(state.isInternetReachable === false);
  };

  return (
    <Modal
      animationIn={'fadeIn'}
      animationInTiming={600}
      animationOut={'fadeOut'}
      animationOutTiming={600}
      isVisible={modalIsVisible}
      style={_s.modal}>
      <View style={_s.container}>
        <Text style={_s.txt}>Please, check your internet connection</Text>
      </View>
    </Modal>
  );
};

export default NoNetworkModal;

const _s = StyleSheet.create({
  modal: {margin: 0},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: _c.white,
    fontSize: _fs.l,
    fontWeight: '300',
  },
});
