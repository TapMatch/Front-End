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
import TapMatchBetaLogo from 'assets/svg/TapMatchBetaLogo-red.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomBtn from './components/BottomBtn';
import SloganParagraph from './components/SloganParagraph';
import {_c} from 'ts/UIConfig/colors';
import StartModal from './components/StartModal/StartModal';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';

interface WelcomeScreenProps {}

const WelcomeScreen = (props: WelcomeScreenProps) => {
  const locationPermission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const startModalVisible = useState<boolean>(false);
  const logoSize = width * 0.6;
  const {userLocation} = useContext(TapMatchContext);


  const getUserLocation = () => {
    check(locationPermission).then((x) => {
      setUserLocation(x);
    });
  };


  const setUserLocation = (x: string) => {
    if (x === 'granted') {
      startModalVisible[1](true);
      handleGeolocation();
    } else {
      request(locationPermission).then((x) => {
        if (x === 'granted') {
          // startModalVisible[1](true);
          handleGeolocation();
        }
      })
        .then(() => startModalVisible[1](true));;
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
      },
    );
  };


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
          onPress={getUserLocation}
          style={_s.middle}>
          <TapMatchBetaLogo height={logoSize} width={logoSize} />
        </TouchableOpacity>
        <SloganParagraph startModalVisible={startModalVisible} />
        <BottomBtn getUserLocation={getUserLocation} />
      </ImageBackground>
      <StartModal modalVisible={startModalVisible} />
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
