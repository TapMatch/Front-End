import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import SwipeBackGuide from './components/SwipeBackGuide';
import Title from './components/Title';
import Subtitle from './components/Subtitle';
import Camera from './components/Camera/Camera';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {formatHeight, formatWidth} from 'ts/utils/format-size';

interface AvatarCameraScreenProps {
  navigation: any;
}

const AvatarCameraScreen = ({navigation}: AvatarCameraScreenProps) => {
  const isFocused = useIsFocused();
  const {bottom} = useSafeAreaInsets();

  return (
    <View style={[_s.container, {paddingBottom: bottom}]}>
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View style={_s.top}>
        <Title />
        <Subtitle />
      </View>
      {isFocused && <Camera />}
    </View>
  );
};

export default AvatarCameraScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.grey,
  },
  top: {
    paddingTop: formatHeight(62),
    paddingBottom: formatHeight(25),
    backgroundColor: _c.white,
  },
});
