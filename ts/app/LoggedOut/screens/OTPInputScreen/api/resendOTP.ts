import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IresendOTP {
  PHPSESSID: string;
}

export async function resendOTP({PHPSESSID}: IresendOTP) {
  try {
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: `${tapMatchServerUrl}verify/resend`,
      headers: {
        Cookie: PHPSESSID,
        'Content-Type': 'application/json',
      },
    };

    axios
      .request(options)
      .then(({data}) => {
        console.log('Code re-send!');
      })
      .catch((error) => {
        console.error(error);
        callAlert(undefined, `${error.toString()} ::: resendOTP`);
      });
  } catch (error) {
    console.error(`${error} ::: resendOTP`);
    callAlert(undefined, `${error.toString()} ::: resendOTP`);
  }
}
