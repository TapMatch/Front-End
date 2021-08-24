import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import Title from './components/Title';
import Subtitle from './components/Subtitle';
import Camera from './components/Camera/Camera';
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
  const pictureURI = useState<string>('');
  const cameraShutterState = useState<boolean>(false);

  const onPressBack = () => {
    if (facesDetected && isString(pictureURI[0]) && cameraShutterState) {
      facesDetected[1](false);
      cameraShutterState[1](false);
      pictureURI[1]('');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[_s.container, {paddingBottom: bottom}]}>
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
          pictureURI={pictureURI}
          cameraShutterState={cameraShutterState}
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
    left: formatWidth(43),
    bottom: formatHeight(32),
    zIndex: 300,
  },
  top: {
    paddingTop: formatHeight(62),
    paddingBottom: formatHeight(25),
    backgroundColor: _c.white,
  },
});
