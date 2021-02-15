import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import callAlert from 'ts/utils/callAlert';

interface IresendOTP {
  PHPSESSID: [string, (x: string) => void];
}

export async function resendOTP({PHPSESSID}: IresendOTP) {
  try {
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: `${tapMatchServerUrl}verify/resend`,
      headers: {
        Cookie: PHPSESSID[0],
        'Content-Type': 'application/json',
      },
      withCredentials: false
    };

    axios
      .request(options)
      .then(({data}) => {
        console.log('Code re-send!');
      })
      .catch((error) => {
        console.log(error);

        if (DEV_MODE) {
          callAlert(undefined, `${error.toString()} ::: resendOTP`);
        }
      });
  } catch (error) {
    console.log(`${error} ::: resendOTP`);

    if (DEV_MODE) {
      callAlert(undefined, `${error.toString()} ::: resendOTP`);
    }
  }
}
