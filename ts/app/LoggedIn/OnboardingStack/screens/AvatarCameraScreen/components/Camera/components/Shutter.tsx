import React from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {formatHeight, formatWidth} from 'ts/utils/format-size';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {ImageZoomSourceType} from '../Camera';
import {isString} from '../../../../../../../../utils/is-string';

interface ShutterProps {
  uploadToServer: () => void;
  onCapture: () => void;
  onPickImage: () => void;
  imageZoomSource: [ImageZoomSourceType, (x: ImageZoomSourceType) => void];
  cameraShutterState: boolean;
  facesDetected: boolean;
}

const Shutter = ({
  imageZoomSource,
  uploadToServer,
  onCapture,
  onPickImage,
  cameraShutterState,
  facesDetected,
}: ShutterProps) => {
  const txt = useLocalizedTxt();
  return (
    <View
      style={[
        _s.container,
        cameraShutterState ? _s.justifyBetween : _s.justifyCenter,
      ]}>
      {!cameraShutterState && (
        <TouchableOpacity onPress={onPickImage} style={_s.facePreview}>
          <Image
            resizeMode={'cover'}
            style={_s.faceDemo}
            source={
              cameraShutterState && isString(imageZoomSource[0].uri)
                ? {uri: imageZoomSource[0]?.uri}
                : require('assets/png/face-demo.png')
            }
          />
        </TouchableOpacity>
      )}
      {cameraShutterState && <View style={_s.clipView} />}
      {!cameraShutterState && (
        <TouchableOpacity
          onPress={onCapture}
          style={[_s.shutterBtn, _s.shadow]}>
          <View style={_s.redCircle} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={uploadToServer}
        style={_s.btnNext}
        disabled={!facesDetected}>
        <Text style={_s.btnTxt}>{txt.next}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Shutter;

const _s = StyleSheet.create({
  container: {
    zIndex: 3,
    position: 'absolute',
    alignItems: 'center',
    bottom: formatHeight(30),
    flexDirection: 'row',
    width: '100%',
    paddingLeft: formatWidth(58),
    paddingRight: formatWidth(71),
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  clipView: {
    height: formatWidth(98),
    width: formatWidth(98),
  },
  shutterBtn: {
    backgroundColor: _c.white,
    borderRadius: formatWidth(49),
    height: formatWidth(98),
    width: formatWidth(98),
    padding: formatWidth(4),
    marginLeft: formatWidth(38),
    marginRight: formatWidth(49),
  },
  faceDemo: {
    width: formatWidth(58),
    height: formatWidth(55),
    borderRadius: formatWidth(10),
  },
  facePreview: {},
  btnNext: {},
  btnTxt: {
    color: _c.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: _f.regular,
    fontSize: _fs.l,
  },
  redCircle: {
    height: '100%',
    width: '100%',
    borderRadius: formatWidth(47),
    backgroundColor: _c.main_red,
  },
  shadow: {
    shadowColor: _c.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
