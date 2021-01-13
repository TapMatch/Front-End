import React, {useContext} from 'react';
import {Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, check} from 'react-native-permissions';


interface BottomBtnProps {
  startModalVisible: [boolean, (x: boolean) => void];
}

const BottomBtn = ({startModalVisible}: BottomBtnProps) => {
  const locationPermission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const txt = useLocalizedTxt();
  const {bottom} = useSafeAreaInsets();
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
    <TouchableOpacity
      activeOpacity={1}
      onPress={getUserLocation}
      style={[_s.container, {height: vs(60) + bottom * 0.5}]}>
      <Text style={_s.txt}>{txt.tapToContinue}</Text>
    </TouchableOpacity>
  );
};

export default BottomBtn;

const _s = StyleSheet.create({
  container: {
    backgroundColor: _c.transparentBtn,
    minWidth: '100%',
    height: vs(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontFamily: _f.regularAlt,
    fontSize: _fs.xl,
    color: _c.black,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
