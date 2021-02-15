import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import logUserOut from 'ts/app/common/services/logUserOut';
import {tapMatchServerUrl} from 'ts/constants/constants';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import callAlert from 'ts/utils/callAlert';

interface IpostUserFinishedOnboarding {
  userProfile: [any, (x: any) => void];
  userToken: string;
  LoggedIn?: [boolean, (x: boolean) => void];
  user_has_passed_onboarding?: [boolean, (x: boolean) => void];
}

export async function postUserFinishedOnboarding({
  userProfile,
  userToken,
  LoggedIn,
  user_has_passed_onboarding
}: IpostUserFinishedOnboarding) {
  try {
    const options: AxiosRequestConfig = {
      method: 'PUT',
      url: `${tapMatchServerUrl}api/profile`,
      headers: {
        'X-Auth-Token': userToken,
        'Content-Type': 'application/json',
      },
      data: {
        first_name: userProfile[0].name,
        finished_onboarding: true,
      },
    };
    axios
      .request(options)
      .then(({data}: any) => {
        AsyncStorage.setItem('@user_has_passed_onboarding', `${true}`);
        userProfile[1](data.data);
      })
      .catch((error) => {

        if (DEV_MODE) {
          console.log(error);
          callAlert(
            undefined,
            `${error.toString()} ::: postUserFinishedOnboarding`,
          );
        }
        if (LoggedIn && userProfile && user_has_passed_onboarding) {
          logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
        }

      });
  } catch (error) {

    if (DEV_MODE) {
      console.log(`${error} ::: postUserFinishedOnboarding`);

      callAlert(undefined, `${error.toString()} ::: postUserFinishedOnboarding`);
    }
  }
}
