import {createReducer} from '@reduxjs/toolkit';

import {
  setPHPSESSID,
  setLoading,
  setOneSignalId,
  setPassOnBoarding,
  setUserLocation,
  setUserToken,
  setMuteTutorial,
} from './actions';
import {systemInitialState, SystemState} from './state';
export const systemReducers = createReducer<SystemState>(
  systemInitialState,
  (builder) => {
    builder.addCase(setPHPSESSID, (state, {payload: PHPSESSID}) => ({
      ...state,
      PHPSESSID,
    }));
    builder.addCase(setLoading, (state, {payload: loading}) => ({
      ...state,
      loading,
    }));
    builder.addCase(setMuteTutorial, (state, {payload: muteTutorial}) => ({
      ...state,
      muteTutorial,
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
  },
);
