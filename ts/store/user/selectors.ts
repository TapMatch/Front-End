import {useSelector} from 'react-redux';
import {UserRootState} from './state';

export const useProfileSelector = () =>
  useSelector<UserRootState>(({user}) => user.profile);

export const useUserLocationSelector = () =>
  useSelector<UserRootState>(({user}) => user.location);

export const usePHPSESSIDSelector = () =>
  useSelector<UserRootState>(({user}) => user.PHPSESSID);

export const useUserTokenSelector = () =>
  useSelector<UserRootState>(({user}) => user.token);

export const usePassedOnBoardingSelector = () =>
  useSelector<UserRootState>(({user}) => user.passedOnBoarding);
