import axios, {AxiosRequestConfig} from 'axios';
import {getUserProfile} from 'ts/app/common/api/getUserProfile';
import {tapMatchServerUrl} from 'ts/constants/constants';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import callAlert from 'ts/utils/callAlert';
import logAxiosError from 'ts/utils/logAxiosError';
import logUserOut from '../services/logUserOut';

interface IjoinCommunity {
  userProfile: [any, (x: any) => void];
  userToken: string;
  communityId: number;
  code?: string;
  windowState: [boolean, (x: boolean) => void];
  errorState?: [boolean, (x: boolean) => void];
  LoggedIn?: [boolean, (x: boolean) => void];
  user_has_passed_onboarding?: [boolean, (x: boolean) => void];
}

export async function joinCommunity({
  errorState,
  userProfile,
  windowState,
  userToken,
  communityId,
  code,
  LoggedIn,
  user_has_passed_onboarding,
}: IjoinCommunity) {
  try {
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: `${tapMatchServerUrl}api/communities/${communityId}/join`,
      headers: {
        'X-Auth-Token': userToken,
        'Content-Type': 'application/json',
      },
      data: code ? {
        access: code
      }
        :
        undefined
    };
    axios
      .request(options)
      .then(({data}) => {
        if (data.hasOwnProperty('error')) {
          if (data.error.includes('incorrect')) {
            if (errorState) {
              errorState[1](true);
              throw 'incorrect code';
            } else {
              // console.log('!!!!!!!!!!!!-----incorrect code----!!!!!!!!!!', data);
              throw 'incorrect code';
            }
          } else {
            windowState[1](false);
            return data;
          }
        } else {
          windowState[1](false);
          return data;
        }
      })
      .then((data: any) => {
        getUserProfile({userProfile, userToken});
        return data;
      })
      .catch((error) => {
        logAxiosError(error, 'joinCommunity');
        if (error.toString() === 'Error: Request failed with status code 422') {
          if (errorState) {
            errorState[1](true);
          }
        } else {
          if (DEV_MODE) {
            callAlert(undefined, `${error.toString()} ::: joinCommunity`);
          }
        }

        if (LoggedIn && userProfile && user_has_passed_onboarding) {
          logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
        }
      });
  } catch (error) {
    if (DEV_MODE) {
      console.log(`${error} ::: joinCommunity2`);
      callAlert(undefined, `${error.toString()} ::: joinCommunity`);
    }
  }
}
