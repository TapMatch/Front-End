import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IverifyOTP {
  PHPSESSID: string;
  OTP: string;
  LoggedIn: [boolean, (x: boolean) => void];
}

export async function verifyOTP({PHPSESSID, OTP, LoggedIn}: IverifyOTP) {
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
      .then(({data}) => {
        AsyncStorage.setItem('@user_token', data);
        LoggedIn[1](true);
      })
      .catch((error) => {
        console.error(error);
        callAlert(undefined, error);
      });
  } catch (error) {
    console.error(`${error} ::: verifyOTP`);
    callAlert(undefined, error);
  }
}
