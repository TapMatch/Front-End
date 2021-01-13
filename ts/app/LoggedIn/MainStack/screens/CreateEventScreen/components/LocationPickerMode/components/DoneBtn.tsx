import React, {useContext} from 'react';
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
import {Dimensions} from 'react-native';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';

interface DoneBtnProps {}

const DoneBtn = (props: DoneBtnProps) => {
  const {bottom} = useSafeAreaInsets();
  const {
    coordinates,
    address,
    addingLocationOn
  } = useContext(CreateEventScreenContext);

  const KAVBehaviorObj = Platform.OS === 'ios' ? 'position' : undefined;
  const btnDisabled = address[0].length === 0 || !Object.keys(coordinates[0]);
  return (
    <KeyboardAvoidingView
      behavior={KAVBehaviorObj}
      contentContainerStyle={[_s.container, {bottom: bottom + 15}]}
      style={[_s.container, {bottom: bottom + 15}]}
      keyboardVerticalOffset={vs(15)}>
      <View style={[_s.btnContainer, {opacity: btnDisabled ? 0.2 : 1}]}>
        <TouchableOpacity disabled={btnDisabled} onPress={() => {
          addingLocationOn[1](false);
        }} style={[_s.btn, _s.center]}>
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
    minWidth: Dimensions.get('screen').width,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
