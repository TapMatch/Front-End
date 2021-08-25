import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  useWindowDimensions,
  ImageBackground,
  Image,
} from 'react-native';
import TapMatchLogo from 'assets/svg/TapMatchLogo.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useHeaderHeight} from '@react-navigation/stack';
import BottomBtn from './components/BottomBtn';
import SloganParagraph from './components/SloganParagraph';
import {_c} from 'ts/UIConfig/colors';
import StartModal from './components/StartModal/StartModal';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {formatCoverSize, formatHeight, formatWidth} from 'ts/utils/format-size';
import {getStorageData} from 'ts/utils/asyncStorage';
import StorageKeys from 'ts/constants/storage';
import {LoggedOutScreens} from 'ts/constants/screens';
import {useNavigation} from '@react-navigation/native';
import TermsAndConditionsParagraph from './components/StartModal/components/TermsAndConditionsParagraph';

interface WelcomeScreenProps {}

const WelcomeScreen = (props: WelcomeScreenProps) => {
  const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const logoSize = formatWidth(175);
  const {userLocation} = useContext(TapMatchContext);
  const headerHeight = useHeaderHeight();
  const {navigate} = useNavigation();

  const handleNextScreen = async () => {
    const passedTutorial = await getStorageData(StorageKeys.PassedTutorial);
    if (passedTutorial === '1') {
      navigate(LoggedOutScreens.PhoneInput);
    } else {
      navigate(LoggedOutScreens.TutorialScreen, {playVideo: true});
    }
  };

  return (
    <View style={[_s.container, {paddingTop: top}]}>
      <ImageBackground
        resizeMode={'cover'}
        style={_s.imageBackground}
        source={require('assets/png/launch.png')}>
        <SloganParagraph />
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleNextScreen}
          style={_s.middle}>
          <Image
            source={require('assets/png/TapMatchLogo.png')}
            style={_s.logo}
          />
        </TouchableOpacity>
        <TermsAndConditionsParagraph />
        <BottomBtn getUserLocation={handleNextScreen} />
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.black,
  },
  imageBackground: {
    flex: 1,
    backgroundColor: _c.black,
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'space-around',
    paddingTop: formatHeight(15),
    paddingBottom: formatHeight(75),
  },
  logo: {
    width: formatWidth(185),
    height: formatWidth(182),
  },
  middle: {
    width: formatWidth(185),
    alignItems: 'center',
  },
});
