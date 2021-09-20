import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {FaceDetector, RNCamera} from 'react-native-camera';
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
import ImageEditor, {ImageCropData} from '@react-native-community/image-editor';
import {postAvatar} from '../../api/postAvatar';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {OnBoardingScreens} from 'ts/constants/screens';
import {formatHeight, formatWidth} from 'ts/utils/format-size';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import ImageZoom from './image-zoom/image-zoom.component';
import {IOnMove} from './image-zoom/image-zoom.type';
import {CircleRatio} from './image-zoom/image-zoom.style';
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
  circleDiameter: number;
  minScale: number;
  offsetX: number;
  offsetY: number;
};

interface CameraProps {
  facesDetected: [boolean, (x: boolean) => void];
  cameraShutterState: [boolean, (x: boolean) => void];
  imageZoomSource: [ImageZoomSourceType, (x: ImageZoomSourceType) => void];
  faceRect: [FaceRectType | undefined | null, (x: FaceRectType) => void];
  faceCircle: [CircleSizeType | undefined | null, (x: CircleSizeType) => void];
  faceRects: [FaceRectType[], (x: FaceRectType[]) => void];
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

export type CameraSizeType = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export type CircleSizeType = {
  x: number;
  y: number;
  radius: number;
};

const Camera = (props: CameraProps) => {
  const cameraTypeBool = useState<boolean>(false);
  const cameraSize = useState<CameraSizeType>();
  const faceRectPreview = useState<CameraSizeType>();
  const {navigate} = useNavigation();
  const {
    facesDetected,
    cameraShutterState,
    faceRect,
    faceRects,
    resetFaceDetection,
    imageZoomSource,
    faceCircle,
  } = props;
  const txt = useLocalizedTxt();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  const {userToken, userProfile, LoggedIn, user_has_passed_onboarding} =
    useContext(TapMatchContext);

  let RNCameraRef = useRef<RNCamera | null>(null);
  let imageRef = useRef<Image | null>(null);
  let cameraWrapperRef = useRef<View | null>(null);

  const imageZoomSourceUri = imageZoomSource[0]?.uri;

  // let faceDetectionInProgress = false;
  let cameraInProgress = false;

  const processFaces = async (pImageZoomSource: ImageZoomSourceType) => {
    const {circleDiameter, originHeight, originWidth} = pImageZoomSource;

    const libOptions = {
      landmarkMode: FaceDetectorLandmarkMode.ALL,
      contourMode: FaceDetectorContourMode.ALL,
    };

    try {
      const libFaces = await FaceDetection.processImage(
        pImageZoomSource.uri,
        libOptions,
      );
      if (libFaces.length > 0) {
        const tempFaceRects: FaceRectType[] = [];
        libFaces.forEach((face) => {
          const tempFaceRect = {
            width: face.boundingBox[2] - face.boundingBox[0],
            height: face.boundingBox[3] - face.boundingBox[1],
            x: face.boundingBox[0],
            y: face.boundingBox[1],
          };
          tempFaceRects.push(tempFaceRect);
          isFaceInsideCircle(tempFaceRect, {
            radius: circleDiameter / 2,
            x: originWidth / 2,
            y: originHeight / 2,
          });
        });
        faceRects[1](tempFaceRects);
        return true;
      }
    } catch (e) {
      console.log('Error: FaceDetection.processImage - ', e.message);
    }

    try {
      const cameraFaces = await FaceDetector.detectFacesAsync(
        pImageZoomSource.uri,
      );
      // @ts-ignore
      if (cameraFaces?.faces && cameraFaces.faces.length > 0) {
        const tempFaceRects: FaceRectType[] = [];
        // @ts-ignore
        cameraFaces.faces.forEach((face) => {
          const tempFaceRect = {
            width: face.bounds.size.width,
            height: face.bounds.size.height,
            x: face.bounds.origin.x,
            y: face.bounds.origin.y,
          };
          tempFaceRects.push(tempFaceRect);
          isFaceInsideCircle(tempFaceRect, {
            radius: circleDiameter / 2,
            x: originWidth / 2,
            y: originHeight / 2,
          });
        });
        faceRects[1](tempFaceRects);
        return true;
      }
    } catch (e) {
      console.log('Error: FaceDetection.processImage - ', e.message);
    }

    resetFaceDetection();
  };

  useEffect(() => {
    if (isString(imageZoomSourceUri)) {
      processFaces(imageZoomSource[0]);
    }
  }, [imageZoomSourceUri]);

  const onCapture = async () => {
    if (cameraInProgress) {
      return false;
    }
    cameraInProgress = true;
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
        cameraInProgress = false;
        cameraShutterState[1](true);
        setImageZoomSource(uri, width, height);
      }
    } catch (error) {
      console.log(error);
      cameraInProgress = false;
      cameraShutterState[1](false);
    }
  };

  const onUploadToServer = async () => {
    if (
      facesDetected[0] &&
      faceCircle[0] &&
      isString(imageZoomSource[0]?.uri)
    ) {
      const cropData = {
        offset: {
          x: faceCircle[0]?.x - faceCircle[0]?.radius,
          y: faceCircle[0]?.y - faceCircle[0]?.radius,
        },
        size: {
          width: faceCircle[0]?.radius * 2,
          height: faceCircle[0]?.radius * 2,
        },
        resizeMode: 'cover',
      };
      try {
        ImageEditor.cropImage(
          imageZoomSource[0]?.uri,
          cropData as ImageCropData,
        )
          .then((url) => {
            postAvatar({
              userToken: userToken[0],
              pictureURI: url,
              userProfile,
              LoggedIn,
              user_has_passed_onboarding,
            });
          })
          .catch((e) => {
            console.log('ImageEditor Error: ', e.message);
          });
      } catch (e) {
        console.log('ImageEditor Error: ', e.message);
      }
    }

    await navigate(OnBoardingScreens.TagsScreen);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getBase64 = async (imageUri: string) => {
    const filepath = imageUri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
    return `data:image/jpeg;base64,${imageUriBase64}`;
  };

  const isFaceInsideCircle = (
    cFaceReact: FaceRectType,
    circle: CircleSizeType,
  ) => {
    const distStart1 =
      (cFaceReact.x - circle.x) * (cFaceReact.x - circle.x) +
      (cFaceReact.y - circle.y) * (cFaceReact.y - circle.y);
    const distStart2 =
      (cFaceReact.x + cFaceReact.width - circle.x) *
        (cFaceReact.x + cFaceReact.width - circle.x) +
      (cFaceReact.y - circle.y) * (cFaceReact.y - circle.y);
    const distEnd1 =
      (cFaceReact.x + cFaceReact.width - circle.x) *
        (cFaceReact.x + cFaceReact.width - circle.x) +
      (cFaceReact.y + cFaceReact.height - circle.y) *
        (cFaceReact.y + cFaceReact.height - circle.y);
    const distEnd2 =
      (cFaceReact.x - circle.x) * (cFaceReact.x - circle.x) +
      (cFaceReact.y + cFaceReact.height - circle.y) *
        (cFaceReact.y + cFaceReact.height - circle.y);
    const distRadius = circle.radius * circle.radius;
    if (
      distStart1 <= distRadius &&
      distStart2 <= distRadius &&
      distEnd1 <= distRadius &&
      distEnd2 <= distRadius
    ) {
      facesDetected[1](true);
      faceRect[1](cFaceReact);
      faceCircle[1](circle);
      return true;
    }
    resetFaceDetection();
    return false;
  };

  // @ts-ignore
  const onFacesDetected = ({faces}) => {
    if (isString(imageZoomSource[0].uri)) {
      return false;
    }
    // @ts-ignore
    const {width: cameraWidth, height: cameraHeight} = cameraSize[0];
    resetFaceDetection();
    if (faces && faces.length > 0) {
      faces.forEach((face: any) => {
        isFaceInsideCircle(
          {
            width: face.bounds.size.width,
            height: face.bounds.size.height,
            x: face.bounds.origin.x,
            y: face.bounds.origin.y,
          },
          {
            radius: (cameraWidth * CircleRatio) / 2,
            x: cameraWidth / 2,
            y: cameraHeight / 2,
          },
        );
      });
    }
  };

  const onFaceDetectionError = () => {
    resetFaceDetection();
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
          circleDiameter: (imageHeight * CircleRatio) / screenRatio,
          minScale:
            Math.ceil(
              (cameraSize[0].width * CircleRatio * 100) / cameraSize[0].height,
            ) / 100,
          offsetX: (imageWidth - imageHeight / screenRatio) / 2,
          offsetY: 0,
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
          circleDiameter: imageWidth * CircleRatio,
          minScale: CircleRatio,
          offsetX: 0,
          offsetY: (imageHeight - imageWidth * screenRatio) / 2,
        });
      }
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
          resetFaceDetection();
          // @ts-ignore
          const {uri} = response.assets[0];
          Image.getSize(
            uri as string,
            async (imageWidth, imageHeight) => {
              cameraShutterState[1](true);
              setImageZoomSource(uri as string, imageWidth, imageHeight);
            },
            (error) => {
              console.log('Error: Image.getSize- ', error.message);
            },
          );
        },
      );
    } catch (err) {}
  };

  // console.log('faceRects: ==============', faceRects[0]);

  const onMoveImageZoom = (iOnMove: IOnMove) => {
    // console.log('IOnMove: =====', iOnMove);
    const {positionX, positionY, scale} = iOnMove;
    const {circleDiameter, originHeight, originWidth} = imageZoomSource[0];
    faceRects[0].forEach((tempFaceRect) => {
      isFaceInsideCircle(tempFaceRect, {
        radius: circleDiameter / (2 * scale),
        x: originWidth / 2 - positionX,
        y: originHeight / 2 - positionY,
      });
      // calculateFaceRectInsideImage(
      //   {
      //     width: tempFaceRect.width * scale,
      //     height: tempFaceRect.height * scale,
      //     x: tempFaceRect.x + positionX,
      //     y: tempFaceRect.y + positionY,
      //   },
      //   imageZoomSource[0],
      // );
    });
  };

  const renderCamera = () => {
    if (isString(imageZoomSource[0].uri)) {
      return (
        <ImageZoom
          minScale={imageZoomSource[0].minScale}
          cropWidth={imageZoomSource[0].cropWidth}
          cropHeight={imageZoomSource[0].cropHeight}
          imageWidth={imageZoomSource[0].imageWidth}
          imageHeight={imageZoomSource[0].imageHeight}
          onMove={onMoveImageZoom}>
          <Image
            ref={imageRef}
            style={{
              width: imageZoomSource[0].imageWidth,
              height: imageZoomSource[0].imageHeight,
            }}
            resizeMode={'cover'}
            source={{
              uri: imageZoomSource[0].uri,
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
          // type={RNCamera.Constants.Type.front}
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const calculateFaceRectInsideImage = (
    faceRect: FaceRectType,
    imageSize: ImageZoomSourceType,
  ) => {
    const imageRatio = imageSize.originHeight / imageSize.originWidth;
    const screenRatio = imageSize.cropHeight / imageSize.cropWidth;
    if (screenRatio - imageRatio >= 0) {
      const hRatio = imageSize.originHeight / imageSize.imageHeight;
      const faceX =
        faceRect.x / hRatio - (imageSize.imageWidth - imageSize.cropWidth) / 2;
      const faceY = faceRect.y / hRatio;
      const faceWidth = faceRect.width / hRatio;
      const faceHeight = faceRect.height / hRatio;
      faceRectPreview[1]({
        x: faceX,
        y: faceY,
        width: Math.ceil(faceWidth),
        height: Math.ceil(faceHeight),
      });
    } else {
      const wRatio = imageSize.originWidth / imageSize.imageWidth;

      const faceX = faceRect.x / wRatio;
      const faceY =
        faceRect.y / wRatio -
        (imageSize.imageHeight - imageSize.cropHeight) / 2;

      const faceWidth = faceRect.width / wRatio;
      const faceHeight = faceRect.height / wRatio;
      faceRectPreview[1]({
        x: faceX,
        y: faceY,
        width: Math.ceil(faceWidth),
        height: Math.ceil(faceHeight),
      });
    }
  };

  return (
    <View
      ref={cameraWrapperRef}
      onLayout={(event) => {
        calculateCameraSize(event.nativeEvent.layout);
      }}
      style={_s.container}>
      {/*<View*/}
      {/*  style={[*/}
      {/*    _s.faceRectPreview,*/}
      {/*    {*/}
      {/*      left: faceRectPreview[0]?.x,*/}
      {/*      top: faceRectPreview[0]?.y,*/}
      {/*      width: faceRectPreview[0]?.width,*/}
      {/*      height: faceRectPreview[0]?.height,*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
      {!cameraShutterState[0] && (
        <View style={_s.cameraMask}>
          <View style={_s.circle} />
        </View>
      )}
      {/*{isString(croppedImageURL[0]) && (*/}
      {/*  <Image*/}
      {/*    style={_s.croppedImagePreview}*/}
      {/*    resizeMode={'cover'}*/}
      {/*    source={{*/}
      {/*      uri: croppedImageURL[0],*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
      <View style={[_s.facesDetected]}>
        <Text
          style={[
            _s.facesDetectedTxt,
            facesDetected[0] ? _s.greenBackground : _s.greyBackground,
          ]}>
          {facesDetected[0]
            ? txt.faceDetected
            : cameraShutterState[0]
            ? txt.faceNotDetected
            : txt.makeSureYourFaceIsVisible}
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

const screenWidth = Dimensions.get('screen').width;
const circleRadius = screenWidth * CircleRatio;
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
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 3,
    width: screenWidth,
    top: formatHeight(17),
  },
  redBackground: {
    backgroundColor: _c.redDark,
  },
  greyBackground: {
    backgroundColor: _c.greySecond,
  },
  greenBackground: {
    backgroundColor: _c.greenDark,
  },
  facesDetectedTxt: {
    textAlign: 'center',
    color: _c.white,
    fontFamily: _f.regular,
    fontSize: _fs.m,
    borderRadius: formatWidth(9),
    paddingTop: formatHeight(8),
    paddingBottom: formatHeight(8),
    paddingLeft: formatWidth(18),
    paddingRight: formatWidth(18),
    minWidth: formatWidth(179),
  },
  switchBtn: {
    position: 'absolute',
    right: formatHeight(12),
    top: formatHeight(17),
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  croppedImagePreview: {
    position: 'absolute',
    zIndex: 4,
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  faceMask: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#ff0000',
    width: 10,
    height: 10,
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
  faceRectPreview: {
    position: 'absolute',
    zIndex: 1,
    borderWidth: 1,
    borderColor: _c.white,
  },
});
