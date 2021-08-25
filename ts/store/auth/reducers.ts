import {createReducer} from '@reduxjs/toolkit';

import {setIsAuthorised, setLoading} from './actions';
import {authInitialState, AuthState} from './state';
export const authReducers = createReducer<AuthState>(
  authInitialState,
  (builder) => {
    builder.addCase(setIsAuthorised, (state, {payload: isAuthorised}) => ({
      ...state,
      isAuthorised,
    }));
    builder.addCase(setLoading, (state, {payload: loading}) => ({
      ...state,
      loading,
    }));
  },
);
