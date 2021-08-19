import React, {Fragment, useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {RNCamera} from 'react-native-camera';
import SwitchCameraWhileAlpha from 'assets/svg/switch-camera-white-alpha.svg';
import {vs} from 'react-native-size-matters';
import Shutter from './components/Shutter';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';
import {postAvatar} from '../../api/postAvatar';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {OnBoardingScreens} from 'ts/constants/screens';
import {formatHeight, formatWidth} from 'ts/utils/format-size';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';

interface CameraProps {}

const Camera = (props: CameraProps) => {
  const cameraTypeBool = useState<boolean>(false);
  const cameraShutterState = useState<boolean>(false);
  const uploadToServerTrigger = useState<boolean>(false);
  const facesDetected = useState<boolean>(false);
  const [faces, setFaces] = useState<any>([]);
  const pictureURI = useState<string>('');
  const {navigate} = useNavigation();
  const txt = useLocalizedTxt();
  const {
    userToken,
    userProfile,
    LoggedIn,
    user_has_passed_onboarding,
  } = useContext(TapMatchContext);

  let RNCameraRef = useRef<RNCamera | null>(null);

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

  const onBackRecapture = () => {
    facesDetected[1](false);
    cameraShutterState[1](false);
    pictureURI[1]('');
  };

  const onSwitchCameraType = () => {
    cameraTypeBool[1](!cameraTypeBool[0]);
    facesDetected[1](false);
  };

  const renderCamera = () => {
    let faceMastStyle =
      faces.length > 0 && facesDetected[1]
        ? {
            position: 'absolute',
            top: faces[0].bounds.origin.y,
            borderRadius:
              Math.max(
                faces[0].bounds.size.width,
                faces[0].bounds.size.height,
              ) / 2,
            width: faces[0].bounds.size.width,
            height: faces[0].bounds.size.height,
          }
        : _s.circle;
    if (faces.length > 0 && facesDetected[1]) {
      if (cameraTypeBool[0]) {
        faceMastStyle.left = faces[0].bounds.origin.x;
      } else {
        faceMastStyle.right = faces[0].bounds.origin.x;
      }
    }
    if (pictureURI[0].length) {
      return (
        <Image
          resizeMode={'contain'}
          style={_s.camera}
          source={{
            uri: pictureURI[0],
          }}
        />
      );
    } else {
      return (
        <>
          <TouchableOpacity onPress={onSwitchCameraType} style={_s.switchBtn}>
            <SwitchCameraWhileAlpha height={vs(30)} width={vs(30)} />
          </TouchableOpacity>
          <View style={_s.cameraMask}>
            <View style={[_s.circle, faceMastStyle]} />
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
          <RNCamera
            zoom={0.000005}
            ref={RNCameraRef}
            style={_s.camera}
            type={RNCamera.Constants.Type[cameraTypeBool[0] ? 'back' : 'front']}
            captureAudio={false} // no permissions added for this in recat-native-camera package setup
            flashMode={RNCamera.Constants.FlashMode.off}
            faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
            faceDetectionLandmarks={
              RNCamera.Constants.FaceDetection.Landmarks.all
            }
            onLayout={({nativeEvent}) => {
              console.log('nativeEvent', nativeEvent);
            }}
            onFacesDetected={onFacesDetected}
            onFaceDetectionError={onFaceDetectionError}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}>
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
  return (
    <View style={_s.container}>
      {renderCamera()}
      <Shutter
        facesDetected={facesDetected[0]}
        pictureURI={pictureURI}
        onBackRecapture={onBackRecapture}
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
