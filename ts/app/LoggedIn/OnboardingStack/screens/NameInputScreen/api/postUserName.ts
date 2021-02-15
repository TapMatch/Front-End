import axios, {AxiosRequestConfig} from 'axios';
import logUserOut from 'ts/app/common/services/logUserOut';
import {tapMatchServerUrl} from 'ts/constants/constants';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import callAlert from 'ts/utils/callAlert';

interface IpostUserName {
  userProfile: [any, (x: any) => void];
  userToken: string;
  name: string;
  LoggedIn?: [boolean, (x: boolean) => void];
  user_has_passed_onboarding?: [boolean, (x: boolean) => void];
}

export async function postUserName({
  userProfile,
  userToken,
  name,
  LoggedIn,
  user_has_passed_onboarding
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
        if (DEV_MODE) {
          console.log(error);
          callAlert(undefined, `${error.toString()} ::: postUserName`);
        }

        if (LoggedIn && userProfile && user_has_passed_onboarding) {
          logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
        }
      });
  } catch (error) {
    console.log(`${error} ::: postUserName`);
    if (DEV_MODE) {
      callAlert(undefined, `${error.toString()} ::: postUserName`);
    }
  }
}
