import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import logAxiosError from 'ts/utils/logAxiosError';
import logUserOut from '../services/logUserOut';

interface IgetUserProfile {
  userProfile: [any, (x: any) => void];
  userToken: string;
  LoggedIn?: [boolean, (x: boolean) => void];
  user_has_passed_onboarding?: [boolean, (x: boolean) => void];
}

export async function getUserProfile({
  userProfile,
  userToken,
  LoggedIn,
  user_has_passed_onboarding
}: IgetUserProfile) {
  try {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `${tapMatchServerUrl}api/profile`,
      headers: {
        'X-Auth-Token': userToken,
        'Content-Type': 'application/json',
      },
    };
    axios
      .request(options)
      .then(({data}: any) => {
        userProfile[1](data);
        const user_profile = JSON.stringify(data);
        AsyncStorage.setItem('@user_profile', user_profile);
      })
      .catch((error) => {

        logAxiosError(error, 'getUserProfile');

        if (LoggedIn && userProfile && user_has_passed_onboarding) {
          logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
        }

        if (DEV_MODE) {
          callAlert(undefined, `${error.toString()} ::: getUserProfile`);
        }
      });
  } catch (error) {
    console.log(`${error} ::: getUserProfile`);
    if (DEV_MODE) {
      callAlert(undefined, `${error.toString()} ::: getUserProfile`);
    }
  }
}
