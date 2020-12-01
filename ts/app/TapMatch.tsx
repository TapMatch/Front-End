import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TapMatchContext} from './contexts/TapMatchContext';
import LoggedInStack from './LoggedIn/LoggedInStack';
import LoggedOutStack from './LoggedOut/LoggedOutStack';
import NoNetworkModal from './common/NoNetworkModal';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import {AppState, Platform} from 'react-native';
import {LatLng} from 'react-native-maps';

const TapMatch = () => {
  const LoggedIn = useState(false);
  const userLocation = useState<LatLng>({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const locationPermission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

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
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const createRootNavigation = (LoggedIn: boolean) => {
    if (LoggedIn) {
      return <LoggedInStack />;
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
