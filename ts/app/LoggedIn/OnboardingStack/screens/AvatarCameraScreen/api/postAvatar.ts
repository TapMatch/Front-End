import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IpostAvatar {
  base64: any;
  userToken: any;
  pictureURI: any;
}

export async function postAvatar({base64, userToken, pictureURI}: IpostAvatar) {
  try {
    const form = new FormData();
    form.append('photo', {
      uri: pictureURI,
      name: `user_avatar_${userToken}.jpg`,
      filename: `user_avatar.jpg`,
      type: 'image/jpg',
    });

    const options: AxiosRequestConfig = {
      method: 'POST',
      url: `${tapMatchServerUrl}api/profile/avatar`,
      headers: {
        Accept: 'application/json',
        'X-Auth-Token': userToken,
        'content-type': `multipart/form-data;`,
      },
      data: form,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log('SUCCESS!!!');
      })
      .catch(function (error) {
        console.log(error);
        callAlert(undefined, `${error.toString()} ::: postAvatar`);
      });
  } catch (error) {
    console.log(`${error} ::: postAvatar`);
    callAlert(undefined, `${error.toString()} ::: postAvatar`);
  }
}
