import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {RNCamera} from 'react-native-camera';
import SwitchCameraWhileAlpha from 'assets/svg/switch-camera-white-alpha.svg';
import {vs} from 'react-native-size-matters';

interface CameraProps {}

const Camera = (props: CameraProps) => {
  return (
    <View style={_s.container}>
      <TouchableOpacity
        onPress={() => console.log('TTTTTTTGIYITCYRCYTCUYRC')}
        style={_s.switchBtn}>
        <SwitchCameraWhileAlpha height={vs(30)} width={vs(30)} />
      </TouchableOpacity>
      <View style={_s.cameraMask}>
        <View style={_s.circle} />
      </View>
      <RNCamera
        style={_s.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
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

export default Camera;

const _s = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '50%',
    backgroundColor: _c.greyLight,
  },
  camera: {
    backgroundColor: _c.black,
    flex: 1,
  },
  switchBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraMask: {
    position: 'absolute',
    zIndex: 290,
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderWidth: 1,
    borderColor: _c.white,
    borderRadius: 400,
    width: 220,
    height: 220,
  },
});
