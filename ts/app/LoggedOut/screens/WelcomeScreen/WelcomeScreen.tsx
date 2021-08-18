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
import {formatCoverSize, formatWidth} from 'ts/utils/format-size';

interface WelcomeScreenProps {}

const WelcomeScreen = (props: WelcomeScreenProps) => {
  const locationPermission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const startModalVisible = useState<boolean>(false);
  const logoSize = formatWidth(175);
  const {userLocation} = useContext(TapMatchContext);
  const headerHeight = useHeaderHeight();

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
      request(locationPermission)
        .then((x) => {
          if (x === 'granted') {
            // startModalVisible[1](true);
            handleGeolocation();
          }
        })
        .then(() => startModalVisible[1](true));
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
        <TouchableOpacity
          activeOpacity={1}
          onPress={getUserLocation}
          style={[
            _s.middle,
            {
              marginTop:
                formatCoverSize(355) - StatusBar.currentHeight - headerHeight,
            },
          ]}>
          <TapMatchLogo height={logoSize} width={logoSize} />
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
    backgroundColor: _c.white,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: _c.white,
  },
  middle: {
    width: formatWidth(175),
    alignItems: 'center',
  },
});
