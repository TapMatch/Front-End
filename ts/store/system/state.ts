import {LatLng} from 'react-native-maps';

export interface SystemState {
  token: string;
  location: LatLng | null;
  PHPSESSID: string;
  oneSignalId: string;
  passedOnBoarding: boolean;
  loading: boolean;
  muteTutorial: boolean;
}

export const systemInitialState = {
  token: '',
  location: null,
  PHPSESSID: '',
  oneSignalId: '',
  passedOnBoarding: false,
  loading: false,
  muteTutorial: false,
};

export interface SystemRootState {
  system: SystemState;
}
