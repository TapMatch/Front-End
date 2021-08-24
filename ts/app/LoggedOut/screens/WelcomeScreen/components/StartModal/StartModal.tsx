import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomBtn from './components/BottomBtn';
import TermsAndConditionsParagraph from './components/TermsAndConditionsParagraph';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {_c} from 'ts/UIConfig/colors';
import {useHeaderHeight} from '@react-navigation/stack';
import {LoggedOutScreens} from 'ts/constants/screens';
import {getStorageData, setStorageData} from 'ts/utils/asyncStorage';
import StorageKeys from 'ts/constants/storage';

interface StartModalProps {
  modalVisible: [boolean, (x: boolean) => void];
}

const StartModal = ({modalVisible}: StartModalProps) => {
  const {top} = useSafeAreaInsets();
  const {navigate} = useNavigation();
  const headerHeight = useHeaderHeight();
  const moveOn = async () => {
    modalVisible[1](false);
    const passedTutorial = await getStorageData(StorageKeys.PassedTutorial);
    if (passedTutorial === '1') {
      navigate(LoggedOutScreens.PhoneInput);
    } else {
      navigate(LoggedOutScreens.TutorialScreen, {playVideo: true});
    }
  };
  return (
    <Modal
      animationIn={'fadeIn'}
      useNativeDriver={true}
      hasBackdrop={false}
      animationInTiming={600}
      animationOut={'slideOutLeft'}
      animationOutTiming={500}
      isVisible={modalVisible[0]}
      style={_s.modal}>
      <View style={[_s.container, {paddingTop: top + headerHeight}]}>
        <View style={_s.container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={moveOn}
            style={_s.middle}
          />
          <TermsAndConditionsParagraph modalVisible={modalVisible} />
          <BottomBtn moveOn={moveOn} />
        </View>
      </View>
    </Modal>
  );
};

export default StartModal;

const _s = StyleSheet.create({
  modal: {margin: 0},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: _c.invisible,
  },
  middle: {
    minWidth: '100%',
    flex: 0.7,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '5%',
  },
});
