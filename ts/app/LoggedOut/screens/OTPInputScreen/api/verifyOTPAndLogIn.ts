import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserProfile} from 'ts/app/common/api/getUserProfile';

interface IverifyOTPAndLogIn {
  PHPSESSID: string;
  OTP: string;
  LoggedIn: [boolean, (x: boolean) => void];
  userProfile: [any, (x: any) => void];
  userToken: [string, (x: string) => void];
}

export async function verifyOTPAndLogIn({
  PHPSESSID,
  OTP,
  LoggedIn,
  userProfile,
  userToken,
}: IverifyOTPAndLogIn) {
  try {
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: `${tapMatchServerUrl}verify/code`,
      headers: {
        Cookie: PHPSESSID,
        'Content-Type': 'application/json',
      },
      data: {
        verify_code: OTP,
      },
    };

    axios
      .request(options)
      .then(({data}: any) => {
        userToken[1](data);
        AsyncStorage.setItem('@user_token', data);
        return data;
      })
      .then((data: string) => getUserProfile({userProfile, userToken: data}))
      .then(() => LoggedIn[1](true))
      .catch((error) => {
        console.error(error);
        callAlert(undefined, `${error.toString()} ::: verifyOTPAndLogIn`);
      });
  } catch (error) {
    console.error(`${error} ::: verifyOTPAndLogIn`);
    callAlert(undefined, `${error.toString()} ::: verifyOTPAndLogIn`);
  }
}
