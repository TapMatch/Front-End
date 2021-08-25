import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {confirmCode, signInWithPhoneNumber} from './service';

export const setIsAuthorised = createAction<boolean>('auth/IS_AUTHORISED');
export const setLoading = createAction<boolean>('auth/LOADING');

export const signIn = createAsyncThunk(
  'auth/SIGN_PHONE',
  // @ts-ignore
  async (data: string, {dispatch}) => {
    dispatch(setLoading(true));
    const response = await signInWithPhoneNumber(data);
    dispatch(setLoading(false));
    return response;
  },
);

export const confirm = createAsyncThunk(
  'auth/CONFIRM_CODE',
  // @ts-ignore
  async (data: string, {dispatch}) => {
    dispatch(setLoading(true));
    const response = await confirmCode(data);
    dispatch(setLoading(false));
    return response;
  },
);
