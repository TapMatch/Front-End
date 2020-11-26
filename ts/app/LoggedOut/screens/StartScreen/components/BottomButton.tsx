import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useNavigation} from '@react-navigation/native';

const BottomButton = () => {
  const {navigate} = useNavigation();
  const txt = useLocalizedTxt();
  return (
    <TouchableOpacity
      onPress={() => navigate('LoggedOutPlaceholderScreen')}
      style={_s.container}>
      <Text style={_s.txt}>{txt.tapToContinue}</Text>
    </TouchableOpacity>
  );
};

export default BottomButton;

const _s = StyleSheet.create({
  container: {
    backgroundColor: _c.transparentBtn,
    // backgroundColor: 'red',
    minWidth: '100%',
    height: vs(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontFamily: _f.regularAlt,
    fontSize: _fs.xl,
    color: _c.black,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
