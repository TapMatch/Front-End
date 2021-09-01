import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {getProfile} from './service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLoading = createAction<boolean>('user/LOADING');
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
