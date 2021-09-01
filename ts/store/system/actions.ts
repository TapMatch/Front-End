import {createAction} from '@reduxjs/toolkit';
import {LatLng} from 'react-native-maps';

export const setPassOnBoarding = createAction<boolean>('user/PASS_BOARDING');
export const setLoading = createAction<boolean>('user/LOADING');
export const setMuteTutorial = createAction<boolean>('user/MUTE_TUTORIAL');
export const setUserLocation = createAction<LatLng>('user/LOCATION');
export const setUserToken = createAction<string>('user/TOKEN');
export const setPHPSESSID = createAction<string>('user/PHPSESSID');
export const setOneSignalId = createAction<string>('user/ONESIGNALID');
