import React from 'react';
import {View, StyleSheet, useWindowDimensions, Text, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import CheckCircleRed from 'assets/svg/check-circle-red.svg';
import StartBtn from './components/StartBtn';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';

interface AllSetScreenProps {
  navigation: any;
}

const AllSetScreen = ({navigation}: AllSetScreenProps) => {
  const {width} = useWindowDimensions();
  const CheckCircleSize = width * 0.16;
  const txt = useLocalizedTxt();

  return (
    <View style={_s.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('Communities')}
        style={_s.content}>
        <Text style={_s.txt}>{txt.youAreAllSet}</Text>
        <CheckCircleRed height={CheckCircleSize} width={CheckCircleSize} />
      </TouchableOpacity>
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
