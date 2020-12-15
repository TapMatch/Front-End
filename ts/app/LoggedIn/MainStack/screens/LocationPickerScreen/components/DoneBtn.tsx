import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {vs} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {useNavigation} from '@react-navigation/native';

interface DoneBtnProps {}

const DoneBtn = (props: DoneBtnProps) => {
  const {bottom} = useSafeAreaInsets();
  const {goBack} = useNavigation();
  const KAVBehaviorObj = Platform.OS === 'ios' ? 'position' : undefined;

  return (
    <KeyboardAvoidingView
      behavior={KAVBehaviorObj}
      contentContainerStyle={_s.kav}
      style={[_s.container, {bottom}]}
      keyboardVerticalOffset={vs(15)}>
      <View style={_s.btnContainer}>
        <TouchableOpacity onPress={goBack} style={[_s.btn, _s.center]}>
          <Text style={_s.btnTxt}>Done</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default DoneBtn;

const _s = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    zIndex: 1000,
  },
  kav: {
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  btnContainer: {
    height: '100%',
    width: '80%',
    backgroundColor: _c.smoke,
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth * 4,
    borderStyle: 'dotted',
    borderColor: _c.main_red,
  },
  btn: {
    flex: 1,
  },
  btnTxt: {
    color: _c.main_red,
    fontFamily: _f.regularAlt,
    fontSize: _fs.xl,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
