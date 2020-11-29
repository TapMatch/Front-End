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

interface ReSendCodeProps {
  hidden: boolean;
  onPress: () => void;
}

const ReSendCode = ({hidden, onPress}: ReSendCodeProps) => {
  const txt = useLocalizedTxt();
  const KAVBehaviorObj = Platform.OS === 'ios' ? 'position' : undefined;

  if (hidden) {
    return <View style={_s.container} />;
  } else {
    return (
      <KeyboardAvoidingView
        behavior={KAVBehaviorObj}
        keyboardVerticalOffset={vs(70)}>
        <View style={_s.container}>
          <Text numberOfLines={1} style={_s.txt}>
            {txt.didntReceiveCode}
            <TouchableOpacity onPress={onPress}>
              <Text numberOfLines={1} style={[_s.txt, _s.underline]}>
                {txt.reSend}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
};

export default ReSendCode;

const _s = StyleSheet.create({
  container: {
    minWidth: '100%',
    height: vs(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontFamily: _f.regularAlt,
    fontSize: _fs.l,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  underline: {textDecorationLine: 'underline'},
});
