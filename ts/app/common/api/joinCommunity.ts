import axios, {AxiosRequestConfig} from 'axios';
import {getUserProfile} from 'ts/app/common/api/getUserProfile';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IjoinCommunity {
  userProfile: [any, (x: any) => void];
  userToken: string;
  communityId: number;
  code?: string;
  windowState: [boolean, (x: boolean) => void];
  errorState?: [boolean, (x: boolean) => void];
}

export async function joinCommunity({
  errorState,
  userProfile,
  windowState,
  userToken,
  communityId,
  code,
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
        console.log(error.toString(), '::: joinCommunity10');
        if (error.toString() === 'Error: Request failed with status code 422') {
          if (errorState) {
            errorState[1](true);
          }
        } else {
          callAlert(undefined, `${error.toString()} ::: joinCommunity1`);
        }
      });
  } catch (error) {
    console.log(`${error} ::: joinCommunity2`);
    callAlert(undefined, `${error.toString()} ::: joinCommunity`);
  }
}
