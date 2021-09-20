import React, {useCallback} from 'react';
import {Linking, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {formatCoverSize, formatHeight} from 'ts/utils/format-size';
import {OnBoardingScreens} from 'ts/constants/screens';

interface StartBtnProps {}

const StartBtn = (props: StartBtnProps) => {
  const txt = useLocalizedTxt();
  const {bottom} = useSafeAreaInsets();
  const {navigate} = useNavigation();

  const openSetting = useCallback(async () => {
    // Open the custom settings if the app has one
    //  await Linking.openSettings();
    await navigate(OnBoardingScreens.AllSet);
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={openSetting}
      style={[_s.container, {bottom: formatHeight(23) + bottom}]}>
      <Text style={_s.txt}>{txt.continue}</Text>
    </TouchableOpacity>
  );
};

export default StartBtn;

const _s = StyleSheet.create({
  container: {
    position: 'absolute',
    minWidth: '100%',
    justifyContent: 'center',
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
