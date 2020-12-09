import AsyncStorage from '@react-native-async-storage/async-storage';

import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
// import callAlert from 'ts/utils/callAlert';
import deleteUserToken from './deleteUserToken';

export async function restartApp({
  userProfile,
  userToken,
  LoggedIn,
  user_has_passed_onboarding,
}: any) {
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
        finished_onboarding: false,
      },
    };
    await axios
      .request(options)
      .then(({data}: any) => {
        AsyncStorage.removeItem('@user_has_passed_onboarding');
        userProfile[1](null);
        user_has_passed_onboarding[1](false);
      })
      .then(() => {
        deleteUserToken();
        LoggedIn[1](false);
      })
      .catch((error) => {
        deleteUserToken();
        console.log(error);
        // callAlert(
        //   undefined,
        //   `${error.toString()} ::: restartApp_TESTING_AND_DEV_TOOL`,
        // );
      });
  } catch (error) {
    console.log(`${error} ::: restartApp_TESTING_AND_DEV_TOOL`);
    // callAlert(
    //   undefined,
    //   `${error.toString()} ::: restartApp_TESTING_AND_DEV_TOOL`,
    // );
  }
}
