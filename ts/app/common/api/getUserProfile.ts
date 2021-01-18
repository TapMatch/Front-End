import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IgetUserProfile {
  userProfile: [any, (x: any) => void];
  userToken: string;
}

export async function getUserProfile({
  userProfile,
  userToken,
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
        console.log(error);
        callAlert(undefined, `${error.toString()} ::: getUserProfile`);
      });
  } catch (error) {
    console.log(`${error} ::: getUserProfile`);
    callAlert(undefined, `${error.toString()} ::: getUserProfile`);
  }
}
