import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IgetAllCommunities {
  userToken: string;
  communities: [any, (x: any) => void];
}

export async function getAllCommunities({
  communities,
  userToken,
}: IgetAllCommunities) {
  try {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `${tapMatchServerUrl}api/communities`,
      headers: {
        'X-Auth-Token': userToken,
        'Content-Type': 'application/json',
      },
    };
    axios
      .request(options)
      .then(({data}: any) => communities[1](data))
      .catch((error) => {
        console.log(error);
        callAlert(undefined, `${error.toString()} ::: getAllCommunities`);
      });
  } catch (error) {
    console.log(`${error} ::: getAllCommunities`);
    callAlert(undefined, `${error.toString()} ::: getAllCommunities`);
  }
}