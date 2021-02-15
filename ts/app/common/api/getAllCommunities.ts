import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import logUserOut from '../services/logUserOut';

interface IgetAllCommunities {
  userToken: string;
  communities: [any, (x: any) => void];
  LoggedIn?: [boolean, (x: boolean) => void];
  userProfile?: [any, (x: any) => void];
  user_has_passed_onboarding?: [boolean, (x: boolean) => void];
}

export async function getAllCommunities({
  communities,
  userToken,
  LoggedIn,
  userProfile,
  user_has_passed_onboarding
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
        if (DEV_MODE) {
          console.log(error);
          callAlert(undefined, `${error.toString()} ::: getAllCommunities`);
        }
        if (LoggedIn && userProfile && user_has_passed_onboarding) {
          logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
        }
      });
  } catch (error) {
    console.log(`${error} ::: getAllCommunities`);

    if (DEV_MODE) {
      callAlert(undefined, `${error.toString()} ::: getAllCommunities`);
    }
  }
}
