import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IpostUserFinishedOnboarding {
  userProfile: [any, (x: any) => void];
  userToken: string;
}

export async function postUserFinishedOnboarding({
  userProfile,
  userToken,
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
        console.error(error);
        callAlert(
          undefined,
          `${error.toString()} ::: postUserFinishedOnboarding`,
        );
      });
  } catch (error) {
    console.error(`${error} ::: postUserFinishedOnboarding`);
    callAlert(undefined, `${error.toString()} ::: postUserFinishedOnboarding`);
  }
}
