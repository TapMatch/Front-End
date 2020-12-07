import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ReSendCodeProps {
  onPress: () => void;
  disabled: boolean;
}

const ReSendCode = ({onPress, disabled}: ReSendCodeProps) => {
  const txt = useLocalizedTxt();
  const KAVBehaviorObj = Platform.OS === 'ios' ? 'position' : undefined;
  const {bottom} = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={KAVBehaviorObj}
      keyboardVerticalOffset={vs(70)}>
      <View
        pointerEvents={disabled ? 'none' : 'auto'}
        style={[
          _s.container,
          {
            height: vs(60) + bottom * 0.5,
            opacity: disabled ? 0 : 1,
          },
        ]}>
        <Text numberOfLines={1} style={_s.txt}>
          {txt.didntReceiveCode}
        </Text>
        <TouchableOpacity disabled={disabled} onPress={onPress} style={_s.btn}>
          <Text numberOfLines={1} style={[_s.txt, _s.underline]}>
            {txt.reSend}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ReSendCode;

const _s = StyleSheet.create({
  container: {
    minWidth: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontFamily: _f.regularAlt,
    fontSize: _fs.l,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  underline: {textDecorationLine: 'underline'},
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
  },
});
