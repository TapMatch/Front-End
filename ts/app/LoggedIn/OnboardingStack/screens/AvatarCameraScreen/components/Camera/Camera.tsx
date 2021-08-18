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

interface CameraProps {}

const Camera = (props: CameraProps) => {
  const cameraTypeBool = useState<boolean>(false);
  const cameraShutterState = useState<boolean>(false);
  const uploadToServerTrigger = useState<boolean>(false);
  const pictureURI = useState<string>('');
  const {navigate} = useNavigation();
  const {
    userToken,
    userProfile,
    LoggedIn,
    user_has_passed_onboarding,
  } = useContext(TapMatchContext);

  let RNCameraRef = useRef<RNCamera | null>(null);

  useEffect(() => {
    (async () => {
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
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [cameraShutterState[0]]);

  useEffect(() => {
    (async () => {
      const base64 = await getBase64(pictureURI[0]);
      postAvatar({
        userToken: userToken[0],
        pictureURI: pictureURI[0],
        userProfile,
        LoggedIn,
        user_has_passed_onboarding,
      });
      await navigate(OnBoardingScreens.AllSet);
    })();
  }, [uploadToServerTrigger[0]]);

  const getBase64 = async (imageUri: string) => {
    const filepath = imageUri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
    return `data:image/jpeg;base64,${imageUriBase64}`;
  };

  const renderCamera = () => {
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
        <Fragment>
          <TouchableOpacity
            onPress={() => cameraTypeBool[1](!cameraTypeBool[0])}
            style={_s.switchBtn}>
            <SwitchCameraWhileAlpha height={vs(30)} width={vs(30)} />
          </TouchableOpacity>
          <View style={_s.cameraMask}>
            <View style={_s.circle} />
          </View>
          <RNCamera
            zoom={0.000005}
            ref={RNCameraRef}
            style={_s.camera}
            type={RNCamera.Constants.Type[cameraTypeBool[0] ? 'back' : 'front']}
            captureAudio={false} // no permissions added for this in recat-native-camera package setup
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}>
            {({camera, status, recordAudioPermissionStatus}) => {
              console.log('Camera status', status);
              if (status === 'NOT_AUTHORIZED') {
                navigate(OnBoardingScreens.CameraSetting);
                return null;
              }
              return null;
            }}
          </RNCamera>
        </Fragment>
      );
    }
  };
  return (
    <Fragment>
      <View style={_s.container}>{renderCamera()}</View>
      <Shutter
        pictureURI={pictureURI}
        uploadToServer={() =>
          uploadToServerTrigger[1](!uploadToServerTrigger[0])
        }
        onPress={() => cameraShutterState[1](!cameraShutterState[0])}
      />
    </Fragment>
  );
};

export default Camera;

const circleRadius = Dimensions.get('screen').width * 0.65;
const _s = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '50%',
    overflow: 'hidden',
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
    width: circleRadius,
    height: circleRadius,
  },
});
