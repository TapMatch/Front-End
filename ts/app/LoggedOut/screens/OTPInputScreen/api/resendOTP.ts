import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IresendOTP {
  PHPSESSID: [string, (x: string) => void];
}

export async function resendOTP({PHPSESSID}: IresendOTP) {
  try {
    console.log(PHPSESSID, 'PHPSESSID-----PHPSESSID');
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: `${tapMatchServerUrl}verify/resend`,
      headers: {
        Cookie: PHPSESSID[0],
        'Content-Type': 'application/json',
      },
    };

    axios
      .request(options)
      .then(({data}) => {
        console.log('Code re-send!');
      })
      .catch((error) => {
        console.log(error);
        callAlert(undefined, `${error.toString()} ::: resendOTP`);
      });
  } catch (error) {
    console.log(`${error} ::: resendOTP`);
    callAlert(undefined, `${error.toString()} ::: resendOTP`);
  }
}
