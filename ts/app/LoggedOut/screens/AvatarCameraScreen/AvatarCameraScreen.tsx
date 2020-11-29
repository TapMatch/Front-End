import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import SwipeBackGuide from './components/SwipeBackGuide';
import {RNCamera} from 'react-native-camera';
import Title from './components/Title';
import Subtitle from './components/Subtitle';
interface AvatarCameraScreenProps {}

const AvatarCameraScreen = (props: AvatarCameraScreenProps) => {
  return (
    <View style={_s.container}>
      <SwipeBackGuide />
      <Title />
      <Subtitle />
      <RNCamera
        style={_s.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
    </View>
  );
};

export default AvatarCameraScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.white,
  },
  camera: {height: '50%', width: '100%'},
});
