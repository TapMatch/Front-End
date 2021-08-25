import {LatLng} from 'react-native-maps';

export interface UserState {
  profile: any | null;
  token: string;
  location: LatLng | null;
  PHPSESSID: string;
  oneSignalId: string;
  passedOnBoarding: boolean;
  loading: boolean;
}

export const userInitialState = {
  profile: null,
  token: '',
  location: null,
  PHPSESSID: '',
  oneSignalId: '',
  passedOnBoarding: false,
  loading: false,
};

export interface UserRootState {
  user: UserState;
}
