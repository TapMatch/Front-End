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
import OneSignal from 'react-native-onesignal';
import branch, {BranchEvent} from 'react-native-branch';
import {updateUserProfile} from './common/api/updateUserProfile';

const TapMatch = () => {
  const LoggedIn = useState<boolean>(false);
  const user_has_passed_onboarding = useState<boolean>(false);
  const userProfile = useState<any>(null);
  const userToken = useState<string>('');
  const PHPSESSID = useState<string>('');
  const userOneSignalId = useState<string>('');
  const userLocation = useState<LatLng>({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const locationPermission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;



  useEffect(() => {
    if (LoggedIn[0]) {
      OneSignal.init("b6013fa6-1fc9-4afa-8236-4dd009fd798d", {kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2});
      OneSignal.inFocusDisplaying(2);
      OneSignal.promptForPushNotificationsWithUserResponse((permission: any) => console.log(permission));

      //  OneSignal.addEventListener('received', this.onReceived);
      //  OneSignal.addEventListener('opened', this.onOpened);
      //  OneSignal.addEventListener('ids', this.onIds);

      // return()=> {
      //   OneSignal.removeEventListener('received', this.onReceived);
      //   OneSignal.removeEventListener('opened', this.onOpened);
      //   OneSignal.removeEventListener('ids', this.onIds);
      // }
    }
  }, [LoggedIn[0]]);

  useEffect(() => {
    OneSignal.addEventListener('ids', handleOneSignalIds);
    return () => OneSignal.removeEventListener('ids', handleOneSignalIds);
  }, []);

  useEffect(() => {
    OneSignal.addEventListener('ids', handleOneSignalIds);
    return () => OneSignal.removeEventListener('ids', handleOneSignalIds);
  }, []);

  useEffect(() => {
    // console.log('JKKKKJKJKJKJKJKJKJKJKJKJKJKJ');
    if (userProfile[0] !== null) {
      // if (userProfile[0].hasOwnProperty('uuid')) {
      // console.log('UUUUUUUUUUUUUUUUU');
      if (userProfile[0].uuid !== userOneSignalId[0]) {
        updateUserProfile({
          userToken: userToken[0],
          userProfile,
          data: {
            uuid: userOneSignalId[0]
          }
        });
      }
    }
    // }
  }, [userProfile[0]]);

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

  const handleOneSignalIds = ({userId}: any) => {
    userOneSignalId[1](userId);
  };

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
        // console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥', userProfile[0], '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
        // console.log('💧💧💧💧💧💧💧💧💧💧', userToken[0], '💧💧💧💧💧💧💧💧💧💧💧💧');
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
