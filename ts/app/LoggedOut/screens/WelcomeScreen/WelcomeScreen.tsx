import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  ImageBackground,
} from 'react-native';
import TapMatchBetaLogo from 'assets/svg/TapMatchBetaLogo-red.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomBtn from './components/BottomBtn';
import SloganParagraph from './components/SloganParagraph';
import {useNavigation} from '@react-navigation/native';
import {_c} from 'ts/UIConfig/colors';

interface WelcomeScreenProps {}

const WelcomeScreen = (props: WelcomeScreenProps) => {
  const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const {navigate} = useNavigation();
  const logoSize = width * 0.6;

  return (
    <View style={[_s.container, {paddingTop: top}]}>
      <ImageBackground
        resizeMode={'cover'}
        style={_s.container}
        source={require('assets/png/holding-hands2.png')}>
        <StatusBar
          animated={true}
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigate('PhoneInput')}
          style={_s.middle}>
          <TapMatchBetaLogo height={logoSize} width={logoSize} />
        </TouchableOpacity>
        <SloganParagraph />
        <BottomBtn />
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: _c.white,
  },
  imageBackground: {
    flex: 1,
    backgroundColor: _c.white,
  },
  middle: {
    width: '100%',
    flex: 0.7,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '5%',
  },
});