import React from 'react';
import {View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import SwipeBackGuide from './components/SwipeBackGuide';
import Title from './components/Title';
import Subtitle from './components/Subtitle';
import Camera from './components/Camera/Camera';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface AvatarCameraScreenProps {
  navigation: any;
}

const AvatarCameraScreen = ({navigation}: AvatarCameraScreenProps) => {
  const isFocused = useIsFocused();
  const {bottom} = useSafeAreaInsets();

  return (
    <View style={[_s.container, {paddingBottom: bottom}]}>
      <View style={_s.top}>
        <SwipeBackGuide />
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
    backgroundColor: _c.white,
  },
  top: {
    width: '100%',
    height: '25%',
  },
});
