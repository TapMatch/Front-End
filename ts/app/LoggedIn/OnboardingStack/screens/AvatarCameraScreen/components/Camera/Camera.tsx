import React, {useContext, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {RNCamera} from 'react-native-camera';
import SwitchCameraWhileAlpha from 'assets/svg/switch-camera-white-alpha.svg';
import {vs} from 'react-native-size-matters';
import Shutter from './components/Shutter';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
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

interface CameraProps {
  pictureURI: [string, (x: string) => void];
  facesDetected: [boolean, (x: boolean) => void];
  cameraShutterState: [boolean, (x: boolean) => void];
}

type BoundingBoxType = [number, number, number, number];

type ImageSizeType = {
  width?: number;
  height?: number;
  originalWidth: number;
  originalHeight: number;
};

type FaceRectType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const Camera = (props: CameraProps) => {
  const cameraTypeBool = useState<boolean>(false);
  const uploadToServerTrigger = useState<boolean>(false);
  const [faces, setFaces] = useState<any>([]);
  const [imageFaces, setImageFaces] = useState<any>([]);
  const [faceRect, setFaceRect] = useState<FaceRectType | undefined>();
  const {navigate} = useNavigation();
  const {facesDetected, pictureURI, cameraShutterState} = props;
  const txt = useLocalizedTxt();

  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  const {
    userToken,
    userProfile,
    LoggedIn,
    user_has_passed_onboarding,
  } = useContext(TapMatchContext);

  let RNCameraRef = useRef<RNCamera | null>(null);
  let imageRef = useRef<Image | null>(null);

  const onCapture = async () => {
    try {
      if (RNCameraRef.current) {
        const {uri} = await RNCameraRef.current.takePictureAsync({
          quality: 1,
          width: 2000,
          fixOrientation: true,
          mirrorImage: !cameraTypeBool[0],
          orientation: RNCamera.Constants.Orientation.portrait,
        });
        await pictureURI[1](uri);
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
      pictureURI: pictureURI[0],
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
  const onFacesDetected = ({faces}) => {
    // console.log('faces', faces[0].bounds.origin, faces[0].bounds.size);
    facesDetected[1](true);
    setFaces(faces);
  };

  const onFaceDetectionError = () => {
    facesDetected[1](false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onBackRecapture = () => {
    facesDetected[1](false);
    cameraShutterState[1](false);
    pictureURI[1]('');
  };

  const onSwitchCameraType = () => {
    cameraTypeBool[1](!cameraTypeBool[0]);
    facesDetected[1](false);
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
      facesDetected[1](false);
    }
  };

  const onPickImage = async () => {
    try {
      const {uri} = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      Image.getSize(
        uri,
        async (imageWidth, imageHeight) => {
          await pictureURI[1](uri);
          cameraShutterState[1](true);
          facesDetected[1](false);
          await processFaces(uri, imageWidth, imageHeight);
        },
        (error) => {
          console.log('Error:', error.message);
        },
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Error:', err.message);
      }
    }
  };

  const renderCamera = () => {
    if (pictureURI[0].length) {
      return (
        <Image
          ref={imageRef}
          resizeMode={'cover'}
          style={_s.camera}
          source={{
            uri: pictureURI[0],
          }}
        />
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  let faceMastStyle = _s.circle;
  if (faces.length > 0 && facesDetected[1]) {
    faceMastStyle = {
      // @ts-ignore
      position: 'absolute',
      top: faces[0].bounds.origin.y,
      borderRadius:
        Math.max(faces[0].bounds.size.width, faces[0].bounds.size.height) / 2,
      width: faces[0].bounds.size.width,
      height: faces[0].bounds.size.height,
      left: faces[0].bounds.origin.x,
    };
    // if (cameraTypeBool[0]) {
    //   // @ts-ignore
    //   faceMastStyle.left = faces[0].bounds.origin.x;
    // } else {
    //   // @ts-ignore
    //   faceMastStyle.right = faces[0].bounds.origin.x;
    // }
  }

  if (faceRect && imageFaces.length > 0 && facesDetected[1]) {
    faceMastStyle = {
      // @ts-ignore
      position: 'absolute',
      top: faceRect.y,
      borderRadius: Math.max(faceRect.width, faceRect.height) / 2,
      left: faceRect.x,
      width: faceRect.width,
      height: faceRect.height,
    };
  }

  return (
    <View style={_s.container}>
      <View style={_s.cameraMask}>
        <View
          style={facesDetected[1] ? [_s.circle, faceMastStyle] : [_s.circle]}
        />
      </View>
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
        pictureURI={pictureURI}
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
    borderRadius: circleRadius / 2,
    width: circleRadius,
    height: circleRadius,
  },
});
