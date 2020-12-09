import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IrequestOTP {
  callingCode: string;
  phoneNumber: string;
  PHPSESSID: [string, (x: string) => void];
}

export async function requestOTP({
  callingCode,
  phoneNumber,
  PHPSESSID,
}: IrequestOTP) {
  try {
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: `${tapMatchServerUrl}login`,
      headers: {'Content-Type': 'application/json'},
      data: {
        phone: `+${callingCode}${phoneNumber}`,
        password: 'password',
        country_code: +callingCode,
      },
    };

    axios
      .request(options)
      .then(({data}) => {
        PHPSESSID[1](data.Cookie);
      })
      .catch((error) => {
        console.log(error);
        callAlert(undefined, `${error.toString()} ::: requestOTP`);
      });
  } catch (error) {
    console.log(`${error} ::: requestOTP`);
    callAlert(undefined, `${error.toString()} ::: requestOTP`);
  }
}
