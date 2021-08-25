import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {LatLng} from 'react-native-maps';
import {getProfile, updateProfile} from './service';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const setPassOnBoarding = createAction<boolean>('user/PASS_BOARDING');
export const setLoading = createAction<boolean>('user/LOADING');
export const setUserLocation = createAction<LatLng>('user/LOCATION');
export const setUserToken = createAction<string>('user/TOKEN');
export const setPHPSESSID = createAction<string>('user/PHPSESSID');
export const setOneSignalId = createAction<string>('user/ONESIGNALID');
export const setUserProfile = createAction<any>('user/PROFILE');

export const getUserProfile = createAsyncThunk(
  'auth/GET_PROFILE',
  // @ts-ignore
  async (data: string, {dispatch}) => {
    dispatch(setLoading(true));
    const response = await getProfile();
    const user_profile = JSON.stringify(response);
    await AsyncStorage.setItem('@user_profile', user_profile);
    dispatch(setLoading(false));
    return response;
  },
);
