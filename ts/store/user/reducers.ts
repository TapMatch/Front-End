import { createReducer } from '@reduxjs/toolkit'

import {
  userAuthorize,
  getUserProfile,
  setIsAuthorised,
  setLoading,
  userRefresh,
} from './actions'
import { userInitialState } from './state'
export const userReducers = createReducer(userInitialState, builder => {
  builder.addCase(setIsAuthorised, (state, { payload: isAuthorised }) => ({
    ...state,
    isAuthorised,
  }))
  builder.addCase(setLoading, (state, { payload: loading }) => ({
    ...state,
    loading,
  }))
  builder.addCase(userAuthorize.fulfilled, (state, { payload }) => ({
    ...state,
    ...payload,
  }))
  builder.addCase(userRefresh.fulfilled, (state, { payload }) => ({
    ...state,
    ...payload,
  }))
  builder.addCase(getUserProfile.fulfilled, (state, { payload }) => ({
    ...state,
    ...payload,
  }))
})
