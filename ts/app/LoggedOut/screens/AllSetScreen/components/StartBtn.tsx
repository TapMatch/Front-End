import React, {useContext, useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import CookieManager from '@react-native-community/cookies';

interface StartBtnProps {
  navigation: any;
}

const StartBtn = ({navigation}: StartBtnProps) => {
  const txt = useLocalizedTxt();
  const {bottom} = useSafeAreaInsets();

  const onPress = () => {
    const unsubscribe = navigation.addListener('focus', () => {
      CookieManager.clearAll();
    });
    return unsubscribe;
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[_s.container, {height: vs(60) + bottom * 0.5}]}>
      <Text style={_s.txt}>{txt.tapToStartThe}</Text>
      <Text style={_s.txt}>{txt.tapMatchExperience}</Text>
    </TouchableOpacity>
  );
};

export default StartBtn;

const _s = StyleSheet.create({
  container: {
    backgroundColor: _c.white,
    minWidth: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  txt: {
    fontFamily: _f.regularAlt,
    fontSize: _fs.xl,
    textAlign: 'center',
    color: _c.black,
    textAlignVertical: 'center',
  },
});
