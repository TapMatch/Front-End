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
      method: 'PUT',
      url: `${tapMatchServerUrl}api/profile/name`,
      headers: {
        'X-Auth-Token': userToken,
        'Content-Type': 'application/json',
      },
      data: {
        first_name: name,
      },
    };
    axios
      .request(options)
      .then(({data}: any) => {
        // userProfile[1]({...userProfile[0], name});
        userProfile[1](data.data);
      })
      .catch((error) => {
        console.log(error);
        callAlert(undefined, `${error.toString()} ::: postUserName`);
      });
  } catch (error) {
    console.log(`${error} ::: postUserName`);
    callAlert(undefined, `${error.toString()} ::: postUserName`);
  }
}
