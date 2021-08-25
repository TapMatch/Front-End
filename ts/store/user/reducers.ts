import {createReducer} from '@reduxjs/toolkit';

import {
  setPHPSESSID,
  setLoading,
  setOneSignalId,
  setPassOnBoarding,
  setUserLocation,
  setUserToken,
  setUserProfile,
} from './actions';
import {userInitialState, UserState} from './state';
export const userReducers = createReducer<UserState>(
  userInitialState,
  (builder) => {
    builder.addCase(setPHPSESSID, (state, {payload: PHPSESSID}) => ({
      ...state,
      PHPSESSID,
    }));
    builder.addCase(setLoading, (state, {payload: loading}) => ({
      ...state,
      loading,
    }));
    builder.addCase(setOneSignalId, (state, {payload: oneSignalId}) => ({
      ...state,
      oneSignalId,
    }));
    builder.addCase(
      setPassOnBoarding,
      (state, {payload: passedOnBoarding}) => ({
        ...state,
        passedOnBoarding,
      }),
    );
    builder.addCase(setUserLocation, (state, {payload: location}) => ({
      ...state,
      location,
    }));
    builder.addCase(setUserToken, (state, {payload: token}) => ({
      ...state,
      token,
    }));
    builder.addCase(setUserProfile, (state, {payload: profile}) => ({
      ...state,
      profile,
    }));
  },
);
