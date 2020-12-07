import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IpostUserName {
  userProfile: [any, (x: any) => void];
  userToken: string;
  name: string;
}

export async function postUserName({
  userProfile,
  userToken,
  name,
}: IpostUserName) {
  try {
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: `${tapMatchServerUrl}api/profile/name`,
      headers: {
        'X-Auth-Token': userToken,
        'Content-Type': 'application/json',
      },
    };
    axios
      .request(options)
      .then(({data}: any) => {
        console.log(data, 'WAAAAAAAAAAAGH!!!!!!!');
        userProfile[1]({...userProfile[0], name});
      })
      .catch((error) => {
        console.error(error);
        callAlert(undefined, error.toString());
      });
  } catch (error) {
    console.error(`${error} ::: postUserName`);
    callAlert(undefined, error.toString());
  }
}
