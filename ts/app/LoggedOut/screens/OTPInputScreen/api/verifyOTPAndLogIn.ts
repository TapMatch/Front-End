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
  ReSendCodeDisabled: [boolean, (x: boolean) => void];
}

export async function verifyOTPAndLogIn({
  ReSendCodeDisabled,
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
        if (typeof data === 'string') {
          userToken[1](data);
          AsyncStorage.setItem('@user_token', data);
          return data;
        } else {
          return 'Token is invalid';
        }
      })
      .then((data: string) => {
        if (data === 'Token is invalid') {
          throw new Error('Token is invalid');
        } else {
          getUserProfile({userProfile, userToken: data});
        }
      })
      .then(() => LoggedIn[1](true))
      .catch((error) => {
        if (error.toString().includes('Token is invalid')) {
          ReSendCodeDisabled[1](false);
          console.log(error);
          callAlert(undefined, `Code is invalid.`);
        } else {
          console.log(error);
          callAlert(undefined, `${error.toString()} ::: verifyOTPAndLogIn`);
        }
      });
  } catch (error) {
    console.log(`${error} ::: verifyOTPAndLogIn`);
    callAlert(undefined, `${error.toString()} ::: verifyOTPAndLogIn`);
  }
}
