import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {constants} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IrequestOTP {
  callingCode: string;
  phoneNumber: string;
  LoggedIn: [boolean, (x: boolean) => void];
}
export async function requestOTP({
  callingCode,
  phoneNumber,
  LoggedIn,
}: IrequestOTP) {
  try {
    // const options: AxiosRequestConfig = {
    //   method: 'POST',
    //   url: `${constants.tapMatchServerUrl}login`,
    //   headers: {'Content-Type': 'application/json'},
    //   data: {
    //     phone: `+${callingCode}${phoneNumber}`,
    //     password: 'password',
    //     country_code: +callingCode,
    //     // phone: '+380990981202',
    //     // password: 'password',
    //     // country_code: 38,
    //   },
    // };

    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     LoggedIn[1](true);
    //     // AsyncStorage.setItem('@storage_Key', value);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });

    fetch(`${constants.tapMatchServerUrl}login`, {
      method: 'POST',
      headers: {
        cookie: 'PHPSESSID=otb029rvndet7olfibkhsj57d5',
        'Content-Type': 'application/json',
      },
      body:
        '{\n\t"phone": "+380990981202",\n\t"password": "password",\n\t"country_code": 38\n}',
    })
      .then((response) => {
        console.log(response);
        LoggedIn[1](true);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.error(`${error} ::: requestOTP`);
    callAlert(undefined, error);
  }
}
