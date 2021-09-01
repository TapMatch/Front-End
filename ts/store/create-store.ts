import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {Middleware} from 'redux';
// @ts-ignore
import createDebugger from 'redux-flipper';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import {displaySettingsReducers} from './display-settings/display-settings-reducers';
import {DisplaySettingsRootState} from './display-settings/display-settings-state';
import {systemReducers} from './system/reducers';
import {SystemRootState} from './system/state';
import {authReducers} from './auth/reducers';
import {AuthRootState} from './auth/state';
import {userReducers} from './user/reducers';
import {UserRootState} from './user/state';
import {rootStateReducer} from './root-state.reducers';

type RootState = DisplaySettingsRootState &
  AuthRootState &
  UserRootState &
  SystemRootState;

const middlewares: Array<Middleware<{}, RootState>> = [];

if (__DEV__ && !process.env.JEST_WORKER_ID) {
  middlewares.push(createDebugger());
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = rootStateReducer<RootState>({
  displaySettings: displaySettingsReducers,
  auth: authReducers,
  user: userReducers,
  system: systemReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(middlewares);
    },
  });

  const persistor = persistStore(store);
  return {store, persistor};
};
