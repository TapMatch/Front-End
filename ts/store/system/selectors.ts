import {useSelector} from 'react-redux';
import {SystemRootState} from './state';

export const useUserLocationSelector = () =>
  useSelector<SystemRootState>(({system}) => system.location);

export const usePHPSESSIDSelector = () =>
  useSelector<SystemRootState>(({system}) => system.PHPSESSID);

export const useUserTokenSelector = () =>
  useSelector<SystemRootState>(({system}) => system.token);

export const usePassedOnBoardingSelector = () =>
  useSelector<SystemRootState>(({system}) => system.passedOnBoarding);
