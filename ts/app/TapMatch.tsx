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
import callAlert from 'ts/utils/callAlert';
import OnboardingStack from './LoggedIn/OnboardingStack/OnboardingStack';
import {getUserProfile} from './common/api/getUserProfile';
import PlaceholderStack from './LoggedIn/PlaceholderStack/PlaceholderStack';

const TapMatch = () => {
  const LoggedIn = useState<boolean>(false);
  const user_has_passed_onboarding = useState<boolean>(false);
  const userProfile = useState<any>(null);
  const userToken = useState<string>('');
  const PHPSESSID = useState<string>('');
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
          userToken[1](value);
          getUserProfile({userProfile, userToken: value});
        }
      })
      .catch((error) => {
        console.log(error);
        callAlert(undefined, `${error.toString()} @user_token`);
      });

    AsyncStorage.getItem('@user_has_passed_onboarding')
      .then((value) => {
        if (typeof value === 'string') {
          user_has_passed_onboarding[1](true);
        }
      })
      .catch((error) => {
        console.log(error);
        callAlert(undefined, `${error.toString()} @user_has_passed_onboarding`);
      });
  }, []);

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

  const createRootNavigation = () => {
    if (LoggedIn[0]) {
      if (userProfile[0] !== null) {
        console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥', userProfile[0], '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
        console.log('💧💧💧💧💧💧💧💧💧💧', userToken[0], '💧💧💧💧💧💧💧💧💧💧💧💧');
        if (user_has_passed_onboarding[0]) {
          return <MainStack />;
        } else {
          return <OnboardingStack />;
        }
      } else {
        <PlaceholderStack />;
      }
    } else {
      return <LoggedOutStack />;
    }
  };

  return (
    <TapMatchContext.Provider
      value={{
        LoggedIn,
        userLocation,
        PHPSESSID,
        userProfile,
        userToken,
        user_has_passed_onboarding,
      }}>
      <NoNetworkModal />
      <NavigationContainer
        children={createRootNavigation()}
      />
    </TapMatchContext.Provider>
  );
};

export default TapMatch;
