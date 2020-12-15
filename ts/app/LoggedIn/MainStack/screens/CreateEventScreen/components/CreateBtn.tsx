import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {vs} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {useNavigation} from '@react-navigation/native';

interface CreateBtnProps {}

const CreateBtn = (props: CreateBtnProps) => {
  const {bottom} = useSafeAreaInsets();
  const {goBack} = useNavigation();
  return (
    <View style={[_s.container, _s.center, {paddingBottom: bottom}]}>
      <View style={_s.btnContainer}>
        <TouchableOpacity onPress={goBack} style={[_s.btn, _s.center]}>
          <Text style={_s.btnTxt}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateBtn;

const _s = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: vs(120),
    minWidth: '100%',
    zIndex: 100,
  },
  btnContainer: {
    height: 60,
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
