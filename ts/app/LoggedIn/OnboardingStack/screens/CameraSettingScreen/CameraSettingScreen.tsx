import React from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import StartBtn from './components/StartBtn';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {formatWidth} from '../../../../../utils/format-size';
import BackBtn from './components/BackBtn';

interface CameraSettingScreenProps {
  navigation: any;
}

const CameraSettingScreen = ({navigation}: CameraSettingScreenProps) => {
  const {width} = useWindowDimensions();
  const txt = useLocalizedTxt();

  console.log('Camera Setting');

  return (
    <View style={_s.container}>
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      {/*<BackBtn />*/}
      <ImageBackground
        resizeMode={'stretch'}
        style={_s.imageBackground}
        source={require('assets/png/access-background.png')}>
        <View style={_s.content}>
          <Text style={_s.txt}>{txt.allowAccessToCamera}</Text>
          <Text style={_s.txt} />
          <Text style={_s.txt}>{txt.goToSetting}</Text>
          <Text style={_s.txt}>{txt.findTapMatch}</Text>
          <Text style={_s.txt}>{txt.enableCamera}</Text>
        </View>
        <StartBtn />
      </ImageBackground>
    </View>
  );
};

export default CameraSettingScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.white,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: _c.white,
    width: formatWidth(300),
    paddingTop: formatWidth(56),
    paddingLeft: formatWidth(47),
    paddingRight: formatWidth(50),
    paddingBottom: formatWidth(56),
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _c.white,
  },
  txt: {
    color: _c.secondaryText,
    fontSize: _fs.xl,
    fontFamily: _f.bold,
    lineHeight: formatWidth(23),
  },
});
