import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';

interface YesNoModalProps {
  modalVisible: [boolean, (x: boolean) => void];
  title: string;
  subtitle?: string;
  onYesPress?: () => void;
  onNoPress?: () => void;
}
const YesNoModal = ({
  modalVisible,
  title,
  subtitle,
  onYesPress,
  onNoPress,
}: YesNoModalProps) => {
  const txt = useLocalizedTxt();
  const renderSubtitle = () => {
    if (typeof subtitle === 'string') {
      return (
        <Text numberOfLines={2} style={_s.subtitle}>
          {subtitle}
        </Text>
      );
    } else {
      return <View style={{width: '100%', height: _fs.s + 12}} />;
    }
  };
  const handleYes = () => {
    if (typeof onYesPress === 'function') {
      console.log('IUUIUIIIUIUIUIUIUIUIIUIUIUIUIUI');
      onYesPress();
    }
    modalVisible[1](false);
  };
  const handleNo = () => {
    if (typeof onNoPress === 'function') {
      onNoPress();
    }
    modalVisible[1](false);
  };
  return (
    <Modal
      animationIn={'fadeIn'}
      animationInTiming={600}
      animationOut={'fadeOut'}
      animationOutTiming={600}
      isVisible={modalVisible[0]}
      style={_s.modal}>
      <View style={_s.container}>
        <View style={_s.top}>
          <Text numberOfLines={3} style={_s.title}>
            {title}
          </Text>
          {renderSubtitle()}
        </View>
        <View style={_s.bottom}>
          <TouchableOpacity activeOpacity={1} onPress={handleYes} style={[_s.btn, _s.yesBtn]}>
            <Text numberOfLines={1} style={[_s.btnTxt, _s.yesBtnTxt]}>
              {txt.yes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={handleNo} style={[_s.btn, _s.noBtn]}>
            <Text numberOfLines={1} style={[_s.btnTxt, _s.noBtnTxt]}>
              {txt.noStay}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default YesNoModal;

const _s = StyleSheet.create({
  modal: {margin: 0},
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: _c.modalbackground,
  },
  top: {
    flex: 0.4,
    paddingTop: '15%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottom: {
    flex: 0.6,
    maxHeight: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: _fs.x3l,
    fontFamily: _f.regularAltBold,
    lineHeight: _fs.xxl * 1.3,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.white,
  },
  subtitle: {
    fontSize: _fs.s,
    fontFamily: _f.regular,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.white,
  },
  btn: {
    height: vs(60),
    width: '60%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: _fs.xl,
    fontFamily: _f.regular,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  yesBtn: {
    backgroundColor: _c.white,
    marginBottom: 30,
  },
  yesBtnTxt: {
    color: _c.black,
  },
  noBtn: {
    backgroundColor: _c.noBtnBackground,
  },
  noBtnTxt: {
    color: _c.white,
  },
});
