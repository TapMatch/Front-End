import React, {useContext, useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {RNCamera} from 'react-native-camera';
import Shutter from './components/Shutter';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import FaceDetection, {
  FaceDetectorContourMode,
  FaceDetectorLandmarkMode,
} from 'react-native-face-detection';
import {postAvatar} from '../../api/postAvatar';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {OnBoardingScreens} from 'ts/constants/screens';
import {formatHeight, formatWidth} from 'ts/utils/format-size';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import ImageZoom from './image-zoom/image-zoom.component';
import {isString} from 'ts/utils/is-string';

export type FaceRectType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ImageZoomSourceType = {
  uri: string;
  cropWidth: number;
  cropHeight: number;
  imageWidth: number;
  imageHeight: number;
  originWidth: number;
  originHeight: number;
};

interface CameraProps {
  facesDetected: [boolean, (x: boolean) => void];
  cameraShutterState: [boolean, (x: boolean) => void];
  imageZoomSource: [
    ImageZoomSourceType | undefined | null,
    (x: ImageZoomSourceType | undefined | null) => void,
  ];
  faces: any;
  imageFaces: any;
  faceRect: FaceRectType | undefined | null;
  setFaces: (x: any) => void;
  setImageFaces: (x: any) => void;
  setFaceRect: (x: FaceRectType) => void;
  resetCamera: () => void;
  resetFaceDetection: () => void;
}

type BoundingBoxType = [number, number, number, number];

type ImageSizeType = {
  width?: number;
  height?: number;
  originalWidth: number;
  originalHeight: number;
};

type CameraSizeType = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const Camera = (props: CameraProps) => {
  const cameraTypeBool = useState<boolean>(false);
  const cameraSize = useState<CameraSizeType>();
  const uploadToServerTrigger = useState<boolean>(false);
  const {navigate} = useNavigation();
  const {
    facesDetected,
    cameraShutterState,
    setFaceRect,
    setImageFaces,
    resetFaceDetection,
    imageZoomSource,
  } = props;
  const txt = useLocalizedTxt();

  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  const {userToken, userProfile, LoggedIn, user_has_passed_onboarding} =
    useContext(TapMatchContext);

  let RNCameraRef = useRef<RNCamera | null>(null);
  let imageRef = useRef<Image | null>(null);
  let cameraWrapperRef = useRef<View | null>(null);

  const onCapture = async () => {
    try {
      if (RNCameraRef.current) {
        const {uri, width, height} = await RNCameraRef.current.takePictureAsync(
          {
            quality: 1,
            width: 2000,
            fixOrientation: true,
            mirrorImage: !cameraTypeBool[0],
            orientation: RNCamera.Constants.Orientation.portrait,
          },
        );
        setImageZoomSource(uri, width, height);
        cameraShutterState[1](true);
      }
    } catch (error) {
      console.log(error);
      cameraShutterState[1](false);
    }
  };

  const onUploadToServer = async () => {
    postAvatar({
      userToken: userToken[0],
      pictureURI: imageZoomSource[0]?.uri,
      userProfile,
      LoggedIn,
      user_has_passed_onboarding,
    });
    uploadToServerTrigger[1](true);
    await navigate(OnBoardingScreens.AllSet);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getBase64 = async (imageUri: string) => {
    const filepath = imageUri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
    return `data:image/jpeg;base64,${imageUriBase64}`;
  };

  // @ts-ignore
  const onFacesDetected = () => {
    // facesDetected[1](true);
    // setFaces(faces);
  };

  const onFaceDetectionError = () => {
    // resetCamera();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onBackRecapture = () => {
    resetFaceDetection();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSwitchCameraType = () => {
    cameraTypeBool[1](!cameraTypeBool[0]);
    resetFaceDetection();
  };

  const calculateFaceRectInsideImage = (
    boundingBox: BoundingBoxType,
    imageSize: ImageSizeType,
  ) => {
    imageRef.current?.measure((width, height, px, py, fx, fy) => {
      const imageRatio = imageSize.originalHeight / imageSize.originalWidth;
      const screenRatio = (screenHeight - fy) / screenWidth;
      if (screenRatio - imageRatio >= 0) {
        imageSize.height = screenHeight - fy;
        imageSize.width = imageSize.height / imageRatio;
        const hRatio = imageSize.originalHeight / imageSize.height;
        const faceX =
          boundingBox[0] / hRatio - (imageSize.width - screenWidth) / 2;
        const faceY = boundingBox[1] / hRatio;
        const faceWidth = (boundingBox[2] - boundingBox[0]) / hRatio;
        const faceHeight = (boundingBox[3] - boundingBox[1]) / hRatio;
        setFaceRect({
          x: faceX,
          y: faceY,
          width: Math.ceil(faceWidth),
          height: Math.ceil(faceHeight),
        });
      } else {
        imageSize.width = screenWidth;
        imageSize.height = imageSize.width * imageRatio;
        const wRatio = imageSize.originalWidth / imageSize.width;

        const faceX = boundingBox[0] / wRatio;
        const faceY =
          boundingBox[1] / wRatio -
          (imageSize.height - (screenHeight - fy)) / 2;

        const faceWidth = (boundingBox[2] - boundingBox[0]) / wRatio;
        const faceHeight = (boundingBox[3] - boundingBox[1]) / wRatio;
        setFaceRect({
          x: faceX,
          y: faceY,
          width: Math.ceil(faceWidth),
          height: Math.ceil(faceHeight),
        });
      }
    });
  };

  const setImageZoomSource = (
    uri: string,
    imageWidth: number,
    imageHeight: number,
  ) => {
    if (cameraSize[0]) {
      const imageRatio = imageHeight / imageWidth;
      const screenRatio = cameraSize[0].height / cameraSize[0].width;
      if (screenRatio - imageRatio >= 0) {
        imageZoomSource[1]({
          uri,
          imageHeight: cameraSize[0].height,
          imageWidth: cameraSize[0].height / imageRatio,
          cropHeight: cameraSize[0].height,
          cropWidth: cameraSize[0].width,
          originWidth: imageWidth,
          originHeight: imageHeight,
        });
      } else {
        imageZoomSource[1]({
          uri,
          imageHeight: cameraSize[0].width * imageRatio,
          imageWidth: cameraSize[0].width,
          cropHeight: cameraSize[0].height,
          cropWidth: cameraSize[0].width,
          originWidth: imageWidth,
          originHeight: imageHeight,
        });
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const processFaces = async (
    imagePath: string,
    imageWidth: number,
    imageHeight: number,
  ) => {
    const options = {
      landmarkMode: FaceDetectorLandmarkMode.ALL,
      contourMode: FaceDetectorContourMode.ALL,
    };

    try {
      const faces = await FaceDetection.processImage(imagePath, options);
      if (faces.length > 0) {
        facesDetected[1](true);
        setImageFaces(faces);
        calculateFaceRectInsideImage(faces[0].boundingBox, {
          originalWidth: imageWidth,
          originalHeight: imageHeight,
        });
      }
    } catch (e) {
      resetFaceDetection();
    }
  };

  const onPickImage = async () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
        },
        (response: ImagePickerResponse) => {
          if (response.didCancel) {
            return;
          }

          // @ts-ignore
          const {uri} = response.assets[0];
          Image.getSize(
            uri as string,
            async (imageWidth, imageHeight) => {
              setImageZoomSource(uri as string, imageWidth, imageHeight);
              cameraShutterState[1](true);
            },
            (error) => {
              console.log('Error:', error.message);
            },
          );
        },
      );
    } catch (err) {}
  };

  const renderCamera = () => {
    if (isString(imageZoomSource[0]?.uri)) {
      return (
        <ImageZoom
          cropWidth={imageZoomSource[0]?.cropWidth}
          cropHeight={imageZoomSource[0]?.cropHeight}
          imageWidth={imageZoomSource[0]?.imageWidth}
          imageHeight={imageZoomSource[0]?.imageHeight}>
          <Image
            ref={imageRef}
            style={{
              width: imageZoomSource[0]?.imageWidth,
              height: imageZoomSource[0]?.imageHeight,
            }}
            resizeMode={'cover'}
            source={{
              uri: imageZoomSource[0]?.uri,
            }}
          />
        </ImageZoom>
      );
    } else {
      return (
        <RNCamera
          zoom={0.000005}
          ref={RNCameraRef}
          style={[_s.camera]}
          type={RNCamera.Constants.Type[cameraTypeBool[0] ? 'back' : 'front']}
          captureAudio={false} // no permissions added for this in recat-native-camera package setup
          flashMode={RNCamera.Constants.FlashMode.off}
          faceDetectionMode={RNCamera.Constants.FaceDetection?.Mode?.accurate}
          faceDetectionLandmarks={
            RNCamera.Constants.FaceDetection?.Landmarks?.all
          }
          onFacesDetected={onFacesDetected}
          onFaceDetectionError={onFaceDetectionError}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
          {({camera, status, recordAudioPermissionStatus}) => {
            // console.log('Camera status', status);
            if (status === 'NOT_AUTHORIZED') {
              navigate(OnBoardingScreens.CameraSetting);
              return null;
            }
            return null;
          }}
        </RNCamera>
      );
    }
  };

  const calculateCameraSize = (layout: CameraSizeType) => {
    cameraSize[1](layout);
  };

  return (
    <View
      ref={cameraWrapperRef}
      onLayout={(event) => {
        calculateCameraSize(event.nativeEvent.layout);
      }}
      style={_s.container}>
      <View
        style={[
          _s.facesDetected,
          facesDetected[0] ? _s.greenBackground : _s.redBackground,
        ]}>
        <Text style={_s.facesDetectedTxt}>
          {facesDetected[0] ? txt.faceDetected : txt.faceNotDetected}
        </Text>
      </View>
      {renderCamera()}
      <Shutter
        facesDetected={facesDetected[0]}
        imageZoomSource={imageZoomSource}
        onPickImage={onPickImage}
        cameraShutterState={cameraShutterState[0]}
        uploadToServer={onUploadToServer}
        onCapture={onCapture}
      />
    </View>
  );
};

export default Camera;

const circleRadius = Dimensions.get('screen').width * 0.65;
const _s = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    backgroundColor: _c.black,
    flex: 1,
    overflow: 'hidden',
  },
  facesDetected: {
    borderRadius: formatWidth(9),
    justifyContent: 'center',
    alignItems: 'center',
    width: formatWidth(179),
    height: formatWidth(35),
    position: 'absolute',
    zIndex: 290,
    left: formatWidth(114),
    top: formatHeight(17),
    backgroundColor: _c.black,
  },
  redBackground: {
    backgroundColor: _c.redDark,
  },
  greenBackground: {
    backgroundColor: _c.greenDark,
  },
  facesDetectedTxt: {
    color: _c.white,
    fontFamily: _f.regular,
    fontSize: _fs.m,
  },
  switchBtn: {
    position: 'absolute',
    right: formatHeight(12),
    top: formatHeight(17),
    zIndex: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraMask: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderWidth: 1,
    borderColor: _c.white,
    borderRadius: circleRadius / 2,
    width: circleRadius,
    height: circleRadius,
  },
});
