import {createReducer} from '@reduxjs/toolkit';

import {setLoading, setUserProfile} from './actions';
import {userInitialState, UserState} from './state';
export const userReducers = createReducer<UserState>(
  userInitialState,
  (builder) => {
    builder.addCase(setLoading, (state, {payload: loading}) => ({
      ...state,
      loading,
    }));
    builder.addCase(setUserProfile, (state, {payload: profile}) => ({
      ...state,
      profile,
    }));
  },
);
