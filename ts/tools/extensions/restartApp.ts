import AsyncStorage from '@react-native-async-storage/async-storage';

import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import deleteUserToken from './deleteUserToken';

interface IrestartApp {
  userProfile: [any, (x: any) => void];
}

export async function restartApp({userProfile}: IrestartApp) {
  try {
    const token = await AsyncStorage.setItem('@user_token', `${true}`);

    const options: AxiosRequestConfig = {
      method: 'PUT',
      url: `${tapMatchServerUrl}api/profile`,
      headers: {
        'X-Auth-Token': token,
        'Content-Type': 'application/json',
      },
      data: {
        first_name: userProfile[0].name,
        finished_onboarding: true,
      },
    };
    await axios
      .request(options)
      .then(({data}: any) => {
        AsyncStorage.setItem('@user_has_passed_onboarding', `${true}`);
        userProfile[1](data.data);
      })
      .then(() => {
        deleteUserToken();
      })
      .catch((error) => {
        console.error(error);
        callAlert(
          undefined,
          `${error.toString()} ::: restartApp_TESTING_AND_DEV_TOOL`,
        );
      });
  } catch (error) {
    console.error(`${error} ::: restartApp_TESTING_AND_DEV_TOOL`);
    callAlert(
      undefined,
      `${error.toString()} ::: restartApp_TESTING_AND_DEV_TOOL`,
    );
  }
}
