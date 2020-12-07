import React from 'react';
import {useBackHandler} from '@react-native-community/hooks';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import CheckCircleRed from 'assets/svg/check-circle-red.svg';
import StartBtn from './components/StartBtn';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';

interface AllSetScreenProps {}

const AllSetScreen = (props: AllSetScreenProps) => {
  const {width} = useWindowDimensions();
  const CheckCircleSize = width * 0.16;
  const txt = useLocalizedTxt();

  useBackHandler(() => {
    if (false) {
      // handle it
      return true;
    }
    // let the default thing happen
    return false;
  });

  return (
    <View style={_s.container}>
      <View style={_s.content}>
        <Text style={_s.txt}>{txt.youAreAllSet}</Text>
        <CheckCircleRed height={CheckCircleSize} width={CheckCircleSize} />
      </View>
      <StartBtn />
    </View>
  );
};

export default AllSetScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: _c.black,
    marginBottom: 15,
    fontSize: _fs.xl,
    fontFamily: _f.regular,
  },
});