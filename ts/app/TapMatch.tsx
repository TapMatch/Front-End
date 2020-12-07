import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TapMatchContext} from './contexts/TapMatchContext';
import MainStack from './LoggedIn/MainStack/MainStack';
import LoggedOutStack from './LoggedOut/LoggedOutStack';
import NoNetworkModal from './common/NoNetworkModal';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import {AppState, Platform} from 'react-native';
import {LatLng} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TapMatch = () => {
  const LoggedIn = useState<boolean>(false);
  const userLocation = useState<LatLng>({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const locationPermission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  useEffect(() => {
    AsyncStorage.getItem('@user_token')
      .then((value) => {
        if (typeof value === 'string') {
          LoggedIn[1](true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [LoggedIn[0]]);

  useEffect(() => {
    getUserLocation();
    AppState.addEventListener('change', getUserLocation);
    return () => AppState.removeEventListener('change', getUserLocation);
  }, []);

  const getUserLocation = () => {
    check(locationPermission).then((x) => {
      setUserLocation(x);
    });
  };

  const setUserLocation = (x: string) => {
    if (x === 'granted') {
      handleGeolocation();
    } else {
      request(locationPermission).then((x) => {
        if (x === 'granted') {
          handleGeolocation();
        }
      });
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

  const createRootNavigation = (LoggedIn: boolean) => {
    if (LoggedIn) {
      return <MainStack />;
    } else {
      return <LoggedOutStack />;
    }
  };

  return (
    <TapMatchContext.Provider value={{LoggedIn, userLocation}}>
      <NoNetworkModal />
      <NavigationContainer children={createRootNavigation(LoggedIn[0])} />
    </TapMatchContext.Provider>
  );
};

export default TapMatch;
