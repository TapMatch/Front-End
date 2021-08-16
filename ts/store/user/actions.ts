import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {handleAuthorize, handleRefresh, handleProfile} from '@/Services/user';

export const setIsAuthorised = createAction('user/IS_AUTHORISED');
export const setLoading = createAction('user/LOADING');

export const userAuthorize = createAsyncThunk(
  'user/AUTHORIZE',
  async (data, {dispatch}) => {
    dispatch(setLoading(true));
    const response = await handleAuthorize();
    dispatch(getUserProfile());
    return response;
  },
);

export const userRefresh = createAsyncThunk('user/REFRESH', async () => {
  const response = await handleRefresh();
  return response;
});

export const getUserProfile = createAsyncThunk(
  'user/PROFILE',
  async (data, {dispatch}) => {
    const response = await handleProfile();
    dispatch(setLoading(true));
    dispatch(setIsAuthorised(true));
    return response;
  },
);
