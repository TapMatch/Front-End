import React from 'react';
import {View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import SwipeBackGuide from './components/SwipeBackGuide';
import Title from './components/Title';
import Subtitle from './components/Subtitle';
import RedCircleBtn from './components/RedCircleBtn';
import Camera from './components/Camera';

interface AvatarCameraScreenProps {
  navigation: any;
}

const AvatarCameraScreen = ({navigation}: AvatarCameraScreenProps) => {
  return (
    <View style={_s.container}>
      <View style={_s.top}>
        <SwipeBackGuide />
        <Title />
        <Subtitle />
      </View>
      <Camera />
      <RedCircleBtn onPress={() => navigation.navigate('MapDemo')} />
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
