import axios, {AxiosRequestConfig} from 'axios';
import {getUserProfile} from 'ts/app/common/api/getUserProfile';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IjoinCommunity {
  userProfile: [any, (x: any) => void];
  userToken: string;
  communityId: number;
  code: string;
  windowState: [boolean, (x: boolean) => void];
  errorState: [boolean, (x: boolean) => void];
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
      data: {
        access: code,
      },
    };
    axios
      .request(options)
      .then(({data}: any) => {
        if (data.error === 'incorrect code') {
          errorState[1](true);
        } else {
          windowState[1](false);
        }
        // userProfile[1]({...userProfile[0], name});
        // userProfile[1](data.data);
      })
      .then(() => getUserProfile({userProfile, userToken}))
      .catch((error) => {
        console.log(error);
        callAlert(undefined, `${error.toString()} ::: joinCommunity`);
      });
  } catch (error) {
    console.log(`${error} ::: joinCommunity`);
    callAlert(undefined, `${error.toString()} ::: joinCommunity`);
  }
}
