import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import Title from './components/Title';
import Subtitle from './components/Subtitle';
import Camera, {
  FaceRectType,
  ImageZoomSourceType,
  CircleSizeType,
} from './components/Camera/Camera';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {formatHeight, formatWidth} from 'ts/utils/format-size';
import ChevronLeftBlack from 'assets/svg/chevron-left-black.svg';
import {_fs} from 'ts/UIConfig/fontSizes';
import {isString} from 'ts/utils/is-string';

interface AvatarCameraScreenProps {
  navigation: any;
}

const iconSize = _fs.xxl * 1.8;

const AvatarCameraScreen = ({navigation}: AvatarCameraScreenProps) => {
  const isFocused = useIsFocused();
  const {bottom} = useSafeAreaInsets();
  const facesDetected = useState<boolean>(false);
  const cameraShutterState = useState<boolean>(false);
  const faceRects = useState<FaceRectType[]>([]);
  const faceRect = useState<FaceRectType | undefined | null>();
  const faceCircle = useState<CircleSizeType | undefined | null>();
  const imageZoomSource = useState<ImageZoomSourceType>({
    imageWidth: 0,
    imageHeight: 0,
    cropWidth: 0,
    cropHeight: 0,
    originWidth: 0,
    originHeight: 0,
    uri: '',
    circleDiameter: 0,
    minScale: 0.6,
    offsetX: 0,
    offsetY: 0,
  });

  const resetFaceDetection = () => {
    facesDetected[1](false);
    faceRect[1](null);
    faceCircle[1](null);
  };

  const resetCamera = () => {
    console.log('Reset camera: ======= ');
    resetFaceDetection();
    faceRects[1]([]);
    cameraShutterState[1](false);
    imageZoomSource[1]({
      imageWidth: 0,
      imageHeight: 0,
      cropWidth: 0,
      cropHeight: 0,
      originWidth: 0,
      originHeight: 0,
      uri: '',
      circleDiameter: 0,
      minScale: 0.6,
      offsetX: 0,
      offsetY: 0,
    });
  };

  const onPressBack = () => {
    if (isString(imageZoomSource[0]?.uri) && cameraShutterState[0]) {
      resetCamera();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[_s.container, {paddingBottom: 0}]}>
      <View style={_s.top}>
        <TouchableOpacity style={_s.back} onPress={onPressBack}>
          <ChevronLeftBlack height={iconSize} width={iconSize} />
        </TouchableOpacity>
        <Title />
        <Subtitle />
      </View>
      {isFocused && (
        <Camera
          facesDetected={facesDetected}
          imageZoomSource={imageZoomSource}
          cameraShutterState={cameraShutterState}
          faceRect={faceRect}
          faceCircle={faceCircle}
          faceRects={faceRects}
          resetCamera={resetCamera}
          resetFaceDetection={resetFaceDetection}
        />
      )}
    </View>
  );
};

export default AvatarCameraScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.grey,
  },
  back: {
    position: 'absolute',
    left: formatWidth(22),
    bottom: formatHeight(32),
    zIndex: 300,
  },
  top: {
    paddingTop: formatHeight(62),
    paddingBottom: formatHeight(25),
    backgroundColor: _c.white,
  },
});
