import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  useWindowDimensions,
  ImageBackground,
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
  const locationPermission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const logoSize = formatWidth(175);
  const {userLocation} = useContext(TapMatchContext);
  const headerHeight = useHeaderHeight();
  const {navigate} = useNavigation();

  const getUserLocation = () => {
    check(locationPermission).then((x) => {
      setUserLocation(x);
    });
  };

  const setUserLocation = async (x: string) => {
    if (x === 'granted') {
      await handleNextScreen();
      handleGeolocation();
    } else {
      request(locationPermission)
        .then((x) => {
          if (x === 'granted') {
            handleGeolocation();
          }
        })
        .then(async () => await handleNextScreen());
    }
  };

  const handleGeolocation = () => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        const {latitude, longitude} = coords;
        userLocation[1]({latitude, longitude});
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {
        forceRequestLocation: true,
        showLocationDialog: true,
        enableHighAccuracy: false,
        timeout: 150000,
        maximumAge: 10000,
      },
    );
  };

  const handleNextScreen = async () => {
    const passedTutorial = await getStorageData(StorageKeys.PassedTutorial);
    if (passedTutorial === '1') {
      navigate(LoggedOutScreens.PhoneInput);
    } else {
      navigate(LoggedOutScreens.TutorialScreen);
    }
  };

  return (
    <View style={[_s.container, {paddingTop: top}]}>
      <ImageBackground
        resizeMode={'cover'}
        style={_s.imageBackground}
        source={require('assets/png/launch.png')}>
        <StatusBar
          animated={true}
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <SloganParagraph />
        <TouchableOpacity
          activeOpacity={1}
          onPress={getUserLocation}
          style={_s.middle}>
          <TapMatchLogo height={logoSize} width={logoSize} />
        </TouchableOpacity>
        <TermsAndConditionsParagraph />
        <BottomBtn getUserLocation={getUserLocation} />
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
  middle: {
    width: formatWidth(185),
    alignItems: 'center',
  },
});
